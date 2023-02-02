import React from 'react'
import '../../scss/Login.scss'
const Login = () => {
  return (
    <div className="Login">
      <div className="Text">
        <div className="TitleText">
          <h1>DG.RR</h1>
        </div>
        <div className="SubTitleText">
          <p>DG.RR는 자신의 볼링점수를 관리하기 위한 사이트입니다.</p>
        </div>
      </div>

      <div className="LoginForm">
        <div className="LoginInput">
          <input type="text" />
          <br />
          <input type="text" />
        </div>
        <div className="Button">
          <button>로그인</button>
        </div>
      </div>
    </div>
  )
}

export default Login
