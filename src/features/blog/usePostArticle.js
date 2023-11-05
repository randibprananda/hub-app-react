import { useMutation } from '@tanstack/react-query';
import Api from '../../Api';
import { Token } from '../../constants/index';

export const usePostArticle = ({ onSuccess }) => {
  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await Api.PostArticle(Token, data);

      return response;
    },
    onSuccess,
  });
  return {
    mutate,
  };
};
