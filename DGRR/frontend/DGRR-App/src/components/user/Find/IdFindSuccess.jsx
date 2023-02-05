import React from 'react'
import { useLocation } from 'react-router-dom'
import '../../../scss/FindIdSuccess.scss'
const IdFindSuccess = () => {
  const location = useLocation()
  const { username } = location.state
  return (
    <div className="FindIdTheme">
      <div className="FindId">
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
        <div className="FindIdForm">
          <div className="TitleForm">
            <p>DG.RR</p>
          </div>

          <div className="FindIdInput">
            <div>
              <span>{username} </span>
            </div>
            <div className="Button">
              <button type="button">확인</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IdFindSuccess
