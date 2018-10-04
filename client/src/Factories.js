const uuid4 = require('uuid/v4');

const createUser = ({name= "", socketId=null} = {}) => (
    {
        id:uuid4(),
        name,
        socketId
    }
)

const createMessage = ({message = "", sender =""} = {}) => (
    {
        id:uuid4(),
        time: getTime(new Date(Date.now())),
        message,
        sender
    }
)

const createChat = ({messages = [], name = "Javni Chat", users = [], isCommunity=false} = {})=>(
    {
        id:uuid4(),
        name: isCommunity ? "Javni Chat" : createChatNameFromUsers(users),
        messages,
        users,
        typingUsers:[],
        isCommunity
    }
)

const createChatNameFromUsers = (users, excludedUser = "") => {

    return users.filter(u => u !== excludedUser).join(' & ') || "Empty Users"

}



const getTime = (date) => {
    return `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}`
}

module.exports = {
    createMessage,
    createChat,
    createUser,
    createChatNameFromUsers
}