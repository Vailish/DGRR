import { createAction, handleActions } from 'redux-actions'
import produce from 'immer'

const CHANGE_FIELD = 'auth/CHANGE_FIELD'
const INITIAL_FORM = 'auth/INITIAL_FORM'

export const changeField = createAction(CHANGE_FIELD, ({ form, key, value }) => ({
  form,
  key,
  value,
}))

export const initialForm = createAction(INITIAL_FORM, form => form)

const initalState = {
  login: {
    username: '',
    password: '',
  },
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
    name: '',
    nickname: '',
    email: '',
    birthday: '',
    gender: '',
  },
  findid: {
    nickname: '',
    email : '',
  },
  findpw: {
    username: '',
    email : ''
  }
}

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value
        //여기서 정규식 표현하면 되겠다.
        //정규식
      }),
    [INITIAL_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initalState[form],
    }),
  },
  initalState,
)

export default auth
