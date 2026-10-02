const messageModel = require("../models/messageModel");

const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required"
      });
    }

    const newMessage = await messageModel.createMessage({
      name,
      email,
      subject,
      message
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage
    });
  } catch (error) {
    console.error("Create message error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send message"
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await messageModel.getAllMessages();

    res.json({
      success: true,
      messages
    });
  } catch (error) {
    console.error("Get messages error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch messages"
    });
  }
};

module.exports = {
  createMessage,
  getMessages
};