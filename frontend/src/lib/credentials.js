
// imports
import Mnemonic from 'bitcore-mnemonic';
import bs58 from 'bs58';
import { createHash } from 'crypto';


export const purpose = 200;
export const coin_type = 0; // btc livenet

export const root_contract_key_path = `m/${purpose}'/${coin_type}'`;

export const trader_id_path = `m/0'/0'/1`;

export function computeTraderId(hdPrivateKey) {
  const publicKey = hdPrivateKey.derive(trader_id_path).hdPublicKey.toString();
  return sha256Base58(publicKey);
}

export function computeRootContractBasePKSignature(hdPrivateKey) {
  const publicKey = hdPrivateKey.derive(root_contract_key_path).hdPublicKey.toString();
  return sha256Base58(publicKey);
}

export function isValid(mnemonic) {
  return Mnemonic.isValid(mnemonic) && mnemonic.split(' ').length === 12;
}

export function computeAccessKey(mnemonic) {
  const code = new Mnemonic(mnemonic);
  const masterPrivateKey = code.toHDPrivateKey();
  const traderId = computeTraderId(masterPrivateKey);
  const rootContractBasePKSignature = computeRootContractBasePKSignature(masterPrivateKey);
  return {
    traderId,
    rootContractBasePKSignature
  };
}

export function sha256Base58(str) {
  const hash = createHash('sha256');
  hash.update(str, 'utf8');
  return bs58.encode(hash.digest());
}
