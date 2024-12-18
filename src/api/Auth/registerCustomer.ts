import { fetchWithHeaders } from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

type RegisterCustomerPayload = {
  email: string;
  password: string;
  publisherId: string;
  locale: string;
  country: string;
  currency: string;
  captchaValue: string | unknown | null;
};

type RegisterCustomerResponse = {
  responseData?: {
    customerId: number;
    customerToken: string;
    jwt: string;
    refreshToken: string;
  };
  errors: string[];
  code?: string;
  message?: string;
};

const registerCustomer = async ({
  email,
  password,
  publisherId,
  locale,
  country,
  currency,
  captchaValue
}: RegisterCustomerPayload): Promise<RegisterCustomerResponse> => {
  const url = `${getApiURL()}/customers`;

  const resp = await fetchWithHeaders(url, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      publisherId,
      locale,
      country,
      currency,
      captchaValue
    })
  });
  const response: RegisterCustomerResponse = await resp.json();

  return response;
};

export default registerCustomer;
