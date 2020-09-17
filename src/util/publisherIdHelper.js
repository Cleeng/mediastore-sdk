import { setData, getData } from 'util/appConfigHelper';

const savePublisherId = (location, setPublisherId) => {
  const publisherIdFromQuery = new URLSearchParams(location.search).get(
    'publisher'
  );
  if (publisherIdFromQuery) {
    setPublisherId(publisherIdFromQuery);
    setData('CLEENG_PUBLISHER_ID', publisherIdFromQuery);
  } else {
    setPublisherId(getData('CLEENG_PUBLISHER_ID') || '');
  }
};

export default savePublisherId;
