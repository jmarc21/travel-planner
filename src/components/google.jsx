import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Map, { Marker, GoogleApiWrapper, InfoWindow, withScriptjs } from 'google-maps-react';
import styles from './googlemaps.css';
import axios from 'axios';
import lodgingSVG from './svg/lodging.svg'
import airportSVG from './svg/airport.svg'
import amusementParkSVG from './svg/amusement-park.svg'
import aquariumSVG from './svg/aquarium.svg'
import bowlingAlleySVG from './svg/bowling-alley.svg'
import cafeSVG from './svg/cafe.svg'
import carRentalSVG from './svg/car-rental.svg'
import casinoSVG from './svg/casino.svg'
import clothingStoreSVG from './svg/clothing-store.svg'
import departmentStoreSVG from './svg/department-store.svg'
import foodSVG from './svg/food.svg'
import supermarketSVG from './svg/grocery-or-supermarket.svg'
import museumSVG from './svg/museum.svg'
import nightClubSVG from './svg/night-club.svg'
import pointOfIntSVG from './svg/point-of-interest.svg'
import restaurantSVG from './svg/restaurant.svg'
import searchSVG from './svg/search.svg'
import shoppingMallSVG from './svg/shopping-mall.svg'
import spaSVG from './svg/spa.svg'
import mapStyles from './mapStyles.json'

