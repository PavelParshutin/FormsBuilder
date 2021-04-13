import { createAction, props } from '@ngrx/store';
import { NewComponent } from "./interfaces";

export const setGeneralStyle = createAction('[STYLE] set general style', props<NewComponent>());

export const setComponentStyleAction = createAction('[STYLE] set component style', props<NewComponent>());
export const addNewComponentAction = createAction('[STYLE] add new component', props<NewComponent>());
export const addNewStyleProperty = createAction('[STYLE] add new style property', props<any>());
export const updateOptions = createAction('[STYLE] add new option', props<any>());
export const deleteComponent = createAction('[STYLE] delete component', props<any>());

export const setNewGeneralBtnStyle = createAction('[STYLE] set new general btb style', props<any>());
export const setNewGeneralLabelStyle = createAction('[STYLE] set new general label style', props<any>());
export const setNewGeneralInputStyle = createAction('[STYLE] set new general input style', props<any>());
export const setNewGeneralCheckboxStyle = createAction('[STYLE] set new general checkbox style', props<any>());
export const setNewGeneralSelectStyle = createAction('[STYLE] set new general select style', props<any>());
export const setNewGeneralTextAreaStyle = createAction('[STYLE] set new general text area style', props<any>());

