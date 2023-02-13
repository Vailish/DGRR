import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeField, initialForm } from '../../modules/auth'
import { useNavigate } from 'react-router-dom'
import MobileLogin from '../../components/Mobile/MobileLogin'
import { request } from '../../API/request'
import { setCookie } from '../../cookies/Cookies'
const MobileForm = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [error, setError] = useState('')
  const [isId, setisId] = useState(false)
  const [isPw, setisPw] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { form } = useSelector(({ auth }) => ({
    form: auth.login,
  }))

  //axios 모듈화 테스트 해보기
  const reqLogin = async user => {
    try {
      const response = await request.post(
        //URI 바꿔야지.......
        '/login',
        JSON.stringify(user),
        // {
        //   headers: {
        //     'Content-Type': 'application/json;charset=UTF-8',
        //   },
        // },
      )
      if (response.status === 200) {
        alert('로그인 성공')
        setError(' ')
        const accessToken = response.headers.get('Authorization')
        setCookie('token', accessToken, {
          path: '/',
          sameStrict: 'strict',
        })
        // const accessToken = response.headers.get('Authorization')
        // localStorage.setItem('access-token', accessToken)
        navigate('/mPin', {
          state: {
            username: user.username,
            password: user.password,
          },
        })
      }
    } catch (e) {
      setError('존재하지 않는 아이디 입니다.')
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
    <MobileLogin
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

export default MobileForm
