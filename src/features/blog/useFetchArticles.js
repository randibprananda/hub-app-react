import { useQuery } from '@tanstack/react-query';

import Api from '../../Api';
import { Token } from '../../constants/index';

export const useFetchArticles = (category, search, isActive, sort, page, limit) => {
  const { data, isLoading, refetch } = useQuery(
    ['fetch.articles', Token, category, search, isActive, sort, page, limit],
    async () => {
      const response = await Api.GetArticles(Token, category, search, isActive, sort, page, limit);
      return response;
    },
  );

  return {
    data: data?.data?.pagination,
    isLoading,
    refetch,
  };
};
