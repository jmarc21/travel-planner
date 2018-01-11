import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component{
    render(){
        return(
            <div>
                <nav>
                    <Link to='/'><div>Home</div></Link>
                    <Link to='/profile'><div>Profile</div></Link>
                    <Link to='/search'><div>Search Locations</div></Link>
                </nav>
            </div>
        )
    }
}