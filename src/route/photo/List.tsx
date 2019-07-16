import React from 'react';
import GoogleAuth from '../../lib/GoogleAuth';

export default class extends React.Component {
    state: IState = {
        titleText: '',
        error: false,
        waitForCreat: false,
    }
    componentDidMount() {
        this.getSharedAlbumsList();
    }
    private async getSharedAlbumsList() {
        try {
            const listResult = await GoogleAuth.exec({
                url: "https://photoslibrary.googleapis.com/v1/sharedAlbums",
                method: "GET",
                scopes: ['https://www.googleapis.com/auth/photoslibrary'],
            });
            console.log(listResult)
            this.setState({ sharedAlbumsList: listResult, error: false });
        } catch (error) {
            this.setState({ error: true });
            throw error;
        }
    }
    async createSharedAlbum() {
        const title = this.state.titleText;
        this.setState({ titleText: '', waitForCreat: true });
        try {
            // アルバムの作成
            const createResult = await GoogleAuth.exec({
                url: "https://photoslibrary.googleapis.com/v1/albums",
                method: "POST",
                scopes: ['https://www.googleapis.com/auth/photoslibrary'],
                body: {
                    album: { title }
                },
            });
            console.log(createResult);
            if (!createResult.id) throw new Error('cannot create album');

            // アルバムの共有
            const shareResult = await GoogleAuth.exec({
                url: 'https://photoslibrary.googleapis.com/v1/albums/' + createResult.id + ':share',
                method: "POST",
                scopes: ['https://www.googleapis.com/auth/photoslibrary.sharing'],
                body: {},
            });
            console.log(shareResult)

            // 一覧情報の更新
            await this.getSharedAlbumsList();

            this.setState({ error: false })
        } catch (error) {
            this.setState({ error: true, });
        } finally {
            this.setState({ waitForCreat: false });
        }
    }
    render() {
        if (this.state.error) return (
            <div>
                <p>Google認証に失敗しました。再認証してください</p>
                <button onClick={e => this.getSharedAlbumsList()}>再認証</button>
            </div>
        );
        return (
            <div>
                <h2>共有アルバムの新規作成</h2>
                タイトル<input type="text" onChange={e => this.setState({ titleText: e.target.value })} value={this.state.titleText} required />
                <button onClick={e => this.createSharedAlbum()} disabled={this.state.waitForCreat}>新規作成</button>
                <hr />
                <h2>共有アルバム一覧</h2>
                {(() => {
                    if (!this.state.sharedAlbumsList) return;
                    if (!this.state.sharedAlbumsList.sharedAlbums) return;
                    return (
                        <table style={{ margin: "auto", }}>
                            <thead>
                                <tr>
                                    <td>アルバム名</td>
                                    <td>共有ID</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.sharedAlbumsList.sharedAlbums.map((album: Album) => (
                                        <tr key={album.id}>
                                            <th style={{ textAlign: "left" }}>
                                                <a href={album.shareInfo ? album.shareInfo.shareableUrl : album.productUrl} about="_blank">
                                                    {album.title || '[no title]'}
                                                </a>
                                            </th>
                                            <td>
                                                {album.shareInfo ? <input type="text" defaultValue={album.shareInfo.shareToken} readOnly /> : ""}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    );
                })()}
            </div>
        )
    }
}
interface IState {
    sharedAlbumsList?: {
        sharedAlbums?: Album[],
        nextPageToken?: string,
        prevPageToken?: string,
    }
    titleText: string
    error: boolean
    waitForCreat: boolean
}
interface Album {
    "id": string,
    "title": string,
    "productUrl": string,
    "isWriteable": boolean,
    "shareInfo"?: ShareInfo,
    "mediaItemsCount": string,
    "coverPhotoBaseUrl": string,
    "coverPhotoMediaItemId": string
}
interface ShareInfo {
    "sharedAlbumOptions": any,
    "shareableUrl": string,
    "shareToken": string,
    "isJoined": boolean
}
