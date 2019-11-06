export function getAppointmentsForDay(state, day) {
  const filteredAppointments = state.days.filter(aday => aday.name === day);
  if (filteredAppointments[0] === undefined) {
    return [];
  }
  let appts = [];
  let apptId = filteredAppointments[0].appointments
  for(let i = 0; i < apptId.length; i++) {
    if (state.appointments[apptId[i]] && apptId[i] === state.appointments[apptId[i]].id) {
      appts.push(state.appointments[apptId[i]])
    }
  }
  return appts;
}

export function getInterview(state, interview) {  
  let interviewDetails = {}
  for (let i = 0; i < state.days[0].appointments.length; i++) {
    if (interview !== null) {
      interviewDetails["student"] = interview.student
      interviewDetails["interviewer"] = state.interviewers[interview.interviewer]
    } else {
      return null
    }
  } 
  
  return interviewDetails;
}

export function getInterviewersForDay(state, day) {
  const filteredAppointments = state.days.filter(aday => aday.name === day);
  if (filteredAppointments[0] === undefined) {
    return [];
  }
  let appts = [];
  let apptId = filteredAppointments[0].interviewers
  for(let i = 0; i < apptId.length; i++) {
    if (apptId[i] === state.appointments[apptId[i]].id) {
      appts.push(state.interviewers[apptId[i]])
    }
  }
  return appts;
}