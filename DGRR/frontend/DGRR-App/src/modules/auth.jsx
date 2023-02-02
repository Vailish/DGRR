import { createAction, handleActions } from 'redux-actions'
import produce from 'immer'

const CHANGE_FIELD = 'auth/CHANGE_FIELD'
const INITIAL_FORM = 'auth/INITIAL_FORM'
const CHANGE_NULL = 'auth/CHANGE_NULL'
export const changeField = createAction(CHANGE_FIELD, ({ form, key, value }) => ({
  form,
  key,
  value,
}))

export const initialForm = createAction(INITIAL_FORM, form => form)
export const changeNull = createAction(CHANGE_NULL, ({ form, key }) => ({
  form,
  key,
}))
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
}

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value
      }),
    [INITIAL_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initalState[form],
    }),
    [CHANGE_NULL]: (state, { payload: { form, key } }) =>
      produce(state, draft => {
        draft[form][key] = ' '
      }),
  },
  initalState,
)

export default auth
