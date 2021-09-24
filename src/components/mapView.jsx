import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { getGeocode, getLatLng } from "use-places-autocomplete"; 


const mapContainerStyle = {
    width: "100%",
    height: "100%"
}

const center = {
    lat: 37.774929,
    lng: -122.419418
}

const options = {
    disableDefaultUI: true
}

class MapView extends React.Component {
    getGeoInfo = () => {
        const { restaurantData } = this.props;
        const markers = [];

        for (var key in restaurantData) {
            getGeocode({placeId: key})
            .then((results) => getLatLng(results[0]))
            .then((latLng) => {
                const { lat, lng } = latLng;
                markers.push({lat: lat, lng: lng});
                markers.push(
                    <Marker position={{ lat: lat, lng: lng }} />
                );
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
        }

        return markers;
    };

    render() {
        return (
            <div className="mapContainer">
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={12}
                    center={center}
                    options={options}
                >
                    {this.props.isMarkerShown && this.getGeoInfo()} />}
                </GoogleMap>
            </div>
        );
    }
}

export default MapView;