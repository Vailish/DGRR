import '../../../scss/Login.scss'
import React from 'react'
import axios from 'axios'
import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
const Login = () => {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')

  const onIdHandler = useCallback(e => {
    setId(e.target.value)
  }, [])

  const onPwHandler = useCallback(e => {
    setPw(e.target.value)
  }, [])

  const onSubmit = e => {
    e.preventDefault()
    const user = {
      username: id,
      password: pw,
    }

    console.log(user)
    axios
      .post('http://192.168.31.134:80/login', {
        user,
        headers: {
          accept: 'application/json',
        },
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  return (
    <div className="LoginTheme">
      <div className="Login">
        <div className="Text">
          <div className="TitleText">
            <h1>DG.RR</h1>
          </div>
          <div className="SubTitleText">
            <p>
              DG.RR는 <br /> 자신의 볼링점수를 <br />
              관리하기 위한
              <br /> 사이트입니다.
            </p>
          </div>
        </div>
        <div className="LoginForm">
          <div className="TitleForm">
            <p>DG.RR</p>
          </div>
          <form onSubmit={onSubmit}>
            <div className="LoginInput">
              <input name="id" type="text" onChange={onIdHandler} placeholder="아이디를 입력해주세요" />
              <br />
              <input name="pw" type="password" onChange={onPwHandler} placeholder="비밀번호를 입력해주세요" />
            </div>
            <div className="Button">
              <button type="submit">로그인</button>
            </div>
          </form>
          <div className="JoinAndFind">
            <Link to="/join">회원가입 </Link>
            <Link to="/findId">아이디찾기 </Link>
            <Link to="/findPw">비밀번호찾기 </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
