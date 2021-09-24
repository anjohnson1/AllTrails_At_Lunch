import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import ScrollContainer from 'react-indiana-drag-scroll';
import DummyImage from "../images/martis-trail.jpg";

class restaurantList extends React.Component {
    getrestaurantItems = () => {
        const { restaurantData } = this.props;
        const restaurantIds = Object.keys(restaurantData);

        if (restaurantIds.length > 0) {
            return restaurantIds.map(restaurant => (
                <div className="restaurantItemContainer" key={restaurant}>
                    <div className="item">
                        <div className="content">
                            <div className="restaurantImage" style={{backgroundImage: `url(${DummyImage})`}} />
                            <div className="restaurantInfo">
                                <div className="name">{restaurantData[restaurant].name}</div>
                                <div className="rating">
                                    {this.formatRating(restaurantData[restaurant])}
                                    <span>({restaurantData[restaurant].user_ratings_total || 0})</span>
                                </div>
                                <div className="priceSupport">{this.formatPrice(restaurantData[restaurant]) || "N/A"} &middot; Supporting Text</div>
                                <span className="favorite"><FontAwesomeIcon className="active" icon={faHeart}/></span>
                            </div>
                        </div>
                    </div>
                </div>
            ));
        } else {
            return(
                <div>
                    Restaurants Appear Here
                </div>
            );
        }
    };

    formatPrice = data => {
        const priceLevel = data.price_level;
        let price = "N/A";

        for (let i = 0; i < priceLevel; i++) {
            price += "$";
        }

        return price;
    };

    formatRating = data => {
        const rating = Math.round(data.rating);
        const stars = [];

        for (let i = 0; i < 5; i++) {
            stars.push(
                <FontAwesomeIcon className={`star ${i + 1 <= rating ? "active" : ""}`} icon={faStar} key={i}/>
            );
        }

        return stars;
    };

    render() {
        return (
            <ScrollContainer className="listContainer">
                {this.getrestaurantItems()}
            </ScrollContainer>
        );
    }
}

export default restaurantList;
