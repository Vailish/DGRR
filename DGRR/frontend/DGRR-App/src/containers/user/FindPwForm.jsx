import React, { useEffect } from 'react'
import PwFind from '../../components/user/Find/PwFind'
import { useSelector, useDispatch } from 'react-redux'
import { changeField, initialForm } from '../../modules/auth'
import { checkEmail } from '../../regex/regex'
import { useNavigate } from 'react-router-dom'
import { request } from '../../API/request'
const FindPwForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { form } = useSelector(({ auth }) => ({
    form: auth.findpw,
  }))
  useEffect(() => {
    dispatch(initialForm('findpw'))
  }, [dispatch])
  const reqFindPassword = async (username, email) => {
    console.log(username + ' ' + email)
    const findUserinfo = {
      username: username,
      email: email,
    }
    try {
      const response = await request.post('/api/v1/request/setpassword', JSON.stringify(findUserinfo), {})
      console.log(response)
      alert('계정을 찾았습니다.')
      navigate('/findPwSuccess', {
        state: {
          username: username,
          email: email,
        },
      })
    } catch (e) {
      alert('존재하지 않는 계정입니다.')
    }
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
