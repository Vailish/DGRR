//정규식 표현

//username 8자이상16자이하로 길이제한
//시작은 영문자로 해야한다.
export const checkUserName = username => {
  const regexUserName = /^[a-z]+[a-z0-9]{7,10}$/g
  return regexUserName.test(username)
}

//password는 8자이상16자이하로 영문,숫자,특수문자를 최소 한가지씩 조합
export const checkPassword = password => {
  const regexPassword = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/
  return regexPassword.test(password)
}

//nickname은 6자이상 12자 이하로 가능하다.
//nickname은 한글, 영문, 숫자만 가능하다
export const checkNickname = nickname => {
  const regexNickname = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{5,11}$/
  return regexNickname.test(nickname)
}

//이메일은 이메일 식대로 양식을 가져가야 한다.
export const checkEmail = email => {
  const regexEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
  return regexEmail.test(email)
}
