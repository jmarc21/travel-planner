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
        //using async await to get the users data before the axios call is made.
        await this.props.getUserInfo()
        const { user } = this.props
        var id = {
            id: user.auth_id
        }
        axios.post('/getfollowerstrips', id).then(res => {
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
                        <div className='hotelscomp'>
                            <div className='feedtitles'>Hotel:</div>
                            <div className='feedname'>{e.hotelname}</div>
                            <div className='feedhotelrating'>Rating: {e.hotelrating} out of 5</div>
                        </div>
                        <div className='transportcomp'>
                            <div className='feedtitles'>Transportation:</div>
                            <div className='feedname'>{e.transportname}</div>
                            <div className='feedtransportrating'>Rating: {e.transportrating} out of 5</div>
                        </div>
                    </div>
                    <div className='amuseshopandfoodcontent'>
                        <div className='amusecomp'>
                            <div className='feedtitles'>Amusement:</div>
                            <div className='feedname'>{e.amusename}</div>
                            <div className='feedamuserating'>Rating: {e.amuserating} out of 5</div>
                        </div>
                        <div className='shopcomp'>
                            <div className='feedtitles'>Shops:</div>
                            <div className='feedname'>{e.shopname}</div>
                            <div className='feedshoppingrating'>Rating: {e.shoprating} out of 5</div>
                        </div>
                        <div className='foodcomp'>
                            <div className='feedtitles'>Food:</div>
                            <div className='feedname'>{e.foodname}</div>
                            <div className='feedfoodrating'>Rating: {e.foodrating} out of 5</div>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div>
                <div className="backgroundpic">
                    <div className="picopa">
                        <Header />
                        <div className='followingtrips'>
                            {trips}
                        </div>
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
export default connect(mapStateToProps, { getUserInfo })(Home)