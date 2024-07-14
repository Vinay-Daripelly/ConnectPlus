import React from 'react'

export const autheticator = React.createContext();

function Usercontext({children}) {

  const [loginStatus,setLoginStatus]=React.useState(false);

  return (
    <autheticator.Provider value={{loginStatus, setLoginStatus}}>
      {children}
    </autheticator.Provider>
  )
}

export default Usercontext