import { createSelector } from 'reselect'

const _getModals = state => state.modals

export const getModals = createSelector(_getModals, modals => modals.toObject())
