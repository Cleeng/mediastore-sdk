import SettingsType from 'types/Settings.types';

export type SettingsInitialState = {
  settings: SettingsType | null;
  loading: boolean;
  error: string | null | undefined;
};
