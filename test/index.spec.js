/* global describe, it, before */

import chai from 'chai';
import connect from '../src/connect.js';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { mount } from 'enzyme';
import React, { Component, createElement } from 'react';
import { createStore } from 'jeux';
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
    updateCounter: type => dispatch({ type })
  };
}

class Counter extends Component {
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
          onToggle={this.handleToggle.bind(this)}
          onClick={this.handleClick.bind(this)}
        >
          {this.props.counter}
        </h1>
        <Display max={this.props.counter} />
      </div>
    );
  }
}
let store;
beforeEach(()=>{
store = createStore(reducers);
})

afterEach(()=>{
  store = null;
})

describe('connect', () => {
  it('displays the connected component properly', () => {
    let Connected = connect(
      mapStateToProps,
      mapDispatchToProps
    )(store, Counter);
    let component = mount(<Connected />);
    expect(component.html()).to.equal('<div><h1>0</h1><h2>0</h2></div>');
    component.unmount()
  });
  
  it('gives default mapping functions when none given', () => {
    let Connected = connect(
      undefined,
      undefined
    )(store, Counter);
    let component = mount(<Connected />);
    expect(component.html()).to.equal('<div><h1></h1><h2></h2></div>');
    component.unmount()
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
    component.unmount()
  });
  
});
