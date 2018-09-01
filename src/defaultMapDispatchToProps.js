const staticObj = {};
const DISPATCH = 'dispatch';

export default function defaultMapDispatchToProps(dispatch) {
  if (!staticObj[DISPATCH]) {
    staticObj[DISPATCH] = dispatch;
  }
  return staticObj;
}
