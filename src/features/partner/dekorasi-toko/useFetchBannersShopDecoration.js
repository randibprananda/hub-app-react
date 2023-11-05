import { useQuery } from '@tanstack/react-query';

import Api from '../../../Api';
import { Token } from '../../../constants/index';

export const useFetchBannersShopDecoration = () => {
  const { data, isLoading, refetch, isError } = useQuery(['fetch.banners', Token], async () => {
    const response = await Api.GetBannersShopDecoration(Token);
    return response;
  });

  return {
    data: data?.data?.banners,
    isLoading,
    refetch,
    isError,
  };
};
