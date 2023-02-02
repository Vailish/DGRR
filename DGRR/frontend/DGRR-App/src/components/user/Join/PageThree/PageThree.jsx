import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getYear, getMonth } from 'date-fns';
import { ko } from 'date-fns/esm/locale';
const _ = require('lodash');

const PageThree = ({ form, onChangeGender, onChangeDate, onSubmit }) => {
  const [startDate, setStartDate] = useState(new Date());
  const years = _.range(1990, getYear(new Date()) + 1, 1); // 수정
  const months = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];
  return (
    <div className="PageThree">
      <form onSubmit={onSubmit}>
        <label htmlFor="male">남</label>
        <input
          name="gender"
          value="male"
          type="checkbox"
          onChange={(e) => onChangeGender(e.target)}
        />
        <label htmlFor="female">여</label>
        <input
          name="gender"
          value="female"
          type="checkbox"
          onChange={(e) => onChangeGender(e.target)}
        />
        <div>
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
              <div
                style={{
                  margin: 10,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                >
                  {'<'}
                </button>
                <select
                  value={getYear(date)}
                  onChange={({ target: { value } }) => changeYear(value)}
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <select
                  value={months[getMonth(date)]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
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
          />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default PageThree;
