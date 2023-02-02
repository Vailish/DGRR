import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { getYear, getMonth } from 'date-fns'
import { ko } from 'date-fns/esm/locale'
import './PageThree.scss'
import './DatePicker.css'
const _ = require('lodash')

const PageThree = ({ form, onChangeGender, onChangeDate, onSubmit }) => {
  const [startDate, setStartDate] = useState(new Date())
  const years = _.range(1990, getYear(new Date()) + 1, 1) // 수정
  const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
  return (
    <div className="PageThree">
      <div className=" FormTitle">
        <h2>회원가입</h2>
      </div>
      <form onSubmit={onSubmit}>
        <div className="PageInput">
          <span className="Male">
            <label htmlFor="male">남</label>
            <input
              className="CheckMale"
              name="gender"
              value="male"
              type="checkbox"
              onChange={e => onChangeGender(e.target)}
            />
          </span>
          <span className="FeMale">
            <label htmlFor="female">여</label>
            <input
              className="CheckFeMale"
              name="gender"
              value="female"
              type="checkbox"
              onChange={e => onChangeGender(e.target)}
            />
          </span>
          <div className="custom-react-datepicker__wrapper">
            <DatePicker
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div className="custom-react-datepicker__select-wrapper">
                  <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                    {'<'}
                  </button>
                  <div className="custom-react-datepicker__select-item">
                    <select value={getYear(date)} onChange={({ target: { value } }) => changeYear(value)}>
                      {years.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="custom-react-datepicker__select-item">
                    <select
                      value={months[getMonth(date)]}
                      onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
                    >
                      {months.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                    {'>'}
                  </button>
                </div>
              )}
              name="birthday"
              value={form.birthday}
              selected={startDate}
              dateFormat={'YYYY-MMM-DD'}
              locale={ko}
              onChange={onChangeDate}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="NextButton3">
          <button className="Button" type="submit">
            회원가입
          </button>
        </div>
      </form>
    </div>
  )
}

export default PageThree
