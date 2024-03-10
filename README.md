# Next-on-pages - Top level `getRequestContext` erroring on build

This is a minimal reproduction showing that calling `getRequestContext` at the top level of a file
results in a build error, while the code should actually be valid

## Reproduction Steps

- Install the dependencies:
  ```sh
  $ npm i
  ```

- Run the app in dev mode:
  ```sh
  $ npm run dev
  ```

- Notice that the home page works fine and prints
  ```
  A value from a KV store!
  ```

- Try to run the app in preview mode:
  ```sh
  $ npm run preview
  ```

- Notice that the build process fails with the following error:
  ```
  ▲  Error: Failed to retrieve the Cloudflare request context.
  ▲  at b (/Users/dario/Desktop/no-request-context-bug/.next/server/app/page.js:41:50)
  ▲  at 9795 (/Users/dario/Desktop/no-request-context-bug/.next/server/app/page.js:36:21806)
  ▲  at Function.__webpack_require__ (/Users/dario/Desktop/no-request-context-bug/.next/server/edge-runtime-webpack.js:25:42)
  ▲  at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
  ▲  
  ▲  > Build error occurred
  ▲  Error: Failed to collect page data for /
  ▲    at /Users/dario/Desktop/no-request-context-bug/node_modules/next/dist/build/utils.js:1258:15
  ▲    at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
  ▲  type: 'Error'
  ▲  }
  ▲  Error: Command "npm run build" exited with 1
  ```

## Simple workaround

To make the build process succeed, in the `app/page.tsx` file,
follow the comment's instructions and move the `getRequestContext` call _inside_ `getKvValue`:
```diff
...

// To fix the issue comment out line 9 and uncomment line 12
// (i.e. simply move `getRequestContext` inside the `getKvValue` function call)

- const { env } = getRequestContext();
+// const { env } = getRequestContext();

async function getKvValue() {
-    // const { env } = getRequestContext();
+    const { env } = getRequestContext();
    const myKv = env.MY_KV
...
```