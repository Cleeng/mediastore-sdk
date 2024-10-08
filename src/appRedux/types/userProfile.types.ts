export type CaptureSetting =
  | {
      key: 'email';
      enabled: boolean;
      required: boolean;
      answer: string | null;
    }
  | {
      key: 'firstNameLastName';
      enabled: boolean;
      required: boolean;
      answer: {
        firstName: string | null;
        lastName: string | null;
      };
    }
  | {
      key: 'birthDate';
      enabled: boolean;
      required: boolean;
      answer: string | null;
    }
  | {
      key: 'companyName';
      enabled: boolean;
      required: boolean;
      answer: string | null;
    }
  | {
      key: 'phoneNumber';
      enabled: boolean;
      required: boolean;
      answer: string | null;
    }
  | {
      key: 'address';
      enabled: boolean;
      required: boolean;
      answer: {
        address: string | null;
        address2: string | null;
        city: string | null;
        state: string | null;
        postCode: string | null;
        country: string | null;
      };
    };

export type UserProfile = {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    country: string;
    regDate: string;
    lastLoginDate: string;
    lastUserIp: string;
    externalId: string;
    externalData: null;
  } | null;
  capture: {
    isCaptureEnabled: boolean;
    shouldCaptureBeDisplayed: boolean;
    settings: CaptureSetting[];
  } | null;
  consents: Array<{
    customerId: string;
    name: string;
    required: boolean;
    state: string;
    version: string;
    needsUpdate: boolean;
    label: string;
    value: string;
    newestVersion: string;
    date: number;
  }>;
  consentsError: string;
};
