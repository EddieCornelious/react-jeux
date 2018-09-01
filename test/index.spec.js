/* global describe, it, before */

import chai from 'chai';
import connect from '../src/connect.js';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import {mount} from 'enzyme';
import React, {Component, createElement} from 'react';
import {createStore} from 'jeux';
import sinon from 'sinon';

chai.expect();

const expect = chai.expect;

function counterReducer(state = 0, action) {
  if (action.type === 'INC') {
    return state + 1;
  }
  if (action.type === 'DEC') {
    return state - 1;
  }
  return state;
}

const reducers = {
  counter: counterReducer
};

function Display(props) {
  return <h2>{props.max}</h2>;
}

function mapStateToProps(state, ownProps) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    updateCounter: type => dispatch({type})
  };
}

class Counter extends Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    if (!this.props.updateCounter) {
      return;
    }
    this.props.updateCounter('INC');
  }

  handleToggle() {
    this.props.updateCounter('DEC');
  }

  render() {
    return (
      <div>
        <h1
          onToggle={this.handleToggle.bind(this)}
          onClick={this.handleClick.bind(this)}>
          {this.props.counter}
        </h1>
        <Display max={this.props.counter} />
      </div>
    );
  }
}

class CounterNested extends Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    this.props.updateCounter('INC');
  }

  handleToggle() {
    this.props.updateCounter('DEC');
  }

  render() {
    return (
      <div>
        <h1
          id={this.props.main ? 'lol' : ''}
          onToggle={this.handleToggle.bind(this)}
          onClick={this.handleClick.bind(this)}>
          {this.props.counter}
        </h1>
        {this.props.children}
      </div>
    );
  }
}
let store;
beforeEach(() => {
  store = createStore(reducers);
});

afterEach(() => {
  store = null;
});

