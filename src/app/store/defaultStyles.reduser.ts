import {Styles} from './interfaces';
import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import {addNewComponent, setComponentStyle } from './defaultStyle.actions';

export const initialState: Styles = {
  btnStyle: {
    border: '1px solid black',
    outline: 'none',
    padding: '10px 15px',
    fontSize: '14px',
    color: 'black',
    borderRadius: '20px',
    cursor: 'pointer',
    margin: '10px'
  },
  inputTextStyle: {
    width: '100%',
    border: '1px solid black',
    padding: '10px 15px',
    marginBottom: '20px',
    borderRadius: '20px',
    outline: 'none'
  },
  checboxStyles: {
    margin: '5px'
  },
  labelStyles: {
    margin: '10px'
  },
  selectStyles:{
    width: '30%',
    padding: '10px 15px',
    margin: '10px 30px',
    border: '1px solid black',
    borderRadius: '30px',
    outline: 'none'
  },
  textareatStyles:{
    display: 'block',
    width: '100%',
    border: '1px solid black',
    borderRadius: '15px',
    outline: 'none',
    padding: '10px 15px',
    margin: '10px auto',
  }
}

//
//
// export const btnStyleReducer = createReducer(
//   initialState, on(setStyle, (state, props) => (
//     {
//       ...state,
//       btnStyle: props.btnStyle
//     }
//   )),
//   on(setInputTextStyle,(state, props) =>({
//     ...state,
//     inputTextStyle: props.inputTextStyle
//   }))
// )

export const styleReducer = createReducer(initialState,
  on(setComponentStyle, (state, prop) => ({
    ...state,
    newComponents: prop /*state.newComponents.filter(item => item.id !== prop.id).push(prop)*/
  })),
  on(addNewComponent, (state, prop) => ({
      ...state,
    newComponents: prop
    })
  )
)

export const  defaultStylesFeatureSelector = createFeatureSelector<Styles>('defaultComponentStyles')

export const getBtnStyleSelector = createSelector(defaultStylesFeatureSelector, state => state.btnStyle)
export const getCheckStyleSelector = createSelector(defaultStylesFeatureSelector, state => state.checboxStyles)
export const getLabelStyleSelector = createSelector(defaultStylesFeatureSelector, state => state.labelStyles)
export const getSelectStyleSelector = createSelector(defaultStylesFeatureSelector, state => state.selectStyles)
export const getInputTextStyleSelector = createSelector(defaultStylesFeatureSelector, state => state.inputTextStyle)
export const getTextAreaStyleSelector = createSelector(defaultStylesFeatureSelector, state => state.textareatStyles)
