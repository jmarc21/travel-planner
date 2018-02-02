import React, { Component } from 'react';
import './friends.css';
import axios from 'axios';

export default class Friends extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            friendsearch: ''
        }
    }
    componentDidMount() {
        axios.get('/get-users').then(res => {
            this.setState({
                users: res.data
            })
        })
    }
    updateSearchFriends(val) {
        this.setState({
            friendsearch: val
        })
    }
    render() {
        let users = this.state.users.filter((e, i) => {
            return e.username.toString().toLowerCase().includes(this.state.friendsearch)})
        let searchedUsers = users.map((e, i) => {
                return (
                    <div key={i}>
                        <img src={e.img} alt="" className='friendsearchimg' />
                        <h1 className='friendsearchusername'>{e.username}</h1>
                        <p className='friendsearchdescription'>{e.description ? e.description : null}</p>
                    </div>
                )
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