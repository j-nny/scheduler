import { useReducer, useEffect } from "react";
import {reducer, SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW} from '../reducers/application'
import axios from 'axios';

export default function useApplicationData() {

  const [state, dispatch] = useReducer (reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type:SET_DAY, value: day})

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      dispatch({ type:SET_APPLICATION_DATA, value:{days: all[0].data, appointments: all[1].data, interviewers: all[2].data}})
    }).catch (error => console.log(error))
  }, [])

  function bookInterview(id, interview, remainingSpots = false) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = state.days.map( day => {
      return (remainingSpots ? day.id === checkDay(id) ? { ...day, spots: day.spots - 1 } : { ...day } : { ...day })
    });

    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      dispatch({
        type: SET_INTERVIEW, appointments, days
      });
    })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = state.days.map( day => {
      return (day.id === checkDay(id) ? { ...day, spots: day.spots + 1 } : { ...day })
    });

    return axios.delete(`/api/appointments/${id}`)
    .then (() => {
      dispatch({
        type: SET_INTERVIEW, appointments, days
      })
    })
  }

  // alternative to checkDay: makes api request to obtain the remaining spots, allows two users to be updated at the same time
  
  // useEffect(() => {
  //   axios.get('/api/days')
  //   .then(res => {
  //     dispatch({
  //       type: SPOTS_REMAINING, value:res.data
  //     })
  //   }).catch((error) => console.log(error))
  // }, [state.appointments])

  const checkDay = (id) => {
    let dayID = null;
    for (const obj of state.days) {
      if (obj.appointments.includes(id)) {
        dayID = obj.id;
      }
    }
    return dayID;
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}