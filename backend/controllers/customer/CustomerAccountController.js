import Customer from "../../models/Customer.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const createCustomer = async (req, res) => {
  const { firstName, lastName, street, city, phoneNumber, email, password } =
    req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Check if email already exists
    const countEmailUsers = await Customer.count({ where: { email: email } });

    if (countEmailUsers > 0) {
      return res.send("Email already exists. Try logging in.");
    }

    // Create new customer
    const newCustomer = await Customer.create({
      firstName: firstName,
      lastName: lastName,
      streetName: street,
      cityName: city,
      phoneNumber: phoneNumber,
      email: email,
      passwordHash: hashedPassword,
    });

    res.status(201).json(newCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await Customer.findOne({ where: { email } });

    if (!customer)
      return res.status(401).json({ error: "Incorrect email or password" });

    const passwordMatch = await bcrypt.compare(password, customer.passwordHash);

    if (!passwordMatch)
      return res.status(401).json({ error: "Incorrect email or password" });

    res.status(200).json({ message: "Login successful", customer });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
