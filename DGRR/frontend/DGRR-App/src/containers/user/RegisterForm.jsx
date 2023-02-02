import PageOne from '../../components/user/Join/PageOne/PageOne'
import PageTwo from '../../components/user/Join/PageTwo/PageTwo'
import PageThree from '../../components/user/Join/PageThree/PageThree'
import MultiStepProgressBar from '../../components/user/Join/MultiStepProgressBar/MultiStepProgressBar'
import '../../scss/Register.scss'
import React, { useState, useEffect } from 'react'
import { changeField, initialForm } from '../../modules/auth'
import { useSelector, useDispatch } from 'react-redux'
import { getYear, getMonth, getDate, fromUnixTime } from 'date-fns'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const RegisterForm = () => {
  const navigate = useNavigate()
  const { form } = useSelector(({ auth }) => ({
    form: auth.register,
  }))

  const reqRegister = async user => {
    console.log(user)
    try {
      const response = await axios.post('http://192.168.31.142/api/v1/signup', JSON.stringify(user), {
        headers: { 'Content-Type': 'application/json' },
      })
      console.log(response)
      if (response.status === 200) {
        {
          alert('회원가입성공')
        }
        navigate('/')
      }
    } catch (e) {
      console.log(e)
    }
  }
  const dispatch = useDispatch()
  const onChange = e => {
    const { name, value } = e.target
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    )
  }
  const onChangeDate = date => {
    date.name = 'birthday'
    let year = getYear(date)
    let month = ''
    let day = ''
    if (getMonth(date) + 1 < 10 && getDate(date) < 10) {
      month = '0' + (getMonth(date) + 1)
      day = '0' + getDate(date)
      dispatch(
        changeField({
          form: 'register',
          key: date.name,
          value: year + '-' + month + '-' + day,
        }),
      )
    } else if (getMonth(date) + 1 < 10 && getDate(date) >= 10) {
      month = '0' + (getMonth(date) + 1)
      day = getDate(date)
      dispatch(
        changeField({
          form: 'register',
          key: date.name,
          value: year + '-' + month + '-' + day,
        }),
      )
    } else if (getMonth(date) + 1 >= 10 && getDate(date) < 10) {
      month = getMonth(date) + 1
      day = '0' + getDate(date)
      dispatch(
        changeField({
          form: 'register',
          key: date.name,
          value: year + '-' + month + '-' + day,
        }),
      )
    } else {
      month = getMonth(date) + 1
      day = getDate(date)
      dispatch(
        changeField({
          form: 'register',
          key: date.name,
          value: getYear(date) + '-' + month + '-' + day,
        }),
      )
    }
  }
  const onChangeGender = checkThis => {
    const genderBoxes = document.getElementsByName('gender')

    for (let i = 0; i < genderBoxes.length; i++) {
      if (genderBoxes[i] !== checkThis) {
        genderBoxes[i].checked = false
      } else {
        dispatch(
          changeField({
            form: 'register',
            key: genderBoxes[i].name,
            value: genderBoxes[i].value,
          }),
        )
      }
    }
  }
  const [page, setPage] = useState('pageone')
  const nextPage = page => {
    setPage(page)
  }
  const onSubmitPageOne = e => {
    e.preventDefault()
    const { username, password, passwordConfirm } = form
    console.log(username + ' ' + password + ' ' + passwordConfirm)
    nextPage('pagetwo')
  }

  const onSubmitPageTwo = e => {
    e.preventDefault()
    const { name, nickname, email } = form
    console.log(name + ' ' + nickname + ' ' + email)
    nextPage('pagethree')
  }

  const onSubmitPageThree = e => {
    e.preventDefault()
    const { name, birthday, gender } = form
    console.log(birthday + ' ' + gender)
    reqRegister(form)
  }

  useEffect(() => {
    dispatch(initialForm('register'))
  }, [dispatch])

  const nextPageNumber = pageNumber => {
    switch (pageNumber) {
      case '1':
        setPage('pageone')
        break
      case '2':
        setPage('pagetwo')
        break
      case '3':
        setPage('pagethree')
        break
      case '4':
        break
      default:
        setPage('1')
    }
  }

  return (
    <div className="RegisterProgress">
      <div className="RegisterTheme">
        <div className="Register">
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
          <div className="RegisterForm">
            <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} className="progress" />
            {
              {
                pageone: <PageOne form={form} onChange={onChange} onSubmit={onSubmitPageOne} />,
                pagetwo: <PageTwo form={form} onChange={onChange} onSubmit={onSubmitPageTwo} />,
                pagethree: (
                  <PageThree
                    form={form}
                    onChangeDate={onChangeDate}
                    onChangeGender={onChangeGender}
                    onSubmit={onSubmitPageThree}
                  />
                ),
              }[page]
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
