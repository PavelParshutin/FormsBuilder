import { createAction, props } from '@ngrx/store';
import { NewComponent } from "./interfaces";

export const setGeneralStyle = createAction('[STYLE] set general style', props<NewComponent>());

export const setComponentStyleAction = createAction('[STYLE] set component style', props<NewComponent>());
export const addNewComponentAction = createAction('[STYLE] add new component', props<NewComponent>());
