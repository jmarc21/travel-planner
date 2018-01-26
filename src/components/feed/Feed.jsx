import React, {Component} from 'react';
import Header from '../header/Header';
import axios from 'axios';
import {getUserInfo} from '../ducks/users'
import { connect } from 'react-redux';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return(
            <div>
                <Header/>
            </div>
        )
    }
}