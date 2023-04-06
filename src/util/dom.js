const waitForChildElement = async (selector, parentEl) => {
  while (parentEl.querySelector(selector) === null) {
    // eslint-disable-next-line
    await new Promise(resolve => requestAnimationFrame(resolve));
  }
  return parentEl.querySelector(selector);
};

export default waitForChildElement;
