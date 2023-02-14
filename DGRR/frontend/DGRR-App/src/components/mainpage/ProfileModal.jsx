import React, { useState, useEffect } from 'react'
import baseaxios from '../../API/baseaxios'
import "../../scss/ProfileModal.scss"

const ProfileModal = ({ setModalOpen }) => {

  const [files, setFiles] = useState("");

  useEffect(() => {
    preview();
  
    return () => preview();
  }, [files])

  const preview = () => {
    if (!files) return false;

    const imgEl = document.querySelector('.img__box');
    const reader = new FileReader();

    reader.onload = () => (
      
      imgEl.style.backgroundImage = `url(${reader.result})`
    )
    console.log("asdad", reader)
   
    reader.readAsDataURL(files[0]);
  }
  

  const onLoadFile = (e) => {
    const file = e.target.files;
    console.log("asdasd", file);
    setFiles(file);
  }

  const handleClick = e => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('uploadImage', files[0])
    // baseaxios.post(
    //   `/api/v1/user/${nickName}`,
    //   {
    //     Headers: {
    //       'content-type': 'multipart/form-data',
    //     },
    //   },
    //   formdata
    // );
 
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
            <div className='img__box'></div>
            <img src="" alt="" />
          </div>

          <form>
            <input type="file" id="image" accept='img/*' onChange={onLoadFile} />
            <label htmlFor="image">파일 선택하기</label>
            <button onClick={handleClick}>전송하기</button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default ProfileModal