class Contents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            place: null,
            position: null,
            hotelData: [],
            airportData: [],
            restaurantsData: [],
            carRentalData: [],
            amusementParkData: [],
            museumData: [],
            aquariumData: [],
            bakeryData: [],
            nightClubData: [],
            spaData: [],
            liquorStoreData: [],
            bowlingAlleyData: [],
            cafeData: [],
            casinoData: [],
            clothingStoreData: [],
            departmentStoreData: [],
            shoeStoreData: [],
            shoppingMallData: [],
            supermarketData: [],
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
        axios.post('http://localhost:4000/car-rental', coordin).then(res => {
            this.setState({
                carRentalData: res.data
            })
            console.log(res.data)
        })
        axios.post('http://localhost:4000/amusement-park', coordin).then(res => {
            this.setState({
                amusementParkData: res.data
            })
            console.log(res.data)
        })
        axios.post('http://localhost:4000/museum', coordin).then(res => {
            this.setState({
                museumData: res.data
            })
            console.log(res.data)
        })
        axios.post('http://localhost:4000/aquarium', coordin).then(res => {
            this.setState({
                aquariumData: res.data
            })
            console.log(res.data)
        })
        axios.post('http://localhost:4000/night-club', coordin).then(res => {
            this.setState({
                nightClubData: res.data
            })
            console.log(res.data)
        })
        axios.post('http://localhost:4000/spa', coordin).then(res => {
            this.setState({
                spaData: res.data
            })
            console.log(res.data)
        })
        axios.post('http://localhost:4000/bowling-alley', coordin).then(res => {
            this.setState({
                bowlingAlleyData: res.data
            })
            console.log(res.data)
        })
        axios.post('http://localhost:4000/cafe', coordin).then(res => {
            this.setState({
                cafeData: res.data
            })
            console.log(res.data)
        })
        axios.post('http://localhost:4000/casino', coordin).then(res => {
            this.setState({
                casinoData: res.data
            })
            console.log(res.data)
        })
        axios.post('http://localhost:4000/clothing-store', coordin).then(res => {
            this.setState({
                clothingStoreData: res.data
            })
            console.log(res.data)
        })
        axios.post('http://localhost:4000/department-store', coordin).then(res => {
            this.setState({
                departmentStoreData: res.data
            })
            console.log(res.data)
        })
        axios.post('http://localhost:4000/shoe-store', coordin).then(res => {
            this.setState({
                shoeStoreData: res.data
            })
            console.log(res.data)
        })
        axios.post('http://localhost:4000/shopping-mall', coordin).then(res => {
            this.setState({
                shoppingMallData: res.data
            })
            console.log(res.data)
        })
        axios.post('http://localhost:4000/supermarket', coordin).then(res => {
            this.setState({
                supermarketData: res.data
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
    showDetails(i, data) {
        console.log(data)
        var place_id = {
            place_id: data[i].place_id
        }
        console.log(place_id)
        axios.post('http://localhost:4000/detail', place_id).then(res => {
            // console.log(res.data.result.opening_hours.weekday_text[0])
            console.log(res)
            this.setState({
                slide: true,
                pinDetails: {
                    name: res.data.result.name,
                    address: res.data.result.formatted_address,
                    hours: {
                        monday: res.data.result.opening_hours ? res.data.result.opening_hours.weekday_text[0] : null,
                        tuesday: res.data.result.opening_hours ? res.data.result.opening_hours.weekday_text[1] : null,
                        wednesday: res.data.result.opening_hours ? res.data.result.opening_hours.weekday_text[2] : null,
                        thursday: res.data.result.opening_hours ? res.data.result.opening_hours.weekday_text[3] : null,
                        friday: res.data.result.opening_hours ? res.data.result.opening_hours.weekday_text[4] : null,
                        saturday: res.data.result.opening_hours ? res.data.result.opening_hours.weekday_text[5] : null,
                        sunday: res.data.result.opening_hours ? res.data.result.opening_hours.weekday_text[6] : null
                    },
                    internationalPhone: res.data.result.international_phone_number,
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
        console.log(this.state.pinDetails)
        const props = this.props;
        const { position } = this.state;
        let position_marker_hotel = this.state.hotelData.map((e, i) =>
            <Marker key={i}
                name={e.name}
                rating={e.rating}
                /* onClick={this.onMarkerClick}  */
                onClick={() => this.showDetails(i)}
                position={{ lat: e.geometry.location.lat, lng: e.geometry.location.lng }}
                icon={lodgingSVG}
                className='hotel-icon'
            />
        )
        let position_marker_airport = this.state.airportData.map((e, i) =>
            <Marker key={i}
                name={e.name}
                rating={e.rating}
                onClick={() => this.showDetails(i)}
                position={{ lat: e.geometry.location.lat, lng: e.geometry.location.lng }}
                icon={airportSVG}
                className='airport-icon'
            />
        )
        let position_marker_restaurants = this.state.restaurantsData.map((e, i) =>
            <Marker key={i}
                name={e.name}
                rating={e.rating}
                onClick={() => this.showDetails(i)}
                position={{ lat: e.geometry.location.lat, lng: e.geometry.location.lng }}
                icon={restaurantSVG}
                className='restaurant-icon'
            />
        )
        let position_marker_carRental = this.state.carRentalData.map((e, i) =>
            <Marker key={i}
                name={e.name}
                rating={e.rating}
                onClick={() => this.showDetails(i)}
                position={{ lat: e.geometry.location.lat, lng: e.geometry.location.lng }}
                icon={carRentalSVG}
                className='restaurant-icon'
            />
        )
        let position_marker_amusementPark = this.state.amusementParkData.map((e, i) =>
            <Marker key={i}
                name={e.name}
                rating={e.rating}
                onClick={() => this.showDetails(i)}
                position={{ lat: e.geometry.location.lat, lng: e.geometry.location.lng }}
                icon={amusementParkSVG}
                className='restaurant-icon'
            />
        )
        let position_marker_museum = this.state.museumData.map((e, i) =>
            <Marker key={i}
                name={e.name}
                rating={e.rating}
                onClick={() => this.showDetails(i)}
                position={{ lat: e.geometry.location.lat, lng: e.geometry.location.lng }}
                icon={museumSVG}
                className='restaurant-icon'
            />
        )
        let position_marker_aquarium = this.state.aquariumData.map((e, i) =>
            <Marker key={i}
                name={e.name}
                rating={e.rating}
                onClick={() => this.showDetails(i)}
                position={{ lat: e.geometry.location.lat, lng: e.geometry.location.lng }}
                icon={aquariumSVG}
                className='restaurant-icon'
            />
        )
        let position_marker_nightClub = this.state.nightClubData.map((e, i) =>
            <Marker key={i}
                name={e.name}
                rating={e.rating}
                onClick={() => this.showDetails(i)}
                position={{ lat: e.geometry.location.lat, lng: e.geometry.location.lng }}
                icon={nightClubSVG}
                className='restaurant-icon'
            />
        )
        let position_marker_spa = this.state.spaData.map((e, i) =>
            <Marker key={i}
                name={e.name}
                rating={e.rating}
                onClick={() => this.showDetails(i)}
                position={{ lat: e.geometry.location.lat, lng: e.geometry.location.lng }}
                icon={spaSVG}
                className='restaurant-icon'
            />
        )
        let position_marker_bowlingAlley = this.state.bowlingAlleyData.map((e, i) =>
            <Marker key={i}
                name={e.name}
                rating={e.rating}
                onClick={() => this.showDetails(i)}
                position={{ lat: e.geometry.location.lat, lng: e.geometry.location.lng }}
                icon={bowlingAlleySVG}
                className='restaurant-icon'
            />
        )
        let position_marker_cafe = this.state.cafeData.map((e, i) =>
            <Marker key={i}
                name={e.name}
                rating={e.rating}
                onClick={() => this.showDetails(i)}
                position={{ lat: e.geometry.location.lat, lng: e.geometry.location.lng }}
                icon={cafeSVG}
                className='restaurant-icon'
            />
        )
        let position_marker_casino = this.state.casinoData.map((e, i) =>
            <Marker key={i}
                name={e.name}
                rating={e.rating}
                onClick={() => this.showDetails(i)}
                position={{ lat: e.geometry.location.lat, lng: e.geometry.location.lng }}
                icon={casinoSVG}
                className='restaurant-icon'
            />
        )
        let position_marker_clothingStore = this.state.clothingStoreData.map((e, i) =>
            <Marker key={i}
                name={e.name}
                rating={e.rating}
                onClick={() => this.showDetails(i)}
                position={{ lat: e.geometry.location.lat, lng: e.geometry.location.lng }}
                icon={clothingStoreSVG}
                className='restaurant-icon'
            />
        )
        let position_marker_departmentStore = this.state.departmentStoreData.map((e, i) =>
            <Marker key={i}
                name={e.name}
                rating={e.rating}
                onClick={() => this.showDetails(i)}
                position={{ lat: e.geometry.location.lat, lng: e.geometry.location.lng }}
                icon={departmentStoreSVG}
                className='restaurant-icon'
            />
        )
        let position_marker_shoeStore = this.state.shoeStoreData.map((e, i) =>
            <Marker key={i}
                name={e.name}
                rating={e.rating}
                onClick={() => this.showDetails(i)}
                position={{ lat: e.geometry.location.lat, lng: e.geometry.location.lng }}
                icon={clothingStoreSVG}
                className='restaurant-icon'
            />
        )
        let position_marker_shoppingMall = this.state.shoppingMallData.map((e, i) =>
            <Marker key={i}
                name={e.name}
                rating={e.rating}
                onClick={() => this.showDetails(i)}
                position={{ lat: e.geometry.location.lat, lng: e.geometry.location.lng }}
                icon={shoppingMallSVG}
                className='restaurant-icon'
            />
        )
        let position_marker_supermarket = this.state.supermarketData.map((e, i) =>
            <Marker key={i}
                name={e.name}
                rating={e.rating}
                onClick={() => this.showDetails(i)}
                position={{ lat: e.geometry.location.lat, lng: e.geometry.location.lng }}
                icon={supermarketSVG}
                className='restaurant-icon'
            />
        )
        let hotelList = this.state.hotelData.map((e, i) => {
            var data = this.state.hotelData
            return (
                <div key={i} className='hotel-list'>
                    <div>
                        <img src={lodgingSVG} alt="" className='hotel-list-icon' />
                    </div>
                    <div className='hotel-text'>
                        <h1 className='hotel-name'>{e.name}</h1>
                        <h2 className='hotel-rating'>Rating: {e.rating}/5</h2>
                    </div>
                    <div onClick={() => this.showDetails(i, this.state.hotelData)} className='details-hotel'>Details</div>

                </div>
            )
        })
        let airportList = this.state.airportData.map((e, i) => {
            var data = this.state.airportData
            return (
                <div key={i} className='hotel-list'>
                    <div>
                        <img src={airportSVG} alt="" className='hotel-list-icon' />
                    </div>
                    <div className='hotel-text'>
                        <h1 className='hotel-name'>{e.name}</h1>
                        <h2 className='hotel-rating'>Rating: {e.rating}/5</h2>
                    </div>
                    <div onClick={() => this.showDetails(i, data)} className='details-hotel'>Details</div>

                </div>
            )
        })
        let restaurantList = this.state.restaurantsData.map((e, i) => {
            var data = this.state.restaurantsData
            return (
                <div key={i} className='hotel-list'>
                    <div>
                        <img src={restaurantSVG} alt="" className='hotel-list-icon' />
                    </div>
                    <div className='hotel-text'>
                        <h1 className='hotel-name'>{e.name}</h1>
                        <h2 className='hotel-rating'>Rating: {e.rating}/5</h2>
                    </div>
                    <div onClick={() => this.showDetails(i, data)} className='details-hotel'>Details</div>

                </div>
            )
        })
        let carRentalList = this.state.carRentalData.map((e, i) => {
            var data = this.state.carRentalData
            return (
                <div key={i} className='hotel-list'>
                    <div>
                        <img src={carRentalSVG} alt="" className='hotel-list-icon' />
                    </div>
                    <div className='hotel-text'>
                        <h1 className='hotel-name'>{e.name}</h1>
                        <h2 className='hotel-rating'>Rating: {e.rating}/5</h2>
                    </div>
                    <div onClick={() => this.showDetails(i, data)} className='details-hotel'>Details</div>

                </div>
            )
        })
        let amusementParkList = this.state.amusementParkData.map((e, i) => {
            var data = this.state.amusementParkData
            return (
                <div key={i} className='hotel-list'>
                    <div>
                        <img src={amusementParkSVG} alt="" className='hotel-list-icon' />
                    </div>
                    <div className='hotel-text'>
                        <h1 className='hotel-name'>{e.name}</h1>
                        <h2 className='hotel-rating'>Rating: {e.rating}/5</h2>
                    </div>
                    <div onClick={() => this.showDetails(i, data)} className='details-hotel'>Details</div>

                </div>
            )
        })
        let museumList = this.state.museumData.map((e, i) => {
            var data = this.state.museumData
            return (
                <div key={i} className='hotel-list'>
                    <div>
                        <img src={museumSVG} alt="" className='hotel-list-icon' />
                    </div>
                    <div className='hotel-text'>
                        <h1 className='hotel-name'>{e.name}</h1>
                        <h2 className='hotel-rating'>Rating: {e.rating}/5</h2>
                    </div>
                    <div onClick={() => this.showDetails(i, data)} className='details-hotel'>Details</div>

                </div>
            )
        })
        let aquariumList = this.state.aquariumData.map((e, i) => {
            var data = this.state.aquariumData
            return (
                <div key={i} className='hotel-list'>
                    <div>
                        <img src={aquariumSVG} alt="" className='hotel-list-icon' />
                    </div>
                    <div className='hotel-text'>
                        <h1 className='hotel-name'>{e.name}</h1>
                        <h2 className='hotel-rating'>Rating: {e.rating}/5</h2>
                    </div>
                    <div onClick={() => this.showDetails(i, data)} className='details-hotel'>Details</div>

                </div>
            )
        })
        let nightClubList = this.state.nightClubData.map((e, i) => {
            var data = this.state.nightClubData
            return (
                <div key={i} className='hotel-list'>
                    <div>
                        <img src={nightClubSVG} alt="" className='hotel-list-icon' />
                    </div>
                    <div className='hotel-text'>
                        <h1 className='hotel-name'>{e.name}</h1>
                        <h2 className='hotel-rating'>Rating: {e.rating}/5</h2>
                    </div>
                    <div onClick={() => this.showDetails(i, data)} className='details-hotel'>Details</div>

                </div>
            )
        })
        let spaList = this.state.spaData.map((e, i) => {
            var data = this.state.spaData
            return (
                <div key={i} className='hotel-list'>
                    <div>
                        <img src={spaSVG} alt="" className='hotel-list-icon' />
                    </div>
                    <div className='hotel-text'>
                        <h1 className='hotel-name'>{e.name}</h1>
                        <h2 className='hotel-rating'>Rating: {e.rating}/5</h2>
                    </div>
                    <div onClick={() => this.showDetails(i, data)} className='details-hotel'>Details</div>

                </div>
            )
        })
        let bowlingList = this.state.bowlingAlleyData.map((e, i) => {
            var data = this.state.bowlingAlleyData
            return (
                <div key={i} className='hotel-list'>
                    <div>
                        <img src={bowlingAlleySVG} alt="" className='hotel-list-icon' />
                    </div>
                    <div className='hotel-text'>
                        <h1 className='hotel-name'>{e.name}</h1>
                        <h2 className='hotel-rating'>Rating: {e.rating}/5</h2>
                    </div>
                    <div onClick={() => this.showDetails(i, data)} className='details-hotel'>Details</div>

                </div>
            )
        })
        let cafeList = this.state.cafeData.map((e, i) => {
            var data = this.state.cafeData
            return (
                <div key={i} className='hotel-list'>
                    <div>
                        <img src={cafeSVG} alt="" className='hotel-list-icon' />
                    </div>
                    <div className='hotel-text'>
                        <h1 className='hotel-name'>{e.name}</h1>
                        <h2 className='hotel-rating'>Rating: {e.rating}/5</h2>
                    </div>
                    <div onClick={() => this.showDetails(i, data)} className='details-hotel'>Details</div>

                </div>
            )
        })
        let casinoList = this.state.casinoData.map((e, i) => {
            var data = this.state.casinoData
            return (
                <div key={i} className='hotel-list'>
                    <div>
                        <img src={casinoSVG} alt="" className='hotel-list-icon' />
                    </div>
                    <div className='hotel-text'>
                        <h1 className='hotel-name'>{e.name}</h1>
                        <h2 className='hotel-rating'>Rating: {e.rating}/5</h2>
                    </div>
                    <div onClick={() => this.showDetails(i, data)} className='details-hotel'>Details</div>

                </div>
            )
        })
        let clothingStoreList = this.state.clothingStoreData.map((e, i) => {
            var data = this.state.clothingStoreData
            return (
                <div key={i} className='hotel-list'>
                    <div>
                        <img src={clothingStoreSVG} alt="" className='hotel-list-icon' />
                    </div>
                    <div className='hotel-text'>
                        <h1 className='hotel-name'>{e.name}</h1>
                        <h2 className='hotel-rating'>Rating: {e.rating}/5</h2>
                    </div>
                    <div onClick={() => this.showDetails(i, data)} className='details-hotel'>Details</div>

                </div>
            )
        })
        let departmentStoreList = this.state.departmentStoreData.map((e, i) => {
            var data = this.state.departmentStoreData
            return (
                <div key={i} className='hotel-list'>
                    <div>
                        <img src={departmentStoreSVG} alt="" className='hotel-list-icon' />
                    </div>
                    <div className='hotel-text'>
                        <h1 className='hotel-name'>{e.name}</h1>
                        <h2 className='hotel-rating'>Rating: {e.rating}/5</h2>
                    </div>
                    <div onClick={() => this.showDetails(i, data)} className='details-hotel'>Details</div>

                </div>
            )
        })
        let shoeStoreList = this.state.shoeStoreData.map((e, i) => {
            var data = this.state.shoeStoreData
            return (
                <div key={i} className='hotel-list'>
                    <div>
                        <img src={departmentStoreSVG} alt="" className='hotel-list-icon' />
                    </div>
                    <div className='hotel-text'>
                        <h1 className='hotel-name'>{e.name}</h1>
                        <h2 className='hotel-rating'>Rating: {e.rating}/5</h2>
                    </div>
                    <div onClick={() => this.showDetails(i, data)} className='details-hotel'>Details</div>

                </div>
            )
        })
        let shoppingMallList = this.state.shoppingMallData.map((e, i) => {
            var data = this.state.shoppingMallData
            return (
                <div key={i} className='hotel-list'>
                    <div>
                        <img src={shoppingMallSVG} alt="" className='hotel-list-icon' />
                    </div>
                    <div className='hotel-text'>
                        <h1 className='hotel-name'>{e.name}</h1>
                        <h2 className='hotel-rating'>Rating: {e.rating}/5</h2>
                    </div>
                    <div onClick={() => this.showDetails(i, data)} className='details-hotel'>Details</div>

                </div>
            )
        })
        let supermarketList = this.state.supermarketData.map((e, i) => {
            var data = this.state.supermarketData
            return (
                <div key={i} className='hotel-list'>
                    <div>
                        <img src={supermarketSVG} alt="" className='hotel-list-icon' />
                    </div>
                    <div className='hotel-text'>
                        <h1 className='hotel-name'>{e.name}</h1>
                        <h2 className='hotel-rating'>Rating: {e.rating}/5</h2>
                    </div>
                    <div onClick={() => this.showDetails(i, data)} className='details-hotel'>Details</div>

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
                                top: '0px',
                                
                            }}
                            styles={ mapStyles }
                            className='map-container'
                            zoom={16}
                            center={this.state.position}
                            centerAroundCurrentLocation={false}>
                            <Marker position={this.state.position}/>
                            {position_marker_hotel}
                            {position_marker_airport}
                            {position_marker_restaurants}
                            {position_marker_carRental}
                            {position_marker_amusementPark}
                            {position_marker_museum}
                            {position_marker_aquarium}
                            {position_marker_nightClub}
                            {position_marker_spa}
                            {position_marker_bowlingAlley}
                            {position_marker_cafe}
                            {position_marker_casino}
                            {position_marker_clothingStore}
                            {position_marker_departmentStore}
                            {position_marker_shoeStore}
                            {position_marker_shoppingMall}
                            {position_marker_supermarket}
                            <InfoWindow marker={this.state.activeMarker}
                                visible={this.state.showingInfoWindow}
                            >
                                <div className='window-text'>
                                    <h1>{this.state.selectedPlace.name}</h1>
                                    <h1>Rating: {this.state.selectedPlace.rating}</h1>
                                </div>

                            </InfoWindow>
                        </Map>
                    </div>
                </div>
                <div>
                    <div className={this.state.displayOpacity ? 'lists display-opacity' : 'lists'}>
                    <h1 className='title-list'>Hotels:</h1>
                        {hotelList}
                    <h1 className='title-list'>Transport:</h1>
                        {airportList}
                        {carRentalList}
                    <h1 className='title-list'>Food:</h1>
                        {restaurantList}
                        {cafeList}
                        {supermarketList}
                    <h1 className='title-list'>Amusement:</h1>
                        {amusementParkList}
                        {museumList}
                        {aquariumList}
                        {nightClubList}
                        {spaList}
                        {bowlingList}
                        {casinoList}
                    <h1 className='title-list'>Shopping:</h1>
                        {clothingStoreList}
                        {departmentStoreList}
                        {shoeStoreList}
                        {shoppingMallList}
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
