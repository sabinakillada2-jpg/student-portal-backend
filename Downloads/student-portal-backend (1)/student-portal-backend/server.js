const express = require("express");
const connectDB = require("./config/db");
const Student = require("./models/student");

const app = express();

app.use(express.json());

connectDB();

// Home Route
app.get("/", (req, res) => {
  res.send("Student Portal Backend API");
});

// Register Student
app.post("/register", async (req, res) => {
  try {
    const student = new Student(req.body);

    await student.save();

    res.send("Student Registered Successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get All Students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();

    res.json(students);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get Student By ID
app.get("/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    res.json(student);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update Student
app.put("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(student);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete Student
app.delete("/students/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);

    res.send("Student Deleted Successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start Server
app.listen(5001, () => {
  console.log("Server Running on Port 5001");
});