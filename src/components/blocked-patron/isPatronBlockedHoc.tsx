import React, { useEffect, useState, ComponentType, FC } from "react";
import { useGetPatronInformationByPatronIdV2 } from "../../core/fbs/fbs";
import BlockedModal from "./blocked-modal/BlockedModal";
import { AuthenticatedPatronV6 } from "../../core/fbs/model";
import { useModalButtonHandler } from "../../core/utils/modal";
import { getModalIds } from "../../core/utils/helpers/general";

export interface PatronProps {
  patron: AuthenticatedPatronV6 | null | undefined;
}

// Hoc that determines if a patron is blocked and provides a modal with
// and explanation for the user.
const isPatronBlockedHoc =
  <P extends object>(Component: ComponentType<P & PatronProps>): FC<P> =>
  ({ ...props }) => {
    const { open } = useModalButtonHandler();
    const { blockedModal } = getModalIds();
    const [patron, setPatron] = useState<AuthenticatedPatronV6>();
    const [blockedStatus, setBlockedStatus] = useState<string>();
    const { data: patronData } = useGetPatronInformationByPatronIdV2();

    useEffect(() => {
      if (patronData) {
        setPatron(patronData);
        if (
          patronData?.patron?.blockStatus &&
          patronData?.patron?.blockStatus?.length > 0
        ) {
          setBlockedStatus(patronData.patron.blockStatus[0].blockedReason);
          open(blockedModal as string);
        }
      }
    }, [blockedModal, open, patronData]);

    return (
      <>
        <BlockedModal blockedStatus={blockedStatus || ""} />
        <Component
          patron={patron}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...(props as P)}
        />
      </>
    );
  };

export default isPatronBlockedHoc;
