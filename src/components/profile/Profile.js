import React, { Component } from 'react';
import './profile.css'
import Header from '../header/Header'
import { getUserInfo } from '../../ducks/users'
import { connect } from 'react-redux';
import axios from 'axios';


class Profile extends Component {
    componentDidMount() {
        this.props.getUserInfo()
    }
    render() {
        const user = this.props.user;
        console.log(user)
        return (
            <div>
                <Header />
                <div className='profile'>
                    <h1>Profile</h1>
                    <img className='profile-pic' src={user.picture} alt="profile-pic" />
                    <h2 className='name'>{user.username}</h2>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, {getUserInfo})(Profile)