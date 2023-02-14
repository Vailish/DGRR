import { combineReducers } from 'redux'
import auth from './auth'
import KioskSelect from './KioskSelect'
import OfflineLoginUsers from './OfflineLoginUsers'
import OnlineLoginUser from './OnlineLoginUser'

const rootReducer = combineReducers({
  auth,
  KioskSelect,
  OfflineLoginUsers,
  OnlineLoginUser,
})

export default rootReducer
