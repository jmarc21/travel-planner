import React, { Component } from 'react';
import './friends.css';
import { connect } from 'react-redux';
import axios from 'axios';
import { getUserInfo } from './../ducks/users'

class Friends extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            friendsearch: '',
            friends: []
        }
    }
    async componentDidMount() {
        await this.props.getUserInfo()
        const { user } = this.props
        await axios.get('/get-users').then(res => {
            this.setState({
                users: res.data
            })
        })
        const id = {
            authid: user.auth_id
        }
        await axios.post('/get-following', id).then(res => {
            this.setState({
                friends: res.data
            })
        })
    }
    updateSearchFriends(val) {
        this.setState({
            friendsearch: val
        })
    }
    addFriend(i) {
        const { user } = this.props
        console.log(this.state.users[i])
        console.log(user)
        var id = {
            user: {
                auth_id: user.auth_id
            },
            friend: {
                username: this.state.users[i].username,
                auth_id: this.state.users[i].auth_id,
                img: this.state.users[i].img
            }
        }
        axios.post('/add-friend', id).then(res => {
            console.log(res)
        })
    }
    removeFriend(i) {
        console.log('remove')
    }
    render() {
        console.log(this.state.friends)
        let users = this.state.users.filter((e, i) => {
            return e.username.toString().toLowerCase().includes(this.state.friendsearch)
        })
        let searchedUsers = users.map((e, i) => {
            for (var index = 0; index <= this.state.friends.length; index++) {
                return (
                    <div key={i} className='user'>
                        <img src={e.img} alt="" className='friendsearchimg' />
                        <div className='usernameanddesc'>
                            <h1 className='friendsearchusername'>{e.username}</h1>
                            <p className='friendsearchdescription'>{e.description ? e.description : null}</p>
                        </div>
                        {this.state.users[i].auth_id === (this.state.friends[index] ? this.state.friends[index].friendauthid : null) ? <button onClick={() => this.removeFriend(i)} className='removeFriend'>Unfollow</button> : <button onClick={() => this.addFriend(i)} className='addFriend'>Follow</button>}
                    </div>
                )
            }
        })
        return (
            <div className="users">
                <div>Search Users</div>
                <input type="text" placeholder='Search' className='searchinput' onChange={(e) => this.updateSearchFriends(e.target.value)} />
                {searchedUsers}
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, { getUserInfo })(Friends)
