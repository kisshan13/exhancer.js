# File System Routing

File System Routing is simply routing as per your folder structure. But it's kind of different here.
In Exhancer what you do is create your root directory to watch for the routing.

Let's start

## Setting up project

### Installing Dependencies

```bash
npm init -y
npm install exhancer express
```

After installing dependencies create a new file `index.js`

`index.js`

```js #10
import exhancer from "exhancer";

import express from "express";

import * as path from "path";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const exhapp = new exhancer.Exhancer({
  fsRouting: true,
  directory: path.resolve(__dirname, "src"),
  prefix: "/api",
});

exhapp.run(3000, () => {
  console.log("[YOUR-APP] ⚡ App Running on port 3000");
});
```

Here on line 10, where we initialize our app, we set the directory to the `src` folder. That means aur exhancer app will look for routes in that directory. Now the folders inside the `src` folder needs to be well organized in a predefined way.

## Creating folder structure.

1. Create a new folder `hello` inside the `src` folder.
2. Inside the `hello` folder create a `index.js` file.

:::code source="../../static/folder-structure.js" :::

You have to follow this pattern in every routes you create inside the `src` folder. If you get stuck following this guide go ahead and see this [repo]('/').

## Running your application.

```bash
node index.js
```

You'll now able to make api requests to endpoint.  `/api/hello`

Similarly, for user api you have to create a `user` folder within the `src` folder and a `index.js` file inside the `user` folder.
i.e `src/user/index.js`