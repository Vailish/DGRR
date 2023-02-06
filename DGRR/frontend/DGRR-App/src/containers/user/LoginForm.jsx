import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeField, initialForm } from '../../modules/auth'
import Login from '../../components/user/Login/Login'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [error, setError] = useState('')
  const [isId, setisId] = useState(false)
  const [isPw, setisPw] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { form } = useSelector(({ auth }) => ({
    form: auth.login,
  }))

  useEffect(() => {
    if (localStorage.getItem('access-token')) {
      navigate('/main')
    } else {
      navigate('/')
    }
  }, [localStorage.getItem('access-token')])
  const reqLogin = async user => {
    console.log(user)
    console.log(isLogin)
    try {
      const response = await axios.post(
        'http://192.168.31.142:8080/login',

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
        setError(' ')
        const accessToken = response.headers.get('Authorization')
        localStorage.setItem('access-token', accessToken)
        navigate('/main')
        dispatch(
          changeField({
            form: 'login',
            key: user.username,
            value: '',
          }),
        )
        dispatch(
          changeField({
            form: 'login',
            key: user.password,
            value: '',
          }),
        )
      }
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    if (isLogin) {
      setError(' ')
    }
  })
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

    if (form.username.length === 0 && form.password.length === 0) {
      setError('아이디와 비밀번호를 입력해주세요')
      setisId(true)
      setisPw(true)
    } else if (form.username.length === 0 && form.password.length !== 0) {
      setError('아이디를 입력해주세요')
      setisId(true)
      setisPw(false)
    } else if (form.username.length !== 0 && form.password.length === 0) {
      setisId(false)
      setError('비밀번호를 입력해주세요')
      setisId(false)
      setisPw(true)
    } else {
      setError('')
      setisId(false)
      setisPw(false)
      reqLogin(form)
    }
  }
  useEffect(() => {
    dispatch(initialForm('login'))
  }, [dispatch])

  return (
    <Login
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      isLogin={isLogin}
      error={error}
      isId={isId}
      isPw={isPw}
    />
  )
}

export default LoginForm
