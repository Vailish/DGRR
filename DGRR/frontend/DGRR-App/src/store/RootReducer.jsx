import { combineReducers } from 'redux'
import KioskSelect from './KioskSelect'
import OfflineLoginUsers from './OfflineLoginUsers'
import OnlineLoginUser from './OnlineLoginUser'
// import todos from './todos';

const RootReducer = combineReducers({
  KioskSelect,
  OfflineLoginUsers,
  OnlineLoginUser,
})

export default RootReducer
