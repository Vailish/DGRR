import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeField, initialForm } from '../../modules/auth'
import Login from '../../components/user/Login/Login'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const LoginForm = () => {
  const navigate = useNavigate()
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
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
        },
      )
      console.log(response)
      if (response.status === 200) {
        // console.log(response.headers.get('Authorization'))
        alert('로그인 성공')
        const accessToken = response.headers.get('Authorization')
        localStorage.setItem('access-token', accessToken)
        navigate('/main')
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
