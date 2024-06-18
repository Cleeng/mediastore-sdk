import { EMBEDDED_COMPONENT_DOMAIN } from './constants';

const generateEmbeddableUrl = ({ slug, ...params }) => {
  // todo: provide a mapping for components and their paths
  const urlParams = new URLSearchParams(params).toString();

  return `${EMBEDDED_COMPONENT_DOMAIN}/${slug}?${urlParams}`;
};

export default class CleengComponent {
  embeddableUrl = '';

  constructor({ slug, offerId, publisherId }) {
    this.embeddableUrl = generateEmbeddableUrl({
      slug,
      offerId,
      publisher: publisherId
    });
  }

  appendToNodeWithId(parentNodeId) {
    const mountContainer = document.getElementById(parentNodeId);

    if (!mountContainer) {
      throw new Error(
        `Cleeng couldn't find a container with provided selector: ${parentNodeId}. Please make sure that an HTML node with the passed selector is present in the DOM.`
      );
    }

    const cleengNode = document.createElement('iframe');
    cleengNode.src = this.embeddableUrl;
    cleengNode.title = 'cleeng-embedded-mediastore-sdk';
    cleengNode.height = '100%';
    cleengNode.width = '100%';

    mountContainer.appendChild(cleengNode);
  }
}
