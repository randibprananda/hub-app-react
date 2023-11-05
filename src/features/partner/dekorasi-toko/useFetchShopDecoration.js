import { useQuery } from '@tanstack/react-query';

import Api from '../../../Api';
import { Token } from '../../../constants/index';

export const useFetchShopDecoration = () => {
  const { data, isLoading, refetch } = useQuery(['fetch.partner-decoration', Token], async () => {
    const response = await Api.GetShopDecoration(Token);
    return response;
  });

  return {
    data: data?.data?.updated_shop_decoration,
    isLoading,
    refetch,
  };
};
