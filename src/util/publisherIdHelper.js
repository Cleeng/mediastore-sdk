const savePublisherId = (location, setPublisherId) => {
  const publisherIdFromQuery = new URLSearchParams(location.search).get(
    'publisher'
  );
  if (publisherIdFromQuery) {
    setPublisherId(publisherIdFromQuery);
    localStorage.setItem('CLEENG_PUBLISHER_ID', publisherIdFromQuery);
  } else {
    setPublisherId(localStorage.getItem('CLEENG_PUBLISHER_ID') || '');
  }
};

export default savePublisherId;
