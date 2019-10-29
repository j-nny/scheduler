import React from 'react';

import 'components/Appointment/styles.scss'
import 'components/Appointment/Header'

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";

import classnames from 'classnames';

export default function Appointment(props) {
  console.log('hello', props)
  return (
    <article className="appointment">
      <Header time={props.time}/>
      <div>
      {props.interview ?
        <Show student={props.interview.student} interviewer={props.interview.interviewer}/>
      :
        <Empty />
      }
      </div>
    </article>
  );
}