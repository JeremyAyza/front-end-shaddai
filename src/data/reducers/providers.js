import {
	GET_ALL_PROVIDERS,
	SET_LOADING_PROVIDERS,
	RESTART_FILTERS,
	SET_OPTIONS,
	RESTART_PROVIDERS,
	SEARCH_PROVIDER_BY_NAME,
	PAGINATE_COUNTRIES,
	SET_PAGE,
	SET_PROVIDER_TO_EDIT,
	
} from "../actions/types";
// import { toast } from "react-toastify";

// Intial State
const initialState = {
	providers: [],
	loadingProviders: false,
	paginatedProviders: [],
	currentProviders: [],
	currentPage: 1,
	filtered: [],
	providerToEdit: null,
	options: {
		order: "asc",        // Puede ser: asc o desc
		orderBy: "name",     //Puede ser por: name, price
	}
};

// Reducers REDUX
export default function reducer(state = initialState, action) {
	const {
		type,
		payload
	} = action;
	let filtered;

	switch (type) {
		// CARRITO
		case SET_PROVIDER_TO_EDIT:
			return { ...state, providerToEdit: payload };
		case SET_PAGE:
			return {
				...state,
				currentPage: payload,
				currentProducts: state.paginatedProviders[payload]
			};
		case SET_LOADING_PROVIDERS:
			return { ...state, loadingProviders: payload };
		case GET_ALL_PROVIDERS:
			return { ...state, providers: payload, filtered: payload, loadingProviders: false };
		case SET_OPTIONS:
			return { ...state, options: { ...state.options, ...payload } };
		case SEARCH_PROVIDER_BY_NAME:
			return { ...state, filtered: payload, loadingProviders: false };
		case RESTART_FILTERS:
			return { ...state, options: initialState.options };
		case RESTART_PROVIDERS:
			return { ...state, filtered: state.providers };
		case PAGINATE_COUNTRIES:
			filtered = [...state.filtered];
			let paginatedProviders = [];

			if (filtered.length > 0) {
				while (filtered.length > 0) {
					// Poniendo de 10 en 10 cada página
					paginatedProviders.push(filtered.splice(0, 10))
				}
			}
			// Cada que se paginan los productos también establezco la pagina actual como 1
			return { ...state, paginatedProviders, currentProducts: paginatedProviders[0], currentPage: 1 };
		
		default:
			return { ...state };
	}
}

