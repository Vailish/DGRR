import React from 'react'
import { useSelector } from 'react-redux'
import '../../scss/KioskSelectHelp.scss'

const KioskSelectHelp = props => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아

  const helpOpen = useSelector(state => state.KioskSelect.helpOpen)

  const { closeHelp } = props

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className="KioskSelectHelp">
      {helpOpen ? (
        <section className="KioskSelectHelpInner">
          <header className="Header">
            <button className="Close" onClick={closeHelp}>
              &times;
            </button>
          </header>
          <div className="Start">시작하기</div>
          <div className="FirstHere">처음 오셨나요?</div>
          <p className="InnerText">경쟁전 : 온라인으로 만난 상대와 1:1 대결을 벌입니다!</p>
          <p className="InnerText">친선전 : 오프라인으로 친구들과 함께 점수를 겨룹니다</p>
          {/* <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer> */}
        </section>
      ) : null}
    </div>
  )
}

export default KioskSelectHelp
