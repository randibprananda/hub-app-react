import { useMutation } from '@tanstack/react-query';
import Api from '../../Api';
import { Token } from '../../constants/index';

export const useDeleteArticle = ({ onSuccess }) => {
  const { mutate } = useMutation({
    mutationFn: async (id) => {
      const response = await Api.DeleteArticle(Token, id);

      return response;
    },
    onSuccess,
  });
  return {
    mutate,
  };
};
