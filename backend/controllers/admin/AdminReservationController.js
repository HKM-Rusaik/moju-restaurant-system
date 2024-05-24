import Reservation from "../../models/Reservation.js";
import Customer from "../../models/Customer.js";
export const getReservations = async (req, res) => {
  try {
    // Fetch all reservations with associated customer data
    const reservations = await Reservation.findAll({
      include: [
        {
          model: Customer,
          attributes: ["firstName", "lastName"], 
        },
      ],
    });

    // Send a success response with the reservations data
    res.status(200).json({
      message: "Reservations retrieved successfully",
      reservations,
    });
  } catch (error) {
    // Handle any errors
    console.error("Error fetching reservations:", error);
    res.status(500).json({
      message: "An error occurred while fetching reservations",
      error: error.message,
    });
  }
};
