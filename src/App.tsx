/* eslint-disable react/jsx-key, react/jsx-props-no-spreading, jsx-a11y/alt-text */
import React, { FC, useState } from 'react';
import './App.scss';
import logo from './logo.png';
import moment from 'moment';
moment.locale('ja');

const NOW_DATE: moment.Moment = moment();
const getAfterMonth = (date: moment.Moment) => moment(date).add(1, 'month');
const getBeforeMonth = (date: moment.Moment) => moment(date).add(-1, 'month');
let localStorageCalendar: {[index: string]: string} = {};
if (localStorage.getItem("myCalendar")) {
  localStorageCalendar = JSON.parse(localStorage.getItem("myCalendar") as string);
};

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
  const [localCalendar, setLocalCalendar] = useState(localStorageCalendar);
  const [currentDate, setCurrentDate] = useState(NOW_DATE); // ページ送り用
  const [selectDate, setSelectDate] = useState(NOW_DATE); // モーダル表示用
  const [showModal, setShowModal] = useState(false); // モーダル表示用
  const [showHappyModal, setShowHappyModal] = useState(false); // モーダル表示用
  const nowDate = NOW_DATE;
  const beforeMonth = getBeforeMonth(currentDate);
  const afterMonth = getAfterMonth(currentDate);
  const days = createCalendar(currentDate);
  const getDateClass = (date: string) => moment(date).format('MM') === moment(currentDate).format('MM') ? 'is-current' : '';
  const getCurrentClass = (date: string) => moment(date).format('MMDD') === moment(nowDate).format('MMDD') ? 'is-active' : '';
  const getCalendarState = (date: string) => {
      const calendarState: string | undefined | null = localCalendar[date] || null;
      if (calendarState === 'true') {
        return '○';
      } else {
        return '';
      }
  };
  const getDisabled = (date: string): boolean => moment(date).isAfter(nowDate);
  const onClickMonth = (date: string) => () => {
    setCurrentDate(moment(date));
  };
  const onClickDate = (date: string) => () => {
    // ページ送りはしない
    setSelectDate(moment(date));
    setShowModal(true);
    const key = moment(date).format('YYYY-MM-DD');
    if (localCalendar[key] === 'true') setShowHappyModal(true);
  };
  const onClickYes = () => {
    const key = moment(selectDate).format('YYYY-MM-DD')
    const newCalendar = {
      ...localCalendar,
      [key]: 'true',
    };
    setLocalCalendar(newCalendar);
    localStorage.setItem('myCalendar', JSON.stringify(newCalendar));
    setShowHappyModal(true);
  };
  const onClickClose = () => {
    setShowModal(false);
    setShowHappyModal(false);
  };
  const logoAttrs = {
    alt: 'はやおきスタンプ',
    className: 'App-logo',
    src: logo,
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <img {...logoAttrs} />
        </h1>
      </header>
      <main>
          <div className="Calendar">
              <div className="Calendar-header">
                <button className="Calendar-header-prev" onClick={onClickMonth(moment(beforeMonth).format('YYYY-MM-DD'))}>
                  <i className="icon-prev"></i>
                  <span>{moment(beforeMonth).format('YYYY年M月')}</span>
                </button>
                <span className="Calendar-header-current">{moment(currentDate).format('YYYY年M月')}</span>
                <button className="Calendar-header-next" onClick={onClickMonth(moment(afterMonth).format('YYYY-MM-DD'))}>
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
                        <td key={`${key}-${index}`} onClick={onClickDate(day)} className={`Calendar-td ${getDateClass(day)} ${getCurrentClass(day)}`}>
                          <div className="Calendar-date">
                            {moment(day).format('D')}
                          </div>
                          <div className="Calendar-stamp">{getCalendarState(moment(day).format('YYYY-MM-DD'))}</div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
      </main>
      <div className={`Modal ${showModal ? 'is-show' : ''}`}>
        <div className="Modal-bg" onClick={onClickClose}></div>
        <div className="Modal-wrapper">
          <i className="Modal-close">×</i>
          <div className="Modal-box">
            <i className="icon-close"></i>
            <h2 className="Modal-box-header">
              <span className="Modal-date">{moment(selectDate).format('M月D日')}</span>
              <span>はやおきできましたか?</span>
            </h2>
            <div className="Modal-box-content">
              <button className="Modal-button" onClick={onClickYes} disabled={getDisabled(moment(selectDate).format('YYYY-MM-DD'))}>{getDisabled(moment(selectDate).format('YYYY-MM-DD')) ? 'かえられません' : 'はい'}</button>
            </div>
          </div>
          <div className={`Modal-happy ${showHappyModal ? 'is-show' : ''}`}>
            <span className="icon-happy" role="img" aria-label="party popper">🎉</span>
            <span>はやおきできてすごい！！</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
