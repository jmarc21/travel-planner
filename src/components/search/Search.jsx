import React, { Component } from 'react';
import './search.css'
import axios from 'axios';
import Header from '../header/Header';


export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            location: '',
            searchedLocation: '',
            hotel_data: [],
            lat: 0,
            lng: 0
        }
    }
    hitApi() {
        axios.get()
            .then(res => {
                console.log(res)
            })
    }
    updateLocation(val) {
        this.setState({
            location: val
        })
    }
    search() {
        axios.get(`https://restcountries.eu/rest/v2/name/${this.state.location}`)
            .then(res => {
                this.setState({
                    lat: res.data[0].latlng[0],
                    lng: res.data[0].latlng[1]
                })
                var lat = res.data[0].latlng[0]
                var lng = res.data[0].latlng[1]
        axios.get(`http://api.sandbox.amadeus.com/v1.2/hotels/search-circle?latitude=${lat}&longitude=${lng}&radius=100
        &check_in=2018-09-01&check_out=2018-09-03&cy=EUR&number_of_results=30&apikey=`)
                    .then(res => {
                        this.setState({
                            hotel_data: res.data.results
                        })
                        console.log(res)
                    })
            })
        }
    // initMap(){
    //     var options = {
    //         zoom: 8,
    //         center: {lat: 40.2338, lng: -111.6585 }
    //     }
    //     var map = new google.maps.Map(document.getElementById('map'), options);
    //     var marker = new google.maps.Marker({
    //         position: {lat: 40.2338, lng: -111.6585},
    //         map: map,
    //         // icon: ''
    //     });
    //     var infoWindow = new google.maps.InfoWindow({
    //         content: '<h1>justin</h1>'
    //     })
    //     marker.addListener('click', function(){
    //         infoWindow.open(map,marker);
    //     })
    // }
    // addMarkerHotel(){
    //     var marker = new google.maps.Marker({
    //         position: {lat: 40.2338, lng: -111.6585},
    //         map: map,
    //         // icon: ''
    //     });
    // }

    render() {
        let hotels = this.state.hotel_data.map((e, i) => {
            return <p key={i}>
                {e.property_name} <br />
                Total: ${e.total_price.amount} <br />
                daily amount: ${e.rooms[0].rates[0].price}
            </p>
        })
        return (
            <div>
                <Header />
                <div id='map'></div>
                <input type="text" placeholder='Search Location' onChange={e => this.updateLocation(e.target.value)} />
                <button onClick={() => this.search()}>Search</button>
                {hotels}

            </div>
        )
    }
}