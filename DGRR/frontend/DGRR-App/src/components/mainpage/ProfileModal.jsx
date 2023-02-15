import React, { useState, useEffect, useRef } from 'react'
import baseaxios from '../../API/baseaxios'
import axios from 'axios'
import fileReq from '../../API/fileReq'
import "../../scss/ProfileModal.scss"

const ProfileModal = ({ setModalOpen }) => {

  const [files, setFiles] = useState("");
  const fileInput = useRef();
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
  
  const reqImage = async () => {
    try {
      const formdata = new FormData();
  
      formdata.append('profileImage', files[0])
      formdata.append('nickname', '갓냥이')
      formdata.append('stateMessage', "123123")
      console.log(formdata.get('nickname'))
      const response = await fileReq.put('/api/v1/userimg/', 
        {
          data: {
            'nickname':  formdata.get('nickname'),
            'stateMessage': formdata.get('stateMessage'),
            'profileImage' : formdata.get('profileImage')
         }
       })
      console.log("응답", response)
    } catch (e) {
      console.log(e)
    }
  }
  const onLoadFile = (e) => {
    const file = e.target.files;
    console.log("asdasd", file);
    setFiles(file);
  
  }


  const handleClick = e => {
    e.preventDefault();
  
    const f1 = new FormData(document.getElementById("123"));
    axios.put("http://192.168.31.142:8080/api/v1/userimg/", f1).then(() => alert(1));
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

          {/* <form onSubmit={handleClick}>
            <input type="file" name="profileImage" accept='img/*' onChange={onLoadFile} />
            <label htmlFor="image">파일 선택하기</label>
            <button type="submit">전송하기</button>
          </form> */}

          <form id="123"  ref={fileInput} name="form" method="put" enctype="multipart/form-data" onSubmit={handleClick}>
            <input name="nickname" value="갓냥이"/>
            <input name="stateMessage" value="전송"/>
            <input type="file" name="profileImage" onChange={onLoadFile} />
            <button id="456" type='submit'>asdf</button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default ProfileModal