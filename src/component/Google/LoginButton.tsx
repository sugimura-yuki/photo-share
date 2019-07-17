import React from 'react';
import './LoginButton.css'

export default class extends React.Component<IProps> {
    render() {
        return (
            <span id="GoogleButton">
                <button onClick={this.props.onClick} className={this.props.thema}></button>
            </span>
        )
    }
}
interface IProps{
    onClick? : (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => any
    thema : 'dark' | 'light'
}