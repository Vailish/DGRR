import React from 'react'
import './Login.scss'
const Login = () => {
  return (
    <div className="Login">
      <div className="LoginForm">
        <div className="LoginState">
          <form action="">
            <div className="InputBox">
              <input type="text" />
              <br />
              <input type="text" />
            </div>

            <button>로그인</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
