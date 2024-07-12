import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import './index.css'
import Layout from './layout.jsx'
import Signin from './Component/Signin.jsx'
import Signup from './Component/Signup.jsx'
import Home from './Component/Home.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Verifypage from './Component/Verify.jsx'
import Searchbar from './Component/Search.jsx'
import Change from './Component/Change_acc.jsx'
import Addpost from './Component/Addpost.jsx'
import PostList from './Component/Allpost.jsx'
import Allfollower from './Component/Allfollower.jsx'
import No_follower from './Component/No_of_follower.jsx'
import Allfollowreq from './Component/Allfollowrequest.jsx'
import Allfollowing from './Component/Allfollowing.jsx'
import Chat from './Component/Allchats.jsx'
import Creategrp from './Component/Creategrpchat.jsx'
import GroupInfo from './Component/Allparticpants.jsx'
import RenameChat from './Component/Renamechat.jsx'
import MessageArea from './Component/SendchatMessage.jsx'
import OnetoOnechat from './Component/Createonetoone.jsx'
import PasswordChange from './Component/ForgotPasswordVer.jsx'
import PageScrollpost from './Component/Randompagescrollpost.jsx'
import UserProfile from './Component/UserProfile.jsx'
import SearchProfile from './Component/SearchProfile.jsx'
import Postpage from './Component/Allpost.jsx'
import ErrorPage from './Component/ErrorPage.jsx'
import Addmember from './Component/Addparticpants.jsx'
import Aboutus from './Component/Aboutus.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' errorElement={<ErrorPage/>} element={<Layout />}>
      <Route path='' element={<PageScrollpost/>} />
      <Route path='signup' element={<Signup />} />
      <Route path='signin' element={<Signin />} />
      <Route path='verify' element={<Verifypage/>} />
      <Route path='search' element={<Searchbar/>}/>
      <Route path='acc' element={<Change/>}/>
      <Route path='addpost' element={<Addpost/>}/>
      <Route path='allreq' element={<Allfollowreq/>}/>
      <Route path='allchat' element={<Chat/>}/>
      <Route path="crtgrpchat" element={<Creategrp/>}/>
      <Route path='/allpart' element={<GroupInfo/>}/>
      <Route path='/renamechat' element={<RenameChat/>}/>
      <Route path='/messagearea' element={<MessageArea/>}/>
      <Route path='/onechat' element={<OnetoOnechat/>}/>
      <Route path='/forgotverification' element={<PasswordChange/>}/>
      <Route path='/random' element={<PageScrollpost/>}/>
      <Route path='/user' element={<UserProfile/>}/>
      <Route path='/profile' element={<SearchProfile/>}/>
      <Route path='/allpost' element={<Postpage/>}/>
      <Route path='/addmem' element={<Addmember/>}/>
      <Route path='/about' element={<Aboutus/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)

