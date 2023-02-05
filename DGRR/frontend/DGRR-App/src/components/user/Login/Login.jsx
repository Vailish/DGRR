import '../../../scss/Login.scss'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
const Login = ({ form, onChange, onSubmit, isLogin, error, isId, isPw }) => {
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
          <form>
            <div className="LoginInput">
              <input
                style={isId ? { border: '2px solid red' } : {}}
                name="username"
                type="text"
                form={form.username}
                onChange={onChange}
                placeholder="아이디를 입력해주세요"
              />
              <br />
              <input
                style={isPw ? { border: '2px solid red' } : {}}
                name="password"
                type="password"
                form={form.password}
                onChange={onChange}
                placeholder="비밀번호를 입력해주세요"
              />
            </div>
            {isLogin === false ? (
              <span
                style={{
                  color: 'red',
                }}
              >
                {error}
              </span>
            ) : (
              ''
            )}
            <div className="Button">
              <button onClick={onSubmit}>로그인</button>
            </div>
          </form>
          <div className="JoinAndFind">
            <Link to="/register">회원가입 </Link>
            <Link to="/findId">아이디찾기 </Link>
            <Link to="/findPw">비밀번호찾기 </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
