const { Appointment, User, Property } = require("../models");

// Create new appointment
const createAppointment = async (req, res) => {
  try {
    const { user_id, property_id, scheduled_time, notes } = req.body;

    if (!user_id || !property_id || !scheduled_time) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const appointment = await Appointment.create({
      user_id,
      property_id,
      scheduled_time,
      notes,
    });

    res.status(201).json({ message: "Appointment created", data: appointment });
  } catch (error) {
    console.error("createAppointment error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all appointments (admin/agent)
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [User, Property],
    });
    res.status(200).json(appointments);
  } catch (error) {
    console.error("getAllAppointments error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get appointments for a specific user
const getUserAppointments = async (req, res) => {
  const { user_id } = req.params;

  try {
    const appointments = await Appointment.findAll({
      where: { user_id },
      include: [Property],
    });

    res.status(200).json(appointments);
  } catch (error) {
    console.error("getUserAppointments error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Update appointment status
const updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) return res.status(404).json({ message: "Not found" });

    appointment.status = status;
    await appointment.save();

    res.status(200).json({ message: "Status updated", data: appointment });
  } catch (error) {
    console.error("updateAppointmentStatus error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete an appointment
const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const rows = await Appointment.destroy({ where: { id } });

    if (rows === 0) return res.status(404).json({ message: "Not found" });

    res.status(200).json({ message: "Appointment deleted" });
  } catch (error) {
    console.error("deleteAppointment error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getUserAppointments,
  updateAppointmentStatus,
  deleteAppointment,
};
