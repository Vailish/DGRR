const ADD_PLAYER = 'KioskOnline/ADD_PLAYER'
const REMOVE_PLAYER = 'KioskOnline/REMOVE_PLAYER'
const UPDATE_PLAYER = 'KioskOnline/UPDATE_PLAYER'
const ONLINE_GAME_BOARD_CHANGE = 'KioskOnline/ONLINE_GAMEBOARD_CHANGE'
const ONLINE_GAME_BOARD_CHANGE_OPPOSITE = 'KioskOnline/ONLINE_GAMEBOARD_CHANGE_OPPOSITE'
const LOAD_BOTH_PLAYERS = 'KioskOnline/LOAD_BOTH_PLAYERS'
const MATCHING_PLAYER = 'KioskOnline/MATCHING_PLAYER'
const ONLINE_SEND_ALL_DATA = 'KioskOnline/ONLINE_SEND_ALL_DATA'
const START_GAME = 'Kioskonline/START_GAME'

const testPlayer = {
  nickname: 'test!',
  record: [{ totalGame: 10, winGame: 7, loseGame: 5 }],
  profile: 'profile!!!!',
  username: 'TEST!',
  point: 2000,
}
// 액션 생성 함수

export const addPlayer = playerInfo => ({ type: ADD_PLAYER, playerInfo })
export const removePlayer = () => ({ type: REMOVE_PLAYER, playerInfo: {} })
export const updatePlayer = () => ({ type: UPDATE_PLAYER })
export const matchingPlayer = playerInfo => ({ type: MATCHING_PLAYER, playerInfo })
export const onlineGameBoardChange = (myFrame, orderNum, myValue) => ({
  type: ONLINE_GAME_BOARD_CHANGE,
  myFrame,
  orderNum,
  myValue,
})
export const onlineGameBoardChangeOpposite = gameData => ({ type: ONLINE_GAME_BOARD_CHANGE_OPPOSITE, gameData })
export const loadBothPlayers = (oppositePlayerInfo, SessionId) => ({
  type: LOAD_BOTH_PLAYERS,
  oppositePlayerInfo,
  SessionId,
})
export const onlineSendAllData = gameData => ({
  type: ONLINE_SEND_ALL_DATA,
  gameData,
})
export const onlineStartGame = () => ({ type: START_GAME })

// 초기 상태

const initialState = {
  player: {},
  gamingPlayer: {
    playerInfo: {},
    gameBoard: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    gameBoardResult: ['', '', '', '', '', '', '', '', '', ''],
  },
  oppositePlayer: {
    playerInfo: {},
    gameBoard: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    gameBoardResult: ['', '', '', '', '', '', '', '', '', ''],
  },
  SessionId: '',
  isGameFinish: [false, false],
}

// 리듀서

