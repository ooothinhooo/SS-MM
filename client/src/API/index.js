var URL = "http://localhost:9000/api";
var MOTELS = `${URL}/motel`;
var ROOM = `${URL}/room`;
var POST = `${URL}/posts`;
var USER = `${URL}/user`;
var AUTH = `${URL}/auth`;
// var COMMENT =

//? Motel
// [POST] LIST ROOM
export const URL_LIST_ROOM = `${MOTELS}/listroom`;
export const URL_ADD_ROOM = `${MOTELS}/addroom`;
export const URL_DELETE_ROOM = `${MOTELS}/deleteroom`;
export const URL_EDIT_ROOM = `${MOTELS}/editroom`;
export const URL_REGISTER_MOTEL = `${MOTELS}/register_motel`;
// export const URL_LIST_ROOM = `${MOTELS}/listroom`;
//? Room
export const URL_ADD_MEMBER_ROOM = `${ROOM}/add`;
export const URL_DELETE_MEMBER_ROOM = `${ROOM}/delete`;
export const URL_EDIT_MEMBER_ROOM = `${ROOM}/edit`;
export const URL_ADD_ELE_ROOM = `${ROOM}/addele`;
export const URL_DELETE_ELE_ROOM = `${ROOM}/deleteele`;
export const URL_ADD_WATER_ROOM = `${ROOM}/addwater`;
export const URL_DELETE_WATER_ROOM = `${ROOM}/deletewater`;

//?
export const URL_DEPLOP = `https://api-ss-mm.onrender.com`;