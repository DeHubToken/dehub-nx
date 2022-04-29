import { useContext } from 'react';
import { ContentfulConext } from '../contexts';

export const useContentful = () => {
  const context = useContext(ContentfulConext);
  if (!context) {
    throw new Error(
      'Make sure to only call useContentful within <ContentfulProvider>'
    );
  }
  return context;
};
