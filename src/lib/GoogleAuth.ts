import querystring from 'querystring'
import cookie from 'js-cookie';

export interface Album {
    "id": string,
    "title": string,
    "productUrl": string,
    "isWriteable": boolean,
    "shareInfo"?: ShareInfo,
    "mediaItemsCount": string,
    "coverPhotoBaseUrl": string,
    "coverPhotoMediaItemId": string
}
export interface ShareInfo {
    "sharedAlbumOptions": any,
    "shareableUrl": string,
    "shareToken": string,
    "isJoined": boolean
}
export default {}
export async function exec(param: ExecParam, bodyToJson = true): Promise<any> {
    try {
        // 認証必要チェック
        if (!hasAuth(param.scopes)) {
            await auth(param.scopes);
        }

        // API 実行
        const response = await fetch(param.url, {
            method: param.method,
            headers: Object.assign({
                Authorization: [cookie.get('token_type'), cookie.get('access_token')].join(' '),
                Origin: window.location.protocol + '//' + window.location.host,
            }, param.headers),
            body : param.body
        });

        // statusチェック
        if (response.status !== 200) {
            throw new Error('API status NOT 200');
        }

        try {
            // JSONデコードしてから返却
            return await response.clone().json();
        } catch (error) {
            // JSON形式ではなかった場合
            return await response.clone().text();
        }
    } catch (error) {
        // 実行失敗時にcookieを削除
        clearAuthCookie();
        throw error;
    }
}

/**
 * Google認証のリダイレクトパラメータからアクセストークンを取得し、cookieに設定する。
 */
export function setCookieFromAuth(): void {
    const query: querystring.ParsedUrlQuery = querystring.parse(window.location.hash.substring(1), '&', '=');

    if (typeof (query.scope) !== 'string') return;
    if (typeof (query.access_token) !== 'string') return;
    if (typeof (query.token_type) !== 'string') return;
    if (typeof (query.expires_in) !== 'string') return;

    // cookieにトークン情報を設定
    const maxAge = Number.parseInt(query.expires_in);
    cookie.set('scope', query.scope, { expires: maxAge });
    cookie.set('access_token', query.access_token, { expires: maxAge });
    cookie.set('token_type', query.token_type, { expires: maxAge });
}
export function clearAuthCookie(): void {
    cookie.remove('access_token');
    cookie.remove('scope');
    cookie.remove('token_type');
}

export function hasAuth(scopes: string[]): boolean {
    const [access_token, auth_scope, token_type] = [cookie.get('access_token'), cookie.get('scope'), cookie.get('token_type')];
    if (!access_token) return false;
    if (!auth_scope) return false;
    if (!token_type) return false;
    return scopes.every(scope => auth_scope.split(' ').includes(scope));
}

/**
 * Google認証ポップアップを表示し、認証情報をcookieにセット
 * @param scopes 
 */
export async function auth(scopes: string[]): Promise<void> {
    // 認証用ポップアップの設定
    const query = querystring.stringify({
        client_id: process.env.REACT_APP_GOOGLE_API_CLIENT_ID,
        redirect_uri: window.location.protocol + '//' + window.location.host + '/auth',
        response_type: "token",
        scope: scopes.join(' '),
        include_granted_scopes: 'true',
    });
    const featureParams: { [key: string]: string } = {
        width: '450',
        height: '600',
        menubar: 'no',
        toolbar: 'no',
        location: 'no',
        status: 'no',
    }
    const feature = Object.keys(featureParams).map(key => key + '=' + featureParams[key]).join(',')

    // ポップアップ表示
    const authWindow = window.open('https://accounts.google.com/o/oauth2/v2/auth?' + query, "Google Login", feature);

    // 認証処理
    return new Promise((resolve, reject) => {
        (function checkAuth() {
            // ポップアップが閉じられるまで待つ
            if (authWindow && !authWindow.closed) {
                setTimeout(checkAuth, 100);
                return;
            }

            // 閉じたらcookieをチェック
            if (hasAuth(scopes)) {
                resolve();
            } else {
                reject('auth was rejected');
            }
        })();
    });
}

interface ExecParam {
    url: string
    scopes: string[]
    method: "GET" | "POST"
    body?: string | Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | ReadableStream<Uint8Array> | null | undefined
    headers?: Record<string, string>
}

