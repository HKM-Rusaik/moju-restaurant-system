import Reservation from "../../models/Reservation.js";
import Customer from "../../models/Customer.js";
export const getReservations = async (req, res) => {
  try {
    // Fetch all reservations with associated customer data
    const reservations = await Reservation.findAll({
      include: [
        {
          model: Customer,
          attributes: ["firstName", "lastName", "phoneNumber"],
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

export const deleteReservation = async (req, res) => {
  const { reservationId } = req.params;

  try {
    const reservation = await Reservation.findOne({ where: { reservationId } });
    if (!reservation) {
      res.status(400).json({ message: "Invalid Id" });
    }

    await reservation.destroy();
    res.status(200).json({ message: "Successfully reservation deleted!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in deleting record", err });
  }
};

export const getReservationsByCustomerId = async (req, res) => {
  const { customerId } = req.params;

  try {
    // Fetch all reservations for the given customerId
    const reservations = await Reservation.findAll({
      where: { customerId },
    });

    // If no reservations found, send a 404 response
    if (!reservations || reservations.length === 0) {
      res.status(404).json({
        message: "No reservations found for this customer",
      });
      return;
    }

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
