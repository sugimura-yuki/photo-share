import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AlbumList from './photo/AlbumList'
import PhotoUpload from './photo/Upload'
import Auth from './Auth'
export default class extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/auth" component={Auth} />
          <Redirect exact from="/" to="/album/list" />
          <Route exact path="/album/list" component={AlbumList} />
          <Route exact path="/upload/:id" component={PhotoUpload} />
          <Route exact path="/error" render={() => <h1>Error</h1>} />
          <Route render={() => <h1>404 Not Found</h1>} />
        </Switch>
      </BrowserRouter>
    )
  }
}


