import '../../scss/Register.scss'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { changeField, initialForm } from '../../modules/auth'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getYear, getMonth, getDate } from 'date-fns'
import { checkUserName, checkPassword, checkNickname, checkEmail } from '../../regex/regex'
import PageOne from '../../components/user/Join/PageOne/PageOne'
import PageTwo from '../../components/user/Join/PageTwo/PageTwo'
import PageThree from '../../components/user/Join/PageThree/PageThree'
import MultiStepProgressBar from '../../components/user/Join/MultiStepProgressBar/MultiStepProgressBar'
const RegisterForm = () => {

  //회원가입 progree에 대한 정규식 표현 처리 
  const [registerOneError, setRegisterOneError] = useState({
    pageone: '',
    username: '',
    password: '',
    passwordConfirm: '',
  })

  const [registerTwoError, setRegisterTwoError] = useState({
    pagetwo: '',
    name: '',
    nickname: '',
    email: '',
  })

  const [registerThreeError, setRegisterThreeError] = useState({
    pagethree: '',
    gender: '',
    date: '',
  })

  const [isRegisterOneError, setIsRegisterOneError] = useState({
    pageone: false,
    username: false,
    password: false,
    passwordConfirm: false,
  })

  const [isRegisterTwoError, setIsRegisterTwoError] = useState({
    pagetwo: false,
    name: false,
    nickname: false,
    email: false,
  })

  const [isRegisterThreeError, setIsRegisterThreeError] = useState({
    pagethree: false,
    gender: false,
    date: false,
  })

  const [isSubOne, setIsSubOne] = useState(false)
  const [isSubTwo, setIsSubTwo] = useState(false)
  const [isSubThree, setIsSubThree] = useState(false)
  const navigate = useNavigate()
  const { form } = useSelector(({ auth }) => ({
    form: auth.register,
  }))

  //회원가입 비동기 api 통신
  const reqRegister = async user => {
    try {
      const response = await axios.post('http://192.168.31.142:8080/api/v1/signup', JSON.stringify(user), {
        headers: { 'Content-Type': 'application/json' },
      })

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

  //아이디 중복체크
  const reqDuplcateCheckUserName = async username => {
    try {
      const response = await axios.get(`http://192.168.31.142:8080/api/v1/check/username/${username}`)
      if (response.data === true) {
        setIsRegisterOneError({
          ...setIsRegisterOneError,
          username: true,
        })
        setRegisterOneError({
          ...setIsRegisterOneError,
          username: '',
        })
      } else if (response.data === false) {
        setIsRegisterOneError({
          ...setIsRegisterOneError,
          username: false,
        })
        setRegisterOneError({
          ...setIsRegisterOneError,
          username: '존재하는 아이디입니다.',
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  //닉네임 중복체크
  const reqDuplcateCheckNickname = async nickname => {
    try {
      const response = await axios.get(`http://192.168.31.142:8080/api/v1/check/nickname/${nickname}`)
      if (response.data === true) {
        setIsRegisterTwoError({
          ...isRegisterTwoError,
          nickname: true,
        })
        setRegisterTwoError({
          ...registerTwoError,
          nickname: '',
        })
      } else if (response.data === false) {
        setIsRegisterTwoError({
          ...isRegisterTwoError,
          nickname: false,
        })
        setRegisterTwoError({
          ...registerTwoError,
          nickname: '존재하는 닉네임입니다.',
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  //이메일 중복체크
  const reqDuplcateCheckEmail = async email => {
    try {
      const response = await axios.get(`http://192.168.31.142:8080/api/v1/check/email/${email}`)
      if (response.data === true) {
        setIsRegisterTwoError({
          ...isRegisterTwoError,
          email: true,
        })
        setRegisterTwoError({
          ...registerTwoError,
          email: '',
        })
      } else if (response.data === false) {
        setIsRegisterTwoError({
          ...isRegisterTwoError,
          email: false,
        })
        setRegisterTwoError({
          ...registerTwoError,
          email: '존재하는 이메일입니다.',
        })
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
    //아이디 정규식 표현을 위해 e.target.name기준으로 잡아준다.
    if (name === 'username') {
      if (value.length === 0) {
        setRegisterOneError({ ...registerOneError, username: '' })
        setIsRegisterOneError({
          ...isRegisterOneError,
          username: false,
        })
      } else {
        if (checkUserName(value)) {
          setIsRegisterOneError({
            ...isRegisterOneError,
            username: true,
          })
          setRegisterOneError({ ...registerOneError, username: '' })
          //통과를 했다면 아이디 중복 체크를 해야한다.
          //비동기 통신 처리하기 위한 코드
          reqDuplcateCheckUserName(value)
        } else {
          setIsRegisterOneError({
            ...isRegisterOneError,
            username: false,
          })
          setRegisterOneError({
            ...registerOneError,
            username: '영문자 시작8자 이상 16자 이하로 입력해주세요',
          })
        }
      }
    }

    if (name === 'password') {
      if (value.length === 0) {
        setRegisterOneError({
          ...registerOneError,
          password: '',
        })
        setIsRegisterOneError({
          ...isRegisterOneError,
          password: false,
        })
       
      } else {
        //비밀번호는 소문자와 숫자 그리고 특수문자 조합으로 간다.
        if (checkPassword(value)) {
          setIsRegisterOneError({
            ...isRegisterOneError,
            password: true,
          })
          setRegisterOneError({
            ...registerOneError,
            password: '',
          })
        } else {
          setRegisterOneError({
            ...isRegisterOneError,
            password: false,
          })
          setRegisterOneError({
            ...registerOneError,
            password: '영문,숫자,특수문자 조합으로 8~16자 이하로 입력!',
          })
        }
      }
    }
    if (name === 'passwordConfirm') {
      if (value.length === 0) {
        setRegisterOneError({
          ...registerOneError,
          passwordConfirm: '',
        })
        setIsRegisterOneError({
          ...isRegisterOneError,
          passwordConfirm: false,
        })
      } else {
        if (form.password.length === 0) {
          setRegisterOneError({
            ...registerOneError,
            passwordConfirm: '비밀번호를 먼저 입력해주세요',
          })
          setIsRegisterOneError({
            ...isRegisterOneError,
            passwordConfirm: false,
          })
        } else {
          if (value === form.password) {
            setRegisterOneError({
              ...registerOneError,
              passwordConfirm: '',
            })
            setIsRegisterOneError({
              ...isRegisterOneError,
              passwordConfirm: true,
            })
          } else {
            setRegisterOneError({
              ...registerOneError,
              passwordConfirm: '비밀번호가 일치하지 않습니다.',
            })
            setIsRegisterOneError({
              ...isRegisterOneError,
              passwordConfirm: false,
            })
          }
        }
      }
    }
    if (name === 'name') {
      if (value.length === 0) {
        setRegisterTwoError({
          ...setRegisterTwoError,
          name: '',
        })
        setIsRegisterTwoError({
          ...setIsRegisterTwoError,
          name: false,
        })
      } else {
        setIsRegisterTwoError({
          ...setIsRegisterTwoError,
          name: true,
        })
      }
    }
    if (name === 'nickname') {
      if (value.length === 0) {
        setRegisterTwoError({
          ...registerTwoError,
          nickname: '',
        })
        setIsRegisterTwoError({
          ...isRegisterTwoError,
          nickname: false,
        })
      } else {
        if (checkNickname(value)) {
          setIsRegisterTwoError({
            ...isRegisterTwoError,
            nickname: true,
          })
          setRegisterTwoError({
            ...registerTwoError,
            nickname: '',
          })
          reqDuplcateCheckNickname(value)
        } else {
          setIsRegisterTwoError({
            ...isRegisterTwoError,
            nickname: false,
          })
          setRegisterTwoError({
            ...registerTwoError,
            nickname: '닉네임 6~12자로 입력해주세요',
          })
        }
      }
    }
    if (name === 'email') {
      if (value.length === 0) {
        setRegisterTwoError({
          ...registerTwoError,
          email: '',
        })
        setRegisterTwoError({
          ...isRegisterTwoError,
          email: false,
        })
      } else {
        if (checkEmail(value)) {
          setIsRegisterTwoError({
            ...isRegisterTwoError,
            email: true,
          })
          setRegisterTwoError({
            ...registerTwoError,
            email: '',
          })
          reqDuplcateCheckEmail(value)
        } else {
          setIsRegisterTwoError({
            ...isRegisterTwoError,
            email: false,
          })
          setRegisterTwoError({
            ...registerTwoError,
            email: '이메일 양식에 맞게 작성해주세요 ',
          })
        }
      }
    }
  }

  const onChangeDate = date => {
    //날짜 format 맞추기 10월 이하의 달과 10일 이하의 날들을 앞에 0을 붙혀준다.
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
  //성별
  const onChangeGender = checkThis => {
    const genderBoxes = document.getElementsByName('gender')
    const check = checkThis.checked

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

        //남자
        if (genderBoxes[i].value === 'male') {
          //남자 선택
          if (check) {
           
            setIsRegisterThreeError({
              ...isRegisterThreeError,
              gender: true,
            })
            setRegisterThreeError({
              ...registerThreeError,
              gender: '',
            })
          } else {
            setIsRegisterThreeError({
              ...isRegisterThreeError,
              gender: false,
            })
            setRegisterThreeError({
              ...registerThreeError,
              gender: '성별 하나 필수로 선택하셔야 됩니다.',
            })
          }
          //남자 선택 하지 않음
        }
        if (genderBoxes[i].value === 'female') {
          if (check) {
            
            setIsRegisterThreeError({
              ...isRegisterThreeError,
              gender: true,
            })
            setRegisterThreeError({
              ...registerThreeError,
              gender: '',
            })
          } else {
            
            setIsRegisterThreeError({
              ...isRegisterThreeError,
              gender: false,
            })
            setRegisterThreeError({
              ...registerThreeError,
              gender: '성별 하나 필수로 선택하셔야 됩니다.',
            })
          }
        }
      }
    }
  }
  //page이동을 위한
  const [page, setPage] = useState('pageone')
  const nextPage = page => {
    setPage(page)
  }

  //pageone입력을 다하면 page 2로 이동
  //그전에 유효성 검사를 치뤄야한다.

  const onSubmitPageOne = e => {
    e.preventDefault()
    //여기서 각 input이 빈값이라면 막아주어야한다.
    //그럼 if~else가 아니라 if~elseif~else문으로 해줘야함.
    //경우의 수가 좀 많은데? 잠시만 쉬었다가 생각좀해볼게

    //순열로 돌릴 수 있을 것 같음 일단 이렇게 구현해보고 리팩토링때 수정할게
    //조건이 많으면 그렇게 시간적인 측면으로 보았을 때 효율적이지 않음
    setIsSubOne(true)
    if (isRegisterOneError.username && isRegisterOneError.password && isRegisterOneError.passwordConfirm) {
      setRegisterOneError({
        ...setRegisterOneError,
        pageone: '',
      })
      nextPage('pagetwo')
    } else {
      setRegisterOneError({
        ...setRegisterOneError,
        pageone: '조건을 충족시켜주세요',
      })
    }
  }

  const onSubmitPageTwo = e => {
    e.preventDefault()
    setIsSubTwo(true)

    if (isRegisterTwoError.name && isRegisterTwoError.nickname && isRegisterTwoError.email) {
      setIsRegisterTwoError({
        ...isRegisterTwoError,
        pagetwo: true,
      })
      setRegisterTwoError({
        ...setRegisterTwoError,
        pagetwo: '',
      })
      nextPage('pagethree')
    } else {
      setIsRegisterTwoError({
        ...isRegisterTwoError,
        pagetwo: false,
      })
      setRegisterTwoError({
        ...setRegisterTwoError,
        pagetwo: '조건을 충족시켜주세요',
      })
    }
  }

  const onSubmitPageThree = e => {
    e.preventDefault()

    const { name, birthday, gender } = form
    setIsSubThree(true)
    if (isRegisterThreeError.gender && birthday.length === 10) {
      setIsRegisterThreeError({
        ...isRegisterThreeError,
        date: true,
        pagethree: true,
      })
      setRegisterThreeError({
        ...registerThreeError,
        date: '',
        pagethree: '',
      })
      setRegisterThreeError({
        ...registerThreeError,
        gender: '',
      })
      reqRegister(form)
    } else if (!isRegisterThreeError.gender && birthday.length === 10) {

      setIsRegisterThreeError({
        ...isRegisterThreeError,
        gender: false,
        date: true,
      })
      setRegisterThreeError({
        ...registerThreeError,
        gender: '성별을 필수로 하나 입력해주세요',
        date: '날짜를 선택해 주세요',
      })
    } else if (isRegisterThreeError.gender && !(birthday.length === 10)) {
      setIsRegisterThreeError({
        ...isRegisterThreeError,
        gender: true,
        date: false,
      })
      setRegisterThreeError({
        ...registerThreeError,
        gender: '',
        date: '날짜를 선택해 주세요',
      })
    } else {
      setIsRegisterThreeError({
        ...isRegisterThreeError,
        gender: false,
        date: false,
      })
      setRegisterThreeError({
        ...registerThreeError,
        gender: '성별을 필수로 하나 선택해주세요',
        date: '날짜를 선택해 주세요',
      })
    }
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
              <h1
                onClick={() => {
                  navigate('/')
                }}
              >
                DG.RR
              </h1>
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
                pageone: (
                  <PageOne
                    form={form}
                    onChange={onChange}
                    onSubmit={onSubmitPageOne}
                    userNameError={registerOneError.username}
                    passwordError={registerOneError.password}
                    passwordConfirmError={registerOneError.passwordConfirm}
                    pageOneError={registerOneError.pageone}
                    isUserName={isRegisterOneError.username}
                    isPw={isRegisterOneError.password}
                    isPwConfirm={isRegisterOneError.passwordConfirm}
                    isSub={isSubOne}
                  />
                ),
                pagetwo: (
                  <PageTwo
                    form={form}
                    onChange={onChange}
                    onSubmit={onSubmitPageTwo}
                    pageTwoError={registerTwoError.pagetwo}
                    nameError={registerTwoError.name}
                    nicknameError={registerTwoError.nickname}
                    emailError={registerTwoError.email}
                    isName={isRegisterTwoError.name}
                    isNickname={isRegisterTwoError.nickname}
                    isEmail={isRegisterTwoError.email}
                    isSub={isSubTwo}
                  />
                ),
                pagethree: (
                  <PageThree
                    form={form}
                    onChangeDate={onChangeDate}
                    onChangeGender={onChangeGender}
                    onSubmit={onSubmitPageThree}
                    genderError={registerThreeError.gender}
                    dateError={registerThreeError.date}
                    pageThreeError={registerThreeError.pagethree}
                    isGender={isRegisterThreeError.gender}
                    isDate={isRegisterThreeError.date}
                    isSub={isSubThree}
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
