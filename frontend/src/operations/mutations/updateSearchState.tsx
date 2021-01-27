import { ReactiveVar } from "@apollo/client";

export const updateSearchState = (searchState: ReactiveVar<string>) => {
  return (query: string) => {
    searchState(query);
  }
}

export default updateSearchState;