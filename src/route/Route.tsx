import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './Login'
import PhotoList from './photo/List'

export default class extends React.Component {
    state = {
        auth: null,
    }
    render() {
        return (
            <BrowserRouter>
                <Route exact path="/" component={Login} />
                <Route path="/photo/list" component={PhotoList} />
            </BrowserRouter>
        )
    }
}