import { asynchandler } from "../utils/asynchandler.js";
import { Apierror } from "../utils/apierror.js";
import {Message} from '../models/chat.model.js';
import { io } from "../index.js";
import { Apiresponse } from "../utils/apiresponse.js";

const createMessage = asynchandler(async (req, res) => {

    console.log(req.body)
    const { senderid, receiverid, message } = req.body

    // if (senderid == receiverid) {
    //   throw new Apierror(400, "cant send message to yourself")
    // }

    if (!senderid || !receiverid || !message) {
        throw new Apierror(400, "All fields are required")
    }

    const newMessage = new Message({
        senderid,
        receiverid,
        message
    })

   const createdMessage = await newMessage.save()

    if (!createdMessage) {
        throw new Apierror(500, "something went wrong while creating message")
    }

    io.emit("new-message", createdMessage)
    // io.to(createdMessage.receiverid).emit("new-message", createdMessage.message)

    return res.status(201).json(new Apiresponse(200, createdMessage, "created successfully"))
})

const getMessages = asynchandler(async (req, res) => {

    const { senderid, receiverid } = req.body

    if (!senderid || !receiverid) {
        throw new Apierror(400, "All fields are required")
    }

    const messages = await Message.find({
        $or: [
            { senderid, receiverid },
            { senderid: receiverid, receiverid: senderid }
        ]
    }).sort({ createdAt: 1 })

    if (!messages) {
        throw new Apierror(500, "something went wrong while getting messages")
    }

    return res.status(200).json(new Apiresponse(200, messages, "fetched successfully"))
    })

export { createMessage, getMessages }