const OnlineLoginUser = (state = initialState, action) => {
  switch (action.type) {
    case START_GAME: {
      const player = {}
      const gamingPlayer = {
        playerInfo: {},
        gameBoard: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        gameBoardResult: ['', '', '', '', '', '', '', '', '', ''],
      }
      const oppositePlayer = {
        playerInfo: {},
        gameBoard: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        gameBoardResult: ['', '', '', '', '', '', '', '', '', ''],
      }
      const SessionId = ''
      const isGameFinish = [false, false]
      return { ...state, player, gamingPlayer, oppositePlayer, SessionId, isGameFinish }
    }
    case ADD_PLAYER: {
      const player = action.playerInfo
      if (player.point) {
        if (player.point <= 800) {
          player['tier'] = '브론즈'
        } else if (player.point > 800 && player.point <= 1200) {
          player['tier'] = '실버'
        } else if (player.point > 1200 && player.point <= 1600) {
          player['tier'] = '골드'
        } else if (player.point > 1600 && player.point <= 2000) {
          player['tier'] = '플래티넘'
        } else if (player.point > 2000) {
          player['tier'] = '다이아'
        }
      } else {
        player['tier'] = '브론즈'
      }
      return {
        ...state,
        player,
      }
    }
    case REMOVE_PLAYER: {
      const player = action.playerInfo
      return {
        ...state,
        player,
      }
    }
    case LOAD_BOTH_PLAYERS: {
      const gamingPlayer = {
        playerInfo: { ...state.player },
        gameBoard: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        gameBoardResult: ['', '', '', '', '', '', '', '', '', ''],
      }
      const playerInfo = action.oppositePlayerInfo
      if (playerInfo.point) {
        if (playerInfo.point <= 800) {
          playerInfo['tier'] = '브론즈'
        } else if (playerInfo.point > 800 && playerInfo.point <= 1200) {
          playerInfo['tier'] = '실버'
        } else if (playerInfo.point > 1200 && playerInfo.point <= 1600) {
          playerInfo['tier'] = '골드'
        } else if (playerInfo.point > 1600 && playerInfo.point <= 2000) {
          playerInfo['tier'] = '플래티넘'
        } else if (playerInfo.point > 2000) {
          playerInfo['tier'] = '다이아'
        }
      } else {
        playerInfo['tier'] = '브론즈'
      }
      const oppositePlayer = {
        playerInfo,
        gameBoard: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        gameBoardResult: ['', '', '', '', '', '', '', '', '', ''],
      }
      const SessionId = action.SessionId
      const isGameFinish = [false, false]
      return { ...state, gamingPlayer, oppositePlayer, SessionId, isGameFinish }
    }
    case ONLINE_GAME_BOARD_CHANGE: {
      // console.log('state : ', state)
      const myFrame = action.myFrame
      // console.log(myFrame)
      const orderNum = action.orderNum
      const myValue = action.myValue === 'x' ? 'X' : action.myValue === 'f' ? 'F' : action.myValue
      // console.log('frame1 : ', state.gamingPlayer.gameBoard)
      const gameBoard = [...state.gamingPlayer.gameBoard]
      gameBoard[2 * (myFrame - 1) + orderNum] = myValue
      const gameBoardSum = [...state.gamingPlayer.gameBoardResult]
      console.log(gameBoard, gameBoardSum)
      console.log('GAMESUM1 : ', gameBoardSum)

      // 첫번째에 X가 있을때 두번째 X를 제거, 혹은 그냥 두번째에 X가 있으면 제거하는 함수
      // 10을 입력하면 X로 변환, 첫번째 숫자에 따라 두번째 숫자의 크기 제한
      for (let index = 0; index < 18; index++) {
        if (index % 2) {
          if (gameBoard[index] === 10) gameBoard[index] = 'X'
          if (gameBoard[index] === 'X') gameBoard[index] = ''
        } else if (!(index % 2)) {
          if (gameBoard[index] === 'X') {
            gameBoard[index + 1] = ''
          } else if (gameBoard[index] === '/') gameBoard[index] = ''
          else if (
            gameBoard[index] === 'F' ||
            gameBoard[index] === '-' ||
            gameBoard[index + 1] === '-' ||
            gameBoard[index + 1] === 'F'
          ) {
          } else if (gameBoard[index] + gameBoard[index + 1] > 10) gameBoard[index + 1] = ''
          else if (gameBoard[index] + gameBoard[index + 1] === 10) gameBoard[index + 1] = '/'
        }
      }
      // 마지막 스트라이크 혹은 스페어가 아니면 보너스 투구 불가
      if (!(gameBoard[18] === 'X' || gameBoard[19] === '/')) gameBoard[20] = ''
      if (!(gameBoard[18] === 'X') && gameBoard[19] === 'X') gameBoard[19] = ''
      if (gameBoard[18] === 'X' && gameBoard[19] === '/') gameBoard[19] = ''
      if (gameBoard[19] === 'X' && gameBoard[20] === '/') gameBoard[20] = ''
      if (gameBoard[18] === '/') gameBoard[18] = ''
      if (gameBoard[19] === 'X' || gameBoard[19] === '/') if (gameBoard[20] === '/') gameBoard[20] = ''
      if (gameBoard[18] !== 'X' && gameBoard[18] !== '' && gameBoard[19] !== '') {
        if (gameBoard[18] === 'F' || gameBoard[18] === '-' || gameBoard[19] === 'F' || gameBoard[19] === '-') {
        } else if (gameBoard[18] + gameBoard[19] > 10) gameBoard[19] = ''
        else if (gameBoard[18] + gameBoard[19] === 10) gameBoard[19] = '/'
      }

      // console.log('!!!!', gameBoard)
      // for (let index = 18; index < gameBoard.length; index++)
      // {

      // }

      // console.log('GAMESUM1 : ', gameBoardSum)
      // 부분 로컬합 구하기 함수
      for (let index = 0; index < gameBoard.length; index++) {
        // console.log('여기로 옴')
        // console.log('GAMESUM1 : ', gameBoardSum, index)

        if (18 <= index && index < 21) {
          // console.log('여기로 옴1')
          if (gameBoard[18] && gameBoard[19]) {
            const lastFrameScore = [gameBoard[18], gameBoard[19], gameBoard[20]]
            for (let index = 0; index < lastFrameScore.length; index++) {
              if (lastFrameScore[index] === 'X') {
                lastFrameScore[index] = 10
              } else if (lastFrameScore[index] === '/') {
                lastFrameScore[index] = 10 - lastFrameScore[index - 1]
              } else if (lastFrameScore[index] === '-' || lastFrameScore[index] === 'F') lastFrameScore[index] = 0
              else if (lastFrameScore[index] !== '') lastFrameScore[index] = Number(lastFrameScore[index])
            }
            // console.log('lastFrame : ', lastFrameScore)
            gameBoardSum[9] = lastFrameScore.reduce((sum, value) => {
              if (value !== '') {
                sum = Number(sum)
                return sum + value
              }
              return sum
            }, '')
          } else gameBoardSum[9] = ''
          break
        } else {
          if (gameBoard[index] === 'X') {
            gameBoardSum[parseInt(index / 2)] = 'X'
            index++
          } else if (gameBoard[index] === '/') {
            // console.log('여기로 옴2')
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
                  (gameBoard[index] === '-' || gameBoard[index] === 'F'
                    ? 0
                    : gameBoard[index] === 'X'
                    ? 10
                    : Number(gameBoard[index])) +
                  (gameBoard[index + 1] === '-' || gameBoard[index + 1] === 'F'
                    ? 0
                    : gameBoard[index] === 'X'
                    ? 10
                    : Number(gameBoard[index]))
              } else {
                gameBoardSum[parseInt(index / 2)] = ''
              }
            }
          }
        }
      }
      // 실제 표기할 총합 구하기 함수
      for (let index = 0; index < gameBoardSum.length; index++) {
        // console.log('하하')
        if (gameBoardSum[index] === '') {
          // console.log('GAMESUM1 : ', gameBoardSum, index)

          for (let index2 = index + 1; index2 < gameBoardSum.length; index2++) {
            gameBoardSum[index2] = ''
          }
          break
        } else if (gameBoardSum[index] === 'X' || gameBoardSum[index] === '/') {
          // console.log('GAMESUM1 : ', gameBoardSum, index)

          if (gameBoardSum[index] === '/') {
            let plusScore = gameBoard[2 * (index + 1)]
            if (plusScore !== '')
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
              } else if (gameBoard[index2] !== '') plusList.push(Number(gameBoard[index2]))

              if (plusList.length > 1) break
            }
            if (plusList.length === 2) gameBoardSum[index] = 10 + plusList[0] + plusList[1]
          }
        } else {
        }
      }

      const gameBoardResult = []
      // console.log('GAMESUM : ', gameBoardSum)
      gameBoardSum.reduce((sum, value) => {
        if (value !== '' && value !== '/' && value !== 'X' && value !== 'x') {
          gameBoardResult.push(sum + value)
        }
        return sum + value
      }, 0)
      for (let i = gameBoardResult.length; i < 10; i++) gameBoardResult.push('')

      // console.log('GAMERESULT : ', gameBoardResult)

      if ((gameBoard[18] === 'X' || gameBoard[19] === 'X' || gameBoard[19] === '/') && !gameBoard[20])
        gameBoardResult[9] = ''

      const gamingPlayer = { ...state.gamingPlayer, gameBoard, gameBoardResult }

      const isGameFinish = [true, true]
      const yourGameBoardResult = state.oppositePlayer.gameBoardResult
      for (let num of gameBoardResult) {
        if (!num) isGameFinish[0] = false
      }
      for (let num of yourGameBoardResult) {
        if (!num) isGameFinish[1] = false
      }

      // console.log(gamingPlayer)
      return { ...state, gamingPlayer, isGameFinish }
    }
    case ONLINE_GAME_BOARD_CHANGE_OPPOSITE: {
      const gameData = action.gameData
      const gameBoard = []
      // console.log('gameDATA : ', gameData)
      for (let letter of gameData) {
        if (letter === ' ') gameBoard.push('')
        else if (isNaN(Number(letter))) gameBoard.push(letter)
        else gameBoard.push(Number(letter))
      }
      const gameBoardSum = state.oppositePlayer.gameBoardResult
      // 부분 로컬합 구하기 함수
      for (let index = 0; index < gameBoard.length; index++) {
        // console.log('여기로 옴')
        // console.log('GAMESUM1 : ', gameBoardSum, index)

        if (18 <= index && index < 21) {
          // console.log('여기로 옴1')
          if (gameBoard[18] && gameBoard[19]) {
            const lastFrameScore = [gameBoard[18], gameBoard[19], gameBoard[20]]
            for (let index = 0; index < lastFrameScore.length; index++) {
              if (lastFrameScore[index] === 'X') {
                lastFrameScore[index] = 10
              } else if (lastFrameScore[index] === '/') {
                lastFrameScore[index] = 10 - lastFrameScore[index - 1]
              } else if (lastFrameScore[index] === '-' || lastFrameScore[index] === 'F') lastFrameScore[index] = 0
              else if (lastFrameScore[index] !== '') lastFrameScore[index] = Number(lastFrameScore[index])
            }
            // console.log('lastFrame : ', lastFrameScore)
            gameBoardSum[9] = lastFrameScore.reduce((sum, value) => {
              if (value !== '') {
                sum = Number(sum)
                return sum + value
              }
              return sum
            }, '')
          } else gameBoardSum[9] = ''
          break
        } else {
          if (gameBoard[index] === 'X') {
            gameBoardSum[parseInt(index / 2)] = 'X'
            index++
          } else if (gameBoard[index] === '/') {
            // console.log('여기로 옴2')
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
                  (gameBoard[index] === '-' || gameBoard[index] === 'F'
                    ? 0
                    : gameBoard[index] === 'X'
                    ? 10
                    : Number(gameBoard[index])) +
                  (gameBoard[index + 1] === '-' || gameBoard[index + 1] === 'F'
                    ? 0
                    : gameBoard[index] === 'X'
                    ? 10
                    : Number(gameBoard[index]))
              } else {
                gameBoardSum[parseInt(index / 2)] = ''
              }
            }
          }
        }
      }
      // 실제 표기할 총합 구하기 함수
      for (let index = 0; index < gameBoardSum.length; index++) {
        // console.log('하하')
        if (gameBoardSum[index] === '') {
          // console.log('GAMESUM1 : ', gameBoardSum, index)

          for (let index2 = index + 1; index2 < gameBoardSum.length; index2++) {
            gameBoardSum[index2] = ''
          }
          break
        } else if (gameBoardSum[index] === 'X' || gameBoardSum[index] === '/') {
          // console.log('GAMESUM1 : ', gameBoardSum, index)

          if (gameBoardSum[index] === '/') {
            let plusScore = gameBoard[2 * (index + 1)]
            if (plusScore !== '')
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
              } else if (gameBoard[index2] !== '') plusList.push(Number(gameBoard[index2]))

              if (plusList.length > 1) break
            }
            if (plusList.length === 2) gameBoardSum[index] = 10 + plusList[0] + plusList[1]
          }
        } else {
        }
      }

      const gameBoardResult = []
      // console.log('GAMESUM : ', gameBoardSum)
      gameBoardSum.reduce((sum, value) => {
        if (value !== '' && value !== '/' && value !== 'X' && value !== 'x') {
          gameBoardResult.push(sum + value)
        }
        return sum + value
      }, 0)
      for (let i = gameBoardResult.length; i < 10; i++) gameBoardResult.push('')

      // console.log('GAMERESULT : ', gameBoardResult)

      if ((gameBoard[18] === 'X' || gameBoard[19] === 'X' || gameBoard[19] === '/') && !gameBoard[20])
        gameBoardResult[9] = ''
      const oppositePlayer = { ...state.oppositePlayer, gameBoard, gameBoardResult }

      const isGameFinish = [true, true]
      const myGameBoardResult = state.gamingPlayer.gameBoardResult
      for (let num of myGameBoardResult) {
        if (!num) isGameFinish[0] = false
      }
      for (let num of gameBoardResult) {
        if (!num) isGameFinish[1] = false
      }

      return { ...state, oppositePlayer, isGameFinish }
    }
    default:
      return state
  }
}

export default OnlineLoginUser
