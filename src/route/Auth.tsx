import React from 'react';
import querystring from 'querystring'

export default class extends React.Component<IProps> {
    componentDidMount() {
        const query: querystring.ParsedUrlQuery = querystring.parse(window.location.hash.substring(1), '&', '=')
        if (window.opener) {
            window.opener.postMessage(query);
        }
        window.close()
    }
    render() {
        return (
            <h1>This window will close automatically</h1>
        )
    }
}
interface IProps {
    scops: string[]
}
