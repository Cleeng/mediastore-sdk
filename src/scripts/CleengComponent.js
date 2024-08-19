import {
  CLEENG_CREDENTIALS_MESSAGE_TYPE,
  HOSTED_COMPONENTS_DOMAIN
} from './constants';
import { generateEmbeddableUrl } from './utils';

export default class CleengComponent {
  embeddableUrl = '';

  componentName = '';

  cleengAuthToken = '';

  cleengRefreshToken = '';

  constructor({
    slug,
    offerId,
    publisherId,
    cleengAuthToken,
    cleengRefreshToken
  }) {
    this.componentName = slug;
    this.cleengAuthToken = cleengAuthToken;
    this.cleengRefreshToken = cleengRefreshToken;
    this.embeddableUrl = generateEmbeddableUrl({
      slug,
      offerId,
      publisher: publisherId
    });
  }

  populateCredentialsToIFrame() {
    const cleengNode = document.getElementById(
      `cleeng-embedded-mediastore-sdk-${this.componentName}-component`
    );

    if (!cleengNode) {
      throw new Error(
        `Cleeng couldn't find any iframe with the ID: cleeng-embedded-mediastore-sdk-${this.componentName}-component. Please make sure that the Cleeng component is mounted before trying to populate credentials.`
      );
    }

    const sendMessage = () => {
      cleengNode.contentWindow.postMessage(
        {
          type: CLEENG_CREDENTIALS_MESSAGE_TYPE,
          payload: {
            cleengAuthToken: this.cleengAuthToken,
            cleengRefreshToken: this.cleengRefreshToken
          }
        },
        HOSTED_COMPONENTS_DOMAIN
      );
    };

    if (cleengNode.contentWindow.document.readyState === 'complete') {
      sendMessage();
    }

    cleengNode.addEventListener('load', sendMessage);
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
    this.populateCredentialsToIFrame();
  }

  removeCleengNode(parentNodeId) {
    const mountContainer = document.getElementById(parentNodeId);
    const cleengNodeToRemove = document.getElementById(
      `cleeng-embedded-mediastore-sdk-${this.componentName}-component`
    );

    if (!mountContainer) {
      throw new Error(
        `Cleeng couldn't find a container with provided selector: ${parentNodeId}. Please make sure that an HTML node with the passed selector is present in the DOM.`
      );
    }

    if (cleengNodeToRemove) {
      mountContainer.removeChild(cleengNodeToRemove);
    }
  }
}
