import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { withQuery } from "@storybook/addon-queryparams";
import DemoModal, { DemoModalEntryProps } from "./demo-modal.entry";

export default {
  title: "Demo modal",
  component: DemoModal,
  decorators: [withQuery],
  parameters: {
    query: {
      "demo-modal-one": "true"
    }
  },
  argTypes: {
    ariaLabelModalOneText: {
      defaultValue: "Luk dialog et"
    },
    ariaLabelModalTwoText: {
      defaultValue: "Luk dialog to"
    },
    screenReaderModalDescriptionText: {
      defaultValue: "Denne modal dækker sidens indhold, og er en demo"
    }
  }
} as ComponentMeta<typeof DemoModal>;

export const App: ComponentStory<typeof DemoModal> = (
  props: DemoModalEntryProps
) => <DemoModal {...props} />;
