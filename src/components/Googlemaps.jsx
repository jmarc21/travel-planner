import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { GoogleApiWrapper, Map, InfoWindow, Marker } from 'google-maps-react'
import './googlemaps.css'
import styles from '../../src/App.css'


class Googlemaps extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            place: null,
            position: null
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
                map.setZoom(14);
            }

            this.setState({
                place: place,
                position: place.geometry.location
            })
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
    render() {
        console.log(this.props)
        const props = this.props;
        const { position } = this.state;
        const style = {
            width: '100%',
            height: '50%'
        }
        return (
            <div>
                <div className={styles.flexWrapper}>
                    <div className={styles.left}>
                        <form onSubmit={this.onSubmit}>
                            <input
                                ref='autocomplete'
                                type="text"
                                placeholder='Enter a destination' />
                            <input
                            className={styles.button}
                            type="submit" 
                            value='Go' />
                        </form>
                    </div>
                </div>
                <div className={styles.right}>
                    {/* <Map {... props}
                        containerStyle={{
                            position:'relative',
                            height: '50%',
                            widht: '100%'
                        }}
                        center={this.state.position}
                        centerAroundCurrentLocation={false}>
                            <Marker position={this.state.position} /> */}
                    <Map google={this.props.google} zoom={12}
                        style={{
                            width: '100%',
                            height: '50%'
                        }}
                        initialCenter={{
                            lat: 40.2338,
                            lng: -111.6585
                        }}
                        onClick={this.onMapClicked}
                    >
                        {/* {<Marker onClick={this.onMarkerClick}
                        name={'Inclan Interactive'} 
                        position={{
                            lat: 40.2150,
                            lng: -111.7250
                        }}
                        icon={'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjIiIGJhc2VQcm9maWxlPSJ0aW55IiB4bWxucz0iaHR0cDovL3d3dy53%0D%0AMy5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUw%0D%0AIiBvdmVyZmxvdz0iaW5oZXJpdCI+PHBhdGggZD0iTTQ4LjA0OSAzNi4zMWMuNTIzLjE2OS45NTEt%0D%0ALjE0Mi45NTEtLjY5MnYtMy40OTRjMC0uNTUtLjM4Ny0xLjIzLS44NTktMS41MTJsLTE4LjI4Mi0x%0D%0AMC44OTVjLS40NzItLjI4MS0uODU5LS45NjItLjg1OS0xLjUxMXYtMTIuMjA2YzAtLjU1LS4xNjgt%0D%0AMS40MTctLjM3NC0xLjkyOCAwIDAtMS4wOTEtMi43MDgtMy0zLjAxLS4yMDQtLjAzNi0uNDExLS4w%0D%0ANjItLjYxOS0uMDYyaC0uMDFjLS4yNDEtLjAwMi0uNDc5LjAyOC0uNzEzLjA3MmwtLjIxNi4wNDgt%0D%0ALjMyOC4xMDJjLTEuNTg4LjUzLTIuNDA2IDIuODM1LTIuNDA2IDIuODM1LS4xODQuNTE5LS4zMzQg%0D%0AMS4zOTMtLjMzNCAxLjk0M3YxMi4yMDZjMCAuNTUtLjM4NyAxLjIzLS44NTkgMS41MTJsLTE4LjI4%0D%0AMiAxMC44OTRjLS40NzIuMjgyLS44NTkuOTYyLS44NTkgMS41MTJ2My40OTRjMCAuNTUuNDI4Ljg2%0D%0AMS45NTEuNjkxbDE4LjA5OC01Ljg3NWMuNTIzLS4xNjkuOTUxLjE0Mi45NTEuNjkydjkuNTMzYzAg%0D%0ALjU1LS4zNiAxLjI3MS0uOCAxLjYwMWwtMi40IDEuODAyYy0uNDQuMzMtLjggMS4wNTEtLjggMS42%0D%0AMDF2Mi4zMzdjMCAuNTUuNDMzLjg3Ni45NjEuNzI0bDYuMDc1LTEuNzQ1Yy41MjgtLjE1MiAxLjM5%0D%0ANC0uMTUyIDEuOTIyIDBsNi4wODEgMS43NDVjLjUyOC4xNTIuOTYxLS4xNzQuOTYxLS43MjR2LTIu%0D%0AMzM4YzAtLjU1LS4zNi0xLjI3MS0uOC0xLjYwMWwtMi40LTEuODAyYy0uNDM5LS4zMy0uOC0xLjA1%0D%0AMS0uOC0xLjYwMXYtOS41MzNjMC0uNTUuNDI4LS44NjEuOTUxLS42OTFsMTguMDk4IDUuODc2eiIv%0D%0APjwvc3ZnPg=='}
                        />} */}

                        {/* <InfoWindow marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                        >
                            <div>
                                <h1>{this.state.selectedPlace.name}</h1>
                            </div>

                        </InfoWindow> */}


                    </Map>
                    {/* </Map> */}
                </div>
            </div>
        )
    }
}

// class MapWrapper extends Component{
//     render(){
//         const props = this.props;
//         const {google} = this.props;
//         console.log(props)
//         return(
//             <Map google = {google}
//                 className={styles.map}
//                 visable={false}
//             >
//             </Map>
//         )
//     }
// }
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API
})(Googlemaps)