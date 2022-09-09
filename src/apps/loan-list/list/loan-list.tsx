import React, { useEffect, useState, useCallback, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetLoansV2 } from "../../../core/fbs/fbs";
import { GetMaterialManifestationQuery } from "../../../core/dbc-gateway/generated/graphql";
import { openModal } from "../../../core/modal.slice";
import dateMatchesUsFormat from "../../../core/utils/helpers/date";
import {
  isAModalDisplayed,
  getDueDatesLoan,
  sortByLoanDate,
  getDueDatesForModal
} from "../../../core/utils/helpers/general";
import { getUrlQueryParam } from "../../../core/utils/helpers/url";
import { useText } from "../../../core/utils/text";
import DueDateLoansModal from "../modal/due-date-loans-modal";
import {
  queryMatchesFaust,
  mapLoanPublizonToLoanMetaDataType,
  mapLoanPBSToLoanMetaDataType
} from "../utils/helpers";
import { ModalIdsProps } from "../../../core/utils/modal";
import MaterialDetailsModal from "../modal/material-details-modal";
import RenewLoansModal from "../modal/renew-loans-modal";
import modalIdsConf from "../../../core/configuration/modal-ids.json";
import List from "./list";
import { useGetV1UserLoans } from "../../../core/publizon/publizon";
import { LoanMetaDataType } from "../../../core/utils/helpers/LoanMetaDataType";
import { ListView } from "../../../core/utils/types/list-view";

