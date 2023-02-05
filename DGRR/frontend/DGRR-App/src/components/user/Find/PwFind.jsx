import React from 'react'
import '../../../scss/FindPw.scss'
import { Link } from 'react-router-dom'

const PwFind = ({ form, onChange, onSubmit }) => {
  return (
    <div className="FindPwTheme">
      <div className="FindPw">
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
        <div className="FindPwForm">
          <div className="TitleForm">
            <p>DG.RR</p>
            <div>
              <div className="Category">
                <Link to="/findId">아이디찾기&nbsp;&nbsp;&nbsp;</Link> <Link to="/findPw">비밀번호찾기</Link>
              </div>
            </div>
          </div>
          <form onSubmit={onSubmit}>
            <div className="FindPwInput">
              <input name="username" value={form.username} onChange={onChange} placeholder="아이디를 입력해주세요" />
              <input name="email" value={form.email} onChange={onChange} placeholder="이메일을 입력해주세요" />
              <div className="Button">
                <button type="submit">비밀번호 찾기</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PwFind
