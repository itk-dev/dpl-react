export default {
  groupModalRenewLoanDeniedMaxRenewalsReachedText: {
    control: {
      type: "text"
    },
    defaultValue: "The item cannot be renewed further "
  },
  groupModalDueDateWarningLoanOverdueText: {
    control: {
      type: "text"
    },
    defaultValue:
      "The due date of return is exceeded, therefore you will be charged a fee, when the item is returned"
  },
  groupModalRenewLoanDeniedReservedText: {
    control: {
      type: "text"
    },
    defaultValue: "The item is reserved by another patron"
  },
  groupModalRenewLoanDeniedInterLibraryLoanText: {
    defaultValue:
      "The item has been lent to you by another library and renewal is therefore conditional of the acceptance by that library",
    control: { type: "text" }
  },
  groupModalLoansCloseModalAriaLabelText: {
    control: {
      type: "text"
    },
    defaultValue: "Close modal with grouped loans"
  },
  groupModalLoansAriaDescriptionText: {
    control: {
      type: "text"
    },
    defaultValue: "This modal makes it possible to renew materials"
  },
  groupModalButtonText: {
    control: {
      type: "text"
    },
    defaultValue: "Renewable (@count)"
  }
};

export interface GroupModalLoansProps {
  groupModalRenewLoanDeniedMaxRenewalsReachedText: string;
  groupModalDueDateWarningLoanOverdueText: string;
  groupModalRenewLoanDeniedReservedText: string;
  groupModalRenewLoanDeniedInterLibraryLoanText: string;
  groupModalLoansCloseModalAriaLabelText: string;
  groupModalLoansAriaDescriptionText: string;
  groupModalButtonText: string;
}
