# Exhancer

An enhancer for express js with built-in file system routing, error handlers and plugins (middlewares).

(See Official Documentation)["https://exhancer.netlify.app"]

It's simply what you need in top of express js.

```javascript
import exhancer, { zodError, mongoError } from "exhancer";
import * as path from "path";
import * as  url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const exhapp = new exhancer.Exhancer({ fsRouting: true, directory: path.resolve(__dirname, "src") })

exhapp.onError([zodError, mongoError]);

exhapp.run(4000, () => {
    console.log("Hello")
})
```


