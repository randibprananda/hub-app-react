import { useQuery } from '@tanstack/react-query';

import Api from '../../../Api';
import { Token } from '../../../constants';

export const useFetchBannerImages = () => {
  const { data, isLoading, refetch } = useQuery(['fetch.partner-banner-images', Token], async () => {
    const response = await Api.GetBannerImagesShopDecoration(Token);
    return response;
  });

  return {
    data: data?.data,
    isLoading,
    refetch,
  };
};
