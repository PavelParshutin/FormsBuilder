import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import { Styles} from './interfaces';
import { addNewComponentAction,
  setNewComponentStyleAction,
  setDefaultComponentStyleAction,
  setAppGeneralStyleAction,
  deleteComponentAction
} from './component-styles.actions';
import { ComponentName } from './enums';


export const initialState: Styles = {
  availableStyleProperties: {
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
      componentType: ComponentName.Label,
      title: 'Label',
      style: {
        margin: '10px'
      },
      anotherProperties: {},
      id: '',
    },
    {
      componentType: ComponentName.Input,
      title: 'Input',
      style: {
        width: '100%',
        border: '1px solid black',
        padding: '10px 15px',
        marginBottom: '20px',
        borderRadius: '20px',
        outline: 'none'
      },
      anotherProperties: {},
      id: ''
    },
    {
      componentType: ComponentName.Button,
      title: 'Button',
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
      anotherProperties: {},
      id: ''
    },
    {
      componentType: ComponentName.Select,
      title: 'Select',
      style: {
        width: '30%',
        padding: '10px 15px',
        margin: '10px 30px',
        border: '1px solid black',
        borderRadius: '30px',
        outline: 'none'
      },
      anotherProperties: {
        options: ['option 1', 'option 2']
      },
      id: ''
    },
    {
      componentType: ComponentName.Checkbox,
      title: 'CheckBox',
      style: {
        margin: '5px'
      },
      anotherProperties: {},
      id: ''
    },
    {
      componentType: ComponentName.TextArea,
      title: 'Text Area',
      style: {
          display: 'block',
          width: '100%',
          border: '1px solid black',
          borderRadius: '15px',
          outline: 'none',
          padding: '10px 15px',
          margin: '10px auto',
        },
      anotherProperties: {},
      id: ''
    }
  ],
  newComponents: []
};

export const styleReducer = createReducer(initialState,
  on(setAppGeneralStyleAction, (state, prop) => ({
    ...state,
    generalStyle: prop.style
  })),
  on(setNewComponentStyleAction, (state, prop) => {
    const index = state.newComponents.findIndex(item => item.id === prop.id)
    const tempComponentsArray = [...state.newComponents]
    tempComponentsArray.splice(index, 1, prop)
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
    return {
      ...state,
      defaultComponentsStyle: tempComponentsArray
    }
  }),
);

export const defaultStylesFeatureSelector = createFeatureSelector<Styles>('defaultComponentStyles');

export const getAvailableStylePropertiesSelector = createSelector(defaultStylesFeatureSelector, state => state.availableStyleProperties);
export const getAppGeneralStyleSelector = createSelector(defaultStylesFeatureSelector, state => state.generalStyle);

export const getNewComponentsArraySelector = createSelector(defaultStylesFeatureSelector, state => state.newComponents);
export const getDefaultComponentsStyleSelector = createSelector(defaultStylesFeatureSelector, state => state.defaultComponentsStyle);
