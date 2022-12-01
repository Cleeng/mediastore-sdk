// conver to Minor as in Adyen connector
import Big from 'big.js';

// https://docs.adyen.com/development-resources/currency-codes
const minorUnitMultiplier = {
  BHD: 1000, // BHD Bahraini Dinar 3
  CVE: 1, // CVE Cape Verdi Escudo 0 (see note)
  DJF: 1, // DJF Djibouti Franc 0
  GNF: 1, // GNF Guinea Franc 0
  IDR: 1, // IDR Indonesian Rupiah 0 (see note)
  IQD: 1000, // IQD Iraqi Dinar 3
  JOD: 1000, // JOD Jordanian Dinar 3
  JPY: 1, // JPY Japanese Yen 0
  KMF: 1, // KMF Comoro Franc 0
  KRW: 1, // KRW South-Korean Won 0
  KWD: 1000, // KWD Kuwaiti Dinar 3
  LYD: 1000, // LYD Libyan Dinar 3
  OMR: 1000, // OMR Rial Omani 3
  PYG: 1, // PYG Paraguay Guarani 0
  RWF: 1, // RWF Rwanda Franc 0
  TND: 1000, // TND Tunisian Dinar 3
  UGX: 1, // UGX Uganda Shilling 0
  VND: 1, // VND Vietnamese New Dong 0
  VUV: 1, // VUV Vanuatu Vatu 0
  XAF: 1, // XAF CFA Franc BEAC 0
  XOF: 1, // XOF CFA Franc BCEAO 0
  XPF: 1 // XPF CFP Franc 0
};
const defaultMultiplier = 100;

export const getMultiplier = currency => {
  console.log('getMultiplier', currency);
  return new Big(minorUnitMultiplier[currency] || defaultMultiplier);
};

export const toMinor = (currency, amount) => {
  console.log('to minor', currency, amount);
  return new Big(amount).times(getMultiplier(currency)).toNumber();
};
