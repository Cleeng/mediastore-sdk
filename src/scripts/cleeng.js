import CleengComponent from './CleengComponent';
import { CLEENG_EXPOSED_COMPONENTS } from './constants';
import { kebabCase } from './utils';

export default class Cleeng {
  configure({ publisherId, offerId }) {
    if (!publisherId) {
      throw new Error(
        "Cleeng needs the publisher's ID in order to configure properly. Please pass your publisher ID."
      );
    }

    this.components = CLEENG_EXPOSED_COMPONENTS;
    Object.keys(this.components).forEach((componentName) => {
      this.components[componentName] = new CleengComponent({
        slug: kebabCase(componentName),
        offerId,
        publisherId
      });
    });
  }
}
