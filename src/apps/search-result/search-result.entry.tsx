import * as React from "react";
import { getUrlQueryParam } from "../../core/utils/helpers";
import {
  getPageSize,
  getPageSizeFromConfiguration,
  getPageSizeFromDataAttributes
} from "./helpers";
import SearchResult from "./search-result";

export interface SearchResultEntryProps {
  q?: string;
  pageSizeDesktop?: number;
  pageSizeMobile?: number;
}

const SearchResultEntry: React.FC<SearchResultEntryProps> = ({
  q: attrQ,
  pageSizeDesktop: attrPageSizeDesktop,
  pageSizeMobile: attrPageSizeMobile
}) => {
  // If a q string has been defined as a data attribute use that
  // otherwise use the one from the url query parameter.
  const searchQuery = attrQ || (getUrlQueryParam() as string);
  // Get number of result items to be shown.
  // If the number of items has been defined with data attributes use those
  // otherwise get them from the configuration.
  let pageSize = 0;
  if (attrPageSizeDesktop && attrPageSizeMobile) {
    pageSize = getPageSizeFromDataAttributes({
      desktop: attrPageSizeDesktop,
      mobile: attrPageSizeMobile
    });
  } else {
    pageSize = getPageSizeFromConfiguration();
  }

  return (
    <div>
      {searchQuery && <SearchResult q={searchQuery} pageSize={pageSize} />}
    </div>
  );
};

export default SearchResultEntry;
