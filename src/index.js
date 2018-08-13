
import { Component, createElement } from 'react';

function defaultMapStateToProps() {
  return {};
}

function defaultMapDispatchToProps(dispatch) {
  return { dispatch };
}

function mergeObjs(state, dispatch, props) {
  return Object.assign({}, state, dispatch, props);
}

function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  const hasOwn = Object.prototype.hasOwnProperty;

  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) ||
        objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

export function connect(mapStateToProps = defaultMapStateToProps, mapDispatchToProps = defaultMapDispatchToProps) {
  return function (store, componentToConnectToStore) {
    const stateMapperDependsOnProps = mapStateToProps.length > 1;
    const dispatchMapperDependsOnProps = mapDispatchToProps.length > 1;

    return class WrapperComponent extends Component {

      constructor(props) {
        super(props);
        this.state = { storeState: store.getState() };
        this.stateProps = mapStateToProps(this.store.storeState, props);
        this.dispatchProps = mapDispatchToProps(store.dispatch, props);
        this.firstCycle = true;
        this.storeChanged = false;
        this.propsChanged = false;
        this.propsBeforeRender = props;
      }

      componentDidMount() {
        this.initSubscribe();
      }

      initSubscribe() {
        this.unsubscribe = newState => this.setState({
          storeState: newState
        });
      }

      componentWillUnMount() {
        this.unsubscribe();
      }

      shouldComponentUpdate(nextProps, nextState) {
        this.storeChanged = nextState !== this.state.storeState;
        this.propsBeforeRender = this.props;
        return true;
      }

      updateStateProps() {
        const nextStateProps = mapStateToProps(store.getState(), this.props);

        if (shallowEqual(nextStateProps, this.stateProps)) {
          return false;
        }

        this.stateProps = nextStateProps;
        return true;
      }

      componentWillReceiveProps(nextProps) {
        this.propsChanged = !shallowEqual(nextProps, this.propsBeforeRender);

      }

      updateDispatchProps() {
        const nextDispatchProps = mapDispatchToProps(store.getState(), this.props);

        if (shallowEqual(nextDispatchProps, this.stateProps)) {
          return false;
        }

        this.dispatchProps = nextDispatchProps;
        return true;
      }

      render() {
        let stateMapperChanged = false;
        let dispatchMapperChanged = false;

        if (this.firstCycle) {
          this.renderedEle = createElement(componentToConnectToStore,
            mergeObjs(this.stateProps, this.dispatchProps, this.props));
          this.firstCycle = false;
          return this.renderedEle;
        }
        this.propsChanged = !shallowEqual(this.propsBeforeRender, this.props);

        if (this.storeChanged || (this.propsChanged && stateMapperDependsOnProps)) {
          stateMapperChanged = this.updateStateProps();
        }

        if (this.propsChanged && dispatchMapperDependsOnProps) {
          dispatchMapperChanged = this.updateDispatchProps();
        }

        if (this.propsChanged || stateMapperChanged || dispatchMapperChanged) {
          this.renderedEle = createElement(componentToConnectToStore,
            mergeObjs(this.stateProps, this.dispatchProps, this.props));
          return this.renderedEle;
        }
        return this.renderedEle;
      }
    };
  };
}
