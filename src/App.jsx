import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import BookingForm from "./components/BookingForm";
import BookingList from "./components/BookingList";
import "./App.css"; // For background transition etc.

// ----------------------- API URL -----------------------
const API_URL =
  "https://5cac1918-6db3-4c60-9e36-8bcf0f2f0657-00-1oc3xwn082vty.pike.replit.dev/bookings";

const App = () => {
  const [bookings, setBookings] = useState([]);
  const [editBooking, setEditBooking] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [hasEntered, setHasEntered] = useState(false); // ✅ NEW: Welcome Page toggle
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    if (storedLogin !== null) {
      setIsLoggedIn(JSON.parse(storedLogin));
    } else {
      localStorage.setItem("isLoggedIn", "true");
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && hasEntered) {
      fetchBookings();
    }
  }, [isLoggedIn, hasEntered]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(API_URL);
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  const handleLoginToggle = () => {
    const nextLogin = !isLoggedIn;
    setIsLoggedIn(nextLogin);
    localStorage.setItem("isLoggedIn", JSON.stringify(nextLogin));
    setEditBooking(null);
    setShowResults(false);
    setHasEntered(false); // go back to welcome after login toggle
  };

  const handleCreate = async (booking) => {
    try {
      await axios.post(API_URL, booking);
      fetchBookings();
    } catch (err) {
      console.error("Create failed:", err);
    }
  };

  const handleUpdate = async (id, updatedBooking) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedBooking);
      fetchBookings();
      setEditBooking(null);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchBookings();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // ----------------------- Render -----------------------
  return (
    <div className={`app-wrapper ${isLoggedIn ? "logged-in" : ""}`}>
      <Navbar isLoggedIn={isLoggedIn} onLoginToggle={handleLoginToggle} />

      <div className="container mt-5 pt-4">
        {isLoggedIn ? (
          hasEntered ? (
            <div className="fade-in-section">
              <BookingForm
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                editBooking={editBooking}
                showResults={() => setShowResults(true)}
              />
              {showResults && (
                <BookingList
                  bookings={bookings}
                  onEdit={setEditBooking}
                  onDelete={handleDelete}
                />
              )}
            </div>
          ) : (
            <div className="text-center fade-in-section">
              <h2 className="mb-4">🚗 Welcome to WheelGo</h2>
              <p className="mb-3">Your reliable vehicle booking assistant.</p>
              <button
                className="btn btn-primary px-5 py-2 fw-bold"
                onClick={() => setHasEntered(true)}
              >
                Login
              </button>
            </div>
          )
        ) : (
          <p className="text-center mt-5">
            Please login to manage vehicle bookings.
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
