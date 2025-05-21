const express = require("express");
const {
  createAppointment,
  getAllAppointments,
  getUserAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} = require("../controllers/AppointmentController");

const router = express.Router();

router.post("/", createAppointment);
router.get("/", getAllAppointments);
router.get("/user/:user_id", getUserAppointments);
router.put("/:id", updateAppointmentStatus);
router.delete("/:id", deleteAppointment);

module.exports = router;
