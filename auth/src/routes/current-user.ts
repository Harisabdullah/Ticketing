import express from "express";
import {currentUser} from "@bk_tickets/common";

const router = express.Router();

router.get('/api/users/currentuser',
    currentUser,
    (req, res)=>{
        res.send({currentUser: req.currentUser || null}); // To not send undefined
    }
);

export { router as currentUserRouter };