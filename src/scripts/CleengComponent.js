const generateEmbeddableUrl = (slug) => {
  // todo: provide a mapping for components and their paths
  return `https://hosted-mssdk.netlify.app/${slug}`;
};

export default class CleengComponent {
  embeddableUrl = '';

  constructor(slug) {
    this.embeddableUrl = generateEmbeddableUrl(slug);
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
    cleengNode.height = '800px';
    cleengNode.width = '1000px';

    mountContainer.appendChild(cleengNode);
  }
}
