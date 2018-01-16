import React, {Component} from 'react';
import './search.css'
import axios from 'axios';
import Header from '../header/Header';


export default class Search extends Component{
    constructor(){
        super();
        this.state = {
            
        }
    }
    hitApi(){
        axios.get()
        .then( res => {
            console.log(res)
        })
    }
    
    render(){
        return(
            <div>
                <Header/>
                <h1>This is the search page</h1>
                <button onClick = { ()=> this.hitApi }>Hit the api</button>
                <input type="date" name="" id=""/>
            </div>
        )
    }
}