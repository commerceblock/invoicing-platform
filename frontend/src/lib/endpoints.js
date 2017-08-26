
// local store
const store = {
  baseUrl: null,
}

export function initBaseUrl(baseUrl) {
  store.baseUrl = baseUrl;
}

export function portalSignup() {
  return `${store.baseUrl}/portal/v1.0/signup`
}

export function portalLogin() {
  return `${store.baseUrl}/portal/v1.0/login`
}

export function portalGQL() {
  return `${store.baseUrl}/portal/v1.0/graphql`
}

export function invoicesGQL() {
  return `${store.baseUrl}/invoices/v1.0/graphql`
}

export default {
  initBaseUrl,
  portalSignup,
  portalLogin,
  portalGQL,
  invoicesGQL,
}
