import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import { Styles} from './interfaces';
import { addNewComponentAction,
  setComponentStyleAction,
  setGeneralStyle,
  updateOptionsAction,
  deleteComponentAction,
  setNewGeneralBtnStyleAction,
  setNewGeneralTextAreaStyleAction,
  setNewGeneralCheckboxStyleAction,
  setNewGeneralInputStyleAction,
  setNewGeneralSelectStyleAction,
  setNewGeneralLabelStyleAction } from './component-styles.actions';


export const initialState: Styles = {
  defaultStyles: {
    fontSize: 'font-size',
    fontWeigh: 'font-weigh',
    fontStyle: 'font-style',
    fontFamily: 'font-family',
    textDecoration: 'text-decoration',
    color: 'color',
    backgroundColor: 'background-color',
    border: 'border',
    borderRadius: 'border-radius',
    borderColor: 'border-color',
    outline: 'outline',
    position: 'position',
    width: 'width',
    maxWidth: 'max-width',
    minWidth: 'min-width',
    height: 'height',
    maxHeight: 'max-height',
    minHeight: 'min-height',
    margin: 'margin',
    padding: 'padding',
    cursor: 'cursor'
  },
  generalStyle: {
    width: '33.33333%',
    minHeight: '100vh',
    border: '1px solid black',
    backgroundColor: 'white',
    padding: '10px',
  },
  btnStyle: {
    border: '1px solid black',
    outline: 'none',
    padding: '10px 15px',
    fontSize: '14px',
    color: 'black',
    backgroundColor: 'white',
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
  checkboxStyles: {
    margin: '5px'
  },
  labelStyles: {
    margin: '10px'
  },
  selectStyles: {
    width: '30%',
    padding: '10px 15px',
    margin: '10px 30px',
    border: '1px solid black',
    borderRadius: '30px',
    outline: 'none'
  },
  textareaStyles: {
    display: 'block',
    width: '100%',
    border: '1px solid black',
    borderRadius: '15px',
    outline: 'none',
    padding: '10px 15px',
    margin: '10px auto',
  },
  newComponents: [],
};

export const styleReducer = createReducer(initialState,
  on(setGeneralStyle, (state, prop) => ({
    ...state,
    generalStyle: prop.style
  })),
  on(setComponentStyleAction, (state, prop) => {
    const index = state.newComponents.findIndex(item => item.id === prop.id)
    const tempComponentsArray = [...state.newComponents]
    tempComponentsArray.splice(index, 1, prop)
    console.log(tempComponentsArray)
    return {
      ...state,
      newComponents: tempComponentsArray
    }
  }),
  on(addNewComponentAction, (state, prop) => ({
      ...state,
      newComponents: [...state.newComponents, prop]
    })),
  on(updateOptionsAction, (state, prop) => ({
      ...state,
      newComponents: [...state.newComponents.filter(item => item.id !== prop.id), prop]
    })),
  on(deleteComponentAction, (state, prop) => ({
    ...state,
    newComponents: [...state.newComponents.filter(item => item.id !== prop.id)]
  })),
  on(setNewGeneralBtnStyleAction, (state, prop) => ({
    ...state,
    btnStyle: prop
  })),
  on(setNewGeneralLabelStyleAction, (state, prop) => ({
    ...state,
    labelStyles: prop
  })),
  on(setNewGeneralInputStyleAction, (state, prop) => ({
    ...state,
    inputTextStyle: prop
  })),
  on(setNewGeneralCheckboxStyleAction, (state, prop) => ({
    ...state,
    checkboxStyles: prop
  })),
  on(setNewGeneralSelectStyleAction, (state, prop) => ({
    ...state,
    selectStyles: prop
  })),
  on(setNewGeneralTextAreaStyleAction, (state, prop) => ({
    ...state,
    textareaStyles: prop
  }))
);

export const defaultStylesFeatureSelector = createFeatureSelector<Styles>('defaultComponentStyles');

export const getGeneralStyle = createSelector(defaultStylesFeatureSelector, state => state.generalStyle);

export const getBtnStyleSelector = createSelector(defaultStylesFeatureSelector, state => state.btnStyle);
export const getCheckStyleSelector = createSelector(defaultStylesFeatureSelector, state => state.checkboxStyles);
export const getLabelStyleSelector = createSelector(defaultStylesFeatureSelector, state => state.labelStyles);
export const getSelectStyleSelector = createSelector(defaultStylesFeatureSelector, state => state.selectStyles);
export const getInputTextStyleSelector = createSelector(defaultStylesFeatureSelector, state => state.inputTextStyle);
export const getTextAreaStyleSelector = createSelector(defaultStylesFeatureSelector, state => state.textareaStyles);

export const getNewComponentsArray = createSelector(defaultStylesFeatureSelector, state => state.newComponents);
export const getDefaultStyles = createSelector(defaultStylesFeatureSelector, state => state.defaultStyles);


