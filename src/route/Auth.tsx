import React from 'react';
import GoogleAuth from '../lib/GoogleAuth';

export default class extends React.Component<IProps> {
    componentDidMount() {
        // cookieにトークン情報を設定
        GoogleAuth.setCookieFromAuth();
        window.close();
    }
    render() {
        return (
            <p>This window will close automatically</p>
        )
    }
}
interface IProps {
    scops: string[]
}
