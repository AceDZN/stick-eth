import React, { useContext, createContext, useMemo, useReducer } from "react";

const UserContext = createContext<
  | {
      state: ContextInterface;
      dispatch: DispatchInterface;
    }
  | undefined
>(undefined);

const reducerUser = (
    state: ContextInterface,
    action: ActionInterface
  ): ContextInterface => {
    switch (action.type) {
      case "setUser":
        return { ...state, id: action.payload.id };
      default:
        throw new Error("Invalid action type in context.");
    }
  };

  const UserProvider: React.FC = ({ children }:any) => {
    const [state, dispatch] = useReducer(reducerUser, {});
  
    const memoizedUser = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  
    return (
      <UserContext.Provider value={memoizedUser}>{children}</UserContext.Provider>
    );
  };

export default UserContext;

interface ContextInterface {
    id?: string;
  }
  
  interface ActionInterface {
    type: "setUser"
    payload: ContextInterface;
  }
  
  type DispatchInterface = (action: ActionInterface) => void;


  const useUser = () => {
    const user = useContext(UserContext);
  
    return user;
  };

  export { UserProvider, useUser };
