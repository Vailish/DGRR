import { useState } from 'react'
import { notInitialized } from 'react-redux/es/utils/useSyncExternalStore'
import { api } from '../API/api'

const ADD_PLAYER = 'KioskOffline/ADD_PLAYER'
const REMOVE_PLAYER = 'KioskOffline/REMOVE_PLAYER'
const UPDATE_PLAYER = 'KioskOffline/UPDATE_PLAYER'
const SEND_ALL_SCORE = 'KioskOffline/SEND_ALL_SCORE'
const LOAD_PLAYERS = 'KioskOffline/LOAD_PLAYERS'
const OFFLINE_GAME_BOARD_CHANGE = 'KioskOffline/OFFLINE_GAME_BOARD_CHANGE'

// 액션 생성 함수

// export const change_user = createAction(CHANGE_USER, user => user);

// export const addPlayer2 = () => ({
//   apis.~~~
// })

export const addPlayer = playerInfo => ({
  type: ADD_PLAYER,
  playerInfo: {
    username: 'testzzang2',
    nickname: '김볼링',
    profile: null,
    rank: 216,
    record: [15, 8, 7],
    average: 85,
  },
  playerInfo,
})
export const removePlayer = player => ({ type: REMOVE_PLAYER, playerInfo: player })
export const updatePlayer = () => ({ type: UPDATE_PLAYER, playerInfo: {} })
export const sendAllScore = () => ({ type: SEND_ALL_SCORE, playerInfo: {} })
export const loadPlayers = () => ({ type: LOAD_PLAYERS })
export const offlineGameBoardChange = (playerNum, myFrame, orderNum, myValue) => ({
  type: OFFLINE_GAME_BOARD_CHANGE,
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
      record: [{ totalGame: 10, winGame: 7, loseGame: 3 }],
      average: 163,
    },
    {
      username: 'testzzang2',
      nickname: '김볼링',
      profile: null,
      rank: 216,
      record: [{ totalGame: 15, winGame: 8, loseGame: 7 }],
      average: 85,
    },
  ],
  gamingPlayers: {
    player1: {
      playerInfo: {
        username: 'testzzang1',
        nickname: '갓냥이',
        profile: null,
        rank: 135,
        record: [{ totalGame: 10, winGame: 7, loseGame: 3 }],
        average: 163,
      },
      gameBoard: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      gameBoardResult: [2, 2, 2, 2, 2, 2, 2, 2, 2, 120],
    },
    player2: {
      playerInfo: {
        username: 'testzzang2',
        nickname: '김볼링',
        profile: null,
        rank: 216,
        record: [{ totalGame: 15, winGame: 8, loseGame: 7 }],
        average: 85,
      },
      gameBoard: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      gameBoardResult: [4, 4, 4, 4, 4, 4, 4, 4, 4, 200],
    },
    player3: {
      playerInfo: {
        username: 'testzzang2',
        nickname: '박볼매',
        profile: null,
        rank: 216,
        record: [{ totalGame: 15, winGame: 8, loseGame: 7 }],
        average: 85,
      },
      gameBoard: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      gameBoardResult: [4, 4, 4, 4, 4, 4, 4, 4, 4, 200],
    },
    player4: {
      playerInfo: {
        username: 'testzzang2',
        nickname: '김싸피',
        profile: null,
        rank: 216,
        record: [{ totalGame: 15, winGame: 8, loseGame: 7 }],
        average: 85,
      },
      gameBoard: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      gameBoardResult: [4, 4, 4, 4, 4, 4, 4, 4, 4, 200],
    },
  },
}

// 리듀서

