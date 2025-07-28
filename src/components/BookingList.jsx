import React from "react";

const BookingList = ({ bookings, onEdit, onDelete }) => {
    if (bookings.length === 0) {
        return <p className="text-muted text-center">No bookings found.</p>;
    }

    return (
        <div className="container mt-4 p-4 border rounded bg-light shadow">
            <h5 className="mb-3">Booking Results</h5>
            <ul className="list-group">
                {bookings.map((booking) => (
                    <li key={booking.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{booking.name}</strong> booked a <strong>{booking.vehicle}</strong><br />
                            From: {(booking.pickup).slice(0, 10)} at {booking.pickup_time} → To: {(booking.return_date).slice(0, 10)} at {booking.return_time}
                            <p>
                                Pickup: {(booking.pickup).slice(0, 10)} at {booking.pickup_time}<br />
                                Return: {(booking.return_date).slice(0, 10)} at {booking.return_time}
                            </p>

                        </div>
                        <div>
                            <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(booking)}>Edit</button>
                            <button className="btn btn-sm btn-danger" onClick={() => onDelete(booking.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookingList;
