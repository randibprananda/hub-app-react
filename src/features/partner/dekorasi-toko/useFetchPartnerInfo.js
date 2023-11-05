import { useQuery } from '@tanstack/react-query';

import Api from '../../../Api';
import { Token } from '../../../constants/index';

export const useFetchPartnerShopDecorationInfo = (partnerId) => {
  const { data, isLoading, refetch } = useQuery(['fetch.partner-decoration-info', Token, partnerId], async () => {
    const response = await Api.GetPartnerShopDecorationInfo(Token, partnerId);
    return response;
  });

  return {
    data: data?.data?.data,
    isLoading,
    refetch,
  };
};
