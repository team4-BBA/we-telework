// const AuthProvider = (props: any) => {
//   // Contextに持たせるcurrentUserは内部的にはuseStateで管理
//   const [currentUser, setCurrentUser] = useState<User | null | undefined>(
//     undefined
//   );

//   useEffect(() => {
//     // Firebase Authのメソッド。ログイン状態が変化すると呼び出される
//     auth.onAuthStateChanged(user => {
//       setCurrentUser(user);
//     });
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         currentUser: currentUser
//       }}
//     >
//       // こうすることで、下階層のコンポーネントを内包できるようになる
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthProvider };

import React, { createContext, useState } from 'react'

// // Contextの型を用意
// interface IAuthContext {
//   user: any,
//   setUser: ,
// }

const AuthContext = createContext<any>(undefined)

// type ContextType = {
//   state: StateType;
//   dispatch: React.Dispatch<ActionType>;
// };
// export type Props = {
//   children: ReactNode
// }

const AuthContextProvider: any = (props: any): JSX.Element => {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setLoading] = useState(true)
  const [bottomNav, setBottomNav] = useState(0)
  const [hotels, setHotels] = useState([])
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        setLoading,
        bottomNav,
        setBottomNav,
        hotels,
        setHotels
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext }
export default AuthContextProvider
