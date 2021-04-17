import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <motion.div className="login" initial={{opacity:0,y:90}} animate={{opacity:1,y:0}} transition={{delay:0.2, duration:0.6,type: "spring", damping: 36, stiffness: 200,}}>
    <div className="container_log">
    {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
  <div className="left">
    <div className="header">
      <h2 className="animation a1" >Welcome Back</h2>
      <h4 className="animation a2" style={{color: "white"}}>Log in to your account using email and password</h4>
    </div>
    <form className="form" onSubmit={submitHandler}>
      <input type="email" className="form-field animation a3" placeholder="Email Address" value={email}
            onChange={(e) => setEmail(e.target.value)}/>
      <input type="password" className="form-field animation a4" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}/>
      <p className="animation a5"><a href="#">Forgot Password</a></p>
      <button type='submit'  className="animation a6">LOGIN</button>
    </form>
  </div>
  <div class="right"></div>
</div>

    </motion.div>
  )
}

export default LoginScreen
