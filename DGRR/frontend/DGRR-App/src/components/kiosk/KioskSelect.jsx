import React from 'react'
import '../../scss/KioskSelect.scss'
import { useDispatch } from 'react-redux'
import KioskSelectHelp from './KioskSelectHelp'
import { Link } from 'react-router-dom'
import { openHelp, closeHelp } from '../../store/KioskSelect'

const KioskSelect = () => {
  const dispatch = useDispatch()

  const onOpenHelp = () => dispatch(openHelp())
  const onCloseHelp = () => dispatch(closeHelp())

  // const [modalOpen, setModalOpen] = useState(false);

  // const openModal = () => {
  //   setModalOpen(true);
  // };
  // const closeModal = () => {
  //   setModalOpen(false);
  // };

  return (
    <div className="KioskBackground">
      <KioskSelectHelp closeHelp={onCloseHelp} />
      <div className="TitleBlock">
        <div className="HelpCircleBlock">
          <div className="HelpCircle" onClick={onOpenHelp}>
            ?
          </div>
        </div>
        <div className="TitleTextBlock">
          <div className="TitleText">DG.RR</div>
          {/* <hr className='Pin'/> */}
        </div>
      </div>
      <div className="ButtonBlock">
        <Link to="/KioskOnlineLogin" className="Competition">
          <div className="CompetitionText">경쟁전</div>
        </Link>
        <Link to="/KioskLogin" className="Friendly">
          <div className="FriendlyText">친선전</div>
        </Link>
      </div>
    </div>
  )
}

export default KioskSelect
