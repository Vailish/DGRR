import React, { useEffect } from 'react'
import '../../scss/FindId.scss'
import { request } from '../../API/request'
import { checkEmail } from '../../regex/regex'
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

  useEffect(() => {
    dispatch(initialForm('findid'))
  }, [dispatch])

  const reqFindUserName = async (nickname, email) => {
    const findIdinfo = {
      nickname: nickname,
      email: email,
    }
    try {
      const response = await request.post('/api/v1/request/username', JSON.stringify(findIdinfo))
      console.log(response)
      if (response.status === 200) {
        alert('결과확인해주세요')
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
      }
    } catch (e) {
      console.log(e)
      alert('존재하지 않는 아이디입니다.')
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
