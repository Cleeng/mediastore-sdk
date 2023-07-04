import SkeletonWrapper from 'components/SkeletonWrapper';
import Card from 'components/Card';
import {
  CardStyled,
  CardTypeStyled,
  CardExpirationStyled,
  CardInfoStyled,
  CardDetailsStyled,
  CardDetailsNameStyled,
  CardDetailsNameWrapStyled,
  CardInfoWrapStyled
} from './PaymentCardSkeletonStyled';

const PaymentCardSkeleton = () => (
  <Card withBorder>
    <CardStyled>
      <CardInfoWrapStyled>
        <CardInfoStyled>
          <CardTypeStyled>
            <SkeletonWrapper height={16} width={28} />
          </CardTypeStyled>
          <CardDetailsStyled>
            <CardDetailsNameWrapStyled>
              <CardDetailsNameStyled>
                <SkeletonWrapper width={140} />
              </CardDetailsNameStyled>
            </CardDetailsNameWrapStyled>
            <CardExpirationStyled>
              <SkeletonWrapper width={100} />
            </CardExpirationStyled>
          </CardDetailsStyled>
        </CardInfoStyled>
        <SkeletonWrapper height={43} width={170} />
      </CardInfoWrapStyled>
    </CardStyled>
  </Card>
);

export default PaymentCardSkeleton;
