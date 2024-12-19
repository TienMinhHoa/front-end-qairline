import {FlightItem} from "@/components/flight/FlightItem.jsx";
import {Container, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getListFlights} from "@/services/flight.js";
import {getAirportCodeLabel} from "@/utils/helpers/getAirportCodeLabel.js";
import {convertDateTime} from "@/utils/helpers/convertDateTime.js";

const ListFlight = () => {
    const query = useSelector((state) => state.query.query)
    console.log(query)
    const [flights, setFlights] = useState([])

    const fetchFlightData = async (paginationModel) => {
        try {
            const response = await getListFlights(paginationModel)
            setFlights(
                response.data.map((res) => ({
                    ...res,
                    id: res._id,
                }))
            )
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchFlightData({ page: 1, perPage: 20, ...query, status: 'scheduled' })
    }, [])
    return (
        <Container sx={{marginTop: 5}}>
            <Typography variant="h4">Danh sách chuyến bay</Typography>
            {flights.map((flight) => (
                <FlightItem
                    key={flight.id}
                    flightNumber={flight.number}
                    departureTime={convertDateTime(flight.departureTime)}
                    arrivalTime={convertDateTime(flight.arrivalTime)}
                    airportFrom={getAirportCodeLabel(flight.airportFrom)}
                    airportTo={getAirportCodeLabel(flight.airportTo)}
                    price={flight.price}
                />
            ))}
        </Container>
    )
}

export default ListFlight