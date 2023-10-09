import { createContext, useState } from "react";

export let usercontext= createContext()
export default function Usercontextprovider(props){
    const [usertoken , setusertoken] = useState(null)
    return <usercontext.Provider value={{usertoken,setusertoken}}>
        {props.children}
    </usercontext.Provider>
}