import express from "express";

const router = express.Router();

router.get('/api/users/currentuser', (req, res)=>{
    console.log("Hello");
    res.send("Hi current user");
});

export { router as currentUserRouter };