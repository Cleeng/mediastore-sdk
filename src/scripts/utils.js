import { EMBEDDED_COMPONENT_DOMAIN } from './constants';

export const kebabCase = (textToTransform) =>
  textToTransform
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

export const generateEmbeddableUrl = ({ slug, ...params }) => {
  const urlParams = new URLSearchParams(params).toString();

  return `${EMBEDDED_COMPONENT_DOMAIN}/${slug}?${urlParams}`;
};
