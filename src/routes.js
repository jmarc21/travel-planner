import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import Search from './components/search/Search';
import Planner from './components/trip_plan/Planner';
import Feed from './components/feed/Feed';

export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/feed' component={Feed}/>
        <Route path='/profile' component={Profile} />
        <Route path='/search' component={Search} />
        <Route path='/planner' component={Planner} />
    </Switch>
)