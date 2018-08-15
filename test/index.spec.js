/* global describe, it, before */

import chai from 'chai';
import { connect } from '../src/connect.js';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { mount } from 'enzyme';
import React, {Component, createElement} from 'react';
import {createStore } from 'jeux';
import sinon from 'sinon';

chai.expect();

const expect = chai.expect;
let component = null;
afterEach(()=>{
    component.unmount()
})
class Counter extends Component{
    constructor(props) {
        super(props);
    }
    
    render(){
        return (
            <h1>ji</h1>
            
            )
    }
    
}

describe('connect', () => {
 
 it("is a function that returns a react component", ()=>{
     component = mount(<Counter/>)
     expect(component.html()).to.equal('<h1>ji</h1>');
 })  
    
    
});
