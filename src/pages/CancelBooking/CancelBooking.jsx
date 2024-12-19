import React, { useState } from 'react';

const CancelBooking = () => {
    const [bookingId, setBookingId] = useState('');
    const [message, setMessage] = useState(null);

    const handleCancel = async (e) => {
        e.preventDefault();

        if (bookingId.trim() === '') {
            setMessage({ type: 'error', text: 'Please enter a valid Booking ID.' });
            return;
        }

        try {
            const response = await fetch(`https://api.qairline.com/bookings/${bookingId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setMessage({ type: 'success', text: 'Your booking has been successfully canceled.' });
                setBookingId('');
            } else {
                const errorData = await response.json();
                setMessage({ type: 'error', text: errorData.message || 'Failed to cancel booking.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred. Please try again later.' });
        }
    };

    const containerStyle = {
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    };

    const formGroupStyle = {
        marginBottom: '10px',
        display: 'flex',
        flexDirection: 'column',
    };

    const labelStyle = {
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#555',
    };

    const inputStyle = {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
    };

    const buttonStyle = {
        padding: '10px 20px',
        color: '#fff',
        backgroundColor: '#f44336',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    };

    const messageStyle = (type) => ({
        marginTop: '20px',
        textAlign: 'center',
        padding: '10px',
        borderRadius: '4px',
        color: type === 'success' ? '#2e7d32' : '#d32f2f',
        backgroundColor: type === 'success' ? '#c8e6c9' : '#ffcdd2',
        border: `1px solid ${type === 'success' ? '#2e7d32' : '#d32f2f'}`,
    });

    return (
        <div style={containerStyle}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Cancel Booking</h1>
            <form onSubmit={handleCancel}>
                <div style={formGroupStyle}>
                    <label htmlFor="bookingId" style={labelStyle}>Booking ID:</label>
                    <input
                        type="text"
                        id="bookingId"
                        value={bookingId}
                        onChange={(e) => setBookingId(e.target.value)}
                        placeholder="Enter your Booking ID"
                        required
                        style={inputStyle}
                    />
                </div>
                <button type="submit" style={buttonStyle}>Cancel Booking</button>
            </form>

            {message && (
                <div style={messageStyle(message.type)}>
                    {message.text}
                </div>
            )}
        </div>
    );
};

export default CancelBooking;
