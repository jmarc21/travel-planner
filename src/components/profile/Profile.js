import React, { Component } from 'react';
import './profile.css'
import Header from '../header/Header'
import { getUserInfo, getTrips } from './../ducks/users'
import { connect } from 'react-redux';
import axios from 'axios';


class Profile extends Component {
    constructor() {
        super();
        this.state = {
            tripData: []
        }
    }
    componentDidMount() {
        this.props.getUserInfo()
        const user = this.props.user
        var id = {
            auth_id: user.auth_id
        }
        console.log(id)
        axios.post('http://localhost:4000/getUserTrips', id).then(res => {
            this.setState({
                tripData: res.data
            })
        })
    }
    tripInfo(i){
        var id = {
            tripid: this.state.tripData[i].id
        }
        axios.post('http://localhost:4000/get-hotel-info', id).then(res => {
            console.log(res)
        })
    }

    render() {
        const user = this.props.user;
        console.log(this.state.tripData)
        console.log(user)
        let trips = this.state.tripData.map((e, i) => {
            return <div key={i} onClick={() => this.tripInfo(i)}>{e.tripname}</div>
        })
        return (
            <div>
                <Header />
                <div className='profile-container'>
                    <img className='profile-pic' src={user ? user.img : null} alt='profilePic' />
                    <h2 className='name-profile'>{user ? user.username : null}</h2>
                </div>
                <div className='trips'>
                    <div className='trip-names'>
                        {trips}
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, { getUserInfo })(Profile)