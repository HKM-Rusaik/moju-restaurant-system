import Reservation from "../../models/Reservation.js";

export const createReservation = async (req, res) => {
  const { customerId, reservationDate, noOfGuests, note } = req.body;

  try {
    // Create a new reservation
    const newReservation = await Reservation.create({
      customerId,
      reservationDate,
      noOfGuests,
      note,
    });

    // Send a success response
    res.status(201).json({
      message: "Reservation created successfully",
      reservation: newReservation,
    });
  } catch (error) {
    // Handle any errors
    console.error("Error creating reservation:", error);
    res.status(500).json({
      message: "An error occurred while creating the reservation",
      error: error.message,
    });
  }
};
