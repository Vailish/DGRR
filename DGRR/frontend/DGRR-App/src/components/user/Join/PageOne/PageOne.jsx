import React from 'react'
import './PageOne.scss'
const PageOne = ({
  form,
  onSubmit,
  onChange,
  userNameError,
  passwordError,
  passwordConfirmError,
  pageOneError,
  isUserName,
  isPw,
  isPwConfirm,
  isSub,
}) => {
  const changeHandlerId = () => {
    console.log('테스트할게요')
  }
  return (
    <div className="PageOne">
      {/* <div style={{ margin: '20px' }}></div> */}
      <div className="FormTitle">
        <h2>회원가입</h2>
      </div>
      <form onSubmit={onSubmit}>
        <div className="PageInput">
          <input
            style={isSub && !isUserName ? { border: '2px solid red' } : {}}
            className="PageText"
            name="username"
            value={form.username}
            onChange={onChange}
            placeholder="아이디를 입력해주세요"
          />
          <br />
          <div>
            <span style={{ color: 'red' }}>{userNameError}</span>
          </div>
          <input
            style={isSub && !isPw ? { border: '2px solid red' } : {}}
            className="PageText"
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="비밀번호를 입력해주세요"
          />
          <br />
          <div>
            <span style={{ color: 'red' }}>{passwordError} </span>
          </div>

          <input
            style={isSub && !isPwConfirm ? { border: '2px solid red ' } : {}}
            className="PageText"
            type="password"
            name="passwordConfirm"
            value={form.passwordConfirm}
            onChange={onChange}
            placeholder="비밀번호를 다시 입력해주세요"
          />
        </div>
        <div>
          <span style={{ color: 'red' }}>
            {passwordConfirmError} <br />
          </span>
          <span style={{ color: 'red' }}>{pageOneError} </span>
        </div>
        <div className="NextButton">
          <button className="Button1" type="submit">
            다음
          </button>
        </div>
      </form>
    </div>
  )
}
export default PageOne
