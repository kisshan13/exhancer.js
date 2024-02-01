![Logo](https://cdn.discordapp.com/attachments/1202147000041345117/1202595843178373172/Frame_1.png?ex=65ce07a8&is=65bb92a8&hm=cb6b31709f319cbbe020a98cfb93353c2364096ea1c86dfb2684f70580cfb6a7&)

# Exhancer

An enhancer for express js with built-in file system routing, error handlers and plugins (middlewares).

[See Official Documentation](https://exhancer.netlify.app)

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


