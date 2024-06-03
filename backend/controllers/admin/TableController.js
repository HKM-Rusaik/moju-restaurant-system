import Table from "../../models/Table.js";

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
    const { tableId, tableName } = req.params;
    const { noOfGuests } = req.body;

    const table = await Table.findByPk(tableId);
    if (!table) {
      return res.status(404).json({ error: "Table not found" });
    }

    // Update the table
    table.noOfGuests = noOfGuests;
    await table.save();

    res.status(200).json(table);
  } catch (error) {
    console.error("Error updating table:", error);
    res.status(500).json({ error: "Failed to update table" });
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

// Get all tables
export const getAllTables = async (req, res) => {
  try {
    const tables = await Table.findAll();
    res.status(200).json(tables);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ error: "Failed to fetch tables" });
  }
};
