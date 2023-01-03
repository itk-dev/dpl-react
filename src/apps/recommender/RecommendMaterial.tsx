import * as React from "react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import ButtonFavourite, {
  ButtonFavouriteId
} from "../../components/button-favourite/button-favourite";
import { Cover } from "../../components/cover/cover";
import { Work } from "../../core/utils/types/entities";
import { getContributors } from "../../core/fetchers/helpers";
import { getManifestationPid } from "../../core/utils/helpers/general";
import { TypedDispatch } from "../../core/store";
import { guardedRequest } from "../../core/guardedRequests.slice";
import { constructMaterialUrl } from "../../core/utils/helpers/url";
import { Link } from "../../components/atoms/link";
import { useUrls } from "../../core/utils/url";

export interface RecommendMaterialProps {
  work: Work;
}

const RecommendMaterial: FC<RecommendMaterialProps> = ({
  work: {
    titles: { full: title },
    creators,
    workId,
    manifestations: { all: manifestations }
  }
}) => {
  const dispatch = useDispatch<TypedDispatch>();
  const { materialUrl } = useUrls();
  const materialFullUrl = constructMaterialUrl(materialUrl, workId);

  // Create authors string
  let authors = null;
  const inputContributorsArray = creators?.map(({ display }) => display);
  if (inputContributorsArray) {
    authors = getContributors(inputContributorsArray);
  }

  // For retrieving cover
  const manifestationPid = getManifestationPid(manifestations);

  const addToListRequest = (materialId: ButtonFavouriteId) => {
    dispatch(
      guardedRequest({
        type: "addFavorite",
        args: { materialId },
        app: "search-result"
      })
    );
  };

  return (
    <Link href={materialFullUrl}>
      <div className="recommender__grid__material">
        <Cover animate size="medium" id={manifestationPid} />
        <ButtonFavourite id={workId} addToListRequest={addToListRequest} />
        <div className="recommender__grid__material__text">
          <div className="recommender__grid__material__text__title">
            {String(title)}
          </div>
          <div className="recommender__grid__material__text__author">
            {authors}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecommendMaterial;
