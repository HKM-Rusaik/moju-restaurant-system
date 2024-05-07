import Order from "./models/Order.js";
import Customer from "./models/Customer.js";

const order = await Order.findOne({ include: Customer });

console.log("Order:", order);

// Log the associated customer
console.log(
  "Customer:",
  order ? order.Customer : "No associated customer found"
);
