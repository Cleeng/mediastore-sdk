import { CaptureSetting, CustomCaptureSetting } from 'types/Capture.types';

// eslint-disable-next-line import/prefer-default-export
export const isCustomSetting = (
  setting: CaptureSetting
): setting is CustomCaptureSetting => setting.key.startsWith('custom_');
