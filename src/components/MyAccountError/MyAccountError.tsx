import { useTranslation } from 'react-i18next';
import Button from 'components/Button';
import { ReactComponent as serverIcon } from 'assets/images/errors/sad_server.svg';
import {
  WrapStyled,
  TitleStyled,
  SubTitleStyled,
  IconStyled,
  DetailsStyled
} from './MyAccountErrorStyled';
import { MyAccountErrorProps } from './MyAccountError.types';

const MyAccountError = ({
  title = '',
  subtitle = '',
  icon = '',
  generalError = false,
  withBorder = false,
  fullHeight = false,
  centered = false,
  margin = '',
  fullWidth = false,
  onClick = () => null,
  isSmallCard = false,
  direction = 'column'
}: MyAccountErrorProps) => {
  const { t } = useTranslation();

  const IconComponent = generalError ? serverIcon : icon;
  return (
    <WrapStyled
      withBorder={withBorder}
      fullHeight={fullHeight}
      centered={centered}
      margin={margin}
      fullWidth={fullWidth}
      onClick={onClick}
      isSmallCard={isSmallCard}
      direction={direction}
    >
      {(icon || generalError) && (
        <IconStyled>
          <IconComponent />
        </IconStyled>
      )}
      <DetailsStyled>
        <TitleStyled>
          {generalError
            ? t('oops-something-went-wrong', 'Oops! Something went wrong.')
            : title}
        </TitleStyled>
        <SubTitleStyled>
          {generalError
            ? t(
                'myaccounterror.try-again',
                'Please try again in a few moments.'
              )
            : subtitle}
        </SubTitleStyled>
      </DetailsStyled>
      {generalError && (
        <Button
          margin="20px auto auto auto"
          width="auto"
          onClickFn={() => window.location.reload()}
        >
          {t('myaccounterror.try-again-button', 'Try again')}
        </Button>
      )}
    </WrapStyled>
  );
};

export default MyAccountError;
