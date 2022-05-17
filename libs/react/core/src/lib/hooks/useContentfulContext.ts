import { useContext } from 'react';
import { ContentfulContext } from '../contexts';

export const useContentfulContext = () => {
  const context = useContext(ContentfulContext);
  if (!context) {
    throw new Error(
      'Make sure to only call useContentful within <ContentfulProvider>'
    );
  }
  return context;
};
