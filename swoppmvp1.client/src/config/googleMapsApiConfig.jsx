import { WrapperProps } from '@googlemaps/react-wrapper'


export const googleMapsApiConfig = () => {
    return WrapperProps({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['routes', 'marker']
    })
}