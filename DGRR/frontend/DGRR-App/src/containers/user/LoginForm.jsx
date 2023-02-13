import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeField, initialForm } from '../../modules/auth'
import { useNavigate } from 'react-router-dom'
import { setCookie, getCookie } from '../../cookies/Cookies'
import { request } from '../../API/request'
import Login from '../../components/user/Login/Login'
import axios from 'axios'

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

  //로그인 창에서 토큰이 있는지 감지를 한다.
  //만약 로컬스토리지에 있다면 로그인을 했다는 의미이므로 유저 정보가 저장되어있을 것이다.
  //이때는 그냥 메인 페이지로 넘어가고 없으면 로그인을 하면된다.

  useEffect(() => {
    if (getCookie('token')) {
      reqNickname(getCookie('identifier'))
    } else {
      navigate('/')
    }
  }, [localStorage.getItem('access-token')])

  //로그인 요청 api 서버에 로그인 정보가 있는지 확인 요청을 한다.
  //api는 모듈화하여 테스트를 해봐야한다.
  const reqNickname = async identifier => {
    try {
      console.log(identifier)
      const response = await request.post(`/api/v1/identifier`, {
        identifier: String(identifier),
      })
      if (response.status === 200) {
        navigate(`/${response.data.nickname}`)
      }
    } catch (e) {
      console.log(e)
    }
  }
  const reqLogin = async user => {
    try {
      const response = await request.post('/login', JSON.stringify(user))
      console.log(response)

      if (response.status === 200) {
        alert('로그인 성공')
        console.log(user)
        setError(' ')

        const accessToken = response.headers.get('Authorization')
        const identifier = response.headers.get('identifier')

        setCookie('identifier', identifier, {
          path: '/',
          sameStrict: 'strict',
        })

        setCookie('token', accessToken, {
          path: '/',
          sameStrict: 'strict',
        })
        reqNickname(identifier)

 
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
      setisId(true)
      setisPw(true)
      setError('아이디와 비밀번호를 입력해주세요')
    } else if (form.username.length === 0 && form.password.length !== 0) {
      setisId(true)
      setisPw(false)
      setError('아이디를 입력해주세요')
    } else if (form.username.length !== 0 && form.password.length === 0) {
      setisId(false)
      setisPw(true)
      setError('비밀번호를 입력해주세요')
    } else {
      setisId(false)
      setisPw(false)
      setError('')
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