const OfflineLoginUsers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYER: {
      if (state.players.length === 4) {
        return state
      }
      // pin 숫자를 그대로 입력

      console.log('LAFDASF', action.playerInfo)
      // const playerInfo = response.then(res => {
      //   console.log('!:!:!:!:!!:!:', res.data)
      //   return res.data
      // })
      // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', playerInfo)
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
      api.sendresult(gameData)
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
    case OFFLINE_GAME_BOARD_CHANGE: {
      console.log('state : ', state)
      const playerNum = action.playerNum
      const myFrame = action.myFrame
      console.log(myFrame)
      const orderNum = action.orderNum
      const myValue = action.myValue === 'x' ? 'X' : action.myValue === 'f' ? 'F' : action.myValue
      console.log('frame1 : ', state.gamingPlayers[playerNum].gameBoard)
      const gameBoard = [...state.gamingPlayers[playerNum].gameBoard]
      gameBoard[2 * (myFrame - 1) + orderNum] = myValue
      const gameBoardSum = [...state.gamingPlayers[playerNum].gameBoardResult]

      // 첫번째에 X가 있을때 두번째 X를 제거, 혹은 그냥 두번째에 X가 있으면 제거하는 함수
      for (let index = 0; index < 18; index++) {
        if (index % 2 && gameBoard[index] === 'X') gameBoard[index] = ''
        if (!(index % 2)) {
          if (gameBoard[index] === 'X') {
            gameBoard[index + 1] = ''
          }
          if (gameBoard[index] === '/') gameBoard[index] = ''
        }
      }
      // 마지막 스트라이크 혹은 스페어가 아니면 보너스 투구 불가
      if (!(gameBoard[18] === 'X' || gameBoard[19] === '/')) gameBoard[20] = ''
      if (!(gameBoard[18] === 'X') && gameBoard[19] === 'X') gameBoard[19] = ''
      if (gameBoard[18] === 'X' && gameBoard[19] === '/') gameBoard[19] = ''
      if (gameBoard[19] === 'X' && gameBoard[20] === '/') gameBoard[20] = ''
      console.log('!!!!', gameBoard)
      // for (let index = 18; index < gameBoard.length; index++)
      // {

      // }

      // 부분 로컬합 구하기 함수
      for (let index = 0; index < gameBoard.length; index++) {
        console.log('여기로 옴')
        if (18 <= index && index < 21) {
          console.log('여기로 옴1')
          const lastFrameScore = [gameBoard[18], gameBoard[19], gameBoard[20]]
          for (let index = 0; index < lastFrameScore.length; index++) {
            if (lastFrameScore[index] === 'X') {
              lastFrameScore[index] = 10
            } else if (lastFrameScore[index] === '/') {
              lastFrameScore[index] = 10 - lastFrameScore[index - 1]
            } else if (lastFrameScore[index] === '-' || lastFrameScore[index] === 'F') lastFrameScore[index] = 0
            else lastFrameScore[index] = Number(lastFrameScore[index])
          }
          gameBoardSum[9] = lastFrameScore.reduce((sum, value) => {
            return sum + value
          }, 0)
          break
        } else {
          if (gameBoard[index] === 'X') {
            gameBoardSum[parseInt(index / 2)] = 'X'
            index++
          } else if (gameBoard[index] === '/') {
            console.log('여기로 옴2')
            gameBoardSum[parseInt(index / 2)] = '/'
            continue
          } else {
            if (index % 2) {
              if (gameBoard[index] !== '' && gameBoard[index - 1] !== '') {
                gameBoardSum[parseInt(index / 2)] =
                  (gameBoard[index] === '-' || gameBoard[index] === 'F' ? 0 : Number(gameBoard[index])) +
                  (gameBoard[index - 1] === '-' || gameBoard[index - 1] === 'F' ? 0 : Number(gameBoard[index - 1]))
              } else {
                gameBoardSum[parseInt(index / 2)] = ''
              }
            } else {
              if (gameBoard[index] !== '' && gameBoard[index + 1] !== '') {
                gameBoardSum[parseInt(index / 2)] =
                  (gameBoard[index] === '-' || gameBoard[index] === 'F' ? 0 : Number(gameBoard[index])) +
                  (gameBoard[index + 1] === '-' || gameBoard[index + 1] === 'F' ? 0 : Number(gameBoard[index + 1]))
              } else {
                gameBoardSum[parseInt(index / 2)] = ''
              }
            }
          }
        }
      }
      // 실제 표기할 총합 구하기 함수
      for (let index = 0; index < gameBoardSum.length; index++) {
        if (gameBoardSum[index] === '') {
          for (let index2 = index + 1; index2 < gameBoardSum.length; index2++) {
            gameBoardSum[index2] = ''
          }
          break
        } else if (gameBoardSum[index] === 'X' || gameBoardSum[index] === '/') {
          if (gameBoardSum[index] === '/') {
            let plusScore = gameBoard[2 * (index + 1)]
            gameBoardSum[index] =
              10 + (plusScore === '-' || plusScore === 'F' ? 0 : plusScore === 'X' ? 10 : Number(plusScore))
          } else {
            let plusList = []
            for (let index2 = 2 * (index + 1); index2 < gameBoard.length; index2++) {
              if (gameBoard[index2] === '-' || gameBoard[index2] === 'F') plusList.push(0)
              else if (gameBoard[index2] === 'X') {
                plusList.push(10)
                if (index2 < 18) index2++
              } else if (gameBoard[index2] === '/') {
                plusList.push(10 - plusList[0])
              } else plusList.push(Number(gameBoard[index2]))

              if (plusList.length > 1) break
            }
            gameBoardSum[index] = 10 + plusList[0] + plusList[1]
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
