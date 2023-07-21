type ChatState = any;

const reducer = (state: ChatState): ChatState => {
  switch ("hi") {
    case 'hi':
      return {
        ...state,
      };
  }
};

export default reducer;
