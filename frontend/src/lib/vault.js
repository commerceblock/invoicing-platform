
const store = {
  rootContractHDPrivateKey: null,
  accessToken: null,
};

export function setRootContractHDPrivateKey(hdPrvKey) {
  store.rootContractHDPrivateKey = hdPrvKey;
}

export function getRootContractHDPrivateKey() {
  return store.rootContractHDPrivateKey;
}

export function setAccessToken(accessToken) {
  store.accessToken = accessToken;
}

export function getAccessToken() {
  return store.accessToken;
}

export function reset() {
  store.rootContractHDPrivateKey = null;
  store.accessToken = null;
}
