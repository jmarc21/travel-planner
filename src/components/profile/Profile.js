import React, { Component } from 'react';
import './profile.css'
import Header from '../header/Header'
import { getUserInfo, getTrips } from './../ducks/users'
import { connect } from 'react-redux';
import axios from 'axios';
import Modal from 'react-modal';


class Profile extends Component {
    constructor() {
        super();
        this.state = {
            tripData: [],
            hoteldetail: [],
            transportdetails: [],
            amusementdetails: [],
            fooddetails: [],
            shoppingdetails: [],
            addFriendsModal: false,
            followers: 0,
            following: 0,
            users: [],
        }
        this.closeAddFriends = this.closeAddFriends.bind(this)
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
    tripInfo(i) {
        var id = {
            tripid: this.state.tripData[i].id
        }
        axios.post('http://localhost:4000/get-hotel-info', id).then(res => {
            this.setState({
                hoteldetail: res.data
            })
        })
        axios.post('http://localhost:4000/get-transport-info', id).then(res => {
            this.setState({
                transportdetails: res.data
            })
        })
        axios.post('http://localhost:4000/get-amusement-info', id).then(res => {
            this.setState({
                amusementdetails: res.data
            })
        })
        axios.post('http://localhost:4000/get-shopping-info', id).then(res => {
            this.setState({
                shoppingdetails: res.data
            })
        })
        axios.post('http://localhost:4000/get-food-info', id).then(res => {
            this.setState({
                fooddetails: res.data
            })
        })
    }
    openAddFriends(){
        console.log(this.props.user)
        const {user} = this.props;
        axios.get('http://localhost:4000/get-users').then(res => {
            console.log(res)
            this.setState({
                users: res.data
            })
        })
        this.setState({
            addFriendsModal: true
        })
    }
    closeAddFriends(){
        this.setState({
            addFriendsModal: false
        })
    }
    addFriend(i){
        let friend = this.state.users[i];
        const {user} = this.props
        const friendInput = {
            friend: friend,
            user: user
        }
        console.log(friend)
        axios.post('http://localhost:4000/add-friend', friendInput).then(res => {
            console.log(res)
        })
    }
    render() {
        const user = this.props.user;
        // console.log(this.state.tripData)
        // console.log(user)
        let trips = this.state.tripData.map((e, i) => {
            return <div key={i} onClick={() => this.tripInfo(i)} className='trip-name'>{e.tripname}</div>
        })
        let hotels = this.state.hoteldetail.map((e, i) => {
            return (
                <div key={i}>
                    <div>{e.name}</div>
                    <div>{e.rating}</div>
                </div>
            )
        })
        let transports = this.state.transportdetails.map((e, i) => {
            return (
                <div key={i}>
                    <div>{e.name}</div>
                    <div>{e.rating}</div>
                </div>
            )
        })
        let amusements = this.state.amusementdetails.map((e, i) => {
            return (
                <div key={i}>
                    <div>{e.name}</div>
                    <div>{e.rating}</div>
                </div>
            )
        })
        let shoppings = this.state.shoppingdetails.map((e, i) => {
            return (
                <div key={i}>
                    <div>{e.name}</div>
                    <div>{e.rating}</div>
                </div>
            )
        })
        let foods = this.state.fooddetails.map((e, i) => {
            return (
                <div key={i}>
                    <div>{e.name}</div>
                    <div>{e.rating}</div>
                </div>
            )
        })
        let users = this.state.users.map((e,i)=> {
            return (
            <div key={i} className='addFriendslist'>
                <img src={e.img} alt="" className='friend-profile-img'/>
                <h1>{e.username}</h1>
                <div className='add-friend-button' onClick={() => this.addFriend(i)}>Add Friend</div>
            </div>
            )
        })
        return (
            <div>
                <Header />
                <div className='profile-container'>
                    <img className='profile-pic' src={user ? user.img : null} alt='profilePic' />
                    <h2 className='name-profile'>{user ? user.username : null}</h2>
                </div>
                <div className="followers-list">
                    <div className="followers">
                        <div>Followers</div>
                        <div className="numOfFollowers">{this.state.followers}</div>
                    </div>
                </div>
                <div className="following-list">
                    <div className="following">
                        <div>Following</div>
                        <div className="numOfFollowing">{this.state.following}</div>
                    </div>
                </div>
                    <div className="follower-search-button" onClick={() => this.openAddFriends()}>Search Friends</div>
                    <Modal
                        className='addFriendModal'
                        isOpen={this.state.addFriendsModal}
                        onRequestClose={this.closeAddFriends}
                    >
                        {users}
                    </Modal>
                <div className='trips'>
                    <div className='trip-names'>
                        {trips}
                    </div>
                </div>
                <div className="trip-details">
                    <div className="hotelpackage">
                        <div className="hotel-img">

                        </div>
                        <div className="hoteldetails">
                            {hotels}
                        </div>
                    </div>
                    <div className="transportsandtitle">
                        <div className="triptitle">

                        </div>
                        <div className="transportdetaisl">
                            {transports}
                        </div>
                    </div>
                    <div className="amusementdetails">
                        {amusements}
                    </div>
                    <div className="shoppingdetails">
                        {shoppings}
                    </div>
                    <div className="dining">
                        {foods}
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