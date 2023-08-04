const { response } = require("express");
const chat = require("../models/chat");
const Chat = require('../models/chat')

const getChats = async (req, res=response)=>{
    try {
        const miId= req.uid;

        const chats= await Chat.find({
            $or:[{usuarioA: miId},{usuarioB: miId}]
        })

        res.json({
            ok: true,
            chats
        });
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'error'
        });
    }
}

const createchat = async (req, res=response)=>{
    try {
        const chat = new chat(req.boy);

        await chat.save();

        res.json({
            ok: true,
            chat
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: 'ocurrio un error'
        })
    }
}

module.exports={
    getChats,
    createchat
}