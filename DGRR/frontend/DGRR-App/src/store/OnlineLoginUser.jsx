const ADD_PLAYER = 'KioskOnline/ADD_PLAYER'
const REMOVE_PLAYER = 'KioskOnline/REMOVE_PLAYER'
const UPDATE_PLAYER = 'KioskOnline/UPDATE_PLAYER'

// 액션 생성 함수

export const addPlayer = playerInfo => ({ type: ADD_PLAYER, playerInfo })
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
  player: {},
}

// 리듀서

const OnlineLoginUser = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYER:
      const player = action.playerInfo
      return {
        ...state,
        player,
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
