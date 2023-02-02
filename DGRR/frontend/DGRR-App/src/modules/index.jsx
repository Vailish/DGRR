import { combineReducers } from 'redux'
import auth from './auth'
import KioskSelect from '../store/KioskSelect'
import OfflineLoginUsers from '../store/OfflineLoginUsers'
import OnlineLoginUser from '../store/OnlineLoginUser'

const rootReducer = combineReducers({
  auth,
  KioskSelect,
  OfflineLoginUsers,
  OnlineLoginUser,
})

export default rootReducer
