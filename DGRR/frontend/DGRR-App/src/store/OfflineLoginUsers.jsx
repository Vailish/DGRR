import { notInitialized } from 'react-redux/es/utils/useSyncExternalStore'
import { apis } from '../API/api'

const ADD_PLAYER = 'KioskOffline/ADD_PLAYER'
const REMOVE_PLAYER = 'KioskOffline/REMOVE_PLAYER'
const UPDATE_PLAYER = 'KioskOffline/UPDATE_PLAYER'
const SEND_ALL_SCORE = 'KioskOffline/SEND_ALL_SCORE'
const LOAD_PLAYERS = 'KioskOffline/LOAD_PLAYERS'
const OFFLINE_GAMEBOARD_CHANGE = 'KioskOffline/OFFLINE_GAMEBOARD_CHANGE'

// 액션 생성 함수

// export const change_user = createAction(CHANGE_USER, user => user);

// export const addPlayer2 = () => ({
//   apis.~~~
// })

export const addPlayer = playerUsername => ({
  type: ADD_PLAYER,
  playerInfo: {
    username: 'testzzang2',
    nickname: '김볼링',
    profile: null,
    rank: 216,
    record: [15, 8, 7],
    average: 85,
    gameScore: [0, 10, 5, 5, 3, 5, 1, 2, 5, 2, 2, 8, 5, 4, 3, 9, 9, 1, 10, 9, 1],
    gameBoard: {
      frame1: ['', '', ''],
      frame2: ['', '', ''],
      frame3: ['', '', ''],
      frame4: ['', '', ''],
      frame5: ['', '', ''],
      frame6: ['', '', ''],
      frame7: ['', '', ''],
      frame8: ['', '', ''],
      frame9: ['', '', ''],
      frame10: ['', '', '', ''],
    },
  },
})
export const removePlayer = player => ({ type: REMOVE_PLAYER, playerInfo: player })
export const updatePlayer = () => ({ type: UPDATE_PLAYER, playerInfo: {} })
export const sendAllScore = () => ({ type: SEND_ALL_SCORE, playerInfo: {} })
export const loadPlayers = () => ({ type: LOAD_PLAYERS })
export const offlineGameBoardChange = (playerNum, myFrame, orderNum, myValue) => ({
  type: OFFLINE_GAMEBOARD_CHANGE,
  playerNum,
  myFrame,
  orderNum,
  myValue,
})

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
      gameBoard: {
        frame1: ['', '', ''],
        frame2: ['', '', ''],
        frame3: ['', '', ''],
        frame4: ['', '', ''],
        frame5: ['', '', ''],
        frame6: ['', '', ''],
        frame7: ['', '', ''],
        frame8: ['', '', ''],
        frame9: ['', '', ''],
        frame10: ['', '', '', ''],
      },
    },
    {
      username: 'testzzang2',
      nickname: '김볼링',
      profile: null,
      rank: 216,
      record: [15, 8, 7],
      average: 85,
      gameScore: [0, 10, 5, 5, 3, 5, 1, 2, 5, 2, 2, 8, 5, 4, 3, 9, 9, 1, 10, 9, 1],
      gameBoard: {
        frame1: ['', '', ''],
        frame2: ['', '', ''],
        frame3: ['', '', ''],
        frame4: ['', '', ''],
        frame5: ['', '', ''],
        frame6: ['', '', ''],
        frame7: ['', '', ''],
        frame8: ['', '', ''],
        frame9: ['', '', ''],
        frame10: ['', '', '', ''],
      },
    },
  ],
  gamingPlayers: {},
}

// 리듀서

const gameBoard = {
  frame1: ['', '', ''],
  frame2: ['', '', ''],
  frame3: ['', '', ''],
  frame4: ['', '', ''],
  frame5: ['', '', ''],
  frame6: ['', '', ''],
  frame7: ['', '', ''],
  frame8: ['', '', ''],
  frame9: ['', '', ''],
  frame10: ['', '', '', ''],
}

