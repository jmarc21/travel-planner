import React, {Component} from 'react';
import './search.css'
import axios from 'axios';


export default class Search extends Component{
    constructor(){
        super();
        this.state = {
            clientID: '8f4b58587ff24fd7ac70647e31233bfd'
        }
    }
    componentDidMount(){
        let promise = axios.get('')
    }
    render(){
        return(
            <div>
                <h1>This is the search page</h1>
            </div>
        )
    }
}