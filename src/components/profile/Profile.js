import React, { Component } from 'react';
import './profile.css'
import Header from '../header/Header'
import { getUserInfo, getTrips } from './../ducks/users'
import { connect } from 'react-redux';
import axios from 'axios';
import Modal from 'react-modal';
import editsvg from './edit.svg';
import Dropzone from 'react-dropzone';
import request from 'superagent';


class Profile extends Component {
    constructor(props) {
        super(props);
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
            userTrips: [],
            editProfileModal: false,
            uploadedFileCloudinaryUrl: '',
        }
        this.closeAddFriends = this.closeAddFriends.bind(this)
        this.closeProfileModal = this.closeProfileModal.bind(this)
        // this.onImageDrop = this.onImageDrop.bind(this)
    }
    componentDidMount() {
        this.props.getUserInfo()
        const user = this.props.user
        var id = {
            auth_id: user.auth_id
        }
        console.log(id)
        axios.post('http://localhost:4000/getUserTrips', id).then(res => {
            var tripid = res.data.map((e, i) => {
                return e.id
            })
            var ids = {
                tripid: tripid
            }
            axios.post('http://localhost:4000/gettripinfo', ids).then(res => {
                this.setState({
                    userTrips: res.data.trip
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
    editProfile() {
        this.setState({
            editProfileModal: true
        })
    }
    closeProfileModal() {
        this.setState({
            editProfileModal: false
        })
    }
    onImageDrop(files) {
        console.log(files)
        this.setState({
            uploadedFile: files[0]
        })
        this.handleImageUpload(files[0])
    }
    handleImageUpload(file) {
        let upload = request.post('https://api.cloudinary.com/v1_1/travel-project/image/upload')
            .field('upload_preset', 'justin')
            .field('file', file);
        upload.end((err, response) => {
            if (err) {
                console.error(err)
            }
            if (response.body.secure_url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url
                })
            }
        })
    }
    render() {
        const user = this.props.user;
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
        let trips = this.state.userTrips.map((e, i) => {
            return (
                <div key={i} className='usertrip'>
                    <div className='usertripname'>{e.tripinfo.tripname}</div>
                    <div className='userhotelname'>{e.hotel ? e.hotel.hotelname : null}</div>
                    <div className='userhotelrating'>{e.hotel ? e.hotel.hotelrating : null}</div>
                    <div className='usertransportname'>{e.transport ? e.transport.transportname : null}</div>
                    <div className='usertransportrating'>{e.transport ? e.transport.transportrating : null}</div>
                    <div className='useramusename'>{e.amuse ? e.amuse.amusename : null}</div>
                    <div className='useramuserating'>{e.amuse ? e.amuse.amuserating : null}</div>
                    <div className='usershoppingname'>{e.shopping ? e.shopping.shopname : null}</div>
                    <div className='usershoppingrating'>{e.shopping ? e.shopping.shoprating : null}</div>
                    <div className='userfoodname'>{e.food ? e.food.foodname : null}</div>
                    <div className='userfoodrating'>{e.food ? e.food.foodrating : null}</div>
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
                <img className='settings' src={editsvg} alt="" onClick={() => this.editProfile()} />
                <Modal
                    className='addFriendModal'
                    isOpen={this.state.addFriendsModal}
                    onRequestClose={this.closeAddFriends}
                >
                    {users}
                </Modal>
                <Modal
                    className='editProfileModal'
                    isOpen={this.state.editProfileModal}
                    onRequestClose={this.closeProfileModal}
                >
                    <Dropzone
                        multiple={false}
                        accept='image/*'
                        onDrop={this.onImageDrop.bind(this)}
                    >
                        <p>Drop an image or click to select a file to upload</p>
                    </Dropzone>
                    <div>
                        <div className="FileUpload">

                        </div>
                        <div>
                            {this.state.uploadedFileCloudinaryUrl = '' ? null :
                                <div>
                                    <p>{this.state.uploadedFile ? this.state.uploadedFile.name : null}</p>
                                    <img src={this.state.uploadedFileCloudinaryUrl}/>
                                </div>}
                        </div>
                    </div>
                    <h1>Username:</h1>
                    <input type="text" className='updateUsername' />
                    <h1>Bucketlist Trips and About You:</h1>
                    <input type="text" className='bucketlisttrips' />
                </Modal>
                <div className='trips'>
                    <div className='trip-names'>
                        <div>Bucketlist Trips:</div>
                    </div>
                </div>
                <div className="trip-details">
                    {trips}
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