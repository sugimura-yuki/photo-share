import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PhotoList from './photo/List'
import Auth from './Auth'
import GoogleAuth from '../lib/GoogleAuth'
export default class extends React.Component {
    auth: GoogleAuth = new GoogleAuth();
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/auth" component={Auth} />
                    <Route path="/" render={() => (
                        <Switch>
                            <Route exact path="/" render={() => <PhotoList auth={this.auth} />} />
                            <Route render={() => <h1>404 Not Found</h1>} />
                        </Switch>
                    )} />
                </Switch>
            </BrowserRouter>
        )
    }
}