# Install
```js
npm install --save react-redux-multilang
```
# Reducer and sync
```js
import { langReducer, syncWithStore } from 'react-redux-multilang'

const store = createStore(
  combineReducers({
    lang: langReducer // step 1: add reducer
  })
);
syncWithStore(store) // step 2: sync language with store
```
#### Use in components
```js
import MultiLanguage from 'react-redux-multilang'

const translate = new MultiLanguage({
    en: {
        text: 'text here',
        deep: {
            text: 'deep text here'
        }
    },
    ru: {
        text: 'текст тут',
        deep: {
            text: 'вложенный текст тут'
        }
    }
})

class MyComponent extends Component{
    render(){
        return (
            <div>
                <p>{translate.text}</p>
                <p>{translate.deep.text}</p>
            </div>
        )
    }
}
```

#### Change language
```js
import { setLanguage } from 'react-redux-multilang'

// change language from anywhere
setLanguage('ru')

// sample with button and onClick
<button onClick={() => setLanguage('ru')}>Change language to Russian</button>
<button onClick={() => setLanguage('en')}>Change language to English</button>

// also you can dispatch action like this
store.dispatch({
    type: 'SET_REDUX_LANGUAGE',
    code: 'ru'
})
```