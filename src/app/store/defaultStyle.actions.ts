import {createAction, props} from '@ngrx/store';
import {Styles} from './interfaces';

export const setStyle = createAction('[BTN STYLE] set style', props<Styles>())
export const setInputTextStyle = createAction('[BTN STYLE] set style', props<Styles>())


export const setComponentStyle = createAction('[STYLE] set component style', props<any>())
export const addNewComponent = createAction('[STYLE] add new component', props<any>())
