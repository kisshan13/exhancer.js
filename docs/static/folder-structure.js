import { Router } from "express";

export default () => {
    const router = Router();

    router.post("/", (req, res) => res.send("Hello World"))

    return router;
}

