import React, { Component } from 'react';
import Map, { GoogleApiWrapper } from 'google-maps-react';
import Contents from './googleContents';

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

