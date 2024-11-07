import {DirectionsRenderer, DirectionsService, GoogleMap, useJsApiLoader} from '@react-google-maps/api'
import {useCallback, useMemo, useState} from 'react'
import GoogleMapsDirections from "@/Maps/GoogleMapsDirections.jsx";


export default function Directions({geoLocation, packets}){
    return (
        <GoogleMapsDirections geoLocation={geoLocation} packets={packets}/>
    )
}