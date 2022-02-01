import { createContext, useContext, useState } from "react";


const Login = createContext();

const ContextLogin = ({ children }) => {
  
  const [loading,setLoading]=useState(false)
  const[user,setUser]=useState(null)

  return (
    <Login.Provider 
    value={{
            setLoading,
            loading,
            user,
            setUser
            }}>
      {children}
    </Login.Provider>
  );
};

export const LoginState = () => {
  const context = useContext(Login);
  if (context === undefined) {
    throw Error("Context deve essere usato dentro Cart.Provider");
  }
  return context;
};

export default ContextLogin;
