import React from "react";
import Header from "./header.jsx";
import RestaurantList from "./restaurantList.jsx";
import MapView from "./mapView.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

class LunchContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            bShowMapView: true,
            bShowRestaurantList: true,
            bToggleActive: false,
            restaurantData: []
        }
    }

    componentDidMount() {
        this.onScreenResize();
        window.addEventListener("resize", this.onScreenResize);
    }

    onClickViewToggle = () => {
        if (this.state.bToggleActive) {
            this.setState(prevState => ({
                bShowRestaurantList: !prevState.bShowRestaurantList,
                bShowMapView: !prevState.bShowMapView
            }));
        }
    };

    onScreenResize = () => {
        const width = window.innerWidth;

        if (width > 600) {
            // both views visible
            this.setState({
                bShowRestaurantList: true,
                bShowMapView: true,
                bToggleActive: false
            });
        } else {
            // Initiate Toggle if not already active
            if (!this.state.bToggleActive) {
                this.setState({
                    bShowRestaurantList: true,
                    bShowMapView: false,
                    bToggleActive: true
                });
            }
        }
    };

    setRestaurantData = (data) => {
        this.setState({restaurantData: data});
    }

    render() {
        const { bShowMapView, bShowRestaurantList, restaurantData } = this.state;

        return (
            <div className="AllTrailsLunch">
                <div className="mainContainer">
                    <Header setRestaurantData={this.setRestaurantData}/>
                    <div className="contentContainer">
                        {bShowRestaurantList ? <RestaurantList restaurantData={restaurantData} /> : null}
                        {bShowMapView ? <MapView isMarkerShown restaurantData={restaurantData} /> : null}
                        <div
                            className="mobileViewToggle"
                            onClick={this.onClickViewToggle}
                        >
                            <span><FontAwesomeIcon icon={bShowRestaurantList ? faMapMarkerAlt : faList} /></span>{bShowRestaurantList ? "Map" : "List"}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LunchContainer;
