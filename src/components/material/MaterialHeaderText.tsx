import React from "react";
import { constructSearchUrl } from "../../core/utils/helpers/url";
import { useText } from "../../core/utils/text";
import { useUrls } from "../../core/utils/url";
import { LinkNoStyle } from "../atoms/link-no-style";

interface MaterialHeaderTextProps {
  title: string;
  author: string;
}

const MaterialHeaderText: React.FC<MaterialHeaderTextProps> = ({
  title,
  author
}) => {
  const t = useText();
  const { searchUrl } = useUrls();
  return (
    <>
      <h1 className="text-header-h1 mb-16">{title}</h1>
      <p className="text-body-large">
        <span>{t("materialHeaderAuthorByText")} </span>
        <LinkNoStyle
          url={constructSearchUrl(searchUrl, author)}
          className="arrow__link"
        >
          {author}
        </LinkNoStyle>
      </p>
    </>
  );
};

export default MaterialHeaderText;
