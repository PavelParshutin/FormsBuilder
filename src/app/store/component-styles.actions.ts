import { createAction, props } from '@ngrx/store';

import { ComponentFields } from './interfaces';

export const setGeneralStyle = createAction('[STYLE] set general style', props<ComponentFields>());

export const setComponentStyleAction = createAction('[STYLE] set component style', props<ComponentFields>());
export const setDefaultComponentStyleAction = createAction('[STYLE] set default component style', props<ComponentFields>());

export const addNewComponentAction = createAction('[STYLE] add new component', props<ComponentFields>());
export const addNewStylePropertyAction = createAction('[STYLE] add new style property', props<any>());
export const updateOptionsAction = createAction('[STYLE] add new option', props<any>());
export const deleteComponentAction = createAction('[STYLE] delete component', props<any>());

export const setNewGeneralBtnStyleAction = createAction('[STYLE] set new general btb style', props<any>());
export const setNewGeneralLabelStyleAction = createAction('[STYLE] set new general label style', props<any>());
export const setNewGeneralInputStyleAction = createAction('[STYLE] set new general input style', props<any>());
export const setNewGeneralCheckboxStyleAction = createAction('[STYLE] set new general checkbox style', props<any>());
export const setNewGeneralSelectStyleAction = createAction('[STYLE] set new general select style', props<any>());
export const setNewGeneralTextAreaStyleAction = createAction('[STYLE] set new general text area style', props<any>());

