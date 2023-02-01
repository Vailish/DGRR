import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeField, initialForm } from '../../modules/auth'
import Login from '../../components/user/Login/Login'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
const LoginForm = () => {
  const dispatch = useDispatch()
  const { form } = useSelector(({ auth }) => ({
    form: auth.login,
  }))

  const reqLogin = async user => {
    console.log(user)
    try {
      const response = await axios.post(
        'http://192.168.31.142/login',

        JSON.stringify(user),
      )
        if (response.status === 20) {
           //로그인이 성공적으로 완료가 되었다면 메인 페이지로 이동한다. 
      }
    } catch (e) {
      console.log(e)
    }
  }
  const onChange = e => {
    const { name, value } = e.target
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    )
  }

  const onSubmit = e => {
    e.preventDefault()
    // console.log(form);
    
    reqLogin(form)
  }

  useEffect(() => {
    dispatch(initialForm('login'))
  }, [dispatch])

  return <Login form={form} onChange={onChange} onSubmit={onSubmit} />
}

export default LoginForm
