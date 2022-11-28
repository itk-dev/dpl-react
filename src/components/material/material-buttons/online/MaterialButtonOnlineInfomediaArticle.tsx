import * as React from "react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../core/modal.slice";
import { getToken, TOKEN_USER_KEY } from "../../../../core/token";
import {
  appendQueryParametersToUrl,
  getCurrentLocation,
  redirectTo
} from "../../../../core/utils/helpers/url";
import { userIsAnonymous } from "../../../../core/utils/helpers/user";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Manifestation } from "../../../../core/utils/types/entities";
import { Button } from "../../../Buttons/Button";
import { infomediaModalId } from "../../infomedia/InfomediaModal";

export interface MaterialButtonOnlineInfomediaArticleProps {
  size?: ButtonSize;
  manifestation: Manifestation;
  trackOnlineView: () => void;
  dataCy?: string;
}

const MaterialButtonOnlineInfomediaArticle: FC<
  MaterialButtonOnlineInfomediaArticleProps
> = ({
  size,
  manifestation: { pid },
  trackOnlineView,
  dataCy = "material-button-online-infomedia-article"
}) => {
  const t = useText();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   // do stuff here upon coming back from teh login site
  // }, []);

  const onClick = () => {
    const userToken = getToken(TOKEN_USER_KEY);
    console.log({ userToken });
    const isUserAnonymous = userIsAnonymous();
    console.log({ isUserAnonymous });

    if (userIsAnonymous() || !getToken("user")) {
      console.log("User is anonymous and doesn't have any token");

      // link back from the login platform - with an open modal id
      const { href: urlToOpenModal } = appendQueryParametersToUrl(
        new URL(getCurrentLocation()),
        {
          modal: infomediaModalId(pid)
        }
      );
      console.log({ urlToOpenModal });
      const baseAuthUrl = new URL(t("authUrl"));
      console.log({ baseAuthUrl });
      const redirectUrl = appendQueryParametersToUrl(baseAuthUrl, {
        redirect_uri: urlToOpenModal
      });
      console.log({ redirectUrl });
      redirectTo(redirectUrl);
      return;
    }
    trackOnlineView();
    dispatch(openModal({ modalId: infomediaModalId(pid) }));
  };

  // TODO: A logged in user with municipality registration can access this.
  const isRegistered = true;
  if (!isRegistered) {
    return null;
  }

  return (
    <Button
      label={t("readArticleText")}
      buttonType="none"
      variant="filled"
      disabled={false}
      collapsible={false}
      size={size || "large"}
      onClick={onClick}
      dataCy={dataCy}
    />
  );
};

export default MaterialButtonOnlineInfomediaArticle;
