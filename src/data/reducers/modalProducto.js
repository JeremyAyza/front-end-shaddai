import { HIDE_MODAL_PRODUCTS, SHOW_MODAL_PRODUCTS } from '../actions/types';

const initialState = {
	modalType: false,
	modalProps: {}
};

export default function reducer(state = initialState, action){
	switch (action.type) {
		case SHOW_MODAL_PRODUCTS:
			return {
				modalType: action.payload.modalType,
				modalProps: action.payload.modalProps
			};
		case HIDE_MODAL_PRODUCTS:
			return initialState;
		default:
			return state;
	}
};

