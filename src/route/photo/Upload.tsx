import React from 'react';
import { RouteComponentProps } from 'react-router';
import * as GoogleAuth from '../../lib/GoogleAuth'
import GAuth from '../../component/Google/Auth'

interface AppState {
  images: File[]
  album?: GoogleAuth.Album
  uploading: boolean
}
const scopes = [
  'https://www.googleapis.com/auth/photoslibrary',
  'https://www.googleapis.com/auth/photoslibrary.sharing',
  'https://www.googleapis.com/auth/photoslibrary.appendonly',
];
export default class extends React.Component<RouteComponentProps<{ id: string }>> {
  state: AppState = {
    images: [],
    uploading: false,
  }
  async onAuth() {
    const album = await this.getSharedAlbum()
    if (album.shareInfo && album.shareInfo.isJoined) {
      // 参加済み
      this.setState({ album });
    } else {
      this.setState({ album: await this.joinAlbum() });
    }
  }
  async getSharedAlbum(): Promise<GoogleAuth.Album> {
    const { id } = this.props.match.params;
    return GoogleAuth.exec({
      url: 'https://photoslibrary.googleapis.com/v1/sharedAlbums/' + id,
      method: 'GET',
      scopes: ['https://www.googleapis.com/auth/photoslibrary.sharing'],
    });
  }
  async joinAlbum(): Promise<GoogleAuth.Album> {
    const { id } = this.props.match.params;
    const ret = await GoogleAuth.exec({
      url: 'https://photoslibrary.googleapis.com/v1/sharedAlbums:join',
      method: 'POST',
      scopes: ['https://www.googleapis.com/auth/photoslibrary.sharing'],
      body: JSON.stringify({
        shareToken: id
      }),
    })
    return ret.album;
  }
  async uploadMedia(file: File, album: GoogleAuth.Album) {
    this.setState({ uploading: true })
    try {
      // upload media
      const uploadToken: string = await GoogleAuth.exec({
        url: 'https://photoslibrary.googleapis.com/v1/uploads',
        method: 'POST',
        scopes: [],
        headers: {
          'Content-type': 'application/octet-stream',
          // 'X-Goog-Upload-File-Name': file.name,
          'X-Goog-Upload-Protocol': 'raw',
        },
        body: file,
      });

      // media to album
      const results = await GoogleAuth.exec({
        url: 'https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate',
        method: 'POST',
        scopes: ['https://www.googleapis.com/auth/photoslibrary', 'https://www.googleapis.com/auth/photoslibrary.sharing'],
        body: JSON.stringify({
          albumId: album.id,
          newMediaItems: [
            {
              description: "",
              simpleMediaItem: { uploadToken },
            }
          ]
        }),
      });
      results.newMediaItemResults.forEach((res: any) => {
        if (res.status.code) alert(res.status.message);
      })
    } finally {
      this.setState({ uploading: false })
    }
  }

  render() {
    return (
      <GAuth scopes={scopes} onAuth={() => this.onAuth()}>
        {(() => {
          if (!this.state.album) return;
          const album = this.state.album;
          return (
            <div>
              <h2>写真を投稿する</h2>
              <label htmlFor="upload">
                <input
                  type="file"
                  id="upload"
                  accept="image/*"
                  capture
                  onChange={e => this.onImageUploaded(e.target, album)}
                  disabled={this.state.uploading}
                />
              </label>
            </div>
          );
        })()}
        <hr />
        <div style={{ margin: '20px auto' }}>
          {this.state.album && this.state.album.shareInfo ? (<a href={this.state.album.shareInfo.shareableUrl}>アルバムを見る</a>) : ""}
        </div>
        <hr />
        <h2>投稿済み写真</h2>
        {this.state.images.map((file, idx) => (
          <img key={idx} src={URL.createObjectURL(file)} alt={file.name} style={{ maxWidth: '300px', maxHeight: '300px' }} />
        ))}
      </GAuth>
    );
  }
  async onImageUploaded(e: HTMLInputElement, album: GoogleAuth.Album) {
    if (!e.files || e.files.length === 0) return;
    const file = e.files[0];
    await this.uploadMedia(file, album);
    e.value = '';
    this.setState({ images: this.state.images.concat(file) });
  }
}
