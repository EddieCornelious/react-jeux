import { Component, createElement } from 'react';
import defaultMapStateToProps from './defaultMapStateToProps.js';
import defaultMapDispatchToProps from './defaultMapDispatchToProps.js';
import shallowEqual from './shallowEqual.js';
import mergeObjs from './mergeObjs.js';

export default function connect(
  mapStateToProps = defaultMapStateToProps,
  mapDispatchToProps = defaultMapDispatchToProps
) {
  return function (store, componentToConnectToStore) {
    const stateMapperDependsOnProps = mapStateToProps.length > 1;
    const dispatchMapperDependsOnProps = mapDispatchToProps.length > 1;

    return class WrapperComponent extends Component {
      constructor(props) {
        super(props);
        this.state = { storeState: store.getState() };
        this.stateProps = mapStateToProps(this.state.storeState, props);
        this.dispatchProps = mapDispatchToProps(store.dispatch, props);
        this.firstCycle = true;
        this.storeChanged = false;
        this.propsChanged = false;
        this.propsBeforeRender = props;
        this.renderedEle = null;
      }

      componentDidMount() {
        this.initSubscribe();
      }

      initSubscribe() {
        const ctx = this;

        if (!this.unsubscribe) {
          this.unsubscribe = store.subscribe(newState =>
            ctx.setState({
              storeState: newState
            })
          );
        }
      }

      componentWillUnmount() {
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
        this.propsChanged = !shallowEqual(nextProps, this.props);
      }

      updateDispatchProps() {
        const nextDispatchProps = mapDispatchToProps(
          store.dispatch,
          this.props
        );

        if (shallowEqual(nextDispatchProps, this.dispatchProps)) {
          return false;
        }

        this.dispatchProps = nextDispatchProps;
        return true;
      }

      render() {
        let stateMapperChanged = false;
        let dispatchMapperChanged = false;

        if (this.firstCycle) {
          this.renderedEle = createElement(
            componentToConnectToStore,
            mergeObjs(this.stateProps, this.dispatchProps, this.props)
          );
          this.firstCycle = false;
          return this.renderedEle;
        }

        this.propsChanged = !shallowEqual(this.propsBeforeRender, this.props);

        if (
          this.storeChanged ||
          (this.propsChanged && stateMapperDependsOnProps)
        ) {
          stateMapperChanged = this.updateStateProps();
        }

        if (this.propsChanged && dispatchMapperDependsOnProps) {
          dispatchMapperChanged = this.updateDispatchProps();
        }

        if (this.propsChanged || stateMapperChanged || dispatchMapperChanged) {
          this.renderedEle = createElement(
            componentToConnectToStore,
            mergeObjs(this.stateProps, this.dispatchProps, this.props)
          );

          return this.renderedEle;
        }

        return this.renderedEle;
      }
    };
  };
}
