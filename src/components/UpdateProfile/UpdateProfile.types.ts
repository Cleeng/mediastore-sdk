import {
  CaptureSetting,
  CaptureSettings,
  CustomCaptureSetting
} from 'types/Capture.types';
import { Consent } from 'types/Consents.types';

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
    settings: CaptureSetting[] | CustomCaptureSetting[];
  };
  consents: Array<Consent>;
  consentsError: string;
};

export type InnerPopup = {
  isOpen: boolean;
  type: string;
  data?: Record<string, unknown>;
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
  showInnerPopup: (popup: { type: string }) => void;
  hideInnerPopup: () => void;
  initPublisherConfig: (config: { displayGracePeriodError: boolean }) => void;
  handleLogout: () => void;
  userProfile: UserProfile;
  innerPopup: InnerPopup;
  displayGracePeriodError: boolean | null;
};
