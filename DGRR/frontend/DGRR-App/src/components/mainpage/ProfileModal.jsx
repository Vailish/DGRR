import React from 'react'
import "../../scss/ProfileModal.scss"

const ProfileModal = ({setModalOpen}) => {
  return (
    <div className="presentation">
      <div className="wrapper-modal">
        <div className="modal">
          <span onClick={() => setModalOpen(false)} className="modal-close">
            X
          </span>
      

        </div>
      </div>
    </div>
  )
}

export default ProfileModal