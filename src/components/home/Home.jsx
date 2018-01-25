import React, {Component} from 'react';
import '../../reset.css'
import './home.css'

export default class Home extends Component{
    render(){
        return(
            <div className='home'>
                <h1 className='titleHome'>Bucketlist Planner</h1>
                <h3>Plan the trip of your dreams with us.</h3>
                <a style={{textDecoration: 'none', color: 'black'}} href={process.env.REACT_APP_LOGIN}><div className='login'>Login</div></a>
            </div>
        )
    }
}