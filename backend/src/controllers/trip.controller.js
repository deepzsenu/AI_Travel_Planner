import Trip from "../models/trip.model.js";

/*
CREATE TRIP
*/
export const createTrip = async (req, res) => {
  try {

    const { destination, days, budgetType, interests } = req.body;

    const trip = await Trip.create({
      user: req.user.id,
      destination,
      days,
      budgetType,
      interests
    });

    res.status(201).json(trip);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};

export const getUserTrips = async (req, res) => {

  try {

    const trips = await Trip.find({
      user: req.user.id
    });

    res.json(trips);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};


export const getTripById = async (req, res) => {

  try {

    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found"
      });
    }

    res.json(trip);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};

export const updateTrip = async (req, res) => {

  try {

    const trip = await Trip.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id
      },
      req.body,
      { new: true }
    );

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found"
      });
    }

    res.json(trip);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};

export const deleteTrip = async (req, res) => {

  try {

    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found"
      });
    }

    res.json({
      message: "Trip deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};


