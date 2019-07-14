import React from 'react';
import querystring from 'querystring'
export default class extends React.Component<GoogleLoginProps> {
    login() {
        const { client_id, redirect_uri, scopes } = this.props;
        const query = querystring.stringify({
            client_id,
            redirect_uri,
            response_type: "token",
            scope: scopes.join(' '),
        });
        window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?' + query;
    }

    render() {
        return (
            <button onClick={e => this.login()}>{this.props.children}</button>
        )
    }
}
interface GoogleLoginProps {
    client_id: string,
    redirect_uri: string,
    scopes: string[],
    children?: React.ReactNode,
}