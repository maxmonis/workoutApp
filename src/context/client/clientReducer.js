export default (state, action) => {
  switch (action.type) {
    case 'ADD_CLIENT':
      return {
        ...state,
        clients: [...state.clients, action.payload]
      };
    case 'UPDATE_CLIENT':
      return {
        ...state,
        clients: state.clients.map(client =>
          client.id === action.payload.id ? action.payload : client
        )
      };
    case 'DELETE_CLIENT':
      return {
        ...state,
        clients: state.clients.filter(client => client.id !== action.payload)
      };

    case 'SET_CURRENT_CLIENT':
      return {
        ...state,
        currentClient: action.payload
      };
    case 'CLEAR_CURRENT_CLIENT':
      return {
        ...state,
        currentClient: null
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
        filteredClients: null
      };
    default:
      return state;
  }
};
