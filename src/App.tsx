/* eslint-disable react/jsx-key, react/jsx-props-no-spreading, jsx-a11y/alt-text */
import React, { Component } from 'react';
import './App.scss';
import logo from './logo.png';
import moment from 'moment';
moment.locale('ja');

const NOW_DATE: moment.Moment = moment();
const START_MONTH: moment.Moment = moment().startOf('month');
const END_MONTH: moment.Moment = moment().endOf('month');
const START_WEEK: moment.Moment = moment(START_MONTH).startOf('week');
const END_WEEK: moment.Moment = moment(END_MONTH).endOf('week');
const BEFORE_MONTH: moment.Moment = moment().add(1, 'month');
const AFTER_MONTH: moment.Moment = moment().add(-1, 'month');

let tmpDay: moment.Moment = START_WEEK;
let calendarDays = [];
let tmpDays: moment.Moment[] = [];

while(moment(tmpDay).isSameOrBefore(END_WEEK)) {
  if (tmpDays.length == 7) {
    tmpDays.push(tmpDay);
    calendarDays.push(tmpDays);
    tmpDays = [];
  } else {
    tmpDays.push(tmpDay);
  }
  moment(tmpDay).add(1, 'days');
}
console.log(calendarDays);

interface AppState {
  currentDate: Date;
  nowDate: Date;
  startMonth: Date;
  startWeek: Date;
  endMonth: Date;
  endWeek: Date;
  beforeMonth: Date;
  afterMonth: Date;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
  }
  render() {
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
                <table>
                </table>
            </div>
        </main>
      </div>
    );
  }
}

export default App;
