import React, { useEffect, useState } from 'react'
import UserContext from './UserContext'
import axios from 'axios'

export default function UserContextProvider({children}) {
    let [cartList, setCartList] = useState('')
    
    let [auth, setAuth] = useState({
        token: localStorage.getItem('token') || null,
        isAuthenized : !!localStorage.getItem('token'),
        username: ''
    })

    let userLogin = async (data)=>{
    let result = await axios.post('http://localhost:3000/api/clientlogin', data)
    // console.log(result)
    if(result.data.isMatch){
        localStorage.setItem('token', result.data.token)
        setAuth({token:result.data.token, isAuthenized: true, username: result.data.result[0] })
        return true
    }else{
        return false
    }
    }

    let logout = ()=>{
        localStorage.removeItem('token')
        setAuth({token: null, isAuthenized: false, username: '' })
    }

    let profile = async ()=>{
       try {
        let result = await axios.post('http://localhost:3000/api/verify')
        if(result.data.email){
            let username = result.data.email.split('@')[0]
            setAuth((prevAuth)=> ({...prevAuth, username:result.data}))
        }
       } catch (error) {
        logout()
       }
    }

    useEffect(()=>{
        let token = localStorage.getItem('token')
        if(token){
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            profile()
        }else{
            logout()
        }

    }, [])

    // console.log(auth)
  return (
   <UserContext.Provider value={{auth, userLogin, logout, cartList, setCartList}}>
    {children}
   </UserContext.Provider>
  )
}
