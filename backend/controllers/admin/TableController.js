import Table from "../../models/Table.js";
import Order from "../../models/Order.js";

// Create a new table
export const createTable = async (req, res) => {
  try {
    const { tableName, noOfGuests } = req.body;

    // Check if a table with the same name already exists
    const existingTable = await Table.findOne({ where: { tableName } });
    if (existingTable) {
      return res.status(400).json({ error: "Table name already exists" });
    }

    // Create the new table if no table with the same name exists
    const newTable = await Table.create({ tableName, noOfGuests });
    res.status(201).json(newTable);
  } catch (error) {
    console.error("Error creating table:", error);
    res.status(500).json({ error: "Failed to create table" });
  }
};

// Update an existing table
export const updateTable = async (req, res) => {
  try {
    const { tableName } = req.params;
    const { orderId } = req.body;
    console.log(tableName);
    // Find the table by tableName
    const table = await Table.findOne({ Where: { tableName } });
    const order = await Order.findOne({ where: { orderId } });

    // If table not found, return 404
    if (!table) {
      return res.status(404).json({ error: "Table not found" });
    }

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    if (
      order.orderStatus !== "prepared" ||
      order.orderStatus !== "ready to prepare"
    ) {
      return res.status(404).json({ error: "OrderId is invalid" });
    }
    order.deliveryAddress = tableName;
    table.orderDateTime = new Date();

    await table.save();
    await order.save();

    // Respond with the updated table
    return res.status(200).json(table);
  } catch (error) {
    console.error("Error updating table:", error);
    return res.status(500).json({ error: "Failed to update table" });
  }
};

// Delete a table
export const deleteTable = async (req, res) => {
  try {
    const { tableId } = req.params;

    const table = await Table.findByPk(tableId);
    if (!table) {
      return res.status(404).json({ error: "Table not found" });
    }

    await table.destroy();

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting table:", error);
    res.status(500).json({ error: "Failed to delete table" });
  }
};

// Get a specific table by ID
export const getTableById = async (req, res) => {
  try {
    const { tableId } = req.params;
    const table = await Table.findByPk(tableId);
    if (!table) {
      return res.status(404).json({ error: "Table not found" });
    }
    res.status(200).json(table);
  } catch (error) {
    console.error("Error fetching table:", error);
    res.status(500).json({ error: "Failed to fetch table" });
  }
};

// Get available  tables
export const getAvailableTables = async (req, res) => {
  try {
    const tables = await Table.findAll({
      where: { orderDateTime: null && reservationDateTime < new Date() },
    });
    res.status(200).json(tables);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ error: "Failed to fetch tables" });
  }
};

//get all tables
export const getAllTables = async (req, res) => {
  try {
    const tables = await Table.findAll();
    res.status(200).json(tables);
  } catch (err) {
    res.status(500).json({ error: "Failed in fetching all tables" });
  }
};

//update orderTime
export const updateOrderTimeToNull = async (req, res) => {
  try {
    const { tableName } = req.params;
    const table = await Table.findOne({ where: { tableName } });

    if (!table) {
      res.status(400).json({ message: "Table could not found" });
    }

    table.orderDateTime = null;
    await table.save();
    res.status(200).json({ message: "Successfully table cleared" });
  } catch (err) {
    console.log("error in updating order time", err);
    res.status(500).json({ error: "Failed to update order time" });
  }
};

export const updateReserveDateTime = async (req, res) => {
  try {
    const { tableName } = req.params;
    const reservationDateTime = req.body.selectedDate;
    const table = await Table.findOne({ where: { tableName } });

    if (!table) {
      res.status(400).json({ message: "Table could not found" });
    }

    table.reservationDateTime = reservationDateTime;
    table.save();
    res.status(200).json({ message: "Successfully table reserved" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "error in updating reservation data and time" });
  }
};

export const updateReserveDateTimeToNull = async (req, res) => {
  try {
    const { tableName } = req.params;
    const table = await Table.findOne({ where: { tableName } });

    if (!table) {
      res.status(400).json({ message: "Table could not found" });
    }

    table.reservationDateTime = null;
    table.save();
    res.status(200).json({ message: "Successfully table reserved" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "error in updating reservation data and time" });
  }
};
