import React from 'react';

import 'components/Appointment/styles.scss'
import 'components/Appointment/Header'

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Saving from "components/Appointment/Saving";
import Deleting from "components/Appointment/Deleting";
import Confirm from "components/Appointment/Confirm";
import ErrorDeleting from "components/Appointment/ErrorDeleting";
import ErrorSaving from "components/Appointment/ErrorSaving";
import useVisualMode from "../../hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true)
    props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVE, true))
  };

  function remove() {
    transition(DELETING, true)
    props.cancelInterview(props.id).then(
      () => transition(EMPTY)
    ).catch(() => transition(ERROR_DELETE, true))
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      <div>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === CREATE && <Form name={props.name} interviewer={props.interviewer} interviewers={props.interviewers} onSave={save} onCancel={() => back()}/>}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onEdit={() => transition(EDIT)}
            onDelete={() => transition(CONFIRM)}
          />
        )}
        {mode === EDIT && <Form name={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onSave={save} onCancel={() => back()} />}
        {mode === SAVING && <Saving />}
        {mode === DELETING && <Deleting />}
        {mode === ERROR_SAVE && <ErrorSaving onClose={() => back()} />}
        {mode === ERROR_DELETE && <ErrorDeleting onClose={() => back()} />}
        {mode === CONFIRM && <Confirm onCancel={() => back()} onConfirm={remove} />}
      </div>
    </article>
  );
}