import express from "express";
const router=express.Router();

import {getAllConversations,createConversation,updateConversation,deleteConversation} from "../controller/conversation.js";

router.post("/",createConversation);
router.get("/",getAllConversations);
router.put('/:id',updateConversation);
router.delete('/:id',deleteConversation);

export default router;