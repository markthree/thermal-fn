# thermal-fn

Persistence Cache Function | 持久化缓存函数

<br />

## Usage

### install

```shell
npm i thermal-fn
```

```ts
import { useThermal } from "thermal-fn"

const { invoke } = useThermal()

// The node will execute caching, even if the node restarts
// node 将会执行缓存，即使 node 重新启动
const result = await invoke(function largeComputing(boundary) {
  let i = 0;
  while (boundary - i !== 0) {
    i++;
  }
  return i;
}, 1000000000)
```

<br />


## License

Made with [markthree](https://github.com/markthree)

Published under [MIT License](./LICENSE).
