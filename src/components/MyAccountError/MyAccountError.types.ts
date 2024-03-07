export type MyAccountErrorProps = {
  title?: string | null;
  subtitle?: string | null;
  icon?: string;
  generalError?: boolean;
  withBorder?: boolean;
  fullHeight?: boolean;
  centered?: boolean;
  margin?: string;
  fullWidth?: boolean;
  onClick?: () => void;
  isSmallCard?: boolean;
  direction?: 'row' | 'column';
};

export type WrapStyledProps = {
  $margin: string;
  $fullWidth: boolean;
  $withBorder: boolean;
  $fullHeight: boolean;
  $centered: boolean;
  $isSmallCard: boolean;
  $direction: 'row' | 'column';
};
