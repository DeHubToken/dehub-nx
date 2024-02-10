import React, { createContext, PropsWithChildren } from 'react';

interface EnvironmentContextValue {
  baseUrl: string;
}

const EnvironmentContext = createContext<undefined | EnvironmentContextValue>(
  undefined
);

interface EnvironmentProviderProps extends PropsWithChildren<unknown> {
  baseUrl: string;
}

const EnvironmentProvider: React.FC<EnvironmentProviderProps> = ({
  children,
  baseUrl = '/',
}) => {
  return (
    <EnvironmentContext.Provider
      value={{
        baseUrl,
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
};

export { EnvironmentContext, EnvironmentProvider };
