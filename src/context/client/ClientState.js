import React, { useReducer } from 'react';
import uuid from 'uuid/v4';
import ClientContext from './clientContext';
import clientReducer from './clientReducer';

const date = new Date();
const currentDate = date.toLocaleDateString();

const ClientState = props => {
  const initialState = {
    clients: [
      {
        name: 'John Doe',
        id: uuid(),
        email: 'john@doe.com',
        phone: '123-456-7890',
        type: 'active',
        previousWorkouts: [
          {
            id: uuid(),
            date: currentDate,
            workout: ['Bench Press', 'Squat', 'Deadlift']
          },
          {
            id: uuid(),
            date: currentDate,
            workout: ['Military Press', 'Lunge', 'Row']
          }
        ],
        personalBests: [
          {
            lift: 'Bench Press',
            sets: 3,
            reps: 8,
            weight: 185,
            printout: '3(8x185)',
            id: uuid(),
            becamePersonalBest: currentDate
          },
          {
            lift: 'Squat',
            sets: 4,
            reps: 10,
            weight: 225,
            printout: '4(10x225)',
            id: uuid(),
            becamePersonalBest: currentDate
          }
        ]
      },
      {
        name: 'Sam Smith',
        id: uuid(),
        email: 'sam@smith.com',
        phone: '098-765-4321',
        type: 'active',
        previousWorkouts: [
          {
            id: uuid(),
            date: currentDate,
            workout: ['Bench Press', 'Squat', 'Deadlift']
          },
          {
            id: uuid(),
            date: currentDate,
            workout: ['Military Press', 'Lunge', 'Row']
          }
        ],
        personalBests: [
          {
            lift: 'Power Clean',
            sets: 4,
            reps: 10,
            weight: 135,
            printout: '4(10x135)',
            id: uuid(),
            becamePersonalBest: currentDate
          },
          {
            lift: 'Deadlift',
            sets: 1,
            reps: 1,
            weight: 405,
            printout: '405',
            id: uuid(),
            becamePersonalBest: currentDate
          }
        ]
      }
    ],
    currentClient: null,
    filteredClients: null
  };
  const [state, dispatch] = useReducer(clientReducer, initialState);

  const addClient = client => {
    client.id = uuid();
    dispatch({ type: 'ADD_CLIENT', payload: client });
  };
  const deleteClient = id => {
    dispatch({ type: 'DELETE_CLIENT', payload: id });
  };
  const setCurrentClient = client => {
    dispatch({ type: 'SET_CURRENT_CLIENT', payload: client });
  };
  const clearCurrentClient = () => {
    dispatch({ type: 'CLEAR_CURRENT_CLIENT' });
  };
  const updateClient = client => {
    dispatch({ type: 'UPDATE_CLIENT', payload: client });
  };
  const filterClients = text => {
    dispatch({ type: 'FILTER_CLIENTS', payload: text });
  };
  const clearFilteredClients = () => {
    dispatch({ type: 'CLEAR_FILTERED_CLIENTS' });
  };
  return (
    <ClientContext.Provider
      value={{
        clients: state.clients,
        currentClient: state.currentClient,
        filteredClients: state.filteredClients,
        addClient,
        deleteClient,
        updateClient,
        filterClients,
        setCurrentClient,
        clearCurrentClient,
        clearFilteredClients
      }}
    >
      {props.children}
    </ClientContext.Provider>
  );
};

export default ClientState;
