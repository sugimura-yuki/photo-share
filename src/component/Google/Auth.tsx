import React from 'react';
import * as GoogleAuth from '../../lib/GoogleAuth'
import LoginButton from './LoginButton'

export default class extends React.Component<{ scopes: string[], onAuth?: () => void }> {
  state = {
    hasAuth: false,
  }
  async login() {
    await GoogleAuth.auth(this.props.scopes);
    this.setState({ hasAuth: true });
    if (this.props.onAuth) this.props.onAuth();
  }

  logout() {
    GoogleAuth.clearAuthCookie();
    this.setState({ hasAuth: false });
  }

  componentWillMount() {
    if (GoogleAuth.hasAuth(this.props.scopes)) {
      this.setState({ hasAuth: true });
      if (this.props.onAuth) this.props.onAuth();
    } else {
      this.setState({ hasAuth: false });
    }
  }
  render() {
    if (this.state.hasAuth) {
      return (
        <div>
          <header>
            <div style={{ textAlign: 'right' }}>
              <button onClick={e => this.logout()}>ログアウト</button>
            </div>
          </header>
          {this.props.children}
        </div>
      )
    } else {
      return (
        <div>
          <p>サービスをご利用いただくためには、Googleアカウントが必要です。</p>
          <LoginButton thema='dark' onClick={e => this.login()} />
        </div>
      )
    }
  }
}
