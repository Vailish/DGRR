const ADD_PLAYER = 'KioskOnline/ADD_PLAYER'
const REMOVE_PLAYER = 'KioskOnline/REMOVE_PLAYER'
const UPDATE_PLAYER = 'KioskOnline/UPDATE_PLAYER'
const ONLINE_GAME_BOARD_CHANGE = 'KioskOnline/ONLINE_GAMEBOARD_CHANGE'

// 액션 생성 함수

export const addPlayer = playerInfo => ({ type: ADD_PLAYER, playerInfo })
export const removePlayer = () => ({ type: REMOVE_PLAYER, playerInfo: {} })
export const updatePlayer = () => ({ type: UPDATE_PLAYER })
export const onlineGameBoardChange = (myFrame, orderNum, myValue) => ({
  type: ONLINE_GAME_BOARD_CHANGE,
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
  player: {
    username: 'testzzang2',
    nickname: '김볼링',
    profile: null,
    rank: 216,
    record: [{ totalGame: 15, winGame: 8, loseGame: 7 }],
    average: 85,
  },
  gamingPlayer: {
    gameBoard: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    gameBoardResult: ['', '', '', '', '', '', '', '', '', ''],
  },
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
    case ONLINE_GAME_BOARD_CHANGE: {
      console.log('state : ', state)
      const myFrame = action.myFrame
      console.log(myFrame)
      const orderNum = action.orderNum
      const myValue = action.myValue === 'x' ? 'X' : action.myValue === 'f' ? 'F' : action.myValue
      console.log('frame1 : ', state.gamingPlayer.gameBoard)
      const gameBoard = [...state.gamingPlayer.gameBoard]
      gameBoard[2 * (myFrame - 1) + orderNum] = myValue
      const gameBoardSum = [...state.gamingPlayer.gameBoardResult]
      console.log(gameBoard, gameBoardSum)

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
      console.log('GAMESUM1 : ', gameBoardSum)
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
              if (gameBoard[index] !== '' || gameBoard[index - 1] !== '') {
                gameBoardSum[parseInt(index / 2)] =
                  (gameBoard[index] === '-' || gameBoard[index] === 'F' ? 0 : Number(gameBoard[index])) +
                  (gameBoard[index - 1] === '-' || gameBoard[index - 1] === 'F' ? 0 : Number(gameBoard[index - 1]))
              } else {
                gameBoardSum[parseInt(index / 2)] = ''
              }
            } else {
              if (gameBoard[index] !== '' || gameBoard[index + 1] !== '') {
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
        console.log('하하')
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

      const gamingPlayer = { ...state.gamingPlayer, gameBoard, gameBoardResult }
      console.log(gamingPlayer)
      return { ...state, gamingPlayer }
    }
    default:
      return state
  }
}

export default OnlineLoginUser
