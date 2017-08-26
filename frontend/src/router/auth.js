
// imports
import { isEmpty } from 'lodash';

// local imports
import { getAccessToken } from '../lib/vault';

export function requireAuth(to, from, next) {
  if (!isLoggedIn()) {
    next({
      path: '/login'
    });
  } else {
    next();
  }
}

export function isLoggedIn() {
  return !isEmpty(getAccessToken());
}
