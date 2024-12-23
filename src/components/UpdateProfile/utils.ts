import { getObjectByKey } from 'util/generic';
import { settingNames } from './constants';

import { Capture, GetCaptureSettingsReturnValue } from './UpdateProfile.types';

// eslint-disable-next-line import/prefer-default-export
export const getCaptureSettings = (
  capture: Capture
): GetCaptureSettingsReturnValue => {
  if (!capture?.isCaptureEnabled) {
    return {};
  }

  const { settings } = capture;

  return settingNames.reduce(
    (acc, settingName) => ({
      ...acc,
      [settingName]: getObjectByKey(settings, settingName)
    }),
    {}
  );
};
