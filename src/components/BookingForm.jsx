import React, { useState, useEffect } from "react";

const BookingForm = ({ onCreate, onUpdate, editBooking, showResults }) => {
    // ----------------------- State Initialization -----------------------
    const initialFormState = {
        name: "",
        vehicle: "",
        pickup: "",
        return_date: "",
        pickup_time: "",
        return_time: "",
        age: "26+",
        country: "United Kingdom",
        vehicleType: "car",
    };

    const [form, setForm] = useState(initialFormState);

    // ----------------------- Effect for Edit Mode -----------------------
    useEffect(() => {
        if (editBooking) {
            setForm(editBooking);
        } else {
            setForm(initialFormState);
        }
    }, [editBooking]);

    // ----------------------- Handle Input Change -----------------------
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // ----------------------- Handle Vehicle Type Button -----------------------
    const handleVehicleType = (type) => {
        setForm({ ...form, vehicleType: type });
    };

    // ----------------------- Handle Form Submission -----------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editBooking) {
            await onUpdate(editBooking.id, form);
        } else {
            await onCreate(form);
        }

        showResults?.(); // Optional callback
        setForm(initialFormState); // Reset form
    };

    // ----------------------- Vehicle Type Buttons -----------------------
    const renderVehicleTypeButtons = () => (
        <div className="btn-group mb-4">
            <button
                type="button"
                className={`btn ${form.vehicleType === "car" ? "btn-success" : "btn-outline-secondary"}`}
                onClick={() => handleVehicleType("car")}
            >
                🚗 Cars
            </button>
            <button
                type="button"
                className={`btn ${form.vehicleType === "van" ? "btn-success" : "btn-outline-secondary"}`}
                onClick={() => handleVehicleType("van")}
            >
                🚐 Vans & Trucks
            </button>
        </div>
    );

    // ----------------------- Age Options -----------------------
    const renderAgeOptions = () => {
        return (
            <>
                {Array.from({ length: 9 }, (_, i) => {
                    const age = 18 + i;
                    return <option key={age} value={age}>{age}</option>;
                })}
                <option value="26+">26+</option>
            </>
        );
    };

    // ----------------------- Country Options -----------------------
    const renderCountryOptions = () => {
        const countries = [
            "United States", "United Kingdom", "Canada", "Australia",
            "Germany", "France", "India", "Malaysia", "Singapore",
            "Japan", "China", "Brazil", "South Africa", "New Zealand"
        ];
        return countries.map((c) => <option key={c} value={c}>{c}</option>);
    };

    // ----------------------- JSX Render -----------------------
    return (
        <form onSubmit={handleSubmit}>
            <div className="container-lg my-5 d-flex justify-content-center">
                <div className="border rounded-4 p-5 bg-white shadow-lg w-100" style={{ maxWidth: "1100px" }}>
                    <h5 className="mb-4">{editBooking ? "Update Booking" : "Create a Booking"}</h5>

                    {renderVehicleTypeButtons()}

                    <div className="row mb-4">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Name</label>
                            <input name="name" type="text" className="form-control" value={form.name} onChange={handleChange} required />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Vehicle</label>
                            <input name="vehicle" type="text" className="form-control" value={form.vehicle} onChange={handleChange} required />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Pickup Date</label>
                            <input name="pickup" type="date" className="form-control" value={form.pickup} onChange={handleChange} required />
                            <input name="pickup_time" type="time" className="form-control mt-2" value={form.pickup_time} onChange={handleChange} required />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Return Date</label>
                            <input name="return_date" type="date" className="form-control" value={form.return_date} onChange={handleChange} required />
                            <input name="return_time" type="time" className="form-control mt-2" value={form.return_time} onChange={handleChange} required />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label className="form-label">Age</label>
                            <select name="age" className="form-select" value={form.age} onChange={handleChange}>
                                {renderAgeOptions()}
                            </select>
                        </div>

                        <div className="col-md-4 mb-3">
                            <label className="form-label">Country</label>
                            <select name="country" className="form-select" value={form.country} onChange={handleChange}>
                                {renderCountryOptions()}
                            </select>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end mt-4">
                        <button type="submit" className="btn btn-warning px-5 py-2 fw-bold">
                            {editBooking ? "Update" : "Add"}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default BookingForm;