const LoanList: FC = () => {
  const dispatch = useDispatch();
  const t = useText();
  const [view, setView] = useState<string>("list");
  const [physicalLoans, setPhysicalLoans] = useState<LoanMetaDataType[]>([]);
  const [allPhysicalLoans, setAllPhysicalLoans] = useState<LoanMetaDataType[]>(
    []
  );
  const [digitalLoans, setDigitalLoans] = useState<LoanMetaDataType[]>([]);
  const [allDigitalLoans, setAllDigitalLoans] = useState<LoanMetaDataType[]>(
    []
  );
  const [physicalLoansDueDates, setPhysicalLoansDueDates] = useState<string[]>(
    []
  );
  const [digitalLoansDueDates, setDigitalLoansDueDates] = useState<string[]>(
    []
  );
  const [modalMaterial, setModalMaterial] = useState<
    GetMaterialManifestationQuery | null | undefined
  >(null);
  const [modalLoanDetails, setModalLoanDetails] =
    useState<LoanMetaDataType | null>(null);
  const [dueDateModal, setDueDateModal] = useState<string>("");
  const [loansModal, setLoansModal] = useState<LoanMetaDataType[]>();
  const [displayList, setDisplayList] = useState<boolean>(false);
  const { isSuccess, data, refetch } = useGetLoansV2();
  const { data: publizonData } = useGetV1UserLoans();
  const { modalIds } = useSelector((s: ModalIdsProps) => s.modal);

  useEffect(() => {
    if (isSuccess && data) {
      const mapToLoanMetaDataType = mapLoanPBSToLoanMetaDataType(data);
      setAllPhysicalLoans(mapToLoanMetaDataType);

      // The due dates are used for the stacked materials
      // The stacked materials view shows materials stacked by
      // due date, and for this we need a unique list of due dates
      setPhysicalLoansDueDates(getDueDatesLoan(mapToLoanMetaDataType));

      // Loans are sorted by loan date
      const sortedByLoanDate = sortByLoanDate(mapToLoanMetaDataType);

      setPhysicalLoans(sortedByLoanDate);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (publizonData?.loans) {
      const mapToLoanMetaDataType = mapLoanPublizonToLoanMetaDataType(
        publizonData.loans
      );
      setAllDigitalLoans(mapToLoanMetaDataType);

      // Loans are sorted by loan date
      const sortedByLoanDate = sortByLoanDate(mapToLoanMetaDataType);

      setDigitalLoans(sortedByLoanDate);

      // The due dates are used for the stacked materials
      // The stacked materials view shows materials stacked by
      // due date, and for this we need a unique list of due dates
      setDigitalLoansDueDates(getDueDatesLoan(sortedByLoanDate));
    }
  }, [publizonData]);

  const selectModalMaterial = ({
    material,
    loanMetaData
  }: {
    material: GetMaterialManifestationQuery | undefined | null;
    loanMetaData: LoanMetaDataType;
  }) => {
    setModalMaterial(material);
    setModalLoanDetails(loanMetaData);
  };

  useEffect(() => {
    setDisplayList(true);
    if (isAModalDisplayed(modalIds)) {
      refetch();
      setDisplayList(false);
    }
  }, [modalIds, modalIds?.length, refetch]);

  const openModalDueDate = useCallback(
    (id: string, dueDateModalInput?: string) => {
      if (dueDateModalInput) {
        const isClickedLoanPhysical = physicalLoans?.find(
          (loan) => loan.id === id
        );
        const isClickedLoanDigital = digitalLoans?.find(
          (loan) => loan.id === id
        );
        setDueDateModal(dueDateModalInput);

        if (physicalLoans && isClickedLoanPhysical) {
          // The loans are filtered with said date string
          const loansForModal = getDueDatesForModal(
            physicalLoans,
            dueDateModalInput
          );

          // Loans for modal (the modal shows loans stacked by due date)
          setLoansModal(loansForModal);
        } else if (digitalLoans && isClickedLoanDigital) {
          // The loans are filtered with said date string
          const loansForModal = getDueDatesForModal(
            digitalLoans,
            dueDateModalInput
          );
          // Loans for modal (the modal shows loans stacked by due date)
          setLoansModal(loansForModal);
        }
      }
    },
    [digitalLoans, physicalLoans]
  );

  const openRenewLoansModal = useCallback(() => {
    if (physicalLoans) {
      // Loans for modal (the modal shows loans stacked by due date)
      setLoansModal(physicalLoans);

      dispatch(openModal({ modalId: modalIdsConf.allLoansId }));
    }
  }, [physicalLoans, dispatch]);

  useEffect(() => {
    const modalString = getUrlQueryParam("modal");

    // modal query param: due date modal date
    const dateFound = dateMatchesUsFormat(modalString);
    if (modalString && physicalLoans && dateFound) {
      openModalDueDate(dateFound);
      return;
    }

    // modal query param: details modal faust
    const faustFound = queryMatchesFaust(modalString);

    if (modalString && faustFound && physicalLoans) {
      const loanDetailsForModal = physicalLoans.filter(
        ({ id }) => id === faustFound
      );
      setModalLoanDetails(loanDetailsForModal[0]);
      dispatch(openModal({ modalId: faustFound }));
      return;
    }
    // modal query param: modal loans all
    if (modalString === modalIdsConf.allLoansId) {
      dispatch(openModal({ modalId: modalIdsConf.allLoansId }));
    }
  }, [physicalLoans, openModalDueDate, dispatch]);

  return (
    <>
      {/* only display the list when a modal is not open. this is to do with accessibility, 
      so the screen reader does not focus on focusable inputs in the list while a modal is open. */}
      <h1 className="text-header-h1 m-32">{t("loanListTitleText")}</h1>
      {displayList &&
        (digitalLoans?.length !== 0 || physicalLoans.length !== 0) && (
          <>
            <List
              header={t("loanListPhysicalLoansTitleText")}
              emptyListLabel={t("loanListPhysicalLoansEmptyListText")}
              openRenewLoansModal={openRenewLoansModal}
              openModalDueDate={openModalDueDate}
              selectModalMaterial={selectModalMaterial}
              loans={physicalLoans}
              dueDates={physicalLoansDueDates}
              allLoansLength={allPhysicalLoans.length}
              setView={setView}
              view={view as ListView}
              dueDateLabel={t("LoanListToBeDeliveredText")}
            />
            <List
              header={t("loanListDigitalLoansTitleText")}
              emptyListLabel={t("loanListDigitalLoansEmptyListText")}
              openRenewLoansModal={openRenewLoansModal}
              openModalDueDate={openModalDueDate}
              selectModalMaterial={selectModalMaterial}
              loans={digitalLoans}
              dueDates={digitalLoansDueDates}
              allLoansLength={allDigitalLoans.length}
              view={view as ListView}
              dueDateLabel={t("loanListToBeDeliveredDigitalMaterialText")}
            />
          </>
        )}
      {digitalLoans?.length === 0 && physicalLoans?.length === 0 && (
        <div className="dpl-list-empty">
          {t("loanListDigitalPhysicalLoansEmptyListText")}
        </div>
      )}
      {modalLoanDetails && (
        <MaterialDetailsModal
          loanMetaData={modalLoanDetails}
          material={modalMaterial}
        />
      )}
      {loansModal && (
        <DueDateLoansModal dueDate={dueDateModal} loansModal={loansModal} />
      )}
      {physicalLoans && <RenewLoansModal loansModal={physicalLoans} />}
    </>
  );
};

export default LoanList;
