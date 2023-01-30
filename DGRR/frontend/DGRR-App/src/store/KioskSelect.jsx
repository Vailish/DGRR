const OPEN_HELP = 'KioskSelect/OPEN_HELP'
const CLOSE_HELP = 'KioskSelect/CLOSE_HELP'

// 액션 생성 함수

export const openHelp = () => ({type: OPEN_HELP})
export const closeHelp = () => ({type: CLOSE_HELP})


// const [modalOpen, setModalOpen] = useState(false);

//   const openModal = () => {
//     setModalOpen(true);
//   };
//   const closeModal = () => {
//     setModalOpen(false);
//   };
  

// 초기 상태

const initialState = {
    helpOpen : false
}

// 리듀서

const KioskSelect = (state=initialState, action) => {
  switch (action.type) {
    case OPEN_HELP:
        return {
            ...state,
            helpOpen: true
        };
    case CLOSE_HELP:
        return {
            ...state,
            helpOpen: false
        };
    default:
        return state;
  }
}


export default KioskSelect