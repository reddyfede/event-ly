const {Comment, Event, User} = require("../models")

module.exports = {
    create,
    update,
    delete: destroy,
}

async function create(req,res){
    try {
        const userId = "64f397b1dc1e188f1c659f95" //placeholder
        const user = await User.findById(userId)

        const data = {...req.body, createdBy: userId, username: user.name}
        const newComment = await Comment.create(data)
      
        const eventId = req.params.eId
        const updatedEvent = await Event.findById(eventId)
        .populate("comments")
        .populate("guests")
        .populate("createdBy")
        updatedEvent.comments.push(newComment)
        updatedEvent.save()
    
        res.status(201).json(updatedEvent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function update(req,res){
    try {
        const commentId = req.params.cId
        data = {...req.body, edited: true}
        res.status(200).json(await Comment.findByIdAndUpdate(commentId, data, { new: true }));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function destroy(req,res){
    try {
        const commentId = req.params.cId
        await Comment.findByIdAndDelete(commentId)

        const eventId = req.params.eId
        const updatedEvent = await Event.findById(eventId)
        .populate("comments")
        .populate("guests")
        .populate("createdBy")

        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}