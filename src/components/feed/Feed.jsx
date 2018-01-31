import React, {Component} from 'react';
import Header from '../header/Header';
import axios from 'axios';
import {getUserInfo} from '../ducks/users'
import { connect } from 'react-redux';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        this.props.getUserInfo()
        const {user} = this.props
        var id = {
            id: user.auth_id
        }
        axios.post('http://localhost:4000/getfollowerstrips', id ).then(res => {
            console.log(res.data)
        })
    }
    render(){
        return(
            <div>
                <Header/>
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