export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_WORKOUTS':
      return {
        ...state,
        workouts: payload,
        loading: false,
      };
    case 'ADD_WORKOUT':
      return {
        ...state,
        workouts: [...state.workouts, payload],
        loading: false,
      };
    case 'UPDATE_WORKOUT':
      return {
        ...state,
        workouts: state.workouts.map(workout =>
          workout._id === payload._id ? payload : workout
        ),
        loading: false,
      };
    case 'DELETE_WORKOUT':
      return {
        ...state,
        workouts: state.workouts.filter(workout => workout._id !== payload),
        loading: false,
      };
    case 'CLEAR_WORKOUTS':
      return {
        ...state,
        workouts: [],
        filteredWorkouts: [],
        error: null,
      };
    case 'SET_EDITING_WORKOUT':
      return {
        ...state,
        editingWorkout: payload,
      };
    case 'CLEAR_EDITING_WORKOUT':
      return {
        ...state,
        editingWorkout: null,
      };
    case 'FILTER_WORKOUTS':
      return {
        ...state,
        filteredWorkouts: state.workouts.filter(workout => {
          const regexp = new RegExp(payload, 'gi');
          const name = workout.name.replace(/ /g, '');
          return name.match(regexp);
        }),
      };
    case 'CLEAR_FILTERED_WORKOUTS':
      return {
        ...state,
        filteredWorkouts: [],
      };
    case 'WORKOUT_ERROR':
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
