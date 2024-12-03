import { useReducer, createContext, useContext } from "react";

function NotificationReducer(state, action){
    switch(action.type){
        case "SET" :
            return action.payload;
        case "CLEAR" :
            return null;
        default :
            return state;
    }
}

export const notificationContext = createContext();

export function NotificationProvider(props) {
    const [notificationMessage, notificationDispatch] = useReducer(NotificationReducer, null);
    return (
        <notificationContext.Provider value={[notificationMessage, notificationDispatch]}>
            {
                props.children
            }
        </notificationContext.Provider>
    )
}
