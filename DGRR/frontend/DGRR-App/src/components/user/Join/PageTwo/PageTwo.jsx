import React from 'react';

const PageTwo = ({ form, onSubmit, onChange }) => {
  return (
    <div className="PageTwo">
      <h2>회원가입</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="yourname">yourname</label>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="이름을 입력해주세요"
        />
        <br />
        <label htmlFor="nickname">nickname</label>
        <input
          name="nickname"
          value={form.nickname}
          onChange={onChange}
          placeholder="닉네임을 입력해주세요"
        />
        <br />
        <label htmlFor="email">email</label>
        <input
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="이메일을 입력해주세요"
        />
        <br />
        <button type="submit">다음</button>
      </form>
    </div>
  );
};

export default PageTwo;
