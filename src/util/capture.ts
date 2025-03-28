import { CaptureSetting, CustomCaptureSetting } from 'types/Capture.types';

export const isCustomSetting = (
  setting: CaptureSetting
): setting is CustomCaptureSetting => setting.key.startsWith('custom_');
