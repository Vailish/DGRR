const ADD_PLAYER = 'KioskOffline/ADD_PLAYER'
const REMOVE_PLAYER = 'KioskOffline/REMOVE_PLAYER'
const UPDATE_PLAYER = 'KioskOffline/UPDATE_PLAYER'

// 액션 생성 함수

export const addPlayer = () => ({ type: ADD_PLAYER, plaryerInfo: {} })
export const removePlayer = () => ({ type: REMOVE_PLAYER, playerInfo: {} })
export const updatePlayer = () => ({ type: UPDATE_PLAYER })

// const [modalOpen, setModalOpen] = useState(false);

//   const openModal = () => {
//     setModalOpen(true);
//   };
//   const closeModal = () => {
//     setModalOpen(false);
//   };

// 초기 상태

const initialState = {
  playerNumber: 1,
  players: [],
}

// 리듀서

const OnlineLoginUser = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYER:
      return {
        ...state,
        helpOpen: true,
      }
    case REMOVE_PLAYER:
      return {
        ...state,
        helpOpen: false,
      }
    default:
      return state
  }
}

export default OnlineLoginUser
