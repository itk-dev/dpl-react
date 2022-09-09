import React, { FC } from "react";
import LoanList from "./loan-list";
import { withText } from "../../../core/utils/text";

export interface LoanListEntryProps {
  loanListTitleText: string;
  loanListPhysicalLoansTitleText: string;
  loanListDigitalLoansTitleText: string;
  loanListDigitalLoansEmptyListText: string;
  loanListDigitalPhysicalLoansEmptyListText: string;
  loanListPhysicalLoansEmptyListText: string;
  loanListRenewMultipleButtonText: string;
  loanListListText: string;
  loanListStackText: string;
  loanListRenewMultipleButtonExplanationText: string;
  loanListLateFeeDesktopText: string;
  loanListLateFeeMobileText: string;
  loanListDaysText: string;
  LoanListToBeDeliveredText: string;
  loanListToBeDeliveredDigitalMaterialText: string;
  LoanListMaterialsDesktopText: string;
  LoanListMaterialsMobileText: string;
  loanListMaterialsModalDesktopText: string;
  loanListMaterialsModalMobileText: string;
  loanListStatusCircleAriaLabelText: string;
  loanListStatusBadgeDangerText: string;
  loanListStatusBadgeWarningText: string;
  LoanListDeniedMaxRenewalsReachedText: string;
  LoanListDeniedOtherReasonText: string;
  LoanListDeniedInterLibraryLoanText: string;
  LoanListToBeDeliveredMaterialText: string;
  LoanListLabelCheckboxMaterialModalText: string;
  LoanListCloseModalText: string;
  LoanListModalDescriptionText: string;
  MaterialDetailsModalOverdueText: string;
  materialDetailsOverdueText: string;
  loanListMaterialByAuthorText: string;
  loanModalMaterialByAuthorText: string;
  materialDetailsByAuthorText: string;
  loanListMaterialAndAuthorText: string;
  loanModalMaterialAndAuthorText: string;
  materialDetailsAndAuthorText: string;
  dueDateRenewLoanModalHeaderText: string;
  renewLoanModalHeaderText: string;
  renewLoanModalCloseModalText: string;
  dueDateRenewLoanCloseModalText: string;
  materialDetailsCloseModalText: string;
  renewLoanModalDescriptionText: string;
  dueDateRenewLoanModalDescriptionText: string;
  materialDetailsModalDescriptionText: string;
  materialDetailsRenewLoanButtonText: string;
  materialDetailsLinkToPageWithFeesText: string;
  materialDetailsHandInLabelText: string;
  materialDetailsLoanDateLabelText: string;
  materialDetailsMaterialNumberLabelText: string;
  renewLoanModalCheckboxText: string;
  renewLoanModalButtonText: string;
  dueDateRenewLoanModalCheckboxText: string;
  dueDateRenewLoanModalButtonText: string;
  dueDateWarningLoanOverdueText: string;
  dueDateLinkToPageWithFeesText: string;
  bottomRenewLoanModalCheckboxText: string;
  bottomDueDateRenewLoanModalCheckboxText: string;
  bottomRenewLoanModalButtonText: string;
  bottomDueDateRenewLoanModalButtonText: string;
}

const LoanListEntry: FC<LoanListEntryProps> = () => <LoanList />;

export default withText(LoanListEntry);
