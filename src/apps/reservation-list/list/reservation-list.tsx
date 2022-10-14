import React, { useEffect, useState, FC } from "react";
import { useSelector } from "react-redux";
import { useText } from "../../../core/utils/text";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import {
  getReadyForPickup,
  sortByOldestPickupDeadline,
  getReservedDigital,
  getReservedPhysical
} from "../utils/helpers";
import { ModalIdsProps } from "../../../core/utils/modal";
import { useGetV1UserReservations } from "../../../core/publizon/publizon";
import {
  mapFBSReservationToReservationType,
  mapPublizonReservationToReservationType
} from "../../../core/utils/helpers/list-mapper";
import List from "./list";
import ReservationPause from "./reservation-pause";
import {
  useGetPatronInformationByPatronIdV2,
  useGetReservationsV2
} from "../../../core/fbs/fbs";
import { PatronV5 } from "../../../core/fbs/model";

const ReservationList: FC = () => {
  const t = useText();
  const { modalIds } = useSelector((s: ModalIdsProps) => s.modal);

  const { data: userData, refetch: refetchUser } =
    useGetPatronInformationByPatronIdV2();

  // Data fetch
  const { isSuccess, data, refetch: refetchFBS } = useGetReservationsV2();
  const { data: publizonData, refetch: refetchPublizon } =
    useGetV1UserReservations();

  // State
  const [readyForPickupReservationsFBS, setReadyForPickupReservationsFBS] =
    useState<ReservationType[]>([]);

  const [
    readyForPickupReservationsPublizon,
    setReadyForPickupReservationsPublizon
  ] = useState<ReservationType[]>([]);

  const [reservedReservationsFBS, setReservedReservationsFBS] = useState<
    ReservationType[]
  >([]);
  const [user, setUser] = useState<PatronV5 | null>(null);

  const [reservedReservationsPublizon, setReservedReservationsPublizon] =
    useState<ReservationType[]>([]);

  // Set digital reservations
  // The digital "ready for pickup"-reservations are mixed with the
  // physical "ready for pickup"-reservations. The digital
  // "reserved"-reservations have their own list
  useEffect(() => {
    if (publizonData && publizonData.reservations) {
      setReadyForPickupReservationsPublizon(
        getReadyForPickup(
          mapPublizonReservationToReservationType(publizonData.reservations)
        )
      );
      setReservedReservationsPublizon(
        getReservedDigital(
          mapPublizonReservationToReservationType(publizonData.reservations)
        )
      );
    }
  }, [publizonData]);

  useEffect(() => {
    if (userData && userData.patron) {
      setUser(userData.patron);
    }
  }, [userData]);

  // Set digital reservations
  // The physical "ready for pickup"-reservations are mixed with the
  // digital "ready for pickup"-reservations. The physical
  // "reserved"-reservations have their own list
  useEffect(() => {
    if (isSuccess && data) {
      setReadyForPickupReservationsFBS(
        sortByOldestPickupDeadline(
          getReadyForPickup(mapFBSReservationToReservationType(data))
        )
      );
      setReservedReservationsFBS(
        getReservedPhysical(mapFBSReservationToReservationType(data))
      );
    }
  }, [isSuccess, data]);

  useEffect(() => {
    refetchFBS();
    refetchPublizon();
    refetchUser();
  }, [modalIds.length, refetchFBS, refetchPublizon, refetchUser]);

  return (
    <div className="reservation-list-page">
      <h1 className="text-header-h1 m-32">{t("headerText")}</h1>
      <ReservationPause user={user} />
      <List
        header={t("reservationListReadyForPickupTitleText")}
        list={sortByOldestPickupDeadline([
          ...readyForPickupReservationsFBS,
          ...readyForPickupReservationsPublizon
        ])}
      />
      <List
        header={t("reservationListPhysicalReservationsHeaderText")}
        list={reservedReservationsFBS}
      />
      <List
        header={t("reservationListDigitalReservationsHeaderText")}
        list={reservedReservationsPublizon}
      />
    </div>
  );
};

export default ReservationList;
