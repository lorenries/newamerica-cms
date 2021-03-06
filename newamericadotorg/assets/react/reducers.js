import { combineReducers } from 'redux';
import triggerScrollEvents from '../lib/utils/trigger-scroll-events';
import apiReducers from './api/reducers';

import {
  SET_SCROLL_POSITION, SET_SCROLL_DIRECTION, ADD_SCROLL_EVENT,
  RELOAD_SCROLL_EVENT, RELOAD_SCROLL_EVENTS, TRIGGER_SCROLL_EVENTS, SET_AD_HOC_STATE,
  SET_SCROLL, SET_IS_SCROLLING, SET_SEARCH_IS_OPEN, TOGGLE_MOBILE_MENU,
  SET_SITE_BASEURL, SITE_IS_LOADING, TOGGLE_SEARCH, SET_WINDOW_WIDTH, SET_IP,
  TOGGLE_ACTIVE_DROPDOWN
} from './constants';

// reducers
const scrollEvents = (state=[], action) => {
  switch(action.type){
    case ADD_SCROLL_EVENT:
      return [...state, action.eventObject];
    case RELOAD_SCROLL_EVENT:
      let e = state.splice(action.event.index,1)[0];
      return [...state, {...e, els: document.querySelectorAll(e.selector)}];
    case RELOAD_SCROLL_EVENTS:
      let events = [];
      for(let e of state)
        events.push({...e, els: document.querySelectorAll(e.selector)});
      return events;
    case TRIGGER_SCROLL_EVENTS:
      // not best redux practice, but easiest way to retrigger scroll events when
      // there is no scroll is through reducer
      triggerScrollEvents(window.scrollY, window.scrollY, 'FORWARD', state);
      return state;
    default:
      return state;
  }
}

const scroll = (state={position: 0, direction: 'FORWARD', events: [], isScrolling: false}, action) => {
  switch(action.type){
    case SET_SCROLL_POSITION:
      return { ...state, position: action.position };
    case SET_SCROLL_DIRECTION:
      return { ...state, direction: action.direction };
    case SET_SCROLL:
      return { ...state, ...action.scroll };
    case SET_IS_SCROLLING:
      return { ...state, isScrolling: action.isScrolling };
    case ADD_SCROLL_EVENT:
    case RELOAD_SCROLL_EVENTS:
    case RELOAD_SCROLL_EVENT:
    case TRIGGER_SCROLL_EVENTS:
      return { ...state, events: scrollEvents(state.events, action)};
    default:
      return state;
  }
}

const mobileMenuIsOpen = (state=false, action) => {
  switch(action.type){
    case TOGGLE_MOBILE_MENU:
      return !state;
    default:
      return state;
  }
}

const searchIsOpen = (state=false, action) => {
  switch(action.type){
    case TOGGLE_SEARCH:
      return !state;
    case SET_SEARCH_IS_OPEN:
      return action.isOpen;
    default:
      return state;
  }
}

const baseUrl = (state=false, action) => {
  switch(action.type){
    case SET_SITE_BASEURL:
      return action.url;
    default:
      return state;
  }
}

const ip = (state=0, action) => {
  switch(action.type){
    case SET_IP:
      return action.ip;
    default:
      return state;
  }
}

const isLoading = (state=false, action) => {
  switch(action.type){
    case SITE_IS_LOADING:
      return action.isLoading;
    default:
      return state;
  }
}

const windowWidth = (state=document.documentElement.clientWidth, action) => {
  switch(action.type){
    case SET_WINDOW_WIDTH:
      return action.width;
    default:
      return state;
  }
}

const activeDropdown = (state=null, action) => {
  switch(action.type){
    case TOGGLE_ACTIVE_DROPDOWN:
      if(state==action.el)
        return null;
      return action.el;
    default:
      return state;
  }
}

let reducer = combineReducers({
  scroll,
  searchIsOpen,
  mobileMenuIsOpen,
  baseUrl,
  isLoading,
  windowWidth,
  ip,
  activeDropdown
});

import { SET_ANY_STATE } from './constants';
const setAnyState = (state) => {
  if(state instanceof Array)
    return [...state];
  if(state instanceof Object)
    return {...state};
  return state;
}

class SiteReducer {
  constructor(){
    this.componentReducers = {
      site: (state, action) => {
        return{
          ...state,
          ...reducer(state, action)
        }
      },
      default: combineReducers(apiReducers)
    };
  }

  setNestedState = (state, componentName, action, rdcr) => {
    let i = componentName.indexOf('.');
    let name = i === -1 ? componentName : componentName.slice(0,i);
    let componentState = state[name] || {};

    if(!rdcr) rdcr = this.getComponentReducer(name) || this.getComponentReducer('default');

    if(i===-1){
      if(rdcr===SET_ANY_STATE) return { [name]: setAnyState(action.state) };
      return { [name]: rdcr(componentState, action) };
    }

    let subName = componentName.slice(i+1, componentName.length);

    return {
      [name]: {
        ...componentState,
        ...this.setNestedState(componentState, subName, action, rdcr)
      }
    };
  }

  reducer = (state={ site: {} }, action) => {
    // Each action needs the name of the component in action.component
    if(action.type && action.component){
      let rdcr = action.type == SET_ANY_STATE ? SET_ANY_STATE : false;
      let _state = {
        ...state,
        ...this.setNestedState(state, action.component, action, rdcr)
      }

      return _state;
    }

    return state;
  }


  getComponentReducer(name){
    return this.componentReducers[name];
  }

  addComponentReducer(component){
    let name = component.NAME.split('.')[0];

    if(component.REDUCERS)
      this.componentReducers[name] = combineReducers({ ...apiReducers, ...component.REDUCERS });
    else
      this.componentReducers[name] = combineReducers(apiReducers);

    return this;
  }
}

export const siteReducer = new SiteReducer();
