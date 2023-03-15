import { combineReducers } from 'redux';
import users from './users';
import user_data from './user_data';
import dashboard from './dashboard';
import authors from './authors';
import category from './category';
import lang from './lang';

const appReducers = combineReducers({
    users: users,
    user_data: user_data,
    dashboard: dashboard,
    authors: authors,
    category: category,
    lang: lang
});

export default appReducers;
