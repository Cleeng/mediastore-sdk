import { REGEX_HREF_CLOSING_TAG, REGEX_HREF_OPEN_TAG } from './regexConstants';

const translateConsents = (consentContent, t) => {
  const openTagContent = REGEX_HREF_OPEN_TAG.exec(consentContent);
  const closeTagContent = REGEX_HREF_CLOSING_TAG.exec(consentContent);
  if (openTagContent) {
    let modifiedConsentContent = consentContent.replace(
      REGEX_HREF_OPEN_TAG,
      '{{htmltag}}'
    );
    modifiedConsentContent = modifiedConsentContent.replace(
      REGEX_HREF_CLOSING_TAG,
      '{{endhtmltag}}'
    );
    return `${t(modifiedConsentContent, {
      htmltag: openTagContent[0],
      endhtmltag: closeTagContent[0]
    })}`;
  }
  return t(consentContent);
};

export default translateConsents;
