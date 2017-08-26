
const store = {
  creds: null,
  accessToken: null
};

export function setCreds(creds) {
  store.creds = creds;
}

export function getCreds(creds) {
  return store.creds;
}

export function setAccessToken(accessToken) {
  store.accessToken = accessToken;
}

export function getAccessToken() {
  return store.accessToken;
}

export function reset() {
  store.creds = null;
  store.accessToken = null;
}
