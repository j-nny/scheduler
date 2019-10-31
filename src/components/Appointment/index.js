import React from 'react';

import 'components/Appointment/styles.scss'
import 'components/Appointment/Header'

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import useVisualMode from "../../hooks/useVisualMode";

import classnames from 'classnames';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time}/>
      <div>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === CREATE && <Form interviewers={props.interviewers} onSave={""} onCancel={() => transition(EMPTY)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
        {mode === EDIT && <Form />}
      </div>
    </article>
  );
}