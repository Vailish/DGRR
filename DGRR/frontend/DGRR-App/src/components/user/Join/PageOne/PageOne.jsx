import React from 'react'
import './PageOne.scss'
const PageOne = ({ form, onSubmit, onChange }) => {
  return (
    <div className="PageOne">
      {/* <div style={{ margin: '20px' }}></div> */}
      <div className="FormTitle">
        <h2>회원가입</h2>
      </div>
      <form onSubmit={onSubmit}>
        <div className="PageInput">
          <input
            className="PageText"
            name="username"
            value={form.username}
            onChange={onChange}
            placeholder="아이디를 입력해주세요"
          />
          <br />

          <input
            className="PageText"
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="비밀번호를 입력해주세요"
          />
          <br />

          <input
            className="PageText"
            name="passwordConfirm"
            value={form.passwordConfirm}
            onChange={onChange}
            placeholder="비밀번호를 다시 입력해주세요"
          />
        </div>
        <br />
        <div className="NextButton">
          <button className="Button" type="submit">
            다음
          </button>
        </div>
      </form>
    </div>
  )
}
export default PageOne
