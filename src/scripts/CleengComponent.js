import { generateEmbeddableUrl } from './utils';

export default class CleengComponent {
  embeddableUrl = '';

  constructor({ slug, offerId, publisherId, isConfigured }) {
    if (!isConfigured) {
      throw new Error(
        'The cleeng.configure method has not been called yet. Make sure to call it first before trying to embed any components.'
      );
    }

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
