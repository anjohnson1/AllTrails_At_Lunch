import React from "react";
import usePlacesAutocomplete, { getDetails } from "use-places-autocomplete"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import Logo from "../images/alltrails-at-lunch.png";

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bShowFilters: false,
            bHightoLow: true,
            bLowtoHigh: false,
            searchValue: null
        }

        this.places = [];
    }

    getFilterPopup = () => {
        const { bHightoLow, bLowtoHigh } = this.state;
        
        if (this.state.bShowFilters) {
            return (
                <div id="filterPopup">
                    <div className="content">
                        <div>
                            <FontAwesomeIcon
                                className={`circle ${bHightoLow ? "active" : "inactive"}`}
                                icon={bHightoLow ? faCheckCircle : faCircle} 
                                onClick={() => this.onFilterRadioClick("highToLow")}
                            />
                            Ratings High to Low   
                        </div>
                        <div>
                            <FontAwesomeIcon
                                className={`circle ${bLowtoHigh ? "active" : "inactive"}`}
                                icon={bLowtoHigh ? faCheckCircle : faCircle}
                                onClick={() => this.onFilterRadioClick("lowToHigh")}
                            />
                            Ratings Low to High
                        </div>
                        <div className="popupSelection" onClick={this.onFilterClick}>
                            Apply
                        </div>
                    </div>
                </div>
            );
        } else {
            return;
        }
    };

    onFilterClick = () => {
        this.setState(prevState => ({
            bShowFilters: !prevState.bShowFilters
        }));
    };

    onFilterRadioClick = (value) => {
        this.setState({
            bHightoLow: value === "highToLow",
            bLowtoHigh: value === "lowToHigh"
        });
    };

    getSeachResultsData = (status, data) => {
        if (status === "OK") {
            for (let i = 0; i < data.length; i++) {
                const id = data[i].place_id;

                if (!(id in this.places)) {
                    getDetails({placeId: id, fields: ["name", "rating", "price_level", "photos", "user_ratings_total", "geometry"]})
                    .then((details) => {
                        this.places[id] = details;
                    })
                    .catch((error) => {
                        console.log("Error: ", error);
                    });
                }
            }
        } else {
            this.places = [];
            return;
        }

        this.props.setRestaurantData(this.places);
    };

    render() {
        const { bShowFilters } = this.state;

        return (
            <div className="headerContainer">
                <div id="logo">
                    <img src={Logo} alt="AllTrails At Lunch" />
                </div>
                <div id="searchContainer">
                    <input 
                        id="filter"
                        className={bShowFilters ? "active" : "inactive"}
                        onClick={this.onFilterClick}
                        type="button"
                        value={bShowFilters ? "Sort" : "Filter"} 
                    />
                    <Search updateData={this.getSeachResultsData}/>
                </div>
                {this.getFilterPopup()}
            </div>
        );
    }
}

export default Header;

function Search({updateData}) {
    const {
        ready,
        value,
        suggestions: {status, data},
        setValue
    } = usePlacesAutocomplete({
        requestionOptions: {
            radius: 200 * 1000,
            types: ['bar', 'restaurant', 'food']
        },
    });

    const onChangeSearch = e => {
        if (data.length < 0) {
            data.empty();
        }

        setValue(e.target.value);
        updateData(status, data);
    }

    return (
        <div className="searchBarContainer">
            <input
                className="searchBar"
                placeholder="Search for a restaurant"
                type="search"
                onChange={(e) => onChangeSearch(e) }
                value={value}
                disabled={!ready}
            />
            <div id="searchIcon"><FontAwesomeIcon icon={faSearch} /></div>
        </div>
    );
}
