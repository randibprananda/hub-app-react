import { useMutation } from '@tanstack/react-query';

import Api from '../../../Api';
import { Token } from '../../../constants';

export const usePostBannerShopDecoration = ({ onSuccess }) => {
  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await Api.PostShopDecoration(Token, data);

      return response;
    },
    onSuccess,
  });
  return {
    mutate,
  };
};
