import {useState} from 'react';

const BookingFlight = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [passengerCount, setPassengerCount] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            from,
            to,
            departureDate,
            returnDate,
            passengerCount,
        });
    };

    return (
        <div style={{padding: '20px'}}>
            <h1>Flight Booking</h1>
            <form onSubmit={handleSubmit}>
                <div style={{marginBottom: '10px'}}>
                    <label htmlFor="from">From: </label>
                    <input
                        type="text"
                        id="from"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        placeholder="Departure city"
                        required
                        style={{marginLeft: '10px'}}
                    />
                </div>

                <div style={{marginBottom: '10px'}}>
                    <label htmlFor="to">To: </label>
                    <input
                        type="text"
                        id="to"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        placeholder="Destination city"
                        required
                        style={{marginLeft: '10px'}}
                    />
                </div>

                <div style={{marginBottom: '10px'}}>
                    <label htmlFor="departureDate">Departure Date: </label>
                    <input
                        type="date"
                        id="departureDate"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        required
                        style={{marginLeft: '10px'}}
                    />
                </div>

                <div style={{marginBottom: '10px'}}>
                    <label htmlFor="returnDate">Return Date: </label>
                    <input
                        type="date"
                        id="returnDate"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        style={{marginLeft: '10px'}}
                    />
                </div>

                <div style={{marginBottom: '10px'}}>
                    <label htmlFor="passengerCount">Passenger Count: </label>
                    <input
                        type="number"
                        id="passengerCount"
                        value={passengerCount}
                        onChange={(e) => setPassengerCount(e.target.value)}
                        min="1"
                        required
                        style={{marginLeft: '10px', width: '50px'}}
                    />
                </div>

                <button type="submit" style={{padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white'}}>
                    Book Flight
                </button>
            </form>
        </div>
    );
};

export default BookingFlight;
