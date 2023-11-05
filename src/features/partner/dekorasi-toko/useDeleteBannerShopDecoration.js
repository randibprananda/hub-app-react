import { useMutation } from '@tanstack/react-query';

import Api from '../../../Api';
import { Token } from '../../../constants';

export const useDeleteBannerShopDecoration = ({ onSuccess }) => {
  const { mutate } = useMutation({
    mutationFn: async (bannerId) => {
      const response = await Api.DeleteBannerShopDecoration(Token, bannerId);

      return response;
    },
    onSuccess,
  });
  return {
    mutate,
  };
};
