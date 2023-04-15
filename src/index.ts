import { hash } from "ohash";
import { asyncExitHook } from "exit-hook";
import type { AnyFunction } from "m-type-tools";
import { createStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs";

const storage = createStorage({
  driver: fsDriver({ base: "node_modules/.cache/thermal-fn" }),
});

interface Cache {
  [hash: string]: any;
}

export async function useThermal(key: string) {
  let cache = ((await storage.getItem(key)) as any) || ({} as Cache);
  // Write only on exit
  asyncExitHook(
    async () => {
      await storage.setItem(key, cache);
    },
    {
      minimumWait: 500,
    }
  );

  async function invoke(fn: AnyFunction, ...rest: any[]) {
    const fnKey = hash([fn, ...rest]);
    let oldResult = cache[fnKey];
    if (oldResult) {
      return oldResult;
    }
    const result = await fn(...rest);
    cache[fnKey] = result;
    return result;
  }

  async function refresh() {
    cache = {};
  }
  return {
    invoke,
    refresh,
  };
}
