import React, { Component } from 'react';
import Header from '../header/Header';
import axios from 'axios';
import { getUserInfo } from '../ducks/users'
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            followingTrips: []
        }
    }
    async componentDidMount() {
        await this.props.getUserInfo()
        const { user } = this.props
        var id = {
            id: user.auth_id
        }
        await axios.post('/getfollowerstrips', id).then(res => {
            this.setState({
                followingTrips: res.data
            })
        })
    }
    render() {
        let trips = this.state.followingTrips.map((e, i) => {
            return (
                <div key={i}>
                    <img src={e.friendimg} alt=""/>
                    <div>{e.friendusername}</div>
                    <div>{e.tripname}</div>
                    <div>{e.hotelname}</div>
                    <div>{e.hotelrating}</div>
                    <div>{e.transportname}</div>
                    <div>{e.transportrating}</div>
                    <div>{e.amusename}</div>
                    <div>{e.amuserating}</div>
                    <div>{e.shoppingname}</div>
                    <div>{e.shoppingrating}</div>
                    <div>{e.foodname}</div>
                    <div>{e.foodrating}</div>
                </div>
            )
        })
        return (
            <div>
                <Header />
                <div className='followingtrips'>
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
export default connect(mapStateToProps, { getUserInfo })(Home)