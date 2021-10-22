import { GraphState } from 'store/model/GraphState';
import { IMutation } from 'store/mutations/IMutation';

// const initialState: GraphState = {
//   data: [
//     {
//       key: 'test',
//       label: 'Test Chart',
//       data: [
//         [new Date(), 5],
//         [new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), 30],
//         [new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), 50],
//       ]
//     }
//   ],
//   axes: [
//     { type: 'time', position: 'bottom', primary: true },
//     { type: 'linear', position: 'left' }
//   ],
// };

const initialState: GraphState = {
  data: [],
  axes: [],
};

const reducer = (state: GraphState | undefined, mutation: IMutation): GraphState => {
  return state ?? initialState;
};

export default reducer;
