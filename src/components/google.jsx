import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Map, {Marker, GoogleApiWrapper} from 'google-maps-react';
import styles from './googlemaps.css';
import axios from 'axios';

class Contents extends Component{
  constructor(props) {
    super(props)
    this.state = {
      place: null,
      position: null,
      lat: 0,
      lng: 0
    }
  }

  onSubmit(e) {
    e.preventDefault();
  }

  componentDidMount() {
    this.renderAutoComplete();
  }

  componentDidUpdate(prevProps) {
    const {map} = this.props;
    if (map !== prevProps.map) {
      this.renderAutoComplete();
    }
  }

  renderAutoComplete() {
    const {google, map} = this.props;

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

  search(){
      axios.get(`http://api.sandbox.amadeus.com/v1.2/hotels/search-circle?latitude=${this.state.position.lat()}&longitude=${this.state.position.lng()}&radius=100&check_in=2018-09-01&check_out=2018-09-03&cy=EUR&number_of_results=30&apikey=`)
      .then(res => {
        console.log(res)
      })
  }

  render() {
    console.log(this.props)
    const props = this.props;
    const {position} = this.state;

    return (
      <div className={styles.flexWrapper}>
        <div className={styles.left}>
          <form onSubmit={this.onSubmit} 
          className='form'
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
              onClick={() => this.search()}/>
          </form>
        </div>
        <div className='map'>
          <Map {...props}
              containerStyle={{
                position: 'relative',
                height: '60vh',
                width: '100%'
              }}
              setZoom={11}
              center={this.state.position}
              centerAroundCurrentLocation={false}>
                <Marker position={this.state.position} />
          </Map>
        </div>
      </div>
    )
  }
}

class MapWrapper extends Component{
  render() {
    const props = this.props;
    const {google} = this.props;
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
