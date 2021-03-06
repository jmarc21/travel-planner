import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../reset.css';
import './header.css';

export default class Header extends Component {
    constructor(){
        super();
        this.state = {
            slide: false
        }
        this.open = this.open.bind(this)
    }
    open(){
        console.log(this.state.slide)
        this.setState({
            slide: this.state.slide ? false : true
        })
    }
    render() {
        return (
            <div>
                <div className='nav-container'>
                    <h1 className='appname'>TYBL</h1>
                    <nav className='nav'>
                        <Link style={{ textDecoration: 'none' }} to='/feed'><div className='feed'>Feed</div></Link>
                        <Link style={{ textDecoration: 'none' }} to='/profile'><div className='profile'>Profile</div></Link>
                        <Link style={{ textDecoration: 'none' }} to='/planner'><div className='plan'>Plan a trip</div></Link>
                        <a href='/auth/logout' style={{ textDecoration: 'none' }}><div className='logout'>Log out</div></a>
                    </nav>
                </div>
                <div className="hammenu">
                    <div className='appname'>TYBL</div>
                    <div className="hamcomp">
                        <div className={this.state.slide ? 'navmobile slidenav' : "navmobile"} onClick={() => this.open()}>
                            <div className="mobileline1"></div>
                            <div className="mobileline2"></div>
                            <div className="mobileline3"></div>
                        </div>
                        <nav className={this.state.slide ? 'mobilenav slideham':'mobilenav'}>
                            <div className="links">
                                <Link style={{ textDecoration: 'none' }} to='/feed'><div className='feed'>Feed</div></Link>
                                <Link style={{ textDecoration: 'none' }} to='/profile'><div className='profile'>Profile</div></Link>
                                <Link style={{ textDecoration: 'none' }} to='/planner'><div className='plan'>Plan a trip</div></Link>
                                <a href='/auth/logout' style={{ textDecoration: 'none' }}><div className='logout'>Log out</div></a>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}