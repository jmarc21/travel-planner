import React, {Component} from 'react';
import Header from '../header/Header';

export default class Home extends Component{
    render(){
        return(
            <div>
                <Header/>
                <h1>This is the Feed page</h1>
            </div>
        )
    }
}