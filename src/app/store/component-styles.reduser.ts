import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import { Styles} from './interfaces';
import { addNewComponentAction,
  setComponentStyleAction,
  setDefaultComponentStyleAction,
  setGeneralStyle,
  updateOptionsAction,
  deleteComponentAction
} from './component-styles.actions';
import {ComponentName} from "./enums";


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
  defaultComponentsStyle : [
    {
      style: {
        margin: '10px'
      },
      title: 'Label',
      componentType: ComponentName.Label,
      anotherProperties: {},
      id: '',
    },
    {
      style: {
        width: '100%',
        border: '1px solid black',
        padding: '10px 15px',
        marginBottom: '20px',
        borderRadius: '20px',
        outline: 'none'
      },
      title: 'Input',
      componentType: ComponentName.Input,
      anotherProperties: {},
      id: ''
    },
    {
        style: {
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
        title: 'Button',
        componentType: ComponentName.Button,
        anotherProperties: {},
        id: ''
    },
    {
      style: {
        width: '30%',
        padding: '10px 15px',
        margin: '10px 30px',
        border: '1px solid black',
        borderRadius: '30px',
        outline: 'none'
      },
      title: 'Select',
      componentType: ComponentName.Select,
      anotherProperties: {
        options: ['option 1', 'option 2']
      },
      id: ''
    },
    {
      style: {
        margin: '5px'
      },
      title: 'CheckBox',
      componentType: ComponentName.Checkbox,
      anotherProperties: {},
      id: ''
    },
    {
        style: {
          display: 'block',
          width: '100%',
          border: '1px solid black',
          borderRadius: '15px',
          outline: 'none',
          padding: '10px 15px',
          margin: '10px auto',
        },
        title: 'Text Area',
        anotherProperties: {},
        componentType: ComponentName.TextArea,
        id: ''
    }
  ]

  ,
  newComponents: []
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
  on(deleteComponentAction, (state, prop) => ({
    ...state,
    newComponents: [...state.newComponents.filter(item => item.id !== prop.id)]
  })),
  on(setDefaultComponentStyleAction, (state, prop) => {
    const index = state.defaultComponentsStyle.findIndex(item => item.componentType === prop.componentType)
    const tempComponentsArray = [...state.defaultComponentsStyle]
    tempComponentsArray.splice(index, 1, prop)
    console.log(tempComponentsArray)
    return {
      ...state,
      defaultComponentsStyle: tempComponentsArray
    }
  }),
);

export const defaultStylesFeatureSelector = createFeatureSelector<Styles>('defaultComponentStyles');

export const getDefaultStyles = createSelector(defaultStylesFeatureSelector, state => state.defaultStyles);
export const getGeneralStyle = createSelector(defaultStylesFeatureSelector, state => state.generalStyle);

export const getNewComponentsArray = createSelector(defaultStylesFeatureSelector, state => state.newComponents);
export const getDefaultComponentsStyle = createSelector(defaultStylesFeatureSelector, state => state.defaultComponentsStyle);
