import React from 'react'
import PwFind from '../../components/user/Find/PwFind'
import { useSelector, useDispatch } from 'react-redux'
import { changeField, initialForm } from '../../modules/auth'
import { checkEmail } from '../../regex/regex'
import { useNavigate } from 'react-router-dom'
const FindPwForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { form } = useSelector(({ auth }) => ({
    form: auth.findpw,
  }))

  const reqFindPassword = async (nickname, email) => {
    const username = '테스트 '
    navigate('/findPwSuccess', {
      state: {
        username: username,
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
