import { createContext, FC, useContext, useState } from "react";
import { useRouter } from "next/router";

export enum KeyStages {
  keystage1 = "1",
  keystage2 = "2",
  keystage3 = "3",
  keystage4 = "4",
}
export const ALL_KEY_STAGES = Object.values(KeyStages);
export type KeyStage = `${KeyStages}`;

export type SearchQuery = {
  text: string;
  setText: (text: string) => void;
  keyStages: Set<KeyStage>;
  setKeyStages: (keystage: Set<KeyStage>) => void;
};

export const searchContext = createContext<SearchQuery | null>(null);

export type SearchProviderValue = SearchQuery;
export type SearchProviderProps = {
  children?: React.ReactNode;
  value?: Partial<SearchProviderValue>;
};
export const SearchProvider: FC<SearchProviderProps> = ({
  children,
  value: propsValue,
}) => {
  const {
    query: { term },
  } = useRouter();
  const initialTerm = term && typeof term === "string" ? term : "";
  const [searchText, setSearchText] = useState(initialTerm);
  const [keyStages, setKeyStages] = useState(new Set<KeyStage>());
  const searchQuery: SearchQuery = {
    text: searchText,
    setText: setSearchText,
    keyStages,
    setKeyStages,
  };

  return (
    <searchContext.Provider value={{ ...searchQuery, ...propsValue }}>
      {children}
    </searchContext.Provider>
  );
};

export const useSearchQuery = () => {
  const searchQuery = useContext(searchContext);
  if (!searchQuery) {
    throw new Error("useSearchQuery() called outside of search provider");
  }
  return searchQuery;
};
