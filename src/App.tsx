/* eslint-disable react/jsx-key, react/jsx-props-no-spreading, jsx-a11y/alt-text */
import React, { FC, useState } from 'react';
import './App.scss';
import logo from './logo.png';
import moment from 'moment';
moment.locale('ja');

const NOW_DATE: moment.Moment = moment();
const getAfterMonth = (date: moment.Moment) => moment(date).add(1, 'month');
const getBeforeMonth = (date: moment.Moment) => moment(date).add(-1, 'month');

const createCalendar = (date: moment.Moment) => {
  const startMonth = moment(date).startOf('month');
  const endMonth = moment(date).endOf('month');
  const startWeek: moment.Moment = moment(startMonth).startOf('week');
  const endWeek: moment.Moment = moment(endMonth).endOf('week');
  let tmpDay: moment.Moment = startWeek;
  let calendarDays: string[][] = [];
  let tmpDays: string[] = [];
  while(moment(tmpDay).isSameOrBefore(endWeek)) {
    if (tmpDays.length === 6) {
      tmpDays.push(moment(tmpDay).format('YYYY-MM-DD'));
      calendarDays.push(tmpDays);
      tmpDays = [];
    } else {
      tmpDays.push(moment(tmpDay).format('YYYY-MM-DD'));
    }
    tmpDay.add(1, 'days');
  }
  return calendarDays;
}

const App: FC = () => {
  const [currentDate, setCurrentDate] = useState(NOW_DATE); // ページ送り用
  const [selectDate, setSelectDate] = useState(NOW_DATE); // モーダル表示用
  const nowDate = NOW_DATE;
  const beforeMonth = getBeforeMonth(currentDate);
  const afterMonth = getAfterMonth(currentDate);
  const days = createCalendar(currentDate);
  const onClickDate = (date: string) => () => {
    // ページ送りはしない
    setSelectDate(moment(date));
    console.log(date);
  };
  const getDateClass = (date: string) => moment(date).format('MM') == moment(currentDate).format('MM') ? 'is-current' : '';
  const onClickMonth = (date: string) => () => {
    setCurrentDate(moment(date));
  };
  const logoAttrs = {
    alt: 'logo',
    className: 'App-logo',
    src: logo,
  };
  return (
    <div className="App">
      <header className="App-header">
        <img {...logoAttrs} />
      </header>
      <main>
          <div className="Calendar">
              <div className="Calendar-header">
                <button className="Calendar-header-prev">
                  <i className="icon-prev"></i>
                  <span>{moment(beforeMonth).format('YYYY年M月')}</span>
                </button>
                <span className="Calendar-header-current">{moment(currentDate).format('YYYY年M月')}</span>
                <button className="Calendar-header-next">
                  <span>{moment(afterMonth).format('YYYY年M月')}</span>
                  <i className="icon-next"></i>
                </button>
              </div>
              <table className="Calendar-table">
                <tbody>
                  <tr>
                    {['日', '月', '火', '水', '木', '金', '土'].map((weekday, index) => (
                      <th key={index} className={`is-${index} Calendar-th`}>{weekday}</th>
                    ))}
                  </tr>
                  {days.map((week, key) => (
                    <tr key={key}>
                      {week.map((day, index) => (
                        <td key={`${key}-${index}`} onClick={onClickDate(day)} className={`Calendar-td ${getDateClass(day)}`}>
                          <div className="Calendar-date">
                            {moment(day).format('D')}
                          </div>
                          <div className="Calendar-stamp is-maru">○</div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
      </main>
    </div>
  );
};

export default App;
