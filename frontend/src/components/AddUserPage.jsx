import React, { useState, useRef } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import { ToastContainer, toast } from "react-toastify"; // Import react-toastify components
import "react-toastify/dist/ReactToastify.css"; // Import react-toastify styles

import Header from "./Header";
import "ui-neumorphism/dist/index.css";
import { Card, TextField } from "ui-neumorphism";

function AddUser() {
  const [name, setName] = useState("");
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [semester, setSemester] = useState("");
  const webcamRef = useRef(null);

  const capture = async () => {
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      const formData = new FormData();
      formData.append("image", imageSrc);
      formData.append("name", name);
      formData.append("enrollment_number", enrollmentNumber);
      formData.append("semester", semester);

      const response = await axios.post(
        "http://localhost:5000/add-user",
        formData
      );

      if (response.data.success) {
        toast.success("User added successfully!"); // Show success toast
        setName(""); // Clear name field
        setEnrollmentNumber(""); // Clear enrollment field
        setSemester(""); // Clear semester field
      } else {
        toast.error(response.data.error || "Error adding user!"); // Show error toast
      }
    } catch (error) {
      toast.error("An error occurred. Please try again."); // Show error toast
    }
  };

  return (
    <div className="flex flex-col  h-fit w-auto ">
      <Header />
      <div className="flex p-5 justify-center  ">
        <Card className="flex flex-row-reverse gap-15 justify-center rounded-md  bg-blue-200">
          <Card className="flex flex-col gap-1 font-extrabold p-10">
            <label htmlFor="name">Name :</label>
            <TextField
              id="name"
              type="text"
              className="p-1 rounded-md"
              placeholder="..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="enroll">Enrollment Number :</label>
            <TextField
              id="enroll"
              className="p-1 rounded-md"
              type="text"
              placeholder="..."
              value={enrollmentNumber}
              onChange={(e) => setEnrollmentNumber(e.target.value)}
              required
            />
            <label htmlFor="semester">Semester :</label>
            <TextField
              id="semester"
              className="p-1 rounded-md"
              type="text"
              placeholder="..."
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              required
            />
            <div className="mt-16">
              <button
                onClick={capture}
                className="bg-green-900 rounded-lg p-5 text-white"
              >
                Capture & Add User
              </button>
            </div>
          </Card>
          <div className="flex justify-center align-middle  ">
            <div className="h-auto  justify-center align-middle py-10 px-4">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="h- rounded-lg p-1"
                width="600px"
              />
            </div>
          </div>
        </Card>
      </div>
      <ToastContainer />{" "}
      {/* Add the ToastContainer to render toast notifications */}
    </div>
  );
}

export default AddUser;
