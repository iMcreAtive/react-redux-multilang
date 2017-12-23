let instances = [];
let language = 'ru';
let store;

export default class MultiLanguage{

  constructor(props){
    this.props = props;

    this.propsToObj();
    instances.push(this);
  }

  propsToObj(){
    for(let key in this.props[language]){
      this[key] =  this.props[language][key];
    }
  }
}

export function syncWithStore(link){
  store = link;

  store.subscribe(() => {
    let state = store.getState();

    if(state.lang.code !== language){
      setLanguage(state.lang.code);
    }
  })
}

export function langReducer(state = { code: language }, action){
  switch (action.type){
    case 'SET_REDUX_LANGUAGE':
      return { ...state, code: action.code }
    default:
      return state;
  }
}

export async function setLanguage(code){
  if(!store) throw new Error('Use `syncWithStore` first');

  language = code;
  for(let i in instances){
    instances[i].propsToObj();
  }

  store.dispatch({
    type: 'SET_REDUX_LANGUAGE',
    code
  })
}