import React, { Component } from 'react';
import './following.css';
import {connect} from 'react-redux';
import axios from 'axios';
import { getUserInfo} from './../ducks/users'

class Following extends Component {
    constructor(){
        super();
        this.state = {
            following: []
        }
    }
    async componentDidMount(){
        await this.props.getUserInfo()
        const {user} = this.props;
        console.log(user)
        var id = {
            authid: user.auth_id
        }
        await axios.post('/get-following',id).then(res => {
            this.setState({
                following: res.data
            })
        })
    }
    unFollow(i){
        console.log(this.state.following[i])
        var id = {
            id: this.state.following[i].id
        }
        axios.post('/unfollow', id).then(res => {
            if(res.data === 'unfollowed'){
                window.location.reload()
            }
        })
    }
    render() {
        console.log(this.state.following)
        let following = this.state.following.map((e,i) => {
            return(
                <div key={i} className="followingUsers">
                    <img src={e.friendimg} className='followingimg'/>
                    <h1 className='followingusername'>{e.friendusername}</h1>
                    <button onClick={() => this.unFollow(i)} className='followingunfollowbutton'>Unfollow</button>
                </div>
            )
        })
        return (
            <div className="followinglist">
                <div className='followingtitleone'>Following</div>
                {following}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, { getUserInfo })(Following)