describe('connect', () => {
  it('displays the connected component properly', () => {
    let Connected = connect(
      mapStateToProps,
      mapDispatchToProps
    )(store, Counter);
    let component = mount(<Connected />);
    expect(component.html()).to.equal('<div><h1>0</h1><h2>0</h2></div>');
    component.unmount();
  });

  it('gives default mapping functions when none given', () => {
    let Connected = connect(
      undefined,
      undefined
    )(store, Counter);
    let component = mount(<Connected />);
    expect(component.html()).to.equal('<div><h1></h1><h2></h2></div>');
    component.unmount();
  });

  it('updates connected componenet and children properly', () => {
    let Connected = connect(
      mapStateToProps,
      mapDispatchToProps
    )(store, Counter);
    let component = mount(<Connected />);
    component.find('h1').simulate('click');
    expect(component.html()).to.equal('<div><h1>1</h1><h2>1</h2></div>');
    component.find('h1').simulate('click');
    expect(component.html()).to.equal('<div><h1>2</h1><h2>2</h2></div>');
    component.unmount();
  });

  it('updates dispatch to props when the return value is different based on own props', () => {
    function map(dispatch, ownProps) {
      if (ownProps.id === 'lol') {
        return {
          updateCounter: type => dispatch({type: 'INC'})
        };
      }
      return {
        updateCounter: type => dispatch({type: 'DEC'})
      };
    }
    let Connected = connect(
      mapStateToProps,
      map
    )(store, Counter);
    let component = mount(<Connected id="lol" />);
    component.find('h1').simulate('click');
    expect(component.html()).to.equal('<div><h1>1</h1><h2>1</h2></div>');
    component.setProps({id: 'bar'});
    component.find('h1').simulate('click');
    expect(component.html()).to.equal('<div><h1>0</h1><h2>0</h2></div>');
    component.unmount();
  });

  it('renders the cached element when no props or state, map dis to props or map state to props change (verified by code coverage)', () => {
    function map(dispatch, ownProps) {
      const sameObj = {
        updateCounter: type => dispatch({type: 'INCo'})
      };
      if (ownProps.id === 'lol') {
        return {
          updateCounter: type => dispatch({type: 'INCo'})
        };
      }
      return {
        updateCounter: type => dispatch({type: 'DEC0'})
      };
    }
    let Connected = connect(
      mapStateToProps,
      map
    )(store, Counter);
    let component = mount(<Connected id="lol" />);
    component.find('h1').simulate('click');
    expect(component.html()).to.equal('<div><h1>0</h1><h2>0</h2></div>');
    component.unmount();
  });

  it('dispatch to props does update when new props are added to component (code coverage)', () => {
    function map(dispatch, ownProps) {
      const sameObj = {
        updateCounter: type => dispatch({type: 'INC'})
      };
      if (ownProps.id === 'lol') {
        return sameObj;
      }
      return sameObj;
    }
    let Connected = connect(
      mapStateToProps,
      map
    )(store, Counter);
    let component = mount(<Connected id="lol" />);
    component.find('h1').simulate('click');
    expect(component.html()).to.equal('<div><h1>1</h1><h2>1</h2></div>');
    component.setProps({other: 'bar'});
    component.find('h1').simulate('click');
    expect(component.html()).to.equal('<div><h1>2</h1><h2>2</h2></div>');
    component.unmount();
  });

  it('props are passed to connected components and maintained through multiple renders', () => {
    let Connected = connect(
      mapStateToProps,
      mapDispatchToProps
    )(store, CounterNested);
    let component = mount(<Connected name="james" age={22} />);
    component.find('h1').simulate('click');
    expect(component.instance().renderedEle.props.name).to.equal('james');
    expect(component.instance().renderedEle.props.age).to.equal(22);
    component.find('h1').simulate('click');
    expect(component.instance().renderedEle.props.name).to.equal('james');
    expect(component.instance().renderedEle.props.age).to.equal(22);
    component.unmount();
  });

  it('props are passed to connected components and maintained through multiple renders (2)', () => {
    let Connected = connect(
      mapStateToProps,
      mapDispatchToProps
    )(store, CounterNested);
    let component = mount(<Connected name="james" age={22} />);
    component.find('h1').simulate('click');
    expect(component.instance().renderedEle.props.name).to.equal('james');
    expect(component.instance().renderedEle.props.age).to.equal(22);
    component.setProps({name: 'cody', age: 12});
    component.find('h1').simulate('click');
    expect(component.instance().renderedEle.props.name).to.equal('cody');
    expect(component.instance().renderedEle.props.age).to.equal(12);
    component.unmount();
  });

  it('props are passed to connected components and maintained through multiple renders (3)', () => {
    let Connected = connect(
      mapStateToProps,
      mapDispatchToProps
    )(store, CounterNested);
    let component = mount(<Connected name="james" age={22} />);
    expect(component.instance().renderedEle.props.name).to.equal('james');
    expect(component.instance().renderedEle.props.age).to.equal(22);
    component.setProps({name: 'cody'});
    expect(component.instance().renderedEle.props.name).to.equal('cody');
    expect(component.instance().renderedEle.props.age).to.equal(22);
    component.unmount();
  });

  it('props are passed to connected components and maintained through multiple renders (4)', () => {
    let Connected = connect(
      mapStateToProps,
      mapDispatchToProps
    )(store, CounterNested);
    let component = mount(<Connected name="james" age={22} />);
    expect(component.instance().renderedEle.props.name).to.equal('james');
    expect(component.instance().renderedEle.props.age).to.equal(22);
    component.setProps({name: 'cody', age: 77});
    expect(component.instance().renderedEle.props.name).to.equal('cody');
    expect(component.instance().renderedEle.props.age).to.equal(77);
    component.unmount();
  });

  it('props are passed to connected components and maintained through multiple renders (5)', () => {
    let Connected = connect(
      mapStateToProps,
      mapDispatchToProps
    )(store, CounterNested);
    let component = mount(<Connected name="james" age={22} />);
    component.setProps({name: 'cody', age: 77});
    expect(component.instance().renderedEle.props.name).to.equal('cody');
    expect(component.instance().renderedEle.props.age).to.equal(77);
    component.setProps({name: 'cain', age: 43});
    expect(component.instance().renderedEle.props.name).to.equal('cain');
    expect(component.instance().renderedEle.props.age).to.equal(43);
    component.unmount();
  });

  it('multiple connected nested components render and update properly', () => {
    let Connected = connect(
      mapStateToProps,
      mapDispatchToProps
    )(store, CounterNested);
    let component = mount(
      <Connected main={true}>
        <Connected />
        <Connected />
      </Connected>
    );
    component.find('#lol').simulate('click');
    expect(component.html()).to.equal(
      '<div><h1 id="lol">1</h1><div><h1 id="">1</h1></div><div><h1 id="">1</h1></div></div>'
    );
    component.find('#lol').simulate('click');
    expect(component.html()).to.equal(
      '<div><h1 id="lol">2</h1><div><h1 id="">2</h1></div><div><h1 id="">2</h1></div></div>'
    );
    component.unmount();
  });

  it('mapStateToProps passes props correctly to component when alone', () => {
    let Connected = connect(
      mapStateToProps,
      undefined
    )(store, Counter);
    let component = mount(<Connected />);

    let componentInstance = component.instance().renderedEle;
    expect(componentInstance.props.counter).to.be.equal(0);
    expect(componentInstance.props.dispatch).to.be.a('function');
    expect(Object.keys(componentInstance.props).length).to.be.equal(2);

    component.unmount();
  });

  it('mapDispatchToProps passes props correctly to component when alone', () => {
    let Connected = connect(
      undefined,
      mapDispatchToProps
    )(store, Counter);
    let component = mount(<Connected />);
    let componentInstance = component.instance().renderedEle;
    expect(componentInstance.props.updateCounter).to.be.a('function');
    expect(Object.keys(componentInstance.props).length).to.be.equal(1);

    component.unmount();
  });

  it('proper defaults are passed to component when no dispatch to props or map is passed', () => {
    let Connected = connect(
      undefined,
      undefined
    )(store, Counter);
    let component = mount(<Connected />);
    let componentInstance = component.instance().renderedEle;
    expect(componentInstance.props.dispatch).to.be.a('function');
    expect(Object.keys(componentInstance.props).length).to.be.equal(1);

    component.unmount();
  });

  it('should render cached element when no props or state changes', () => {
    function map(dispatch) {
      return {
        updateCounter: () => dispatch({type: 'NADA'})
      };
    }
    let Connected = connect(
      mapStateToProps,
      map
    )(store, Counter);
    let component = mount(<Connected />);
    let initialCache = component.instance().renderedEle;
    component.find('h1').simulate('click');
    expect(component.instance().renderedEle === initialCache).to.be.equal(true);
    component.find('h1').simulate('click');
    expect(component.instance().renderedEle === initialCache).to.be.equal(true);
    component.find('h1').simulate('click');
    expect(component.instance().renderedEle === initialCache).to.be.equal(true);

    component.unmount();
  });

  it('should render cached element when no props or state changes (2)', () => {
    let Connected = connect(
      undefined,
      undefined
    )(store, Counter);
    let component = mount(<Connected />);
    let initialCache = component.instance().renderedEle;
    component.find('h1').simulate('click');
    expect(component.instance().renderedEle === initialCache).to.be.equal(true);
    component.find('h1').simulate('click');
    expect(component.instance().renderedEle === initialCache).to.be.equal(true);
    component.find('h1').simulate('click');
    expect(component.instance().renderedEle === initialCache).to.be.equal(true);

    component.unmount();
  });

  it('should not render cached element when state changes', () => {
    let Connected = connect(
      mapStateToProps,
      mapDispatchToProps
    )(store, Counter);
    let component = mount(<Connected />);
    let initialCache = component.instance().renderedEle;
    expect(component.instance().renderedEle === initialCache).to.be.equal(true);
    component.find('h1').simulate('click');
    expect(component.instance().renderedEle === initialCache).to.be.equal(
      false
    );
    initialCache = component.instance().renderedEle;
    component.find('h1').simulate('click');
    expect(component.instance().renderedEle === initialCache).to.be.equal(
      false
    );

    component.unmount();
  });

  it('should not render cached element when Ownprops change', () => {
    let Connected = connect(
      mapStateToProps,
      mapDispatchToProps
    )(store, Counter);
    let component = mount(<Connected />);
    let initialCache = component.instance().renderedEle;
    expect(component.instance().renderedEle === initialCache).to.be.equal(true);
    component.setProps({id: 'bar'});
    expect(component.instance().renderedEle === initialCache).to.be.equal(
      false
    );

    component.unmount();
  });

  it('should not render cached element when ownprops change and no dependency on ownProps in mapdispatchtoprops', () => {
    function map(dispatch) {
      return {
        updateCounter: () => dispatch({type: 'NADA'})
      };
    }
    let Connected = connect(
      mapStateToProps,
      map
    )(store, Counter);
    let component = mount(<Connected id="bob" />);
    let initialCache = component.instance().renderedEle;
    component.find('h1').simulate('click');
    component.setProps({id: 'bar'});
    expect(component.instance().renderedEle === initialCache).to.be.equal(
      false
    );

    component.unmount();
  });

  it('should not render cached element when ownprops change and no dependency on ownProps in mapdispatchtoprops', () => {
    function map(dispatch, ownProps) {
      return {
        updateCounter: () => dispatch({type: 'NADA' + ownProps.id})
      };
    }
    let Connected = connect(
      mapStateToProps,
      map
    )(store, Counter);
    let component = mount(<Connected id="bob" />);
    let initialCache = component.instance().renderedEle;
    component.find('h1').simulate('click');
    component.setProps({id: 'bar'});
    component.find('h1').simulate('click');
    expect(component.instance().renderedEle === initialCache).to.be.equal(
      false
    );

    component.unmount();
  });

  it('should not invoke dispatchtoprops again if no state change but ownprops change and no dependency on ownprops', () => {
    function map(dispatch) {
      return {
        updateCounter: () => dispatch({type: 'NADA'})
      };
    }
    let Connected = connect(
      mapStateToProps,
      map
    )(store, Counter);
    let component = mount(<Connected id="bob" />);
    let initialDispatchProps = component.instance().dispatchProps;
    component.setProps({id: 'bar'});
    component.find('h1').simulate('click');
    expect(
      initialDispatchProps === component.instance().dispatchProps
    ).to.be.equal(true);
    component.setProps({id: 'bak'});
    component.find('h1').simulate('click');
    expect(
      initialDispatchProps === component.instance().dispatchProps
    ).to.be.equal(true);

    component.unmount();
  });

  it('should invoke dispatchtoprops again if no state change but ownprops change and has dependency on ownprops', () => {
    function map(dispatch, ownProps) {
      return {
        updateCounter: () => dispatch({type: 'NADA' + ownProps.id})
      };
    }
    let Connected = connect(
      mapStateToProps,
      map
    )(store, Counter);
    let component = mount(<Connected id="bob" />);
    let initialDispatchProps = component.instance().dispatchProps;
    component.setProps({id: 'bar'});
    component.find('h1').simulate('click');
    expect(
      initialDispatchProps === component.instance().dispatchProps
    ).to.be.equal(false);
    initialDispatchProps = component.instance().dispatchProps;
    component.setProps({id: 'bars'});
    component.find('h1').simulate('click');
    expect(
      initialDispatchProps === component.instance().dispatchProps
    ).to.be.equal(false);

    component.unmount();
  });

  it('should not invoke mapstatetoprops again if no state change but ownprops change and no dependency on ownprops', () => {
    function map(state) {
      return {
        counter: state.counter
      };
    }
    function map2(dispatch, ownProps) {
      return {
        updateCounter: () => dispatch({type: 'NADA' + ownProps.id})
      };
    }
    let Connected = connect(
      map,
      map2
    )(store, Counter);
    let component = mount(<Connected id="bob" />);
    let initialStateProps = component.instance().stateProps;
    component.setProps({id: 'bar'});
    component.find('h1').simulate('click');
    expect(initialStateProps === component.instance().stateProps).to.be.equal(
      true
    );
    component.setProps({id: 'bak'});
    component.find('h1').simulate('click');
    expect(initialStateProps === component.instance().stateProps).to.be.equal(
      true
    );

    component.unmount();
  });

  it('should invoke mapstatetoprops again if no state change but ownprops change and has dependency on ownprops', () => {
    function map2(dispatch, ownProps) {
      return {
        updateCounter: () => dispatch({type: 'NADA' + ownProps.id})
      };
    }
    function map(state, ownProps) {
      if (ownProps.id === 'bar') {
        return {
          counter: state.counter + ownProps.id
        };
      }
      return {
        counter: state.counter
      };
    }
    let Connected = connect(
      map,
      map2
    )(store, Counter);
    let component = mount(<Connected id="bob" />);
    let initialStateProps = component.instance().stateProps;
    component.setProps({id: 'bar'});
    component.find('h1').simulate('click');
    expect(initialStateProps === component.instance().stateProps).to.be.equal(
      false
    );
    initialStateProps = component.instance().stateProps;
    component.setProps({id: 'bars'});
    component.find('h1').simulate('click');
    expect(initialStateProps === component.instance().stateProps).to.be.equal(
      false
    );

    component.unmount();
  });

  it('should not invoke mapstatetoprops again if no state change but ownprops change and has dependency on ownprops', () => {
    function map2(dispatch, ownProps) {
      return {
        updateCounter: () => dispatch({type: 'NADA' + ownProps.id})
      };
    }
    function map(state, ownProps) {
      return {
        counter: state.counter
      };
    }
    let Connected = connect(
      map,
      map2
    )(store, Counter);
    let component = mount(<Connected id="bob" />);
    let initialStateProps = component.instance().stateProps;
    component.setProps({id: 'bar'});
    component.find('h1').simulate('click');
    expect(initialStateProps === component.instance().stateProps).to.be.equal(
      true
    );
    initialStateProps = component.instance().stateProps;
    component.setProps({id: 'bars'});
    component.find('h1').simulate('click');
    expect(initialStateProps === component.instance().stateProps).to.be.equal(
      true
    );

    component.unmount();
  });
});
