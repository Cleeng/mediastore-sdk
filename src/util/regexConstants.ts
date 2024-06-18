export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const PHONE_NUMBER_REGEX = /(^[+]?([0-9][-|" "]?){4,16})$/;

export const REGEX_HREF_OPEN_TAG = /<a(.|\n)*?>/;

export const REGEX_HREF_CLOSING_TAG = /<\/a(.|\n)*?>/;
