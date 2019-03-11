import axios from "axios";

const initialState = {
  user: [],
  isLoggedIn: false,
  posts: []
};

const HANDLE_CHANGE = "HANDLE_CHANGE";
const REGISTER_USER = "REGISTER_USER";
const LOGIN_USER = "LOGIN_USER";
const LOGOUT = "LOGOUT";
const GET_POSTS = "GET_POSTS";
const SEARCH_POST = "SEARCH_POST";

export function registerUser(username, password) {
  return {
    type: REGISTER_USER,
    payload: axios.post("/auth/register", { username, password })
  };
}

export function loginUser(username, password) {
  return {
    type: LOGIN_USER,
    payload: axios.post("/auth/login", { username, password })
  };
}

export function logout() {
  return {
    type: LOGOUT,
    payload: axios.post("/auth/logout")
  };
}

export function handleChange(e) {
  return {
    type: HANDLE_CHANGE,
    payload: { id: e.target.id, value: e.target.value }
  };
}

export function getPosts() {
  return {
    type: GET_POSTS,
    payload: axios.get("/api/posts")
  };
}

export function searchPosts(title) {
  return {
    type: SEARCH_POST,
    payload: axios.get(`/api/posts/filter?title=${title}`)
  };
}

// export function getPost() {
//   return {
//     type: GET_POSTS,
//     payload: axios.get
//   };
// }

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case HANDLE_CHANGE:
      return { ...state, [action.payload.id]: action.payload.value };
    case `${REGISTER_USER}_FULFILLED`:
      return { ...state, user: action.payload.data, isLoggedIn: true };
    case `${LOGIN_USER}_FULFILLED`:
      console.log(action.payload.data);
      return { ...state, user: action.payload.data, isLoggedIn: true };
    case LOGOUT:
      return { ...state, isLoggedIn: false };
    case `${GET_POSTS}_FULFILLED`:
      console.log(action.payload.data);
      return { ...state, posts: action.payload.data };
    case `${SEARCH_POST}_FULFILLED`:
      return { ...state, posts: action.payload.data };
    default:
      return state;
  }
}
