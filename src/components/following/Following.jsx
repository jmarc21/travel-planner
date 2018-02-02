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
    componentDidMount(){
        this.props.getUserInfo()
        const {user} = this.props;
        console.log(user)
        var id = {
            authid: user.auth_id
        }
        axios.post('/get-following',id).then(res => {
            this.setState({
                following: res.data
            })
        })
    }
    render() {
        console.log(this.state.following)
        let following = this.state.following.map((e,i) => {
            return(
                <div key={i} className="followingUsers">
                    <img src={e.friendimg}/>
                    <h1>{e.friendusername}</h1>
                </div>
            )
        })
        return (
            <div className="following">
                <div>Following</div>
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
