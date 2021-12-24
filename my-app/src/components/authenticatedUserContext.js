import { createContext, useEffect, useState } from "react";

export const AuthUserContext = createContext();


export const AuthUserContextProvider = (props) => {
    const [user, setUser] = useState({})
        
    return (
        <AuthUserContext.Provider value={[user, setUser]}>

            {props.children}

        </AuthUserContext.Provider>
    )
}