const OfflineLoginUsers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYER: {
      if (state.players.length === 4) {
        return state
      }
      // pin 숫자를 그대로 입력
      apis.getPlayers()
      // const playerInfo = apis.getPlayers()
      const players = [...state.players.filter(player => player.nickname), action.playerInfo]
      return { ...state, players }
    }
    case REMOVE_PLAYER: {
      const players = state.players.filter(player => player !== action.playerInfo)
      return { ...state, players }
    }
    case SEND_ALL_SCORE: {
      const gameData = {
        gameType: false,
        gameData: state.players.map(player => {
          if (player !== null) return { nickname: player.username, score: player.gameScore }
        }),
      }
      console.log(JSON.stringify(gameData))
      apis.sendresult(gameData)
      return state
    }
    case LOAD_PLAYERS: {
      const gamingPlayers = {}
      for (let playerIndex = 0; playerIndex < state.players.length; playerIndex++) {
        const gameBoard = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
        const gameBoardResult = ['', '', '', '', '', '', '', '', '', '']
        const playerInfo = state.players[playerIndex]
        gamingPlayers[`player${playerIndex + 1}`] = { playerInfo, gameBoard, gameBoardResult }
      }
      console.log(gamingPlayers)
      return { ...state, gamingPlayers }
    }
    case OFFLINE_GAMEBOARD_CHANGE: {
      console.log('state : ', state)
      const playerNum = action.playerNum
      const myFrame = action.myFrame
      console.log(myFrame)
      const orderNum = action.orderNum
      const myValue = action.myValue
      console.log('frame1 : ', state.gamingPlayers[playerNum].gameBoard)
      const gameBoard = [...state.gamingPlayers[playerNum].gameBoard]
      gameBoard[2 * (myFrame - 1) + orderNum] = myValue
      console.log('!!!!', gameBoard)
      const gameBoardSum = [...state.gamingPlayers[playerNum].gameBoardResult]
      let endpoint = 0
      for (let index = 0; index < gameBoard.length; index++) {
        console.log('여기로 옴')
        if (18 <= index && index < 21) {
          console.log('여기로 옴1')
          if (gameBoard[18] && gameBoard[19] && gameBoard[20]) {
            const lastFrameScore = [gameBoard[18], gameBoard[19], gameBoard[20]]
            for (let index = 0; index < lastFrameScore.length; index++) {
              if (lastFrameScore[index] === 'X' || lastFrameScore[index] === 'x') {
                lastFrameScore[index] = 10
              } else if (lastFrameScore[index] === '/') {
                lastFrameScore[index] = 10 - lastFrameScore[index - 1]
              }
            }
            gameBoardSum[9] = lastFrameScore.reduce((sum, value) => {
              return sum + value
            }, 0)
            endpoint = 9
          }
          break
        } else if (index % 2) {
          if (gameBoard[index - 1] === 'X' || gameBoard[index - 1] === 'x') {
            gameBoardSum[parseInt(index / 2)] = 'X'
            index++
          } else if (gameBoard[index] === '/') {
            console.log('여기로 옴2')
            gameBoardSum[parseInt(index / 2)] = '/'
            continue
          } else if (gameBoard[index] === '') {
            break
          } else {
            // else if (parseInt(index / 2) !== 0)
            //   gameBoardSum[parseInt(index / 2)] =
            //     gameBoard[index] + gameBoard[index - 1] + gameBoardSum[parseInt(index / 2) - 1]
            gameBoardSum[parseInt(index / 2)] = gameBoard[index] + gameBoard[index - 1]
            endpoint = parseInt(index / 2)
          }
        }
      }
      for (let index = endpoint; index >= 0; index--) {
        if (gameBoardSum[index] === '') break
        else if (gameBoardSum[index] === 'X' || gameBoardSum[index] === 'x' || gameBoardSum[index] === '/') {
          console.log('아아아아아앙아')
          if (gameBoardSum[index + 1] === '') continue
          else if (gameBoardSum[index] === '/') {
            let plusScore = 0
            for (let i = 2 * (index + 1); i < gameBoard.length; i++) {
              if (gameBoard[i] !== '') {
                plusScore = gameBoard[i]
                break
              }
            }
            if (plusScore === 'x' || plusScore === 'X') plusScore = 10
            plusScore = Number(plusScore)
            gameBoardSum[index] = 10 + plusScore
          } else {
            const plusList = []
            for (let i = 2 * (index + 1); i < gameBoard.length; i++) {
              if (gameBoard[i] !== '') plusList.push(gameBoard[i])
              if (plusList.length > 1) break
            }
            const plusScore = plusList.map(score => {
              if (score === 'X' || score === 'x') return 10
              else return score
            })
            if (plusScore[1] === '/') gameBoardSum[index] = 20
            else gameBoardSum[index] = 10 + plusScore[0] + plusScore[1]
          }
        }
      }
      const gameBoardResult = []
      console.log('GAMESUM : ', gameBoardSum)
      gameBoardSum.reduce((sum, value) => {
        if (value !== '' && value !== '/' && value !== 'X' && value !== 'x') {
          gameBoardResult.push(sum + value)
        }
        return sum + value
      }, 0)
      for (let i = gameBoardResult.length; i < 10; i++) gameBoardResult.push('')
      console.log('GAMERESULT : ', gameBoardResult)

      const playerObject = {}
      playerObject[`${playerNum}`] = { ...state.gamingPlayers[playerNum], gameBoard, gameBoardResult }
      console.log('----', playerObject)
      const gamingPlayers = { ...state.gamingPlayers, ...playerObject }
      console.log(gamingPlayers)
      return { ...state, gamingPlayers }
    }
    default:
      return state
  }
}

export default OfflineLoginUsers
