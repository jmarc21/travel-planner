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
        console.log(this.state.users[i])
    }
    removeFriend(i){
        console.log('remove')
    }
    render() {
        console.log(this.state.friends)
        let users = this.state.users.filter((e, i) => {
            return e.username.toString().toLowerCase().includes(this.state.friendsearch)
        })
        let searchedUsers = users.map((e, i) => {
            for(var l = 0; l <= this.state.friends; l++){
                if(users[i].auth_id === (this.state.friends[l] ? this.state.friends[l].userauthid : null)){
                    return (
                        <div key={i}>
                            <img src={e.img} alt="" className='friendsearchimg' />
                            <h1 className='friendsearchusername'>{e.username}</h1>
                            <p className='friendsearchdescription'>{e.description ? e.description : null}</p>
                            <button onClick={() => this.removeFriend(i)} className='RemoveFriend'>Remove Friend</button>
                        </div>
                    )
                }
                if(users[i].auth_id !== (this.state.friends[l] ? this.state.friends[l].userauthid : null)){
                    return (
                        <div key={i}>
                            <img src={e.img} alt="" className='friendsearchimg' />
                            <h1 className='friendsearchusername'>{e.username}</h1>
                            <p className='friendsearchdescription'>{e.description ? e.description : null}</p>
                            <button onClick={() => this.addFriend(i)} className='addFriend'>Add Friend</button>
                        </div>
                    )
                }
            }
        })
        return (
            <div className="users">
                <div>Search Users</div>
                <input type="text" placeholder='Search' onChange={(e) => this.updateSearchFriends(e.target.value)} />
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
