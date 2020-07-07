export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_CLIENTS':
      return {
        ...state,
        clients: payload,
        loading: false,
      };
    case 'ADD_CLIENT':
      return {
        ...state,
        clients: [...state.clients, payload],
        loading: false,
      };
    case 'UPDATE_CLIENT':
      return {
        ...state,
        clients: state.clients.map((client) =>
          client._id === payload._id ? payload : client
        ),
        loading: false,
      };
    case 'DELETE_CLIENT':
      return {
        ...state,
        clients: state.clients.filter((client) => client._id !== payload),
        loading: false,
      };
    case 'CLEAR_CLIENTS':
      return {
        ...state,
        clients: [],
        filteredClients: [],
        error: null,
      };
    case 'SET_EDITING_CLIENT':
      return {
        ...state,
        editingClient: payload,
      };
    case 'CLEAR_EDITING_CLIENT':
      return {
        ...state,
        editingClient: null,
      };
    case 'FILTER_CLIENTS':
      return {
        ...state,
        filteredClients: state.clients.filter((client) => {
          const regexp = new RegExp(`${payload.replace(/[^a-z]/gi, '')}`, 'gi');
          const name = client.name.replace(/ /g, '');
          const email = client.email.replace(/@.*$/, '') || '';
          return name !== '#' && (name.match(regexp) || email.match(regexp));
        }),
      };
    case 'CLEAR_FILTERED_CLIENTS':
      return {
        ...state,
        filteredClients: [],
      };
    case 'CLIENT_ERROR':
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
