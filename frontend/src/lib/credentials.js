
// imports
import Mnemonic from 'bitcore-mnemonic';
import bs58 from 'bs58';
import { createHash } from 'crypto';
import { sortBy } from 'lodash'
import { derivePath } from 'pay-to-contract-lib/lib/contract'


export const purpose = 200;
export const coin_type = 0; // btc livenet

export const root_contract_key_path = `m/${purpose}'/${coin_type}'`;

export const trader_id_path = `m/0'/0'/1'`;
export const trader_signature_path = `m/${purpose}'/${coin_type}'/0'/0'/1'`;

export function computeContractBaseHDPublicKey(rootContractHDPrivateKey, contractId) {
  return rootContractHDPrivateKey.derive(`m/${contractId}'`).hdPublicKey;
}

export function computeTraderId(hdPrivateKey) {
  const publicKey = hdPrivateKey.derive(trader_id_path).hdPublicKey.toString();
  return sha256Base58(publicKey);
}

export function computeTraderSignature(hdPrivateKey) {
  const publicKey = hdPrivateKey.derive(trader_signature_path).hdPublicKey.toString();
  return sha256Base58(publicKey);
}

export function computeCommitmentPK(hdPublicKey, hash) {
  const path = derivePath(hash);
  return hdPublicKey.derive(`m/${path}`).toString();
}

export function computeCommitmentAddress(hdPublicKey, hash) {
  const path = derivePath(hash);
  return hdPublicKey.derive(`m/${path}`).publicKey.toAddress().toString();
}

export function computeRootContractHDPrivateKey(hdPrivateKey) {
  return hdPrivateKey.derive(root_contract_key_path);
}

export function computeHDPrivateKey(mnemonic) {
  const code = new Mnemonic(mnemonic);
  return code.toHDPrivateKey();
}

export function computeHDPrivateKeySafe(mnemonic) {
  try {
    return computeHDPrivateKey(mnemonic);
  } catch(ignore) {}
  return null;
}

export function isSeedValid(mnemonic) {
  return Mnemonic.isValid(mnemonic) && mnemonic.split(' ').length === 12;
}

export function sha256Base58(str) {
  const hash = createHash('sha256');
  hash.update(str, 'utf8');
  return bs58.encode(hash.digest());
}

export function computeWalletPath(contractId, payeeContractHash, payerContractHash) {
  const payeePath = derivePath(payeeContractHash);
  const payerPath = derivePath(payerContractHash);
  return `m/${purpose}'/${coin_type}'/${contractId}'/${payeePath}/${payerPath}`;
}

export function aggregateFileHashes(fileHahes) {
  return computeTextHash(sortBy(fileHahes).join(''));
}

export function computeFileHash(file) {
  return readAsText(file).then(computeTextHash)
}

export function computeTextHash(text) {
  const hash = createHash('sha512')
  hash.update(text, 'utf8')
  return hash.digest('hex')
}

export function readAsText(file) {
  /* global Blob */
  if (!(file instanceof Blob)) {
    throw new TypeError('Must be a File or Blob')
  }
  return new Promise(function (resolve, reject) {
    const reader = new window.FileReader()
    reader.onload = function (e) {
      resolve(e.target.result)
    }
    reader.onerror = function (e) {
      reject('Error reading' + file.name + ': ' + e.target.result)
    }
    reader.readAsText(file)
  });
}
