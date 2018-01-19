import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Map, { Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import styles from './googlemaps.css';
import axios from 'axios';

class Contents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            place: null,
            position: null,
            hotelData: [],
            airportData: [],
            restaurantsData: [],
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            departureDate: '',
            returningDate: '',
            hotelMarker: [{
                lat: null,
                lng: null
            }],
            pinDetails: {
                name: null,
                address: null,
                hours: {
                    monday: null,
                    tuesday: null,
                    wednesday: null,
                    thursday: null,
                    friday: null,
                    saturday: null,
                    sunday: null
                },
                internationalPhone: null,
                openNow: null,
                reviews: {
                    one: {
                        authorName: null,
                        rating: null,
                        posted: null,
                        text: null
                    },
                    two: {
                        authorName: null,
                        rating: null,
                        posted: null,
                        text: null
                    },
                    three: {
                        authorName: null,
                        rating: null,
                        posted: null,
                        text: null
                    },
                    four: {
                        authorName: null,
                        rating: null,
                        posted: null,
                        text: null
                    },
                    five: {
                        authorName: null,
                        rating: null,
                        posted: null,
                        text: null
                    },
                    website: null
                }
            },
            slide: false,
            displayOpacity: false
        }
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
        this.slide = this.slide.bind(this)
    }

    onSubmit(e) {
        e.preventDefault();
    }

    componentDidMount() {
        this.renderAutoComplete();
    }

    componentDidUpdate(prevProps) {
        const { map } = this.props;
        if (map !== prevProps.map) {
            this.renderAutoComplete();
        }
    }

    renderAutoComplete() {
        const { google, map } = this.props;

        if (!google || !map) return;

        const aref = this.refs.autocomplete;
        const node = ReactDOM.findDOMNode(aref);
        var autocomplete = new google.maps.places.Autocomplete(node);
        autocomplete.bindTo('bounds', map);

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }

            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }

            this.setState({
                place: place,
                position: place.geometry.location
            })
        })
    }
    search() {
        this.setState({
            displayOpacity: true
        })
        var coordin = {
            Lat: this.state.position.lat(),
            Lng: this.state.position.lng()
        }
        console.log(typeof coordin.lat)
        console.log(coordin)

        axios.post('http://localhost:4000/hotels', coordin).then(res => {
            this.setState({
                hotelData: res.data
            })
            console.log(res.data)
        })
        axios.post('http://localhost:4000/airports', coordin).then(res => {
            this.setState({
                airportData: res.data
            })
            console.log(res.data)
        })
        axios.post('http://localhost:4000/restaurants', coordin).then(res => {
            this.setState({
                restaurantsData: res.data
            })
            console.log(res.data)
        })

    }
    onMarkerClick(props, marker, e) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    }
    onMapClicked(props) {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }
    showDetails(i) {
        var place_id = {
            place_id: this.state.hotelData[i].place_id
        }
        axios.post('http://localhost:4000/hotel-detail', place_id).then(res => {
            console.log(res.data)
            this.setState({
                slide: true,
                pinDetails: {
                    name: res.data.result.name,
                    address: res.data.result.formatted_address,
                    hours: {
                        monday: res.data.result.opening_hours.weekday_text[0],
                        tuesday: res.data.result.opening_hours.weekday_text[1],
                        wednesday: res.data.result.opening_hours.weekday_text[2],
                        thursday: res.data.result.opening_hours.weekday_text[3],
                        friday: res.data.result.opening_hours.weekday_text[4],
                        saturday: res.data.result.opening_hours.weekday_text[5],
                        sunday: res.data.result.opening_hours.weekday_text[6]
                    },
                    internationalPhone: res.data.result.international_phone_number,
                    openNow: res.data.result.opening_hours.open_now,
                    reviews: {
                        one: {
                            authorName: res.data.result.reviews[0].author_name,
                            rating: res.data.result.reviews[0].rating,
                            posted: res.data.result.reviews[0].relative_time_description,
                            text: res.data.result.reviews[0].text
                        },
                        two: {
                            authorName: res.data.result.reviews[1].author_name,
                            rating: res.data.result.reviews[1].rating,
                            posted: res.data.result.reviews[1].relative_time_description,
                            text: res.data.result.reviews[1].text
                        },
                        three: {
                            authorName: res.data.result.reviews[2].author_name,
                            rating: res.data.result.reviews[2].rating,
                            posted: res.data.result.reviews[2].relative_time_description,
                            text: res.data.result.reviews[2].text
                        },
                        four: {
                            authorName: res.data.result.reviews[3].author_name,
                            rating: res.data.result.reviews[3].rating,
                            posted: res.data.result.reviews[3].relative_time_description,
                            text: res.data.result.reviews[3].text
                        },
                        five: {
                            authorName: res.data.result.reviews[4].author_name,
                            rating: res.data.result.reviews[4].rating,
                            posted: res.data.result.reviews[4].relative_time_description,
                            text: res.data.result.reviews[4].text
                        },
                        website: res.data.result.website
                    }
                }
            })
        })
        
        
    }
    slide() {
        this.setState({
            slide: false
        })
    }
    render() {
        const props = this.props;
        const { position } = this.state;
        let position_marker_hotel = this.state.hotelData.map((e, i) =>
            <Marker key={i}
                name={e.name}
                rating={e.rating}
                /* onClick={this.onMarkerClick}  */
                onClick={()=> this.showDetails(i)}
                position={{ lat: e.geometry.location.lat, lng: e.geometry.location.lng }}
                icon={'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjIiIGJhc2VQcm9maWxlPSJ0aW55IiB4bWxucz0iaHR0cDovL3d3dy53%0D%0AMy5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUw%0D%0AIiBvdmVyZmxvdz0iaW5oZXJpdCI+PHBhdGggZD0iTTQ2IDMydjhoNHYtMTJoLTQ2di0xNi4zNGMw%0D%0ALTEuMTIzLS44NjktMi4wNDItMi0yLjA0Mi0xLjEyNyAwLTIgLjkxOC0yIDIuMDQydjI4LjM0aDR2%0D%0ALThoNDJ6bS0zNS42Ny0xMi4xNDhjMi4wNDEgMCAzLjY4Ny0xLjY1MyAzLjY4Ny0zLjY5NCAwLTIu%0D%0AMDI3LTEuNjQ2LTMuNjc1LTMuNjg3LTMuNjc1LTIuMDM4IDAtMy42ODMgMS42NDctMy42ODMgMy42%0D%0ANzUgMCAyLjA0IDEuNjQ1IDMuNjk0IDMuNjgzIDMuNjk0em0zOS42NyA1LjE0OGwtLjAxNC00Ljg3%0D%0AMWMtLjAxMy0xLjYwNi0xLjM2LTIuNjE4LTIuOTM5LTIuODA5bC0yOC45NTctMi44MzMtLjIxNS0u%0D%0AMDA5Yy0xLjAwNiAwLTEuODc1LjgzNC0xLjg3NSAxLjgzNXY1LjY4N2gtNy40NTNjLTEuMDExIDAt%0D%0AMS44MjYuNS0xLjgyNiAxLjQ5OSAwIDEuMDE1LjgxNSAxLjUwMSAxLjgyNiAxLjUwMWg0MS40NTN6%0D%0AIi8+PC9zdmc+'}
                className='hotel-icon'
            />
        )
        let position_marker_airport = this.state.airportData.map((e, i) =>
            <Marker key={i}
                name={e.name}
                rating={e.rating}
                onClick={this.onMarkerClick}
                position={{ lat: e.geometry.location.lat, lng: e.geometry.location.lng }}
                icon={e.icon}
                className='airport-icon'
            />
        )
        let position_marker_restaurants = this.state.restaurantsData.map((e, i) =>
            <Marker key={i}
                name={e.name}
                rating={e.rating}
                onClick={this.onMarkerClick}
                position={{ lat: e.geometry.location.lat, lng: e.geometry.location.lng }}
                icon={'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjIiIGJhc2VQcm9maWxlPSJ0aW55IiB4bWxucz0iaHR0cDovL3d3dy53%0D%0AMy5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUw%0D%0AIiBvdmVyZmxvdz0iaW5oZXJpdCI+PHBhdGggZD0iTTIyIDEuOTMydjExLjA2OGgtMnYtMTFjMC0u%0D%0ANTUyLS40NDgtMS0xLTFzLTEgLjQ0OC0xIDF2MTFoLTJ2LTExLjAzNmMwLTEuMjg3LTItMS4yNDMt%0D%0AMi0uMDMzdjExLjA2OWgtMnYtMTAuOTljMC0xLjM2My0yLTEuMzEzLTItLjA1NHYxNC40NzJjMCAy%0D%0ALjA4NyAyIDMuNDYzIDQgMy40NjN2MjYuMTA5YzAgNCA2IDQgNiAwdi0yNi4xMDhjMiAwIDQtMS42%0D%0ANjIgNC0zLjIyN3YtMTQuNzAxYzAtMS4yNzUtMi0xLjIyNi0yLS4wMzJ6bTkgMy4wNjh2MjVoMnYx%0D%0ANmMwIDQgNyA0IDcgMHYtNDFjMC01LTktNS05IDB6Ii8+PC9zdmc+'}
                className='restaurant-icon'
            />
        )
        let hotelList = this.state.hotelData.map((e, i) => {
            return (
                <div key={i} onClick={() => this.showDetails(i)} className='hotel-list'>
                    <h1 className='hotel-name'>{e.name}</h1>
                    <h2 className='hotel-rating'>Rating: {e.rating}/5</h2>
                </div>
            )
        })
        return (
            <div className={styles.flexWrapper} >
                <div className={styles.left}>
                    <form onSubmit={this.onSubmit}
                    >
                        <input
                            className='location-input'
                            ref='autocomplete'
                            type="text"
                            placeholder="Where shall we take you?" />
                        <input
                            className='go-button'
                            type='submit'
                            value='Go'
                            onClick={() => this.search()} />
                    </form>
                </div>
                <div className='map'>
                    <div className='map-container'>
                        <Map {...props}
                            containerStyle={{
                                position: 'relative',
                                height: '90vh',
                                width: '100%',
                                position: "absolute",
                                top: '0px'
                            }}
                            className='map-container'
                            defaultZoom={5}
                            center={this.state.position}
                            centerAroundCurrentLocation={false}>
                            <Marker position={this.state.position} />
                            {position_marker_hotel}
                            {position_marker_airport}
                            {position_marker_restaurants}
                            <InfoWindow marker={this.state.activeMarker}
                                visible={this.state.showingInfoWindow}
                            >
                                <div>
                                    <h1>{this.state.pinDetails.name}</h1>
                                    <h1>Rating: {this.state.pinDetails.rating}</h1>
                                </div>

                            </InfoWindow>
                        </Map>
                    </div>
                </div>
                <div>
                    <div className={this.state.displayOpacity ? 'lists display-opacity': 'lists'}>
                        <div className='hotel-title'>Hotels: {`Locating ${this.state.hotelData.length} hotels.`} </div>
                        {hotelList}
                        <div className='travel-title'>Travel: {`Locating ${this.state.airportData.length} airports.`} </div>
                        <div className='restaurant-title'>Restaurant: {`Locating ${this.state.restaurantsData.length} restaurants.`}</div>
                    </div>
                </div>
                <div className={this.state.slide ? 'slide-details slide' : 'slide-details'}>
                    <div onClick={this.slide} className='exit'>
                        <div className='exit-line1'></div>
                        <div className='exit-line2'></div>
                    </div>
                    <h1 className='name'>{this.state.pinDetails.name}</h1>
                    <div>Add to trip</div>
                    <h2 className='address'>{this.state.pinDetails.address}</h2>
                    <h2 className='hours-tag'>Hours:</h2>
                    <h2 className='monday'>{this.state.pinDetails.hours.monday}</h2>
                    <h2 className='tuesday'>{this.state.pinDetails.hours.tuesday}</h2>
                    <h2 className='wednesday'>{this.state.pinDetails.hours.wednesday}</h2>
                    <h2 className='thursday'>{this.state.pinDetails.hours.thursday}</h2>
                    <h2 className='friday'>{this.state.pinDetails.hours.friday}</h2>
                    <h2 className='saturday'>{this.state.pinDetails.hours.saturday}</h2>
                    <h2 className='sunday'>{this.state.pinDetails.hours.sunday}</h2>
                    <h2 className='phone'>Phone: {this.state.pinDetails.internationalPhone}</h2>
                    <h2 className='reviews-tag'>Reviews:</h2>
                    <h2 className='authorname-one'>{this.state.pinDetails.reviews.one.authorName}</h2>
                    <h2 className='rating-one'>{this.state.pinDetails.reviews.one.rating}</h2>
                    <h2 className='posted-one'>{this.state.pinDetails.reviews.one.posted}</h2>
                    <h2 className='text-one'>{this.state.pinDetails.reviews.one.text}</h2>
                    <h2 className='authorname-two'>{this.state.pinDetails.reviews.two.authorName}</h2>
                    <h2 className='rating-two'>{this.state.pinDetails.reviews.two.rating}</h2>
                    <h2 className='posted-two'>{this.state.pinDetails.reviews.two.posted}</h2>
                    <h2 className='text-two'>{this.state.pinDetails.reviews.two.text}</h2>
                    <h2 className='authorname-three'>{this.state.pinDetails.reviews.three.authorName}</h2>
                    <h2 className='rating-three'>{this.state.pinDetails.reviews.three.rating}</h2>
                    <h2 className='posted-three'>{this.state.pinDetails.reviews.three.posted}</h2>
                    <h2 className='text-three'>{this.state.pinDetails.reviews.three.text}</h2>
                    <h2 className='authorname-four'>{this.state.pinDetails.reviews.four.authorName}</h2>
                    <h2 className='rating-four'>{this.state.pinDetails.reviews.four.rating}</h2>
                    <h2 className='posted-four'>{this.state.pinDetails.reviews.four.posted}</h2>
                    <h2 className='text-four'>{this.state.pinDetails.reviews.four.text}</h2>
                    <h2 className='authorname-five'>{this.state.pinDetails.reviews.five.authorName}</h2>
                    <h2 className='rating-five'>{this.state.pinDetails.reviews.five.rating}</h2>
                    <h2 className='posted-five'>{this.state.pinDetails.reviews.five.posted}</h2>
                    <h2 className='text-five'>{this.state.pinDetails.reviews.five.text}</h2>
                    <h2 className='website'>{this.state.pinDetails.website}</h2>
                </div>
            </div>
        )
    }
}

class MapWrapper extends Component {
    render() {
        const props = this.props;
        const { google } = this.props;
        console.log(props)

        return (
            <Map google={google}
                className={'map'}
                visible={false}>
                <Contents {...props} />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API
})(MapWrapper)
