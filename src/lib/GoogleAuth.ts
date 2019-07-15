import querystring from 'querystring'

export default class {
    private authResult: AuthResult | undefined

    /**
     * Google API 実行
     * @param param 
     */
    async exec(param: ExecParam): Promise<any> {
        // 認証必要チェック
        if (!this.hasAuth(param.scopes)) {
            await this.auth(param.scopes);
        }

        // 認証済みチェック
        if (!this.authResult) throw new Error("no auth");

        // API 実行
        const response = await fetch(param.url, {
            method: param.method,
            headers: {
                Authorization: [this.authResult.token_type, this.authResult.access_token].join(' '),
                Origin: window.location.protocol + '//' + window.location.host,
            },
            body: param.method === 'POST' ? JSON.stringify(param.body) : null,
        });

        // JSONデコードしてから返却
        return await response.json();
    }

    /**
     * Google認証
     * @param scopes 
     */
    async auth(scopes: string[]): Promise<void> {
        // 認証用ポップアップの設定
        const now = Date.now();
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

        // 認証処理
        return new Promise((resolve, reject) => {
            // ポップアップ表示
            const authWindow = window.open('https://accounts.google.com/o/oauth2/v2/auth?' + query, "Google Login", feature);

            // ポップアップが閉じられたかどうかを検知
            let authFlag = false;
            (function checkAuth(){
                setTimeout(checkAuth,100);
                if (authWindow && !authWindow.closed) return;
                // TODO メッセージの到着よりも閉じるほうが早いのでうまくいかない
                if (authFlag){
                    resolve();
                }else{
                    reject('auth was rejected');
                }
            })();

            // ポップアップによる認証完了時
            window.addEventListener("message", (e: MessageEvent) => {
                if (typeof e.data !== "object") return reject("想定外のパラメータ");
                if ("error" in e.data) {
                    return reject(e.data.error)
                } else {
                    this.authResult = {
                        access_token: e.data.access_token,
                        expires_in: new Date(now + Number.parseInt(e.data.expires_in)),
                        token_type: e.data.token_type,
                        scopes: e.data.scope.split(' '),
                    }
                    authFlag = true;
                    return resolve();
                }
            }, { once: true })
        });
    }
    private hasAuth(scopes: string[]) {
        if (!this.authResult) return false;
        if (this.authResult.expires_in.getTime() >= Date.now()) return false;
        const authedScopes = this.authResult.scopes;
        return scopes.every(scope => authedScopes.includes(scope));
    }
}
interface AuthResult {
    access_token: string
    token_type: string
    expires_in: Date
    scopes: string[]
}
interface ExecParam {
    url: string
    scopes: string[]
    method: "GET" | "POST"
    body: { [key: string]: any }
}