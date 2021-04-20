import { createAction, props } from '@ngrx/store';

import { ComponentFields } from './interfaces';

export const setAppGeneralStyleAction = createAction('[STYLE] set general style', props<ComponentFields>());
export const setDefaultComponentStyleAction = createAction('[STYLE] set default component style', props<ComponentFields>());
export const setNewComponentStyleAction = createAction('[STYLE] set component style', props<ComponentFields>());

export const addNewComponentAction = createAction('[STYLE] add new component', props<ComponentFields>());
export const deleteComponentAction = createAction('[STYLE] delete component', props<ComponentFields>());
