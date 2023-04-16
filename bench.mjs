import { useThermal } from "./dist/index.mjs";

const { invoke } = await useThermal();

function largeComputing(boundary = 1000000000) {
  let i = 0;
  while (boundary - i !== 0) {
    i++;
  }
  return i;
}

const originStart = Date.now();
const originResult = largeComputing();
const originDuration = Date.now() - originStart;

const thermalStart = Date.now();
const thermalResult = await invoke(largeComputing);
const thermalDuration = Date.now() - thermalStart;

console.log(
  `origin  - duration: ${originDuration / 1000}s result: ${originResult}`,
);
console.log(
  `thermal - duration: ${thermalDuration / 1000}s result: ${thermalResult}`,
);

console.log("\n");

console.log(
  "thermal vs origin -",
  (originDuration / thermalDuration).toFixed(2) + " ↑",
);

console.log()