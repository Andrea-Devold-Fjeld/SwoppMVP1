
export const geoLocationHook = async (key, adress, adressNr, postNr) => {
    try {
        console.log("adress", adress);
        adress.replaceAll(" ", "+");
        const country = "NO";
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${postNr}+${adress}+${country}&key=${key}`);
        return await response.json();
    } catch (e) {
        console.log(e);
    }
}

export const bothGeoLocationHook = async (api_key, originAdress, originAdressNr, originPostNr, destinationAdress, destinationAdressNr, destinationPostNr) => {
    try {
        const response = [];
        response.push(await geoLocationHook(api_key, originAdress, originAdressNr, originPostNr));
        response.push(await geoLocationHook(api_key, destinationAdress, destinationAdressNr, destinationPostNr));
        return response;
    } catch (e) {
        console.log(e)
    }
}