import React from 'react';
import './App.css';
import Route from './route/Route'

export default class extends React.Component {
  componentDidCatch() {
    window.location.href = '/error';
  }
  render() {
    return (
      <div className="App">
        <Route />
      </div>
    )
  }
}
