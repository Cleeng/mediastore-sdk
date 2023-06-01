const regexHrefOpenTag = new RegExp(/<a(.|\n)*?>/);
const regexHrefCloseTag = new RegExp(/<\/a(.|\n)*?>/);

const translateConsents = (consentContent, t) => {
  const openTagContent = regexHrefOpenTag.exec(consentContent);
  const closeTagContent = regexHrefCloseTag.exec(consentContent);
  if (openTagContent) {
    let modifiedConsentContent = consentContent.replace(
      regexHrefOpenTag,
      '{{htmltag}}'
    );
    modifiedConsentContent = modifiedConsentContent.replace(
      regexHrefCloseTag,
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
