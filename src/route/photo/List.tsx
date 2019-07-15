import React from 'react';
import GoogleAuth from '../../lib/GoogleAuth';

export default class extends React.Component<IProps, IState> {
    state: IState = {
        titleText: '',
        error: false,
        loading: true,
    }
    componentDidMount() {
        this.withLoading(this.getSharedAlbumsList.bind(this));
    }
    private async getSharedAlbumsList() {
        const json = await this.props.auth.exec({
            url: "https://photoslibrary.googleapis.com/v1/sharedAlbums",
            method: "GET",
            scopes: ['https://www.googleapis.com/auth/photoslibrary'],
            body: {},
        });
        console.log(json)
        this.setState({ sharedAlbumsList: json });
    }
    async withLoading(fn: () => Promise<any>) {
        try {
            this.setState({ loading: true })
            await fn();
            this.setState({ error: false, loading: false })
        } catch (error) {
            this.setState({ error: true, loading: false });
            throw error;
        }
    }
    async createSharedAlbum() {
        const title = this.state.titleText;
        this.setState({ titleText: '' });

        // アルバムの作成
        const createResult = await this.props.auth.exec({
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
        const shareResult = await this.props.auth.exec({
            url: 'https://photoslibrary.googleapis.com/v1/albums/' + createResult.id + ':share',
            method: "POST",
            scopes: ['https://www.googleapis.com/auth/photoslibrary.sharing'],
            body: {},
        });
        console.log(shareResult)

        // 一覧情報の更新
        this.getSharedAlbumsList();
    }
    render() {
        if (this.state.loading) return (<h1>loading</h1>);
        if (this.state.error) return (
            <div>
                <p>Google認証に失敗しました。再認証してください</p>
                <button onClick={e => { this.withLoading(this.getSharedAlbumsList.bind(this)) }}>再認証</button>
            </div>
        );
        return (
            <div>
                <h2>共有アルバムの新規作成</h2>
                タイトル<input type="text" onChange={e => this.setState({ titleText: e.target.value })} value={this.state.titleText} required />
                <button onClick={e => this.withLoading(this.createSharedAlbum.bind(this))}>新規作成</button>
                <hr />
                <h2>共有アルバム一覧</h2>
                {(() => {
                    if (!this.state.sharedAlbumsList) return;
                    if (!this.state.sharedAlbumsList.sharedAlbums) return;
                    return this.state.sharedAlbumsList.sharedAlbums.map((album: Album) => (
                        <div key={album.id}>
                            <a href={album.shareInfo ? album.shareInfo.shareableUrl : album.productUrl}>{album.title}</a>
                            {album.shareInfo ? <input type="text" defaultValue={album.shareInfo.shareToken} readOnly /> : ""}
                        </div>
                    ));
                })()}
            </div>
        )
    }
}
interface IProps {
    auth: GoogleAuth
}

interface IState {
    sharedAlbumsList?: {
        sharedAlbums?: Album[],
        nextPageToken?: string,
        prevPageToken?: string,
    }
    titleText: string
    error: boolean
    loading: boolean
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
