import React, { useReducer } from 'react';
import axios from 'axios';
import WorkoutContext from './workoutContext';
import workoutReducer from './workoutReducer';

const WorkoutState = ({ children }) => {
  const INITIAL_STATE = {
    workouts: [],
    editingWorkout: null,
    filteredWorkouts: [],
    loading: true,
    error: null,
  };
  const CONFIG = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const [state, dispatch] = useReducer(workoutReducer, INITIAL_STATE);
  const { workouts, editingWorkout, filteredWorkouts, loading, error } = state;
  const getWorkouts = async () => {
    try {
      const { data } = await axios.get('/api/workouts');
      dispatch({ type: 'GET_WORKOUTS', payload: data });
    } catch (err) {
      dispatch({ type: 'WORKOUT_ERROR', payload: err.response.msg });
    }
  };
  const addWorkout = async workout => {
    try {
      const { data } = await axios.post('/api/workouts', workout, CONFIG);
      dispatch({ type: 'ADD_WORKOUT', payload: data });
    } catch (err) {
      dispatch({ type: 'WORKOUT_ERROR', payload: err.response.msg });
    }
  };
  const updateWorkout = async workout => {
    try {
      const { data } = await axios.put(
        `/api/workouts/${workout._id}`,
        workout,
        CONFIG
      );
      dispatch({ type: 'UPDATE_WORKOUT', payload: data });
    } catch (err) {
      dispatch({ type: 'WORKOUT_ERROR', payload: err.response.msg });
    }
  };
  const deleteWorkout = async id => {
    try {
      await axios.delete(`/api/workouts/${id}`);
      dispatch({ type: 'DELETE_WORKOUT', payload: id });
    } catch (err) {
      dispatch({ type: 'WORKOUT_ERROR', payload: err.response.msg });
    }
  };
  const clearWorkouts = () => {
    dispatch({ type: 'CLEAR_WORKOUTS' });
  };
  const setEditingWorkout = workout => {
    dispatch({ type: 'SET_EDITING_WORKOUT', payload: workout });
  };
  const clearEditingWorkout = () => {
    dispatch({ type: 'CLEAR_EDITING_WORKOUT' });
  };
  const filterWorkouts = text => {
    dispatch({ type: 'FILTER_WORKOUTS', payload: text });
  };
  const clearFilteredWorkouts = () => {
    dispatch({ type: 'CLEAR_FILTERED_WORKOUTS' });
  };
  return (
    <WorkoutContext.Provider
      value={{
        workouts,
        editingWorkout,
        filteredWorkouts,
        loading,
        error,
        getWorkouts,
        addWorkout,
        deleteWorkout,
        updateWorkout,
        clearWorkouts,
        setEditingWorkout,
        clearEditingWorkout,
        filterWorkouts,
        clearFilteredWorkouts,
      }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutState;
