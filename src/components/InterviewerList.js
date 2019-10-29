import React from 'react';

import 'components/InterviewerList.scss';

import InterviewerListItem from './InterviewerListItem';

export default function InterviewerList (props) {

  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        id={interviewer.id}
        name={interviewer.name} 
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={props.setInterviewer(interviewer.id)}
      />
  );
  })

  return (
    <section className="interviewers">
      <ul>
        {interviewers}
      </ul>
    </section>
  );
}