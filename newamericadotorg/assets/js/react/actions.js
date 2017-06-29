import { fetchData, setParams } from './api/actions';
import { getNestedState, smoothScroll } from '../utils/index';
import store from './store';
import {
  SET_SCROLL_POSITION, SET_SCROLL_DIRECTION, ADD_SCROLL_EVENT,
  RELOAD_SCROLL_EVENT, RELOAD_SCROLL_EVENTS, SET_AD_HOC_STATE
} from './constants';


const findScrollEventBySelector = (selector) => {
  // assumes 1 event for each selector...
  let state = store.getState().site.scrollEvents;
  for(let i=0;i<state.length; i++){
    if(state[i].selector==selector){
      return {
        event: state[i],
        index: i
      };
    }
  }
  return null;
}

const observerFactory = function(stateName, onChange){
  let currentState;
  return function(){
    let nextState = getNestedState(store.getState(), stateName);
    if(nextState !== currentState) {
      onChange(nextState, currentState);
      currentState = nextState;
    }
  }
}

// actions
class Actions {
  setScrollPosition = (position) => {
    window.scrollTo(0, position);
    store.dispatch({
      type: SET_SCROLL_POSITION,
      position: position,
      component: 'site'
    });
    return this;
  }

  addScrollEvent = ({
    onEnter, onLeave, enter, leave, offset, enterOffset, leaveOffset,
    triggerPoint, selector
  }) => {
    let els = document.querySelectorAll(selector);
    if(!els.length) return;
    store.dispatch({
      type: ADD_SCROLL_EVENT,
      component: 'site',
      eventObject: {
        onEnter, onLeave, enter, leave, selector,
        offset, enterOffset, leaveOffset, triggerPoint, els
      }
    });

    return this;
  }

  smoothScroll = smoothScroll

  setScrollDirection = (direction) => {
    store.dispatch({
      type: SET_SCROLL_DIRECTION,
      component: 'site',
      direction
    });
    return this;
  }

  reloadScrollEvents = (selector) => {
    let event;
    if(selector){
      event = findScrollEventBySelector(selector);
      if(!event) return this.addScrollEvent({selector});
    }
    store.dispatch({
      type: event ? RELOAD_SCROLL_EVENT : RELOAD_SCROLL_EVENTS,
      component: 'site',
      event
    });

    return this;
  }

  setAdHocState = (obj) => {
    store.dispatch({
      type: SET_AD_HOC_STATE,
      component: 'site',
      object: obj
    });
    return this;
  }

  getState = (name) => {
    return getNestedState(store.getState(), name);
  }

  getAdHocState = (name) => {
    return getNestedState(store.getState(), `site.adHoc.${name}`);
  }

  addAdHocObserver = ({ stateName, onChange }) => {
    let observer = observerFactory(`site.adHoc.${stateName}`, onChange);
    store.subscribe(observer);
    return this;
  }

  addObserver = ({ stateName, onChange }) => {
    let observer = observerFactory(stateName, onChange);
    store.subscribe(observer);
    return this;
  }
}

const actions = new Actions();
export default actions;
