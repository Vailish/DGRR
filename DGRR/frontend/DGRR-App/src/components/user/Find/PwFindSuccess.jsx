import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { checkPassword } from '../../../regex/regex'
import { request } from '../../../API/request'
import '../../../scss/FindPwSuccess.scss'
const PwFindSuccess = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { username, email } = location.state
  console.log(username, email)
  const [pwError, setPwError] = useState(false)
  const [pwConfirmError, setPwConfirmError] = useState('')
  const [newUser, setNewUser] = useState({
    username: username,
    email: email,
    password: '',
    passwordConfirm: '',
  })

  const onPasswordHandler = e => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    })
  }

  const onPasswordConfirmHandler = e => {
    setNewUser({
      ...newUser,
      passwordConfirm: e.target.value,
    })
  }

  const reqUpdatePassword = async (username, email, password, passwordConfirm) => {
    const updateUserInfo = {
      username: username,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
    }

    try {
      const response = await request.put('/api/v1/request/setpassword', JSON.stringify(updateUserInfo))
    if (response.data === true) {
      alert('비밀번호 수정완료하였습니다.')
      navigate('/')
    } else {
      console.log(response)
      alert('비밀번호 수정실패하였습니다.')
     
    }
    setNewUser({
      ...newUser,
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    })
    } catch (e) {
      alert('비밀번호 수정실패하였습니다.')
      console.log(e)
    }
    
  }
  const onSubmit = e => {
    e.preventDefault()
    const { username, password, passwordConfirm } = newUser
    console.log(pwError)
    if (checkPassword(password)) {
      setPwError(false)
      if (password === passwordConfirm) {
        setPwConfirmError(false)
        console.log(username + ' ' + password + ' ' + passwordConfirm)
        reqUpdatePassword(username, email, password, passwordConfirm)
      } else {
        setPwConfirmError(true)
      }
    } else {
      setPwError(true)
    }
  }
  const { userid, password, passwordConfirm } = newUser
  return (
    <div className="FindPwTheme">
      <div className="FindPw">
        <div className="Text">
          <div className="TitleText">
            <h1
              onClick={() => {
                navigate('/')
              }}
            >
              DG.RR
            </h1>
          </div>
          <div className="SubTitleText">
            <p>
              DG.RR는 <br /> 자신의 볼링점수를 <br />
              관리하기 위한
              <br /> 사이트입니다.
            </p>
          </div>
        </div>
        <div className="FindPwForm">
          <div className="TitleForm">
            <p>DG.RR</p>
          </div>

          <div className="FindPwSuccessInput">
            <form onSubmit={onSubmit}>
              <input style={{ background: '#D3D3D3' }} name="username" value={username} readOnly />
              <input style={{ background: '#D3D3D3' }} name="email" value={email} readOnly />
              <input
                name="password"
                type="password"
                value={password}
                onChange={onPasswordHandler}
                placeholder="비밀번호를 새로 입력해주세요"
              />
              {pwError === true ? (
                <div>
                  <span style={{ color: 'red' }}>
                    영소문자 숫자 특수문자 하나 포함하여 8자 이상 16자 이하로 입력해주세요
                  </span>
                </div>
              ) : null}
              <input
                name="passwordConf"
                type="password"
                value={passwordConfirm}
                onChange={onPasswordConfirmHandler}
                placeholder="비밀번호 다시 입력해주세요"
              />
              {pwConfirmError === true ? (
                <div>
                  <span style={{ color: 'red' }}>비밀번호를 일치 시켜주세요</span>
                </div>
              ) : null}
              <div className="Button">
                <button type="submit">확인</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PwFindSuccess
