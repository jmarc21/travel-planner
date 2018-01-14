import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../../reset.css';
import './header.css';

export default class Header extends Component{
    render(){
        return(
            <div className='nav-container'>
                <nav className='nav'>
                    <Link style={{textDecoration: 'none'}} to='/feed'><div className='feed'>Feed</div></Link>
                    <Link style={{textDecoration: 'none'}} to='/profile'><div className='profile'>Profile</div></Link>
                    <Link style={{textDecoration: 'none'}} to='/search'><div className='search'>Search</div></Link>
                    <Link style={{textDecoration: 'none'}} to='/planner'><div className='plan'>Plan a trip</div></Link>
                    <a href='http://localhost:4000/auth/logout' style={{textDecoration: 'none'}}><div className='logout'>Log out</div></a>
                </nav>
            </div>
        )
    }
}