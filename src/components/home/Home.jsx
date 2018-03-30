import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../reset.css'
import './home.css'
import logo from './logo2.svg'

export default class Home extends Component {
    render() {
        return (
            <div className='home'>
                <div className="login-container">
                    <div className="holditall">
                        <img src={logo} alt="" className='logo' />
                        <h1 className='titleHome'>TYBL</h1>
                        <div className="loginContainer">
                            <a style={{ textDecoration: 'none', color: 'black' }} href={process.env.REACT_APP_LOGIN}><div className='login'>Login</div></a>
                            <Link to="/feed" style={{ textDecoration: 'none', color: 'black' }}><div className='guestLogin'>Guest Login</div></Link>
                        </div>
                        <a href="https://youtu.be/1pkumOKu8VY" style={{ textDecoration: 'none', color: 'white' }} target="_blank" className="videoWalk">Video Walkthrough</a>
                    </div>
                </div>
            </div>
        )
    }
}