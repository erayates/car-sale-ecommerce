import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";

import { MdExpandMore } from "react-icons/md";

const items = [
  {
    title: "When the rentals can be extended up?",
    description:
      "Integer at metus lacus. Duis efficitur leo lorem, sed lacinia lacus blandit eu. Mauris posuere leo risus, vel ornare arcu tristique sit amet. Phasellus sed sapien vitae magna tempus pulvinar quis at est. Vestibulum faucibus, nibh in congue eleifend, est tortor sagittis nulla, quis venenatis lectus neque vitae orci",
  },

  {
    title: "What documents and ID are required to rent a car?",
    description:
      "Integer at metus lacus. Duis efficitur leo lorem, sed lacinia lacus blandit eu. Mauris posuere leo risus, vel ornare arcu tristique sit amet. Phasellus sed sapien vitae magna tempus pulvinar quis at est. Vestibulum faucibus, nibh in congue eleifend, est tortor sagittis nulla, quis venenatis lectus neque vitae orci",
  },

  {
    title:
      "When ornare arcu tristique sit amet. Phasellus sed sapien vitae magna tempus pulvinar quis at est?",
    description:
      "Integer at metus lacus. Duis efficitur leo lorem, sed lacinia lacus blandit eu. Mauris posuere leo risus, vel ornare arcu tristique sit amet. Phasellus sed sapien vitae magna tempus pulvinar quis at est. Vestibulum faucibus, nibh in congue eleifend, est tortor sagittis nulla, quis venenatis lectus neque vitae orci",
  },

  {
    title:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Class aptent taciti sociosqu ad litora torquent per?",
    description:
      "Integer at metus lacus. Duis efficitur leo lorem, sed lacinia lacus blandit eu. Mauris posuere leo risus, vel ornare arcu tristique sit amet. Phasellus sed sapien vitae magna tempus pulvinar quis at est. Vestibulum faucibus, nibh in congue eleifend, est tortor sagittis nulla, quis venenatis lectus neque vitae orci",
  },
];

export default function FAQAccordion() {
  return (
    <div>
      {items.map((item, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<MdExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{item.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.description}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
