const hostedComponentsDomain = import.meta.env.VITE_HOSTED_COMPONENTS_DOMAIN;
const buildMode = import.meta.env.MODE;

export const kebabCase = (textToTransform) =>
  textToTransform
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

export const generateEmbeddableUrl = ({ slug, ...params }) => {
  const urlParams = new URLSearchParams(params).toString();

  return `${hostedComponentsDomain}${
    buildMode === 'production' ? '' : `/${buildMode}`
  }/app/${slug}?${urlParams}`;
};
