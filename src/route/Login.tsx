import React from 'react';
import Login from '../components/GoogleLogin'

export default class extends React.Component {
    google(err: any, res: any) {
        console.log(err)
        console.log(res)
    }
    render() {
        return (
            <div>
                <Login
                    client_id='253396350469-h803pfhb9e30259hh0mribst9hglvvht.apps.googleusercontent.com'
                    // clientSecret='cw09LI71uJVH5kaL6k-WQnwv'
                    scopes={['https://www.googleapis.com/auth/photoslibrary', 'https://www.googleapis.com/auth/photoslibrary.sharing']}
                    redirect_uri="http://localhost:3000/photo/list"
                >
                    Login With Google
                </Login>
            </div>
        )
    }
}
