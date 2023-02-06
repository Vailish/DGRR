import React from 'react'
import PwFind from '../../components/user/Find/PwFind'
import { useSelector, useDispatch } from 'react-redux'
import { changeField, initialForm } from '../../modules/auth'
import { checkEmail } from '../../regex/regex'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const FindPwForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { form } = useSelector(({ auth }) => ({
    form: auth.findpw,
  }))

  const reqFindPassword = async (username, email) => {
    console.log(username + ' ' + email)
    const findUserinfo = {
      username: username,
      email: email,
    }
    const response = await axios.post(
      'http://192.168.31.142:8080/api/v1/request/setpassword',
      JSON.stringify(findUserinfo),
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      },
    )
    console.log(response)

    navigate('/findPwSuccess', {
      state: {
        username: username,
        email: email,
      },
    })
  }
  const onChange = e => {
    const { name, value } = e.target
    dispatch(
      changeField({
        form: 'findpw',
        key: name,
        value,
      }),
    )
  }

  const onSubmit = e => {
    e.preventDefault()
    if (form.username && form.email) {
      if (checkEmail(form.email)) {
        reqFindPassword(form.username, form.email)
      } else if (!checkEmail(form.email)) {
        alert('이메일 양식을 맞춰주세요')
      }
    } else if (!form.username && form.email) {
      alert('아이디를 입력해주세요')
    } else if (checkEmail(form.email) && form.username && !form.email) {
      alert('이메일을 입력해주세요')
    } else {
      alert('모든 항목을 필수값입니다.')
    }
  }

  return <PwFind form={form} onChange={onChange} onSubmit={onSubmit} />
}
export default FindPwForm
