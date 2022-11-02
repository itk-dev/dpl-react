import React, { useEffect, useState } from "react";
import SearchResultHeader from "../../components/search-bar/search-result-header/SearchResultHeader";
import usePager from "../../components/result-pager/use-pager";
import SearchResultList from "../../components/search-result-list/SearchResultList";
import {
  FacetField,
  SearchWithPaginationQuery,
  useSearchFacetQuery,
  useSearchWithPaginationQuery
} from "../../core/dbc-gateway/generated/graphql";
import { Work } from "../../core/utils/types/entities";
import { useConfig } from "../../core/utils/config";
import { AgencyBranch } from "../../core/fbs/model";
import {
  excludeBlacklistedBranches,
  cleanBranchesId
} from "../../components/reservation/helper";
import useFilterHandler from "./useFilterHandler";
import { TagOnclickHandler } from "./types";
import FacetBrowserModal from "../../components/facet-browser/FacetBrowserModal";
import { useCampaignMatchPOST } from "../../core/dpl-cms/dpl-cms";
import {
  CampaignMatchPOST200,
  CampaignMatchPOSTBodyItem
} from "../../core/dpl-cms/model";
import { isObjectEmpty } from "../../core/utils/helpers/general";
import { formatFilters } from "./helpers";
import Campaign from "../../components/campaign/Campaign";

interface SearchResultProps {
  q: string;
  pageSize: number;
}

export const allFacetFields = [
  FacetField.MainLanguages,
  FacetField.AccessTypes,
  FacetField.ChildrenOrAdults,
  FacetField.Creators,
  FacetField.FictionNonfiction,
  FacetField.FictionalCharacter,
  FacetField.GenreAndForm,
  FacetField.MaterialTypes,
  FacetField.Subjects,
  FacetField.WorkTypes
];

const SearchResult: React.FC<SearchResultProps> = ({ q, pageSize }) => {
  const config = useConfig();
  const branches = config<AgencyBranch[]>("branchesConfig", {
    transformer: "jsonParse"
  });
  const blacklistBranches = config("blacklistedSearchBranchesConfig", {
    transformer: "stringToArray"
  });
  const whitelistBranches = excludeBlacklistedBranches(
    branches,
    blacklistBranches
  );
  const cleanBranches = cleanBranchesId(whitelistBranches);
  const [resultItems, setResultItems] = useState<Work[]>([]);
  const [hitcount, setHitCount] = useState<number>(0);
  const { PagerComponent, page, resetPager } = usePager(hitcount, pageSize);
  const { filters, filterHandler } = useFilterHandler();
  const { mutate } = useCampaignMatchPOST();
  const [campaignData, setCampaignData] = useState<CampaignMatchPOST200 | null>(
    null
  );
  const filteringHandler: TagOnclickHandler = (filterInfo) => {
    filterHandler(filterInfo);
    resetPager();
  };
  const { data } = useSearchFacetQuery({
    q: { all: q },
    facets: allFacetFields,
    facetLimit: 10,
    ...(isObjectEmpty(filters)
      ? {}
      : { filters: { ...formatFilters(filters) } })
  });

  // If q changes (eg. in Storybook context)
  //  then make sure that we reset the entire result set.
  useEffect(() => {
    setResultItems([]);
  }, [q, pageSize, filters]);

  useEffect(() => {
    if (data) {
      mutate(
        {
          data: data.search.facets as CampaignMatchPOSTBodyItem[]
        },
        {
          onSuccess: (campaign) => {
            setCampaignData(campaign);
          },
          onError: () => {
            // TODO: when we handle errors - handle this error
          }
        }
      );
    }
  }, [mutate, data]);

  useSearchWithPaginationQuery(
    {
      q: { all: q },
      offset: page * pageSize,
      limit: pageSize,
      ...(cleanBranches
        ? {
            filters: {
              branchId: cleanBranches
            }
          }
        : {})
    },
    {
      staleTime: 0,
      onSuccess: (result) => {
        const {
          search: { works: resultWorks, hitcount: resultCount }
        } = result as {
          search: {
            works: Work[];
            hitcount: SearchWithPaginationQuery["search"]["hitcount"];
          };
        };

        setHitCount(resultCount);

        setResultItems([...resultItems, ...resultWorks]);
      }
    }
  );

  const worksAreLoaded = Boolean(resultItems.length);

  return (
    <div className="search-result-page">
      {worksAreLoaded && (
        <>
          <SearchResultHeader hitcount={String(hitcount)} q={q} />
          {campaignData && campaignData.data && (
            <Campaign campaignData={campaignData.data} />
          )}
          <SearchResultList resultItems={resultItems} />
          {PagerComponent}
        </>
      )}
      <FacetBrowserModal
        q={q}
        filters={filters}
        filterHandler={filteringHandler}
      />
    </div>
  );
};

export default SearchResult;
