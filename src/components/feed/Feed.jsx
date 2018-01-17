import React, {Component} from 'react';
import Header from '../header/Header';
import Googlemaps from '../Googlemaps';
import Google from '../google';


export default class Home extends Component{
    render(){
        return(
            <div>
                <Header/> 
                <Google/>
            </div>
        )
    }
}