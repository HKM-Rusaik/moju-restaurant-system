import Feedback from "../../models/Feedback.js";

// Create Feedback
export const createFeedback = async (req, res) => {
  const { orderId } = req.params;
  const { customerId, feedback } = req.body;

  try {
    const newFeedback = await Feedback.create({
      customerId,
      orderId,
      feedback,
    });
    res.status(201).json(newFeedback);
  } catch (error) {
    console.error("Error creating feedback:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete Feedback
export const deleteFeedback = async (req, res) => {
  const { feedbackId } = req.params;

  try {
    const feedback = await Feedback.findByPk(feedbackId);
    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    await feedback.destroy();
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all feedback
export const getFeedback = async (req, res) => {
  try {
    const feedbackList = await Feedback.findAll();
    res.status(200).json(feedbackList);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Server error" });
  }
};
