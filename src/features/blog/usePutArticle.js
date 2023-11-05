import { useMutation } from '@tanstack/react-query';

import Api from '../../Api';
import { Token } from '../../constants/index';

export const usePutArticle = ({ onSuccess, data, id }) => {
  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = await Api.PutArticle(Token, data, id);

      return response;
    },
    onSuccess,
  });
  return {
    mutate,
  };
};
