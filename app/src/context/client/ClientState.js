import React, { useReducer } from 'react';
import axios from 'axios';
import ClientContext from './clientContext';
import clientReducer from './clientReducer';
import { standardize } from '../../functions/helpers';

const ClientState = (props) => {
  const initialState = {
    clients: [],
    editingClient: null,
    filteredClients: [],
    loading: true,
    error: null,
  };
  const [state, dispatch] = useReducer(clientReducer, initialState);
  const { clients, editingClient, filteredClients, loading, error } = state;
  const getClients = async () => {
    try {
      const { data } = await axios.get('/api/clients');
      if (!data.includes((client) => client.name === '#'))
        addClient({
          name: '#',
        });
      dispatch({ type: 'GET_CLIENTS', payload: data });
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
    if (clients.some((c) => standardize(c.name) === standardize(client.name))) {
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
      clients.some(
        (c) =>
          standardize(c.name) === standardize(client.name) &&
          c._id !== client._id
      )
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
        clients,
        editingClient,
        filteredClients,
        loading,
        error,
        getClients,
        addClient,
        deleteClient,
        updateClient,
        clearClients,
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
