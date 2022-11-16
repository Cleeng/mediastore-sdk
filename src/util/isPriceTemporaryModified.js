const modifiedOffers = [
  'S675017829_PL',
  'S117251403_PL',
  'S680269209_US',
  'S179187332_US',
  'S984338192_US',
  'S471401848_US',
  'S869341037_US',
  'S537531369_US',
  'S248815997_US'
];

const isPriceTemporaryModified = offerId => {
  return modifiedOffers.includes(offerId);
};

export default isPriceTemporaryModified;
