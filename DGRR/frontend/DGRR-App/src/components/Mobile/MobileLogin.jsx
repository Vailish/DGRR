import React from 'react'
import '../../scss/MobileLogin.scss'
const MobileLogin = ({ form, onChange, onSubmit, isLogin, error, isId, isPw }) => {
  return (
    <div className="MobileTheme">
      <div className="Mobile">
        <div className="MobileText">
          <div className="MobileTitleText">
            <h1>DG.RR</h1>
          </div>
          <div className="MobileSubTitleText">
            <p>
              DG.RR는 <br /> 자신의 볼링점수를 <br />
              관리하기 위한
              <br /> 사이트입니다.
            </p>
          </div>
        </div>
        <div className="MobileForm">
          <form onSubmit={onSubmit}>
            <div className="MobileLoginInput">
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
            <div className="MobileButton">
              <button type="submit">로그인</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MobileLogin
