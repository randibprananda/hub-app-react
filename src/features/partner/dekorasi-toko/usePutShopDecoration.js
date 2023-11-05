import { useMutation } from '@tanstack/react-query';

import Api from '../../../Api';
import { Token } from '../../../constants/index';

export const usePutShopDecoration = ({ onSuccess }) => {
  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await Api.PutShopDecoration(Token, data);

      return response;
    },
    onSuccess,
  });
  return {
    mutate,
  };
};
