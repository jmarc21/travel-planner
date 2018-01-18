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
            pinDetails: null
        }
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
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
                pinDetails: res.data
            })
        })
    }
    render() {
        const props = this.props;
        const { position } = this.state;
        let position_marker_hotel = this.state.hotelData.map((e, i) =>
            <Marker key={i}
                name={e.name}
                rating={e.rating}
                onClick={this.onMarkerClick}
                position={{ lat: e.geometry.location.lat, lng: e.geometry.location.lng }}
                icon={e.icon}
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
        let hotelList = this.state.hotelData.map((e,i)=>{
            return(
                <div key={i} onClick={ () => this.showDetails(i)}>
                    <h1>{e.name}</h1>
                    <h2>Rating: {e.rating}/5</h2>
                    <h2>-------------------------</h2>
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
                            placeholder="Enter a location" />
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
                                height: '88vh',
                                width: '50%',
                                float: 'right',
                                top: '-35px',
                                right: '10px'
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
                                <h1>{this.state.selectedPlace.name}</h1>
                                <h1>Rating: {this.state.selectedPlace.rating}</h1>
                            </div>

                        </InfoWindow>
                        </Map>
                    </div>
                </div>
                <div>
                    <div>Hotels: {`Locating ${this.state.hotelData.length} hotels.`} </div>
                    {hotelList}
                    <div>Airtports: {`Locating ${this.state.airportData.length} airports.`} </div>
                    <div>Restaurant: {`Locating ${this.state.restaurantsData.length} restaurants.`}</div>
                </div>
                <div>
                     <h1></h1>
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
