import React, { useCallback, FC } from "react";
import MaterialOverdueLink from "./material-overdue-link";
import AdditionalMaterialsButton from "./additional-materials-button";
import MaterialInfo from "./material-info";
import fetchMaterial, { MaterialProps } from "../utils/material-fetch-hoc";
import { LoanType } from "../../../../core/utils/types/loan-type";
import fetchDigitalMaterial from "../utils/digital-material-fetch-hoc";
import MaterialStatus from "./material-status";
import { LoanId } from "../../../../core/utils/types/ids";

export interface StackableMaterialProps {
  loan: LoanType;
  additionalMaterials: number;
  openLoanDetailsModal: (modalId: string) => void;
  openDueDateModal?: (dueDate: string) => void;
  focused: boolean;
  loanId?: LoanId | null;
}

const StackableMaterial: FC<StackableMaterialProps & MaterialProps> = ({
  additionalMaterials,
  material,
  loan,
  openDueDateModal,
  openLoanDetailsModal,
  focused,
  loanId
}) => {
  const { dueDate, identifier, periodical } = loan;

  const openLoanDetailsModalHandler = useCallback(() => {
    if (loanId) {
      openLoanDetailsModal(String(loanId));
    }
    if (identifier) {
      openLoanDetailsModal(identifier);
    }
  }, [loanId, identifier, openLoanDetailsModal]);

  return (
    <div
      className={`list-reservation my-32 ${
        additionalMaterials > 0 ? "list-reservation--stacked" : ""
      }`}
    >
      {material && (
        <MaterialInfo
          openDetailsModal={openLoanDetailsModalHandler}
          periodical={periodical}
          material={material}
          focused={focused}
          isbnForCover={identifier || ""}
        >
          <AdditionalMaterialsButton
            showOn="desktop"
            openDueDateModal={() =>
              openDueDateModal && dueDate && openDueDateModal(dueDate)
            }
            additionalMaterials={additionalMaterials}
          />
          <MaterialOverdueLink showOn="desktop" dueDate={dueDate} />
        </MaterialInfo>
      )}
      <MaterialStatus
        loan={loan}
        openDetailsModal={openLoanDetailsModal}
        openDueDateModal={() =>
          openDueDateModal && dueDate && openDueDateModal(dueDate)
        }
        additionalMaterials={additionalMaterials}
      >
        <AdditionalMaterialsButton
          showOn="mobile"
          openDueDateModal={() =>
            openDueDateModal && dueDate && openDueDateModal(dueDate)
          }
          additionalMaterials={additionalMaterials}
        />
        <MaterialOverdueLink showOn="mobile" dueDate={dueDate} />
      </MaterialStatus>
    </div>
  );
};

export default fetchDigitalMaterial(fetchMaterial(StackableMaterial));
