import React from 'react'

export const autheticator = React.createContext();

function Usercontext({children}) {

  const [loginStatus,setLoginStatus]=React.useState(false);
  const [userName,setUser]=React.useState(" ");
  const [uType,setUType]=React.useState(" ");
  const [uData,setUData]=React.useState({});

  return (
    <autheticator.Provider value={{loginStatus, setLoginStatus,userName,setUser,uType,setUType,uData,setUData}}>
      {children}
    </autheticator.Provider>
  )
}

export default Usercontext