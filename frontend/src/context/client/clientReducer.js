export default (state, action) => {
  switch (action.type) {
    case 'GET_CLIENTS':
      return {
        ...state,
        clients: action.payload,
        loading: false
      };
    case 'ADD_CLIENT':
      return {
        ...state,
        clients: [action.payload, ...state.clients],
        loading: false
      };
    case 'UPDATE_CLIENT':
      return {
        ...state,
        clients: state.clients.map(client =>
          client._id === action.payload._id ? action.payload : client
        ),
        loading: false
      };
    case 'DELETE_CLIENT':
      return {
        ...state,
        clients: state.clients.filter(client => client._id !== action.payload),
        loading: false
      };
    case 'CLEAR_CLIENTS':
      return {
        ...state,
        clients: [],
        filteredClients: [],
        error: null
      };
    case 'SET_EDITING_CLIENT':
      return {
        ...state,
        editingClient: action.payload
      };
    case 'CLEAR_EDITING_CLIENT':
      return {
        ...state,
        editingClient: null
      };
    case 'FILTER_CLIENTS':
      return {
        ...state,
        filteredClients: state.clients.filter(client => {
          const regexp = new RegExp(`${action.payload}`, 'gi');
          return client.name.match(regexp) || client.email.match(regexp);
        })
      };
    case 'CLEAR_FILTERED_CLIENTS':
      return {
        ...state,
        filteredClients: []
      };
    case 'CLIENT_ERROR':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
