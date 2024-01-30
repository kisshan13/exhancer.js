# Handling errors

Exhancer makes error handling much easier than before. It relies on a global error handler.

## Traditional way of handling errors.

Let's say we have a basic express app where we are validating the request body using a package called `zod`

```js index.js
import express from "express";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
});

const app = express();

app.get("/", (req, res, next) => {
  try {
    const { name } = schema.parse(req.body);
    // If everything okay,  then rest of logic will be executed.
  } catch (error) {
    // If error handle error here or pass down to a  global error handler next(error)
  }
});

app.listen(3000);
```

Problem with this kind of error handling is not that big but we can make it simple using Exhancer ⚡.

## Exhancer error handler

Exhancer seprates each error into a different handler. Just like we have different controller / handler for each endpoint, we have seprate handlers for errors also.

### `exhapp.onError()`

`onError` method is used to handle all the errors that can happen in our application.

#### Handling `Zod` error using Exhancer.

```js #1,8 index.js
import exhancer, { zodError } from "exhancer";
import express from "express";

const exhapp = new exhancer.Exhancer();

const { app } = exhapp;

exhapp.OnError([zodError]);

exhapp.run(3000, () => {
  console.log("Exhancer running on port ::3000");
});
```

Now any error that you will get from the `Zod` will automatically get handled by the Exhancer's `zodError` handler.

!!!warning Work in progress
Currently we're working on error handlers. But you can make your own till then or [contribute.]("/")
!!!
