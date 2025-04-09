import { CaptureSetting, CaptureSettings } from 'types/Capture.types';
import { Consent } from 'types/Consents.types';
import { PopupManagerInitialState } from 'appRedux/types';

export type UserProfile = {
  user: {
    id?: number;
    email?: string;
    firstName?: string;
    lastName?: string;
    country?: string;
    regDate?: string;
    lastLoginDate?: string;
    lastUserIp?: string;
    externalId?: string;
    externalData?: Record<string, unknown>;
  } | null;
  capture?: {
    isCaptureEnabled: boolean;
    shouldCaptureBeDisplayed?: boolean;
    settings: CaptureSetting[];
  };
  consents: Array<Consent>;
  consentsError: string;
};

export type Capture =
  | {
      isCaptureEnabled: boolean;
      shouldCaptureBeDisplayed?: boolean;
      settings: Array<CaptureSetting>;
    }
  | undefined;

export type GetCaptureSettingsReturnValue =
  | CaptureSettings
  | Record<string, never>;

export type UpdateProfileProps = {
  setCurrentUser: (user: UserProfile) => void;
  setConsents: (consents: Consent) => void;
  setUserCapture: (capture: unknown) => void;
  updateCaptureOption: (option: unknown) => void;
  showPopup: (popup: { type: string }) => void;
  hidePopup: () => void;
  initPublisherConfig: (config: { displayGracePeriodError: boolean }) => void;
  handleLogout: () => void;
  userProfile: UserProfile;
  popupManager: PopupManagerInitialState;
  displayGracePeriodError: boolean | null;
};
