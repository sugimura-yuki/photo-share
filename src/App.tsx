import React from 'react';
import './App.css';
import Route from './route/Route'

export default class extends React.Component {
  render() {
    return (
      <div className="App">
        <header>
          共通ヘッダ
        </header>
        <hr />
        <Route />
        <hr />
        <footer>
          共通フッタ
        </footer>
      </div>
    );
  }
}
