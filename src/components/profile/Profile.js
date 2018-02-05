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
import { Link } from 'react-router-dom';
import trashcan from './trashcan.svg'


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
            username: '',
            bio: '',
            tripnames: [],
            tripDetailsModal: false,
            specTripId: '',
            deleted: 'deleted'
        }
        this.closeAddFriends = this.closeAddFriends.bind(this)
        this.closeProfileModal = this.closeProfileModal.bind(this)
        this.openTripDetailsModal = this.openTripDetailsModal.bind(this)
        this.closeTripDetailModal = this.closeTripDetailModal.bind(this)
    }
    async componentDidMount() {
        await this.props.getUserInfo()
        const user = this.props.user
        var id = {
            auth_id: user.auth_id
        }
        await axios.post('/getUserTrips', id).then(res => {
            var tripid = res.data.map((e, i) => {
                return e.id
            })
            var ids = {
                tripid: tripid
            }
            axios.post('/gettripinfo', ids).then(res => {
                this.setState({
                    userTrips: res.data.trip
                })
            })
        })
        await axios.post('/numOfFollowing', id).then(res => {
            this.setState({
                following: res.data[0].count
            })
        })
        await axios.post('/numOfFollowers', id).then(res => {
            this.setState({
                followers: res.data[0].count
            })
        })
        await axios.post('/getUserTrips', id).then(res => {
            this.setState({
                tripnames: res.data
            })
        })
    }

    openAddFriends() {
        const { user } = this.props;
        axios.get('/get-users').then(res => {
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
        axios.post('/add-friend', friendInput).then(res => {
            axios.post('/numOffollowing', id).then(res => {
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
        this.setState({
            uploadedFile: files[0]
        })
        this.handleImageUpload(files[0])
    }
    handleImageUpload(file) {
        let upload = request.post(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
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
    updateUsername(val) {
        this.setState({
            username: val
        })
    }
    updateBio(val) {
        this.setState({
            bio: val
        })
    }
    updateProfile() {
        let username = this.state.username || this.props.user.username;
        let profilePic = this.state.uploadedFileCloudinaryUrl || this.props.user.img;
        let bio = this.state.bio || this.props.user.description;
        const { user } = this.props
        // const { username, bio, uploadedFileCloudinaryUrl } = this.state
        let profile = {
            profilepic: profilePic,
            username: username,
            bio: bio,
            user: user.auth_id
        }
        axios.post('/update-profile', profile).then(res => {
            console.log(res)
        })
    }
    openTripDetailsModal(i) {
        console.log(i)
        console.log(this.state.userTrips[i])
        this.setState({
            tripDetailsModal: true,
            specTripId: i
        })
    }
    closeTripDetailModal() {
        this.setState({
            tripDetailsModal: false
        })
    }
    deleteTrip() {
        const i = this.state.specTripId;
        const usertrip = this.state.userTrips
        var tripid = {
            tripid: usertrip[i].tripinfo.id
        }
        axios.post('/delete-trip', tripid).then(res => {
            console.log(res)
            if (res.data === 'deleted') {
                window.location.reload()
            }
        })
    }
    deleteHotel() {
        const i = this.state.specTripId;
        const usertrip = this.state.userTrips;
        var hotelid = {
            hotelid: usertrip[i].hotel.tripid
        }
        axios.post('/delete-hotel', hotelid).then(res => {
            console.log(res)
        })
    }
    deleteTransport() {
        const i = this.state.specTripId;
        const usertrip = this.state.userTrips;
        var hotelid = {
            hotelid: usertrip[i].hotel.tripid
        }
        axios.post('/transport-hotel', hotelid).then(res => {
            console.log(res)
        })
    }
    deleteAmuse() {
        const i = this.state.specTripId;
        const usertrip = this.state.userTrips;
        var hotelid = {
            hotelid: usertrip[i].hotel.tripid
        }
        axios.post('/amuse-hotel', hotelid).then(res => {
            console.log(res)
        })
    }
    deleteShop() {
        const i = this.state.specTripId;
        const usertrip = this.state.userTrips;
        var hotelid = {
            hotelid: usertrip[i].hotel.tripid
        }
        axios.post('/shop-hotel', hotelid).then(res => {
            console.log(res)
        })
    }
    deleteFood() {
        const i = this.state.specTripId;
        const usertrip = this.state.userTrips;
        var hotelid = {
            hotelid: usertrip[i].hotel.tripid
        }
        axios.post('/food-hotel', hotelid).then(res => {
            console.log(res)
        })
    }
    render() {
        const user = this.props.user;
        console.log(this.state.userTrips)
        let users = this.state.users.map((e, i) => {
            return (
                <div key={i} className='addFriendslist'>
                    <img src={e.img} alt="" className='friend-profile-img' />
                    <h1>{e.username}</h1>
                    <div className='add-friend-button' onClick={() => this.addFriend(i)}>Add Friend</div>
                </div>
            )
        })
        let trips = this.state.userTrips.map((e, i) => {
            return (
                <div key={i} className='usertrip'>
                    <div className='usertripname'>{e.tripinfo.tripname}</div>
                    <div className='details' onClick={() => this.openTripDetailsModal(i)}>
                        <div className="detailsdot"></div>
                        <div className="detailsdot"></div>
                        <div className="detailsdot"></div>
                    </div>
                    <div className="hotels-profile">
                        <div className='userhotelname'>{e.hotel ? e.hotel.hotelname : null}</div>
                        <div className='userhotelrating'>{e.hotel ? e.hotel.hotelrating : null}</div>
                    </div>
                    <div className="transportations">
                        <div className='usertransportname'>{e.transport ? e.transport.transportname : null}</div>
                        <div className='usertransportrating'>{e.transport ? e.transport.transportrating : null}</div>
                    </div>
                    <div className="amusements">
                        <div className='useramusename'>{e.amuse ? e.amuse.amusename : null}</div>
                        <div className='useramuserating'>{e.amuse ? e.amuse.amuserating : null}</div>

                    </div>
                    <div className="shoppings">
                        <div className='usershoppingname'>{e.shopping ? e.shopping.shopname : null}</div>
                        <div className='usershoppingrating'>{e.shopping ? e.shopping.shoprating : null}</div>
                    </div>
                    <div className="foods">
                        <div className='userfoodname'>{e.food ? e.food.foodname : null}</div>
                        <div className='userfoodrating'>{e.food ? e.food.foodrating : null}</div>
                    </div>
                </div>
            )
        })
        let preview = () => {
            if (this.state.uploadedFileCloudinaryUrl) {
                return (
                    <div>
                        <p>{this.state.uploadedFile ? this.state.uploadedFile.name : null}</p>
                        <img className='profilepicupdate' src={this.state.uploadedFileCloudinaryUrl ? this.state.uploadedFileCloudinaryUrl : null} />
                    </div>
                )
            }
            return null
        }
        let tripNames = this.state.tripnames.map((e, i) => {
            return (
                <div key={i}>
                    <div className='profileTripname'>{e.tripname}</div>
                </div>
            )
        })
        const usertrips = this.state.userTrips
        const ti = this.state.specTripId
        return (
            <div className='background1'>
                <div className='backgroundop1'>
                    <Header />
                    <div className='profile-container'>
                        <img className='profile-pic' src={user ? user.img : null} />
                        <h2 className='name-profile'>{user ? user.username : null}</h2>
                        <p>{user ? user.description : null}</p>
                    </div>
                    <div>
                    <Link to='/followers' style={{ textDecoration: 'none', color: '#000000' }}><div className="followers-list">
                        <div className="followers">
                            <div>Followers</div>
                            <div className="numOfFollowers">{this.state.followers}</div>
                        </div>
                    </div></Link>
                    <Link to='/following' style={{ textDecoration: 'none', color: '#000000' }}><div className="following-list">
                        <div className="following">
                            <div>Following</div>
                            <div className="numOfFollowing">{this.state.following}</div>
                        </div>
                    </div></Link>
                    <Link to='/friends' style={{ textDecoration: 'none', color: '#000000' }}><div className="follower-search-button" onClick={() => this.openAddFriends()}>Search Friends</div></Link>
                    <img className='settings' src={editsvg} alt="" onClick={() => this.editProfile()} />
                    </div>
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
                        ariaHideApp={false}
                    >
                        <Dropzone
                            className='dropzoneProfile'
                            multiple={false}
                            accept='image/*'
                            onDrop={this.onImageDrop.bind(this)}
                        >
                            <p>Drop an image or click to select a photo to update Profile</p>
                        </Dropzone>
                        <div>
                            <div>
                                {preview()}
                            </div>
                        </div>
                        <h1 className='usernameText'>Username:</h1>
                        <input type="text" className='updateUsernameProfile' onChange={(e) => this.updateUsername(e.target.value)} />
                        <h1 className='bio'>Bio</h1>
                        <textarea className='descriptioninput' cols="30" rows="5" onChange={(e) => this.updateBio(e.target.value)}></textarea>
                        <button onClick={() => this.updateProfile()}>Save Changes</button>
                    </Modal>
                    <Modal
                        className='tripDetailsModal'
                        isOpen={this.state.tripDetailsModal}
                        onRequestClose={this.closeTripDetailModal}
                        ariaHideApp={false}
                    >
                        <div className="tripNameSpec">
                            {usertrips[ti] ? usertrips[ti].tripinfo.tripname : null}
                            <button onClick={() => this.deleteTrip()}>Delete Trip</button>
                        </div>
                        <div className="hotelSpec">
                            {usertrips[ti] ? (usertrips[ti].hotel ? usertrips[ti].hotel.hotelname : null) : null}
                            {usertrips[ti] ? (usertrips[ti].hotel ? usertrips[ti].hotel.hotelrating : null) : null}
                            {usertrips[ti] ? (usertrips[ti].hotel ? <button onClick={() => this.deleteHotel()}>Delete</button> : null) : null}
                        </div>
                        <div className="transportationSpec">
                            {usertrips[ti] ? (usertrips[ti].transport ? usertrips[ti].transport.transportname : null) : null}
                            {usertrips[ti] ? (usertrips[ti].transport ? usertrips[ti].transport.transportrating : null) : null}
                            {usertrips[ti] ? (usertrips[ti].transport ? <button onClick={() => this.deleteTransport()}>Delete</button> : null) : null}
                        </div>
                        <div className="amuseSpec">
                            {usertrips[ti] ? (usertrips[ti].amuse ? usertrips[ti].amuse.amusename : null) : null}
                            {usertrips[ti] ? (usertrips[ti].amuse ? usertrips[ti].amuse.amuserating : null) : null}
                            {usertrips[ti] ? (usertrips[ti].amuse ? <button onClick={() => this.deleteAmuse()}>Delete</button> : null) : null}
                        </div>
                        <div className="shoppingSpec">
                            {usertrips[ti] ? (usertrips[ti].shopping ? usertrips[ti].shopping.shopname : null) : null}
                            {usertrips[ti] ? (usertrips[ti].shopping ? usertrips[ti].shopping.shoprating : null) : null}
                            {usertrips[ti] ? (usertrips[ti].shopping ? <button onClick={() => this.deleteShop()}>Delete</button> : null) : null}
                        </div>
                        <div className="foodSpec">
                            {usertrips[ti] ? (usertrips[ti].food ? usertrips[ti].food.foodname : null) : null}
                            {usertrips[ti] ? (usertrips[ti].food ? usertrips[ti].food.foodrating : null) : null}
                            {usertrips[ti] ? (usertrips[ti].food ? <button onClick={() => this.deleteFood()}>Delete</button> : null) : null}
                        </div>
                    </Modal>
                    <div className='trips'>
                        <div className='trip-names'>
                            <div>Bucketlist Trips:</div>
                            {tripNames}
                        </div>
                    </div>
                    <div className="trip-details">
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