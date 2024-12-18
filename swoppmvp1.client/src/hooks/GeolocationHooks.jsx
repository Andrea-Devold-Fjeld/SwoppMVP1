﻿
export const geoLocationHook = async (adress, adressNr, postNr) => {
    try {
        console.log("adress", adress);
        adress.replaceAll(" ", "+");
        const addresse = adress + "+" + adressNr;
        const country = "NO";
        const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${postNr}+${addresse}+${country}&key=${key}`);
        return await response.json();
    } catch (e) {
        console.log(e);
    }
}

export const bothGeoLocationHook = async (originAdress, originAdressNr, originPostNr, destinationAdress, destinationAdressNr, destinationPostNr) => {
    try {
        const response = [];
        response.push(await geoLocationHook(originAdress, originAdressNr, originPostNr));
        response.push(await geoLocationHook(destinationAdress, destinationAdressNr, destinationPostNr));
        return response;
    } catch (e) {
        console.log(e)
    }
}