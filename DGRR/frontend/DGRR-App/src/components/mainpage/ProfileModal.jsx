import React, { useState, useEffect } from 'react'
import baseaxios from '../../API/baseaxios'
import '../../scss/ProfileModal.scss'

const ProfileModal = ({ setModalOpen }) => {
  const [files, setFiles] = useState('')
  useEffect(() => {
    preview()

    return () => preview()
  }, [files])

  const preview = () => {
    if (!files) return false

    const imgEl = document.querySelector('.img__box')
    const reader = new FileReader()

    reader.onload = () => (imgEl.style.backgroundImage = `url(${reader.result})`)
    console.log('asdad', reader)

    reader.readAsDataURL(files[0])
  }

  const reqImage = async data => {
    try {
      console.log(data.get('profileImage'))
      const response = await baseaxios.put('/api/v1/userimg/', data, {
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      })
      console.log('응답', response)
    } catch (e) {
      console.log(e)
    }
  }
  const onLoadFile = e => {
    const file = e.target.files
    console.log('asdasd', file)
    setFiles(file)
  }

  const handleClick = e => {
    e.preventDefault()

    const data = new FormData()
    data.append('nickname', '갓냥이')
    data.append('stateMessage', '11111')
    data.append('profileImage', files[0])
    reqImage(data)
    console.log(data)
  }

  return (
    <div className="presentation">
      <div className="wrapper-modal">
        <div className="modal">
          <span onClick={() => setModalOpen(false)} className="modal-close">
            X
          </span>

          <div>
            <strong>업로드된 이미지</strong>
            <div className="img__box"></div>
            <img src="" alt="" />
          </div>

          <form onSubmit={handleClick}>
            <input name="nickname" value="갓냥이" />
            <input name="stateMessage" value="전송" />
            <input type="file" name="profileImage" onChange={onLoadFile} />
            <button type="submit">전송</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileModal