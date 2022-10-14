import React, { FC, ReactNode } from "react";
import { Cover } from "../../../../components/cover/cover";
import { BasicDetailsType } from "../../../../core/utils/types/basic-details-type";

interface MaterialInfoProps {
  material: BasicDetailsType;
  isbnForCover: string;
  children?: ReactNode;
}

const MaterialInfo: FC<MaterialInfoProps> = ({
  material,
  isbnForCover,
  children
}) => {
  const { authors, materialType, year, title, description, pid } =
    material || {};
  const coverId = pid || isbnForCover;

  return (
    <div className="list-reservation__material">
      <div>
        <Cover
          id={coverId}
          idType={pid ? "pid" : "isbn"}
          size="small"
          animate={false}
          description={description || ""}
        />
      </div>
      <div className="list-reservation__information">
        <div>
          <div className="status-label status-label--outline">
            {materialType}
          </div>
        </div>
        <div className="list-reservation__about">
          <h3 className="text-header-h4">{title}</h3>
          <p
            className="text-small-caption color-secondary-gray"
            id="test-list-authors"
          >
            {authors}
            {year && <>({year})</>}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default MaterialInfo;
