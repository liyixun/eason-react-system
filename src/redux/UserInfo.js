
export const userCreator = (userInfo) => {
  console.log(userInfo);
  return {type: 'SET_USER', payload: userInfo};
};

const initState = {
  userInfo: {}
};

const reducer = (state = initState, action = {}) => {
  switch (action.type) {
    case 'SET_USER':
      return {...state, userInfo:action.payload};
    default:
      return state;
  }
};

export default {initState, reducer};