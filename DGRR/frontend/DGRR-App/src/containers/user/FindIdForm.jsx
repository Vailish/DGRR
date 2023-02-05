import React, { useEffect, useState } from 'react'
import '../../scss/FindId.scss'
import axios from 'axios'
import { checkUserName, checkEmail } from '../../regex/regex'
import { useDispatch, useSelector } from 'react-redux'
import { changeField, initialForm } from '../../modules/auth'
import IdFind from '../../components/user/Find/IdFind'
import { useNavigate } from 'react-router-dom'
const FindIdForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { form } = useSelector(({ auth }) => ({
    form: auth.findid,
  }))

  const reqFindUserName = async (nickname, email) => {
    console.log(nickname + ' ' + email)
    const username = '테스트'
    try {
      const response = await axios.get('링크가 있겠죠?')
      if (response.status === 200) {
        navigate('/findIdSuccess', {
          state: {
            username: username,
          },
        })
      }
    } catch (e) {
      console.log(e)
    }
  }
  const onChange = e => {
    const { name, value } = e.target
    dispatch(
      changeField({
        form: 'findid',
        key: name,
        value,
      }),
    )
  }
  const onSubmit = e => {
    e.preventDefault()
    if (form.nickname && form.email) {
      if (checkEmail(form.email)) {
        reqFindUserName(form.nickname, form.email)
      } else if (!checkEmail(form.email)) {
        alert('이메일 양식을 맞춰주세요')
      }
    } else if (!form.nickname && form.email) {
      alert('닉네임을 입력해주세요')
    } else if (form.nickname && !form.email) {
      alert('이메일을 입력해주세요')
    } else {
      alert('모든 항목을 필수값입니다.')
    }
  }
  return (
    <div>
      <IdFind form={form} onChange={onChange} onSubmit={onSubmit} />
    </div>
  )
}
export default FindIdForm
