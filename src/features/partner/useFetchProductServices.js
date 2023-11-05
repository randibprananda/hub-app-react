import { useQuery } from '@tanstack/react-query';

import Api from '../../Api';
import { Token } from '../../constants/index';

export const useFetchProductServices = (partnerId, filter, category) => {
  const { data, isLoading, refetch } = useQuery(['fetch.product-services', Token, partnerId, filter], async () => {
    const response = await Api.PartnerGetServiceData(Token, partnerId, filter, category);
    return response;
  });

  return {
    data: data?.data?.services?.data,
    isLoading,
    refetch,
  };
};
