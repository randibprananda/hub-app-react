import { useQuery } from '@tanstack/react-query';

import Api from '../../Api';

export const useFetchArticle = (id) => {
  const { data, isLoading } = useQuery(['fetch.articles'], async () => {
    const response = await Api.GetArticleById(id);
    return response;
  });

  return {
    data: data?.data,
    isLoading,
  };
};
export const useFetchArticleSlug = (slug) => {
  const { data, isLoading } = useQuery(['fetch.articles'], async () => {
    const response = await Api.GetArticleBySlug(slug);
    return response;
  });

  return {
    data: data?.data,
    isLoading,
  };
};
