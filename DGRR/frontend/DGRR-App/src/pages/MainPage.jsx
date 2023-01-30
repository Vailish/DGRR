import React from 'react'
import { useState } from 'react'
import Nav from '../components/mainpage/Nav'
import '../scss/MianPage.scss'

const Mainpage = () => {
  const [myInfo, setMyInfo] = useState(second)
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    const myInfoRequest = await fetch("https:/login", {
      method: "POST",
      headers: {
        'Authorization':'Bearer '+token,
      },
    })
    const myData = await myInfoRequest;
    setMyInfo(myData);

    const userInfoRequest = await fetch(`https:/user/${myInfo.nickname}`, {
      headers: {
        'Authorization':'Bearer '+token,
      }
    })
    const userData = await userInfoRequest;
    setUserInfo(userData)
  }
  
  return (
    <div className='MainPage'>
      <Nav />
      <div className='MyAvg'>
        {userInfo}
      </div>
    </div>
  )
}

export default Mainpage