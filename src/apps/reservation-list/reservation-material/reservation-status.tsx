import React, { FC, ReactNode, useCallback } from "react";
import Arrow from "../../../components/atoms/icons/arrow/arrow";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import StatusCircleIcon from "../../loan-list/materials/utils/status-circle-icon";

interface ReservationStatusProps {
  reservationInfo: ReservationType;
  openReservationDetailsModal: (reservation: ReservationType) => void;
  color?: string;
  percent: number;
  infoLabel?: string;
  label: string | string[];
  children: ReactNode;
}

const ReservationStatus: FC<ReservationStatusProps> = ({
  reservationInfo,
  openReservationDetailsModal,
  color,
  percent,
  infoLabel,
  label,
  children
}) => {
  const notificationClickEventHandler = useCallback(() => {
    if (openReservationDetailsModal && reservationInfo) {
      openReservationDetailsModal(reservationInfo);
    }
  }, [openReservationDetailsModal, reservationInfo]);
  return (
    <div className="list-reservation__status">
      <div className="list-reservation__counter color-secondary-gray">
        <StatusCircleIcon color={color} percent={percent}>
          {children}
        </StatusCircleIcon>
      </div>
      <div>
        <div className="list-reservation__deadline">
          {infoLabel && (
            <div className="status-label status-label--info">{infoLabel}</div>
          )}
          {typeof label === "string" && (
            <p className="text-small-caption">{label}</p>
          )}
          {typeof label !== "string" &&
            label.map((localLabel) => {
              return <p className="text-small-caption">{localLabel}</p>;
            })}
        </div>
      </div>
      <button
        style={{ cursor: "pointer" }}
        type="button"
        onClick={(e) => notificationClickEventHandler()}
      >
        <Arrow />
      </button>
    </div>
  );
};

export default ReservationStatus;
