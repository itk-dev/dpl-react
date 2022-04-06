import React from "react";
import AvailabilityLabel from "./availability-label";

export default { title: "Components/Availability Label" };

const Template = args => <AvailabilityLabel {...args} />;

// argTypes sets up the "Controls" tab for this component in Storybook
const argTypes = {
  manifestText: {
    name: "Manifestation Text",
    type: { required: true },
    control: {
      type: "text"
    }
  },
  availabilityText: {
    name: "Availability Text",
    type: { required: true },
    control: {
      type: "text"
    }
  },
  state: {
    name: "State",
    description:
      "To change availaility, select from Storybook Availability Label components",
    type: { required: true },
    control: {
      type: null
    }
  },
  link: {
    name: "Link",
    type: { required: true },
    control: {
      type: "text"
    }
  }
};

export const Available = Template.bind({});
Available.args = {
  manifestText: "bog",
  availabilityText: "hjemme",
  state: "available",
  link: "https://www.google.com"
};
Available.argTypes = argTypes;

export const Selected = Template.bind({});
Selected.args = {
  manifestText: "lydbog (cd-mp3)",
  availabilityText: "udlånt",
  state: "selected",
  link: "https://www.google.com"
};
Selected.argTypes = argTypes;

export const Unavailable = Template.bind({});
Unavailable.args = {
  manifestText: "ebog",
  availabilityText: "online",
  state: "unavailable",
  link: undefined
};
Unavailable.argTypes = argTypes;
