import React, { useEffect, useState } from 'react';

const BookingList = ({ userId }) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch(`/api/bookings?userId=${userId}`);
                const data = await response.json();
                setBookings(data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Your Bookings</h1>
            {bookings.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Booking ID</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Flight Number</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>From</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>To</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Departure Time</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Arrival Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{booking._id}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{booking.flight.number}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{booking.flight.airportFrom.name}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{booking.flight.airportTo.name}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {new Date(booking.flight.departureTime).toLocaleString()}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {new Date(booking.flight.arrivalTime).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No bookings found.</div>
            )}
        </div>
    );
};

export default BookingList;
