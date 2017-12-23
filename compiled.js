var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let instances = [];
let language = 'ru';
let store;

export default class MultiLanguage {

  constructor(props) {
    this.props = props;

    this.propsToObj();
    instances.push(this);
  }

  propsToObj() {
    for (let key in this.props[language]) {
      this[key] = this.props[language][key];
    }
  }
}

export function syncWithStore(link) {
  store = link;

  store.subscribe(() => {
    let state = store.getState();

    if (state.lang.code !== language) {
      setLanguage(state.lang.code);
    }
  });
}

export function langReducer(state = { code: language }, action) {
  switch (action.type) {
    case 'SET_REDUX_LANGUAGE':
      return _extends({}, state, { code: action.code });
    default:
      return state;
  }
}

export let setLanguage = (() => {
  var _ref = _asyncToGenerator(function* (code) {
    if (!store) throw new Error('Use `syncWithStore` first');

    language = code;
    for (let i in instances) {
      instances[i].propsToObj();
    }

    store.dispatch({
      type: 'SET_REDUX_LANGUAGE',
      code
    });
  });

  return function setLanguage(_x) {
    return _ref.apply(this, arguments);
  };
})();
