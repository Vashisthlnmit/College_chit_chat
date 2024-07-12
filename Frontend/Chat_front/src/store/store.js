import { configureStore } from '@reduxjs/toolkit'
import Authentication from './Slice/Authentication'
import Poststuff from './Slice/Poststuff'
 const store= configureStore({
    reducer:{
        auth:Authentication,
        post:Poststuff,
        
    }
})
export default store