import React, {Component} from 'react';
import './profile.css'
import Header from '../header/Header'

export default class Profile extends Component{
    // componentDidMount(){
    //     this.props.getUserInfo();
    // }
    render(){
        // const user = this.props.user;
        return(
            <div>
                <Header />
                <h1>got there</h1>
            </div>
        )
    }
}