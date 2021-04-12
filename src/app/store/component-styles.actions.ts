import { createAction, props } from '@ngrx/store';
import { NewComponent } from "./interfaces";

export const setGeneralStyle = createAction('[STYLE] set general style', props<NewComponent>());

export const setComponentStyleAction = createAction('[STYLE] set component style', props<NewComponent>());
export const addNewComponentAction = createAction('[STYLE] add new component', props<NewComponent>());
export const addNewStyleProperty = createAction('[STYLE] add new style property', props<any>());
export const updateOptions = createAction('[STYLE] add new option', props<any>());
export const deleteComponent = createAction('[STYLE] delete component', props<any>());
export const addComponent = createAction('[STYLE] add component', props<any>());
