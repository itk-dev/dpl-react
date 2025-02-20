import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import MaterialEntry, { MaterialEntryProps } from "./material.entry";

export default {
  title: "Apps / Material",
  component: MaterialEntry,
  argTypes: {
    searchUrl: {
      name: "Path to the search result page",
      defaultValue: "/search",
      control: { type: "text" }
    },
    materialUrl: {
      name: "Path to the material page",
      defaultValue: "/work/:workid",
      control: { type: "text" }
    },
    wid: {
      name: "Work ID",
      defaultValue: "work-of:870970-basis:52557240",
      control: { type: "text" }
    },
    materialHeaderAuthorByText: {
      name: "By (author)",
      defaultValue: "Af ",
      control: { type: "text" }
    },
    periodikumSelectYearText: {
      name: "Year",
      defaultValue: "År",
      control: { type: "text" }
    },
    periodikumSelectWeekText: {
      name: "Week",
      defaultValue: "Uge",
      control: { type: "text" }
    },
    reserveBookText: {
      name: "Reserve",
      defaultValue: "RESERVER BOG",
      control: { type: "text" }
    },
    reserveText: {
      name: "Reserve",
      defaultValue: "reserver",
      control: { type: "text" }
    },
    findOnBookshelfText: {
      name: "Find on bookshelf",
      defaultValue: "FIND PÅ HYLDEN",
      control: { type: "text" }
    },
    descriptionHeadlineText: {
      name: "Description headline",
      defaultValue: "Beskrivelse",
      control: { type: "text" }
    },
    identifierText: {
      name: "Identifier/topic text",
      defaultValue: "Emneord",
      control: { type: "text" }
    },
    inSameSeriesText: {
      name: "In same series as",
      defaultValue: "I samme serie",
      control: { type: "text" }
    },
    numberDescriptionText: {
      name: "Number",
      defaultValue: "Nr",
      control: { type: "text" }
    },
    inSeriesText: {
      name: "In series",
      defaultValue: "i serien",
      control: { type: "text" }
    },
    loginToSeeReviewText: {
      name: "Login to see Review",
      defaultValue: "Log ind for at se anmeldensen.",
      control: { type: "text" }
    },
    cantViewReviewText: {
      name: "Cannot view Review",
      defaultValue: "Kan ikke se anmeldensen.",
      control: { type: "text" }
    },
    ratingIsText: {
      name: "Rating is",
      defaultValue: "Rating of this item is",
      control: { type: "text" }
    },
    outOfText: {
      name: "X 'out of' Y",
      defaultValue: "out of",
      control: { type: "text" }
    },
    heartsIconText: {
      name: "Hearts icon text",
      defaultValue: "hearts",
      control: { type: "text" }
    },
    detailsOfTheMaterialText: {
      name: "Details of the material",
      defaultValue: "Detaljer om materialet",
      control: { type: "text" }
    },
    editionsText: {
      name: "Editions",
      defaultValue: "Udgaver",
      control: { type: "text" }
    },
    fictionNonfictionText: {
      name: "Fiction Nonfiction",
      defaultValue: "Emnetal",
      control: { type: "text" }
    },
    detailsText: {
      name: "Details",
      defaultValue: "Detaljer",
      control: { type: "text" }
    },
    reviewsText: {
      name: "Reviews",
      defaultValue: "Anmeldelser",
      control: { type: "text" }
    },
    typeText: {
      name: "Type",
      defaultValue: "Type",
      control: { type: "text" }
    },
    languageText: {
      name: "Language",
      defaultValue: "Sprog",
      control: { type: "text" }
    },
    contributorsText: {
      name: "Contributors",
      defaultValue: "Bidragsydere",
      control: { type: "text" }
    },
    originalTitleText: {
      name: "Original title",
      defaultValue: "Originaltitel",
      control: { type: "text" }
    },
    isbnText: {
      name: "ISBN",
      defaultValue: "ISBN",
      control: { type: "text" }
    },
    editionText: {
      name: "Edition",
      defaultValue: "Udgave",
      control: { type: "text" }
    },
    scopeText: {
      name: "Scope",
      defaultValue: "Omfang",
      control: { type: "text" }
    },
    publisherText: {
      name: "Publisher",
      defaultValue: "Forlag",
      control: { type: "text" }
    },
    audienceText: {
      name: "Audience",
      defaultValue: "Målgruppe",
      control: { type: "text" }
    },
    genreAndFormText: {
      name: "Genre and form",
      defaultValue: "Genre",
      control: { type: "text" }
    },
    creatorsAreMissingText: {
      name: "Creators are missing",
      defaultValue: "Creators are missing",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof MaterialEntry>;

export const Material: ComponentStory<typeof MaterialEntry> = (
  args: MaterialEntryProps
) => <MaterialEntry {...args} />;
