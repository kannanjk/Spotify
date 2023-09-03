import { configureStore } from '@reduxjs/toolkit'
import  { user } from './Slice/UserSlice'

 export default  configureStore({
    reducer:{
        user:user.reducer
    } 
})
