import { createBrowserHistory } from 'history';

const history = createBrowserHistory ? createBrowserHistory() : {};

export default history;
