import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import { Styles } from './interfaces';
import { addNewComponentAction, setComponentStyleAction, setGeneralStyle } from './component-styles.actions';

export const initialState: Styles = {
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
    backgroundColor: 'transparent',
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
  on(setComponentStyleAction, (state, prop) => ({
    ...state,
    newComponents: [...state.newComponents.filter(item => item.id !== prop.id), prop]
  })),
  on(addNewComponentAction, (state, prop) => ({
      ...state,
      newComponents: [...state.newComponents, prop]
    })
  )
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


