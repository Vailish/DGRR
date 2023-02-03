import { notInitialized } from 'react-redux/es/utils/useSyncExternalStore'
import { apis } from '../API/api'

const ADD_PLAYER = 'KioskOffline/ADD_PLAYER'
const REMOVE_PLAYER = 'KioskOffline/REMOVE_PLAYER'
const UPDATE_PLAYER = 'KioskOffline/UPDATE_PLAYER'
const SEND_ALL_SCORE = 'KioskOffline/SEND_ALL_SCORE'

// 액션 생성 함수

export const addPlayer = () => ({
  type: ADD_PLAYER,
  playerInfo: {
    playerUsername: 'kimbowling',
    playerNickname: '김볼링',
    playerProfile: null,
    playerRank: 216,
    playerRecord: [15, 8, 7],
    playerAverage: 85,
    playerScore: [0, 10, 5, 5, 3, 5, 1, 2, 5, 2, 2, 8, 5, 4, 3, 9, 9, 1, 10, 9, 1],
  },
})
export const removePlayer = () => ({ type: REMOVE_PLAYER, playerIndex: 1 })
export const updatePlayer = () => ({ type: UPDATE_PLAYER, playerInfo: {} })
export const sendAllScore = () => ({ type: SEND_ALL_SCORE, playerInfo: {} })

// const [modalOpen, setModalOpen] = useState(false);

//   const openModal = () => {
//     setModalOpen(true);
//   };
//   const closeModal = () => {
//     setModalOpen(false);
//   };

// 초기 상태

const initialState = {
  players: [
    {
      username: 'testzzang1',
      nickname: '갓냥이',
      profile: null,
      rank: 135,
      record: [10, 7, 3],
      average: 163,
      gameScore: [10, 0, 9, 1, 4, 3, 7, 8, 2, 5, 3, 4, 7, 3, 2, 8, 5, 5, 10, 10, 10],
    },
    {
      username: 'testzzang2',
      nickname: '김볼링',
      profile: null,
      rank: 216,
      record: [15, 8, 7],
      average: 85,
      gameScore: [0, 10, 5, 5, 3, 5, 1, 2, 5, 2, 2, 8, 5, 4, 3, 9, 9, 1, 10, 9, 1],
    },
    {},
    {},
  ],
}

// 리듀서

const OfflineLoginUsers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYER:
      return [...state, action.playerInfo]
    case REMOVE_PLAYER:
      return state.filter(player => player !== action.playerInfo)
    case SEND_ALL_SCORE:
      const gameData = {
        gameType: false,
        gameData: state.players.map(player => {
          if (player !== null) return { nickname: player.username, score: player.gameScore }
        }),
      }
      console.log(JSON.stringify(gameData))
      apis.sendresult(gameData)
      return state
    default:
      return state
  }
}

export default OfflineLoginUsers