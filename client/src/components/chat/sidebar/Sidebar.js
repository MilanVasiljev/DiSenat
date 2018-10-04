import React, {Component} from 'react';
import { FaChevronDown } from 'react-icons/fa'
import { MdMenu } from 'react-icons/md'
import { MdSearch } from 'react-icons/md'
import { MdEject } from 'react-icons/md'
import {get, last, differenceBy} from 'lodash'

import { createChatNameFromUsers } from '../../../Factories'
import SideBarOption from './SideBarOption';

export default class SideBar extends Component{
    static type = {
        USERS:"users",
        CHATS:"chats"
    }
    constructor(props){
        super(props)
        this.state = {
            reciever:"",
            activeSideBar: SideBar.type.CHATS
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { reciever } = this.state
        const { onSendPrivateMessage } = this.props

        onSendPrivateMessage(reciever)
        this.setState({reciever:""})
    }

    addChatForUser = (reciever) => {
        this.props.onSendPrivateMessage(reciever)
        this.setActiveSideBar(SideBar.type.CHATS)
    }
    setActiveSideBar = (type) => {
        this.setState({ activeSideBar:type })
    }


    render(){
        const { chats, activeChat, user, setActiveChat, logout, users } = this.props
        const { reciever, activeSideBar } = this.state
        return (
            <div id="side-bar">
                <div className="heading">
                    <div className="app-name">DiSenat Chat</div>
                    <div className="menu">
                        <MdMenu />
                    </div>
                </div>
                <form onSubmit={this.handleSubmit} className="search">
                    <i className="search-icon"><MdSearch /></i>
                    <input
                        placeholder="Pretrazi korisnike"
                        type="text"
                        value={reciever}
                        onChange={(e)=>{ this.setState({reciever:e.target.value}) }}/>
                    <div className="plus"></div>
                </form>
                <div className="side-bar-select">
                    <div
                        onClick = { ()=>{ this.setActiveSideBar(SideBar.type.CHATS) } }
                        className={`side-bar-select__option ${ activeSideBar === SideBar.type.CHATS ? 'active':''}`}>
                        <span>Razgovori</span>
                    </div>
                    <div
                        onClick = { ()=>{ this.setActiveSideBar(SideBar.type.USERS) } }
                        className={`side-bar-select__option ${ activeSideBar === SideBar.type.USERS ? 'active':''}`}>
                        <span>Korisnici</span>
                    </div>
                </div>
                <div
                    className="users"
                    ref='users'
                    onClick={(e)=>{ (e.target === this.refs.user) && setActiveChat(null) }}>

                    {
                        activeSideBar === SideBar.type.CHATS ?
                            chats.map((chat)=>{

                                console.log('chat.users: ' + chat.users)
                                console.log('chat.name: ' + chat.name)
                                console.log('user.name: ' + user.name)

                                return(
                                    <SideBarOption
                                        key = {chat.id}
                                        lastMessage = { get(last(chat.messages), 'message', '') }
                                        name = { chat.isCommunity ? chat.name : createChatNameFromUsers(chat.users, user.name) }
                                        active = { activeChat.id === chat.id }
                                        onClick = { ()=>{ this.props.setActiveChat(chat) } }
                                    />
                                )
                            })

                            :
                            differenceBy(users, [user], 'name').map((user)=>{
                                return <SideBarOption
                                    key = { user.id }
                                    name = { user.name }
                                    onClick = { ()=>{ this.addChatForUser(user.name) }  }
                                />
                            })
                    }
                </div>
                <div className="current-user">
                    <span>{user.name}</span>
                    <div onClick={()=>{logout()}} title="Logout" className="logout">
                        <MdEject/>
                    </div>
                </div>
            </div>
        );

    }
}