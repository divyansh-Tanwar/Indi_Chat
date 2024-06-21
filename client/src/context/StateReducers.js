import { reducerCases } from "./constants";

export const initialState={
    userinfo:undefined,
    newUser:false,
    contactPage:false, 
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
        default:
            return state;
    }
}

export default reducer;