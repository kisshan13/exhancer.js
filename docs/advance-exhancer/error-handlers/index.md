# Extending Error Handler

In this section we'll create our own error handler for exhancer.

## Creating a custom error

Having one custom error in our application is a good practice.

```js
class ServerError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
```

This is the error that we are going to throw for any unsuccessful request.

## Creating error handler

```js #2,3,4,5,6
function handleServerError(err) {
    if(err instance of ServerError) {
        return {
            message: err.message,
            status: err.status
        }
    }
}
```

Every error handler must return a object which must have a `message` property and `status` property.

```js
exhapp.onError([handleServerError]);
```

And yes you have your error handler ready to go !!.
