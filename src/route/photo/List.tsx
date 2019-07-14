import React from 'react';
// import { Redirect } from 'react-router';
// import url from 'url';


interface IState {
    sharedAlbumsList?: {
        sharedAlbums?: Album[],
        nextPageToken?: string,
    },
    titleText: string,
}
interface Album {
    "id": string,
    "title": string,
    "productUrl": string,
    "isWriteable": boolean,
    "shareInfo"?: any,
    "mediaItemsCount": string,
    "coverPhotoBaseUrl": string,
    "coverPhotoMediaItemId": string
}
export default class extends React.Component {
    auth?: {
        access_token: string,
        token_type: string,
    }
    state: IState = {
        titleText: '',
    }
    componentDidMount() {
        const params: { [key: string]: string } = {}
        window.location.hash.substring(1).split('&').forEach((str, idx) => {
            const [key, value] = str.split('=')
            params[key] = value;
        })
        console.log(params);
        this.auth = {
            access_token: params['access_token'],
            token_type: params['token_type'],
        }
        this.getSharedAlbumsList();
    }
    private async getSharedAlbumsList() {
        if (!this.auth) return;
        const res = await fetch("https://photoslibrary.googleapis.com/v1/sharedAlbums", {
            method: "GET",
            headers: {
                Authorization: [this.auth.token_type, this.auth.access_token].join(' '),
                Origin: window.location.protocol + "//" + window.location.host
            }
        })
        const json = await res.json()
        console.log(json)
        this.setState({ sharedAlbumsList: json });
    }
    async createSharedAlbum() {
        if (!this.auth) return;
        if (!this.state.titleText) return;
        const title = this.state.titleText;
        this.setState({ titleText: '' });
        const headers = {
            Authorization: [this.auth.token_type, this.auth.access_token].join(' '),
            Origin: window.location.protocol + "//" + window.location.host
        }
        const createResponse = await fetch('https://photoslibrary.googleapis.com/v1/albums', {
            method: "POST",
            headers,
            body: JSON.stringify({
                album: { title }
            }),
        });
        const json = await createResponse.json();
        console.log(json)

        if (!json.id) return Error('cannot create album');
        const share = await fetch('https://photoslibrary.googleapis.com/v1/albums/' + json.id + ':share', {
            method: "POST",
            headers,
            body: JSON.stringify({}),
        })
        console.log(share)
        await this.getSharedAlbumsList();
    }
    render() {
        // if (!this.state.auth) return (<Redirect to="/" />)
        return (
            <div>
                <h2>共有アルバムの新規作成</h2>
                <p>タイトル<input type="text" onChange={e => this.setState({ titleText: e.target.value })} value={this.state.titleText} /></p>
                <button onClick={e => this.createSharedAlbum()}>新規作成</button>
                <hr />
                <h2>共有アルバム一覧</h2>
                {(() => {
                    if (!this.state.sharedAlbumsList) return;
                    if (!this.state.sharedAlbumsList.sharedAlbums) return;
                    return this.state.sharedAlbumsList.sharedAlbums.filter((album: Album) => album.shareInfo).map((album: Album) => (
                        <div key={album.id} style={{ textAlign: "left" }}>
                            <h3>タイトル: {album.title}</h3>
                            <label>shareToken:<input type="text" defaultValue={album.shareInfo.shareToken} readOnly /></label>
                        </div>
                    ));
                })()}
            </div>
        )
    }
}