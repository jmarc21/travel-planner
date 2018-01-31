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
            userTrips: []
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
            var tripid = res.data.map((e,i) => {
                return e.id
            })
            var ids = {
                tripid: tripid
            }
            axios.post('http://localhost:4000/gettripinfo', ids).then(res => {
                this.setState({
                    userTrips: res.data
                })
            })
        })
        axios.post('http://localhost:4000/numOfFollowing', id).then(res => {
            this.setState({
                following: res.data[0].count
            })
        })
        axios.post('http://localhost:4000/numOfFollowers', id).then(res => {
            this.setState({
                followers: res.data[0].count
            })
        })
    }
 
    openAddFriends() {
        console.log(this.props.user)
        const { user } = this.props;
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
    closeAddFriends() {
        this.setState({
            addFriendsModal: false
        })
    }
    addFriend(i) {
        let friend = this.state.users[i];
        const { user } = this.props
        var id = {
            auth_id: user.auth_id
        }
        const friendInput = {
            friend: friend,
            user: user
        }
        console.log(friend)
        axios.post('http://localhost:4000/add-friend', friendInput).then(res => {
            console.log(res)
            axios.post('http://localhost:4000/numOffollowing', id).then(res => {
                this.setState({
                    following: res.data[0].count
                })
            })
        })
    }
    render() {
        const user = this.props.user;
        // console.log(this.state.tripData)
        // console.log(user)
        let trips = this.state.tripData.map((e, i) => {
            return <div key={i} onClick={() => this.tripInfo(i)} className='trip-name'>{e.tripname}</div>
        })
        let users = this.state.users.map((e, i) => {
            return (
                <div key={i} className='addFriendslist'>
                    <img src={e.img} alt="" className='friend-profile-img' />
                    <h1>{e.username}</h1>
                    <div className='add-friend-button' onClick={() => this.addFriend(i)}>Add Friend</div>
                </div>
            )
        })
        console.log(this.state.userTrips)
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
                    </div>
                </div>
                <div className="trip-details">

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