import {createContext, useState} from 'react'

export const userContext = createContext()

export const UserProvider = (props) => {
    const [loggedInUser, setLoggedInUser] = useState({})


    return (
        <userContext.Provider value={{
            //all the info will be stored in the getter & setter 
            loggedInUser, 
            setLoggedInUser
        }}>

            {props.children}
        </userContext.Provider>
    )
}

// Purpose of context: wrap components around a provider and will pass the state easily 

//Create context has 3 different functions

//{props.children} -> rendering the components that we wrap around with the provider