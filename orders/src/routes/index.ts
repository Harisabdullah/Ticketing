import express, { Request, Response } from "express";

const router = express();

router.get('/api/orders', async (req: Request, res: Response) => {
   res.send({});
});

export { router as indexOrderRouter};