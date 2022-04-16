import { Router } from "express";

const router = Router();





router.post('/', (req, res) => {
    console.log(req.body);
});


export default router;