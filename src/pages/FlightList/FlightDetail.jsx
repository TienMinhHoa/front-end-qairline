import React, { useEffect, useState } from 'react';

const FlightDetail = ({ flightId }) => {
    const [flight, setFlight] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFlight = async () => {
            try {
                const response = await fetch(`https://api.qairline.com/flights/${flightId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch flight details.');
                }
                const data = await response.json();
                setFlight(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchFlight();
    }, [flightId]);

    const containerStyle = {
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    };

    const detailStyle = {
        marginBottom: '10px',
        fontSize: '16px',
    };

    return (
        <div style={containerStyle}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Flight Detail</h1>
            {loading && <p>Loading flight details...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {flight && (
                <div>
                    <p style={detailStyle}>
                        <strong>Flight Number:</strong> {flight.number}
                    </p>
                    <p style={detailStyle}>
                        <strong>From:</strong> {flight.airportFrom.name}
                    </p>
                    <p style={detailStyle}>
                        <strong>To:</strong> {flight.airportTo.name}
                    </p>
                    <p style={detailStyle}>
                        <strong>Departure:</strong> {new Date(flight.departureTime).toLocaleString()}
                    </p>
                    <p style={detailStyle}>
                        <strong>Arrival:</strong> {new Date(flight.arrivalTime).toLocaleString()}
                    </p>
                    <p style={detailStyle}>
                        <strong>Status:</strong> {flight.status}
                    </p>
                    <p style={detailStyle}>
                        <strong>Price:</strong> ${flight.price.toFixed(2)}
                    </p>
                </div>
            )}
        </div>
    );
};

export default FlightDetail;
