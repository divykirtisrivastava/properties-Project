import React, { useContext, useEffect } from 'react'
import UserContext from '../context/UserContext'
import { Navigate } from 'react-router-dom'

export default function Protected({children}) {
 let {adminFlag} = useContext(UserContext)
useEffect(()=>{
    console.log(adminFlag)
},[])
 if(adminFlag) {
    return children
 }else{
    return <Navigate to='/admin/pricing'/>
 }
}
