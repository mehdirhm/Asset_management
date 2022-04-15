import { Router } from "express";

const router = Router();

router.post('/', (req, res) => {
    res.send("login is working")
});
export default router;