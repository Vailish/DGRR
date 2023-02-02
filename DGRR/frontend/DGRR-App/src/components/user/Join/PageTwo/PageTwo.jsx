import React from 'react'
import './PageTwo.scss'
const PageTwo = ({ form, onSubmit, onChange }) => {
  return (
    <div className="PageTwo">
      <div className="FormTitle">
        <h2>회원가입</h2>
      </div>
      <form onSubmit={onSubmit}>
        <div className="PageInput">
          <input
            className="PageText"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="이름을 입력해주세요"
          />
          <br />
          <input
            className="PageText"
            name="nickname"
            value={form.nickname}
            onChange={onChange}
            placeholder="닉네임을 입력해주세요"
          />
          <br />
          <input
            className="PageText"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="이메일을 입력해주세요"
          />
          <br />
        </div>
        <div className="NextButton2">
          <button className="Button" type="submit">
            다음
          </button>
        </div>
      </form>
    </div>
  )
}

export default PageTwo
