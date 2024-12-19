import React, { useEffect, useState } from 'react';

const FlightList = () => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await fetch('https://api.qairline.com/flights');
                if (!response.ok) {
                    throw new Error('Failed to fetch flights.');
                }
                const data = await response.json();
                setFlights(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchFlights();
    }, []);

    const containerStyle = {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    };

    const thStyle = {
        padding: '10px',
        textAlign: 'left',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: '1px solid #ddd',
    };

    const tdStyle = {
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'left',
    };

    return (
        <div style={containerStyle}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Flight List</h1>
            {loading && <p>Loading flights...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Flight Number</th>
                            <th style={thStyle}>From</th>
                            <th style={thStyle}>To</th>
                            <th style={thStyle}>Departure</th>
                            <th style={thStyle}>Arrival</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flights.map((flight) => (
                            <tr key={flight._id}>
                                <td style={tdStyle}>{flight.number}</td>
                                <td style={tdStyle}>{flight.airportFrom.name}</td>
                                <td style={tdStyle}>{flight.airportTo.name}</td>
                                <td style={tdStyle}>{new Date(flight.departureTime).toLocaleString()}</td>
                                <td style={tdStyle}>{new Date(flight.arrivalTime).toLocaleString()}</td>
                                <td style={tdStyle}>
                                    {/* Thêm nút View Details ở đây */}
                                    <button
                                        onClick={() => window.location.href = `/flight/${flight._id}`}
                                        style={{
                                            padding: '5px 10px',
                                            backgroundColor: '#2196F3',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            )}
        </div>
    );
};

export default FlightList;
