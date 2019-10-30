export function getAppointmentsForDay(state, day) {
  const filteredAppointments = state.days.filter(aday => aday.name === day);
  if (filteredAppointments[0] === undefined) {
    return [];
  }
  let appts = [];
  let apptId = filteredAppointments[0].appointments
  for(let i = 0; i < apptId.length; i++) {
    if (apptId[i] === state.appointments[apptId[i]].id) {
      appts.push(state.appointments[apptId[i]])
    }
  }
  return appts;
}