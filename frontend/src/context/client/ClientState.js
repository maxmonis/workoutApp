import React, { useReducer } from 'react';
import axios from 'axios';
import ClientContext from './clientContext';
import clientReducer from './clientReducer';

const ClientState = (props) => {
  const initialState = {
    clients: [],
    selectedClient: null,
    editingClient: null,
    filteredClients: [],
    error: null,
  };
  const [state, dispatch] = useReducer(clientReducer, initialState);

  const getClients = async () => {
    try {
      const res = await axios.get('/api/clients');
      dispatch({ type: 'GET_CLIENTS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'CLIENT_ERROR', payload: err.response.msg });
    }
  };

  const addClient = async (client) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (state.clients.some((c) => c.name === client.name)) {
      dispatch({
        type: 'CLIENT_ERROR',
        payload: `${client.name} already exists`,
      });
    } else {
      try {
        const res = await axios.post('/api/clients', client, config);
        dispatch({ type: 'ADD_CLIENT', payload: res.data });
      } catch (err) {
        dispatch({ type: 'CLIENT_ERROR', payload: err.response.msg });
      }
    }
  };

  const updateClient = async (client) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (
      state.clients.some((c) => c.name === client.name && c._id !== client._id)
    ) {
      dispatch({
        type: 'CLIENT_ERROR',
        payload: `${client.name} already exists`,
      });
    } else {
      try {
        const res = await axios.put(
          `/api/clients/${client._id}`,
          client,
          config
        );
        dispatch({ type: 'UPDATE_CLIENT', payload: res.data });
      } catch (err) {
        dispatch({ type: 'CLIENT_ERROR', payload: err.response.msg });
      }
    }
  };

  const deleteClient = async (id) => {
    try {
      await axios.delete(`/api/clients/${id}`);
      dispatch({ type: 'DELETE_CLIENT', payload: id });
    } catch (err) {
      dispatch({ type: 'CLIENT_ERROR', payload: err.response.msg });
    }
  };

  const selectClient = (client) => {
    dispatch({ type: 'SELECT_CLIENT', payload: client });
  };
  const clearClients = () => {
    dispatch({ type: 'CLEAR_CLIENTS' });
  };
  const setEditingClient = (client) => {
    dispatch({ type: 'SET_EDITING_CLIENT', payload: client });
  };
  const clearEditingClient = () => {
    dispatch({ type: 'CLEAR_EDITING_CLIENT' });
  };
  const filterClients = (text) => {
    dispatch({ type: 'FILTER_CLIENTS', payload: text });
  };
  const clearFilteredClients = () => {
    dispatch({ type: 'CLEAR_FILTERED_CLIENTS' });
  };

  return (
    <ClientContext.Provider
      value={{
        clients: state.clients,
        selectedClient: state.selectedClient,
        editingClient: state.editingClient,
        filteredClients: state.filteredClients,
        error: state.error,
        getClients,
        addClient,
        deleteClient,
        updateClient,
        clearClients,
        selectClient,
        setEditingClient,
        clearEditingClient,
        filterClients,
        clearFilteredClients,
      }}
    >
      {props.children}
    </ClientContext.Provider>
  );
};

export default ClientState;
