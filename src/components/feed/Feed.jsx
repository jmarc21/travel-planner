import React, { Component } from 'react';
import Header from '../header/Header';
import axios from 'axios';
import { getUserInfo } from '../ducks/users'
import { connect } from 'react-redux';
import './feed.css'

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
                <div key={i} className='friendtrip'>
                    <div className='friendcontent'>
                        <img src={e.friendimg} alt="" className='feedfriendimg' />
                        <div className='feedfriendusername'>{e.friendusername}</div>
                    </div>
                    <div className='tripnamecontent'>
                        <div className='feedtripname'>{e.tripname}</div>
                    </div>
                    <div className='hotelandtransportcontent'>
                        <div className='feedhotelname'>{e.hotelname}</div>
                        <div className='feedhotelrating'>{e.hotelrating}</div>
                        <div className='feedtransportname'>{e.transportname}</div>
                        <div className='feedtransportrating'>{e.transportrating}</div>
                    </div>
                    <div className='amuseshopandfoodcontent'>
                        <div className='feedamusename'>{e.amusename}</div>
                        <div className='feedamuserating'>{e.amuserating}</div>
                        <div className='feedshoppingname'>{e.shopname}</div>
                        <div className='feedshoppingrating'>{e.shoprating}</div>
                        <div className='feedfoodname'>{e.foodname}</div>
                        <div className='feedfoodrating'>{e.foodrating}</div>
                    </div>
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