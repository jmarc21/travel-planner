import axios from 'axios';

const initialState = {
    user: {}
}

const GET_USER_INFO = 'GET_USER_INFO'
const GET_USER_TRIPS = 'GET_USER_TRIPS'

export function getUserInfo() {
    let userData = axios.get('/auth/me').then(res => {
        return res.data;
    })
    return {
        type: GET_USER_INFO,
        payload: userData
    }
}
// export function getTrips(){
//     let tripData = axios.get('/getUserTrips').then(res => {
//         console.log(res)
//     })
//     return {
//         type: GET_USER_TRIPS,
//         payload: 
//     }
// }

export default function reducer(state = initialState, action){
    switch(action.type) {
        case GET_USER_INFO + '_FULFILLED':
            return Object.assign({}, state, {user: action.payload})
        default:
        return state;
    }
}
