import React, { useState, useEffect } from 'react';

const FlightSearch = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [flights, setFlights] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();

        // Gửi yêu cầu tìm kiếm đến API
        try {
            const response = await fetch(
                `/api/flights?from=${from}&to=${to}&departureDate=${departureDate}`
            );
            const data = await response.json();
            setFlights(data); // Cập nhật danh sách chuyến bay
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Search Flights</h1>

            {/* Form tìm kiếm */}
            <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="from">From: </label>
                    <input
                        type="text"
                        id="from"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        placeholder="Departure city"
                        required
                        style={{ marginLeft: '10px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="to">To: </label>
                    <input
                        type="text"
                        id="to"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        placeholder="Destination city"
                        required
                        style={{ marginLeft: '10px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="departureDate">Departure Date: </label>
                    <input
                        type="date"
                        id="departureDate"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        required
                        style={{ marginLeft: '10px' }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                    }}
                >
                    Search
                </button>
            </form>

            {/* Kết quả tìm kiếm */}
            <h2>Search Results</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Flight Number</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>From</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>To</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Departure Time</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Arrival Time</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {flights.length > 0 ? (
                        flights.map((flight) => (
                            <tr key={flight._id}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{flight.number}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{flight.airportFrom.name}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{flight.airportTo.name}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {new Date(flight.departureTime).toLocaleString()}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {new Date(flight.arrivalTime).toLocaleString()}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
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
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center', padding: '8px' }}>
                                No flights found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default FlightSearch;
