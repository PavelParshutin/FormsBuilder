import { createAction, props } from '@ngrx/store';

export const setComponentStyleAction = createAction('[STYLE] set component style', props<any>());
export const addNewComponentAction = createAction('[STYLE] add new component', props<any>());
