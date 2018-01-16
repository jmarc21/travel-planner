import React, { Component } from 'react';
import './profile.css'
import Header from '../header/Header'
import { getUserInfo } from '../../ducks/users'
import axios from 'axios';


export default class Profile extends Component {
    constructor() {
        super()
        this.state = {
            user: {
                id: '',
                img: '',
                username: ''
            }
        }
    }
    componentDidMount() {
        axios.get('/auth/me').then(res => {
            this.setState({
                user: {
                    id: res.data.auth_id,
                    img: res.data.img,
                    username: res.data.username,
                }
            })
        })
    }
    render() {
        return (
            <div>
                <Header />
                <div className='profile'>
                    <h1>Profile</h1>
                    <img className='profile-pic' src={this.state.user.img} alt="profile-pic" />
                    <h2 className='name'>{this.state.user.username}</h2>
                </div>
            </div>
        )
    }
}