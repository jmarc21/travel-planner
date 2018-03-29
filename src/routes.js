import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import Planner from './components/trip_plan/Planner';
import Feed from './components/feed/Feed';
import Friends from './components/friends/Friends';
import Followers from './components/followers/Followers'
import Following from './components/following/Following'

export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/feed' component={Feed}/>
        <Route path='/profile' component={Profile} />
        <Route path='/planner' component={Planner} />
        <Route path='/friends' component={Friends} />
        <Route path='/followers' component={Followers} />
        <Route path='/following' component={Following} />
    </Switch>
)