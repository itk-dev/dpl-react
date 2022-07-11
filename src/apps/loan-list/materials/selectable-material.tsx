import React from "react";
import dayjs from "dayjs";
import { useText } from "../../../core/utils/text";

interface SelectableMaterialProps {
  faust: string;
  dueDate: string;
  renewableStatus?: string[];
  loanType?: string;
  getAuthorName: Function;
  material: {
    description: string;
    fullTitle: string;
    datePublished: string;
    materialType: string;
    creators: {
      __typename?: "Creator" | undefined;
      name: string;
    }[];
  };
}

const SelectableMaterial: React.FC<SelectableMaterialProps> = ({
  faust,
  dueDate,
  renewableStatus,
  loanType,
  material,
  getAuthorName
}) => {
  const t = useText();

  return (
    <>
      {material && (
        <li>
          <div className="list-materials">
            {/* todo make fixed in design system  */}
            <div className="list-materials__checkbox mr-32">
              <div className="checkbox">
                <input id={faust} className="checkbox__input" type="checkbox" />
                <label className="checkbox__label" htmlFor={faust}>
                  <span className="checkbox__icon">
                    <svg width="20px" height="20px">
                      <polyline
                        points="1.5 6 4.5 9 10.5 1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></polyline>
                    </svg>
                  </span>
                </label>
              </div>
            </div>
            <div className="list-materials__content">
              <div className="list-materials__content-status">
                <div className="status-label status-label--outline ">
                  {material.materialType}
                </div>
              </div>
              <p className="text-header-h5 mt-8">{material.fullTitle}</p>
              <p className="text-small-caption">
                {material.creators.length > 0 &&
                  getAuthorName(material.creators)}
                {material.datePublished && <> ({material.datePublished})</>}
              </p>
            </div>
            <div className="list-materials__status">
              <span className="text-small-caption">
                {renewableStatus.includes("deniedMaxRenewalsReached") && (
                  <>{t("LoanListDeniedMaxRenewalsReachedText")}</>
                )}
                {renewableStatus.includes("deniedReserved") && (
                  <> {t("LoanListDeniedOtherReasonText")}</>
                )}
                {/* todo "Lånet er fornyet i dag" -> this information lacking in fbs */}
                {loanType === "interLibraryLoan" && (
                  <>{t("LoanListDeniedInterLibraryLoanText")}</>
                )}
                {/* todo “Lånet er fornyet i dag”, hvis lånet er fornyet samme dag */}
              </span>
              {/* todo add color in design system */}
              <div className="status-label status-label--info">
                {t("LoanListToBeDeliveredMaterialText")}{" "}
                {dayjs(dueDate).format("DD-MM-YYYY")}
              </div>
            </div>
          </div>
        </li>
      )}
    </>
  );
};

export default SelectableMaterial;
