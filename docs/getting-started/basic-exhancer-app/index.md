# Create a basic Exhancer app

This tutorial shows you how to create a basic exhancer app. If you haven't read the how to get started guide? [Click me]("/getting-started")

### Imports

:::code source="../../static/basic-app.js" range="1-2" :::

### Initializing an app

:::code source="../../static/basic-app.js" range="3-10" :::

Here `new exhancer.Exhancer()` is creating a new express application and `run` method is used to run the application.

#### Difference betweeen `app.run()` & `exhapp.run()`

`app.listen()` & `exhapp.run()` are the same in someway because both are used to run the application but the key difference is that exhancer adds some additional functionality to the application whenever it's starts by the `exhapp.run()` method.

!!! Tip
File system based routing works only when the exhancer app starts with its own `run()` method.
!!!

### Adding middlewares

You can add middlewares to your application by the traditional `app.use()` method.

:::code source="../../static/middlewares.js" range="3-9" :::

!!! Tip
You can also run your exhancer application using this also but remember it's highly recommended to use `exhapp.run()` when using file-system routing.

```js
const exhapp = new exhancer.Exhancer();

const { app } = exhapp;

app.use(express.json());

app.listen(4000)
```
!!!