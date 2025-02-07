import Conversation from "../models/conversation.js";

export const getAllConversations = async (req, res) => {
    try {
      const conversations = await Conversation.find().sort({ createdAt: -1 });
      res.status(200).json(conversations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export const createConversation = async (req, res) => {
  const { companyName, contactNo, email, contacted, notes } = req.body;
  try {
    const newConversation = new Conversation({ companyName, contactNo, email, contacted, notes,pinned,color });
    await newConversation.save();
    res.status(201).json(newConversation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateConversation = async (req, res) => {
  const { id } = req.params;
  const { companyName, contactNo, email, contacted, notes,pinned,color } = req.body;
  try {
    const updatedConversation = await Conversation.findByIdAndUpdate(
      id,
      { companyName, contactNo, email, contacted, notes, pinned, color },
      { new: true }
    );
    res.status(200).json(updatedConversation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteConversation = async (req, res) => {
  const { id } = req.params;
  try {
    await Conversation.findByIdAndDelete(id);
    res.status(200).json({ message: 'Conversation deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};