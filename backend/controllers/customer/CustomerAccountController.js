import Customer from "../../models/Customer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { where } from "sequelize";
import Order from "../../models/Order.js";

const saltRounds = 10;

// Secret key for JWT
const jwtSecret = "your_jwt_secret"; // Store this in environment variables in production

export const createCustomer = async (req, res) => {
  const {
    firstName,
    lastName,
    street,
    dateOfBirth,
    city,
    phoneNumber,
    email,
    password,
  } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Check if email already exists
    const countEmailUsers = await Customer.count({ where: { email } });

    if (countEmailUsers > 0) {
      return res
        .status(400)
        .json({ error: "Email already exists. Try logging in." });
    }

    // Create new customer
    const newCustomer = await Customer.create({
      firstName,
      lastName,
      streetName: street,
      cityName: city,
      dateOfBirth,
      phoneNumber,
      email,
      passwordHash: hashedPassword,
      membership: "new",
    });

    // Generate JWT
    const token = jwt.sign({ id: newCustomer.id }, jwtSecret, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, customer: newCustomer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the customer exists
    const customer = await Customer.findOne({ where: { email } });

    if (!customer) {
      return res.status(401).json({ error: "User does not exist" });
    }

    // Check if the password matches
    const passwordMatch = await bcrypt.compare(password, customer.passwordHash);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Generate JWT
    const token = jwt.sign({ customerId: customer.customerId }, jwtSecret, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ token, customer, message: "Successfully logged in" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Server Error" });
  }
};        

export const updateMembership = async (req, res) => {
  const { customerId } = req.params;

  try {
    // Retrieve the customer record from the database
    const customer = await Customer.findByPk(customerId);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const { membership } = req.body;

    // Update the membership status of the customer
    customer.membership = membership;

    // Save changes to the database
    await customer.save();

    return res.status(200).json({ message: "Membership updated successfully" });
  } catch (error) {
    console.error("Error updating membership:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const customerId = req.customer.customerId;
    // Find the user by id and delete
    const customer = await Customer.findByPk(customerId);

    if (!customer) {
      return res.status(404).json({ message: "User not found" });
    }

    await Order.destroy({ where: { customerId } });

    await Customer.destroy({ where: { customerId } });
    res
      .status(200)
      .json({ message: "Account and associated orders deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({
      message: "An error occurred while trying to delete the account",
    });
  }
};
