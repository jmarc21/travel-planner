import React, {Component} from 'react';
import Header from '../header/Header';

export default class Home extends Component{
    render(){
        return(
            <div>
                <Header/>
                <h1>Feed:</h1>
            </div>
        )
    }
}