import { generateEmbeddableUrl } from './utils';

export default class CleengComponent {
  embeddableUrl = '';

  componentName = '';

  constructor({ slug, offerId, publisherId }) {
    this.componentName = slug;
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
    cleengNode.id = `cleeng-embedded-mediastore-sdk-${this.componentName}-component`;

    mountContainer.appendChild(cleengNode);
  }
}
