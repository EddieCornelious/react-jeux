export default function mergeObjs(state, dispatch, props) {
  return Object.assign({}, state, dispatch, props);
}
