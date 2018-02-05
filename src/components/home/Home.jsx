import React, { Component } from 'react';
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
                        <a style={{ textDecoration: 'none', color: 'black' }} href={process.env.REACT_APP_LOGIN}><div className='login'>Login</div></a>
                    </div>
                </div>
            </div>
        )
    }
}