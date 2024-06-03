import Support from "../../models/Support.js";

export const createSupport = async (req, res) => {
  const { customerName, customerEmail, message } = req.body;

  try {
    const newSupport = Support.create({
      customerName,
      customerEmail,
      message,
    });
    res.status(200).json({ message: "Support has been successfully created" });
  } catch (err) {
    res.status(500).json({ error: "server err" });
  }
};

export const getSupports = async (req, res) => {
  try {
    const supports = await Support.findAll();
    res.status(200).json(supports);
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching supports" });
  }
};

export const deleteSupport = async (req, res) => {
  const suppportId  = req.params.selectedSupportId;

  try {
    const support = await Support.findOne(suppportId);
    if (!support) {
      return res.status(404).json({ error: "Support entry not found" });
    }
    await support.destroy();
    res
      .status(200)
      .json({ message: "Support entry has been successfully deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error while deleting support entry" });
  }
};
