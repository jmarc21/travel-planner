import React, {Component} from 'react';
import Header from '../header/Header';
import Google from '../google';

export default class Planner extends Component{
    render(){
        return(
            <div>
                <Header/>
                <Google/>
            </div>
        )
    }
}