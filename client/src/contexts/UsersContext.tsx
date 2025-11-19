import { createContext, useReducer, useState } from "react";
import { useNavigate } from "react-router";

import { User, UsersReducerActionTypes, ChildrenElementProp, UserNoPass } from "../types";

const reducer = (state: User[], action: UsersReducerActionTypes): User[] => {
    switch (action.type) {
        case 'setData':
            return action.data;
        case 'addUser':
            return [...state, action.newUser];
        case 'editUser':
            return state.map(user =>
                user._id === action.updatedUser._id ?
                    { ...user, ...action.updatedUser }
                    : user);
        default:
            return state;
    }
}

const UsersContext = createContext(undefined);

const UsersProvider = ({ children }: ChildrenElementProp) => {

    const [users, dispatch] = useReducer(reducer, []);
    const [loggedInUser, setLoggedInUser] = useState<UserNoPass | null>(null);
    const navigate = useNavigate();


}