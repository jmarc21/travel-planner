import React, { Component } from 'react';
import '../../reset.css'
import './home.css'
import logo from './logo.svg'

export default class Home extends Component {
    render() {
        return (
            <div className='home'>
                <div className="login-container">
                    <img src={logo} alt=""/>
                    <h1 className='titleHome'>Tripper</h1>
                    {/* <h3>Plan the trip of your dreams with us.</h3> */}
                    <a style={{ textDecoration: 'none', color: 'black' }} href={process.env.REACT_APP_LOGIN}><div className='login'>Login</div></a>
                </div>
            </div>
        )
    }
}