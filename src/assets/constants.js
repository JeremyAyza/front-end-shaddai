export const BASEURL = process.env.REACT_APP_BASEURL

//export const BASEURL = "https://poo-app.herokuapp.com/api";

// USER
export const USER_GET_INFO = `${BASEURL}/user`;
export const URL_LOGIN = `${BASEURL}/user/login`;
export const URL_REGISTER = `${BASEURL}/user/register`;


// PRODUCT
export const URL_GET_ALL_PRODUCTS = `${BASEURL}/product/all`;
export const URL_SEARCH_BY_NAME = `${BASEURL}/product/search`;
// Se puede filtrar por categoría y precio
export const URL_FILTER_PRODUCTS = `${BASEURL}/product/filter`;

// CATEGORY
export const URL_GET_ALL_CATEGORIES = `${BASEURL}/category/all`;

// PROVIDER
export const URL_GET_ALL_PROVIDER = `${BASEURL}/provider/all`;
export const URL_SEARCH_PROVIDER_BY_NAME = `${BASEURL}/provider/search`;


// ORDERS
export const URL_GET_ORDERS_BY_USER = `${BASEURL}/order/user`; //require a token

// STRIPE
export const PUBLIC_KEY_STRIPE = "pk_test_51MnNhMLSjY2yfIMcdxVinV1YCpmfjbxaiWgKnfDdJDcEVAZn4JKiRMTTRlvp9X2IyLrf2pDn46wb3JeaaLCwQVJQ00gUpybEQg"