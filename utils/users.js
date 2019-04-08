const users = []

// addUser, removeUser, getUser, getUsersInRoom

const addUser = ({ id, username, room }) => {
    // Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // Validate the data
    if (!username || !room) {
        return {
            error: 'Username and room are required!'
        }
    }

    // Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    // Validate username
    if (existingUser) {
        return {
            error: 'Username is in use!'
        }
    }

    // Store user
    const user = { id, username, room }
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}


const getUser = (id) => {

    const user = users.find((user) => {
        return user.id === id
    })

    if(user){
        return user;
    } else {
        return "no user";
    }

}

const getUsersInRoom = (room) =>{

    const getUsersInRoom = users.filter(user => user.room === room);

    if(getUsersInRoom === []){
        return "No users"
    } else {
        return getUsersInRoom;
    }
}
// console.log(users)

// const removedUser = removeUser(20)
// console.log(removedUser)
// console.log(users)

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
    
}