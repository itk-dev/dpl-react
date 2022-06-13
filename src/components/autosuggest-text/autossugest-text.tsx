import React from "react";
import { SuggestionsFromQueryStringQuery } from "../../core/dbc-gateway/generated/graphql";

export interface AutosuggestTextProps {
  responseData: SuggestionsFromQueryStringQuery["suggest"]["result"];
  currentQ: string | undefined;
  // TODO: find out what type this can be from downshifts official types
  highlightedIndex: any;
  getItemProps: any;
}

export const AutosuggestText: React.FC<AutosuggestTextProps> = ({
  responseData,
  highlightedIndex,
  getItemProps
}) => {
  // now we need to make a string item for downshift
  // @ts-expect-error TODO: objectItem needs a type
  function itemToString(objectItem) {
    switch (objectItem.__typename) {
      case "Creator":
        return objectItem.name;
      case "Subject":
        return objectItem.value;
      default:
        return objectItem.title;
    }
  }

  return (
    <>
      {responseData.map((item, index) => {
        /* eslint-disable react/no-array-index-key */
        // TODO: find a way to index the <li> without using index
        return (
          <>
            {/* eslint-disable react/jsx-props-no-spreading */}
            {/* console.log({ ...getItemProps({ item, index }) }) */}
            <li
              className="autosuggest-text-container__item text-body-medium-regular"
              key={index}
              style={
                highlightedIndex === index ? { backgroundColor: "#EEE9E5" } : {}
              }
              {...getItemProps({ item: itemToString(item), index })}
            >
              {/* eslint-enable react/jsx-props-no-spreading */}
              {/* eslint-enable react/no-array-index-key */}
              {item.__typename === "Creator"
                ? `${item.name} (forfatter)`
                : null}
              {item.__typename === "Subject" ? `${item.value} (emne)` : null}
              {item.__typename === "Work"
                ? `${item.title} (manifestation)`
                : null}
            </li>
          </>
        );
      })}
    </>
  );
};

export default AutosuggestText;
