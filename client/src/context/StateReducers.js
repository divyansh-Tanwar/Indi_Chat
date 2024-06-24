import { Socket } from "socket.io-client";
import { reducerCases } from "./constants";

export const initialState={
    userinfo:undefined,
    newUser:false,
    contactPage:false, 
    currentChatUser:undefined,
    messages:[],
    socket:undefined,
    messagesSearch:false,

};

const reducer=(state,action)=>{
    // console.log('yaha hu');
    // console.log({userInfo:action.userInfo});
    switch(action.type){
        case reducerCases.SET_USER_INFO:
         return {
            ...state,
            userInfo:action.userInfo,
         };
         case reducerCases.SET_NEW_USER:
            return {
                ...state,
                newUser:action.newUser,
            };
            //reducer to manage state which renders all contacts in chat list 
        case  reducerCases.SET_ALL_CONTACTS_PAGE:
             return{
                ...state,
                contactPage:!state.contactPage,
             };
             case  reducerCases.CHANGE_CURRENT_CHAT_USER:
                return{
                   ...state,
                   currentChatUser:action.user,
                };
            case  reducerCases.SET_MESSAGES:
                return{
                    ...state,
                     messages:action.messages,
                };
            case  reducerCases.SET_SOCKET:
                return{
                     ...state,
                    socket:action.socket,
                };
            case  reducerCases.ADD_MESSAGE:
                return{
                      ...state,
                    messages:[...state.messages,action.newMessage],
                };
            case  reducerCases.SET_MESSAGES_SEARCH:
                return{
                        ...state,
                       messagesSearch:!state.messagesSearch,
                 };
        default:
            return state;
    }
}

export default reducer;