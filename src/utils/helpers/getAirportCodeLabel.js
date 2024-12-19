import {AIRPORT} from "@/constants/airport.js";

export const getAirportCodeLabel = (value) => {
    const status = AIRPORT.find((item) => item._id === value)
    return status ? status.code : value
}