import React from 'react';
import * as GoogleAuth from '../../lib/GoogleAuth';
import { Link } from 'react-router-dom';
import GAuth from '../../component/Google/Auth'

const scopes = [
  'https://www.googleapis.com/auth/photoslibrary',
  'https://www.googleapis.com/auth/photoslibrary.sharing',
];
export default class extends React.Component {
  state: IState = {
    titleText: '',
    waitForCreate: false,
  }
  private async getSharedAlbumsList() {
    const listResult = await GoogleAuth.exec({
      url: "https://photoslibrary.googleapis.com/v1/sharedAlbums",
      method: "GET",
      scopes: ['https://www.googleapis.com/auth/photoslibrary'],
    });
    console.log(listResult)
    this.setState({ sharedAlbumsList: listResult });
  }
  async createSharedAlbum() {
    const title = this.state.titleText;
    this.setState({ titleText: '', waitForCreate: true });
    try {
      // アルバムの作成
      const createResult = await GoogleAuth.exec({
        url: "https://photoslibrary.googleapis.com/v1/albums",
        method: "POST",
        scopes: ['https://www.googleapis.com/auth/photoslibrary'],
        body: JSON.stringify({
          album: { title }
        }),
      });
      console.log(createResult);
      if (!createResult.id) throw new Error('cannot create album');

      // アルバムの共有
      const shareResult = await GoogleAuth.exec({
        url: 'https://photoslibrary.googleapis.com/v1/albums/' + createResult.id + ':share',
        method: "POST",
        scopes: ['https://www.googleapis.com/auth/photoslibrary.sharing'],
        body: JSON.stringify({
          sharedAlbumOptions: {
            isCollaborative: true,
            isCommentable: true,
          }
        }),
      });
      console.log(shareResult)

      // 一覧情報の更新
      await this.getSharedAlbumsList();
    } finally {
      this.setState({ waitForCreate: false });
    }
  }
  render() {
    return (
      <GAuth scopes={scopes} onAuth={() => this.getSharedAlbumsList()}>
        <h2>共有アルバムの新規作成</h2>
        タイトル<input type="text" onChange={e => this.setState({ titleText: e.target.value })} value={this.state.titleText} required />
        <button onClick={e => this.createSharedAlbum()} disabled={this.state.waitForCreate}>新規作成</button>
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
                  <td>写真投稿ページ</td>
                </tr>
              </thead>
              <tbody>
                {this.state.sharedAlbumsList.sharedAlbums.map((album: GoogleAuth.Album) => (
                  <tr key={album.id}>
                    <th style={{ textAlign: "left" }}>
                      <a href={album.shareInfo ? album.shareInfo.shareableUrl : album.productUrl} about="_blank">
                        {album.title || '[no title]'}
                      </a>
                    </th>
                    <td>
                      {album.shareInfo ? (<Link to={'/upload/' + album.shareInfo.shareToken} target="new">写真投稿ページへ</Link>) : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          );
        })()}
      </GAuth>
    )
  }
}
interface IState {
  sharedAlbumsList?: {
    sharedAlbums?: GoogleAuth.Album[],
    nextPageToken?: string,
    prevPageToken?: string,
  }
  titleText: string
  waitForCreate: boolean
}

