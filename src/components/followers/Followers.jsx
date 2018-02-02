import React, { Component } from 'react';
import './followers.css';
import {connect} from 'react-redux';
import axios from 'axios';
import { getUserInfo} from './../ducks/users'

class Followers extends Component {
    constructor(){
        super();
            this.state = {
                followers: []
        }
    }
    componentDidMount(){
        this.props.getUserInfo();
        const {user} = this.props
        var id = {
            authid: user.auth_id
        }
        axios.post('/get-followers', id).then(res => {
            console.log(res)
            this.setState({
                followers: res.data
            })
        })
    }
    render() {
        let followers = this.state.followers.map((e,i) => {
            return(
                <div className="followers">
                    <img src={e.img} />
                    <h1>{e.username}</h1>
                </div>
            )
        })
        return (
            <div className="followers">
                <div>Followers</div>
                {followers}
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, { getUserInfo })(Followers)