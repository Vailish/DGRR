import React from 'react';
const PageOne = ({ form, onSubmit, onChange }) => {
  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">username</label>
        <input
          name="username"
          value={form.username}
          onChange={onChange}
          placeholder="아이디를 입력해주세요"
        />
        <br />
        <label htmlFor="password">password</label>
        <input
          name="password"
          value={form.password}
          onChange={onChange}
          placeholder="비밀번호를 입력해주세요"
        />
        <br />
        <label htmlFor="passwordConfirm">passwordConfirm</label>
        <input
          name="passwordConfirm"
          value={form.passwordConfirm}
          onChange={onChange}
          placeholder="비밀번호를 다시 입력해주세요"
        />
        <br />
        <button type="submit">다음</button>
      </form>
    </div>
  );
};
export default PageOne;
