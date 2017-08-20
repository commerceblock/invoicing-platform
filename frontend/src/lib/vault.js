
const store = {};

export function setCreds(creds) {
  store.creds = creds;
}

export function getCreds(creds) {
  return store.creds;
}
