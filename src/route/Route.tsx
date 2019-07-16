import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PhotoList from './photo/List'
import Auth from './Auth'
export default class extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/auth" component={Auth} />
                    <Route path="/" render={() => (
                        <Switch>
                            <Route exact path="/" component={PhotoList} />
                            <Route render={() => <h1>404 Not Found</h1>} />
                        </Switch>
                    )} />
                </Switch>
            </BrowserRouter>
        )
    }
}


