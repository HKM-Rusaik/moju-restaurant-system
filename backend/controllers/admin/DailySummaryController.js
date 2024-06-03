import DailyProfit from "../../models/DailySummary.js";

// Create Profit
export const createTodaySummary = async (req, res) => {
  const { date, businessTotal, expenses } = req.body;
  try {
    const newProfit = await DailyProfit.create({
      date,
      businessTotal,
      expenses,
    });
    res.status(201).json(newProfit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Profit
export const getSummary = async (req, res) => {
  const { date } = req.params;
  try {
    const profit = await DailyProfit.findByPk(date);
    if (profit) {
      res.status(200).json(profit);
    } else {
      res.status(404).json({ message: "Profit record not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Profit
export const updateSummary = async (req, res) => {
  const { date } = req.params;
  const { profit_amount, expenses } = req.body;
  try {
    const [updated] = await DailyProfit.update(
      { profit_amount, expenses },
      { where: { date } }
    );
    if (updated) {
      const updatedProfit = await DailyProfit.findByPk(date);
      res.status(200).json(updatedProfit);
    } else {
      res.status(404).json({ message: "Profit record not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Profit
export const deleteSummary = async (req, res) => {
  const { date } = req.params;
  try {
    const deleted = await DailyProfit.destroy({ where: { date } });
    if (deleted) {
      res.status(204).json({ message: "Profit record deleted" });
    } else {
      res.status(404).json({ message: "Profit record not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Profit summaries
export const getAllSummaries = async (req, res) => {
  try {
    const summaries = await DailyProfit.findAll();
    res.status(200).json(summaries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
