import { GraphState } from 'store/model/GraphState';
import { GraphAddMutation } from 'store/mutations/graph/GraphAddMutation';
import { GraphRemoveMutation } from 'store/mutations/graph/GraphRemoveMutation';
import { IMutation } from 'store/mutations/IMutation';
import { MutationType } from 'store/mutations/MutationType';

const initialState: GraphState = {
  data: [],
  axes: [
    { type: 'time', position: 'bottom', primary: true },
    { type: 'linear', position: 'left', id: 'Stock Price' },
    { type: 'linear', position: 'right', id: 'Investment Value' },
  ],
};

const reducer = (state: GraphState | undefined, mutation: IMutation): GraphState => {
  state = state ?? initialState;

  if (mutation.type === MutationType.GRAPH_ADD) {
    const { data } = mutation as GraphAddMutation;
    return {
      ...state,
      data: [
        ...state.data.filter((d) => d.key !== data.key),
        data,
      ],
    };
  } else if (mutation.type === MutationType.GRAPH_REMOVE) {
    const { key } = mutation as GraphRemoveMutation;
    return {
      ...state,
      data: state.data.filter((d) => d.key !== key),
    };
  } else if (mutation.type === MutationType.GRAPH_REMOVE_ALL) {
    return {
      ...state,
      data: [],
    };
  } else {
    return state;
  }
};

export default reducer;
