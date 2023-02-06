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
    const findIdinfo = {
      nickname: nickname,
      email: email,
    }
    try {
      const response = await axios.post(
        'http://192.168.31.142:8080/api/v1/request/username',
        JSON.stringify(findIdinfo),
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
        },
      )
      console.log(response)
      if (response.status === 200) {
        alert('아이디를 찾았어요!!')
        navigate('/findIdSuccess', {
          state: {
            username: response.data,
          },
        })
        dispatch(
          changeField({
            form: 'findid',
            key: 'nickname',
            value: '',
          }),
        )
        dispatch(
          changeField({
            form: 'findid',
            key: 'email',
            value: '',
          }),
        )
      } else {
        alert('존재하지 않는 아이디입니다.')
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
