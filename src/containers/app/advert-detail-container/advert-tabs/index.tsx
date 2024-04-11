"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function AdvertTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: React.SetStateAction<string>
  ) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Advert Details" value="1" />
            <Tab label="Technical Details" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam,
          officiis non? Iusto consequatur corporis quidem ab optio doloremque
          odio voluptatibus, illo, labore aliquam minus quibusdam reiciendis
          deleniti cumque accusamus accusantium.
        </TabPanel>
        <TabPanel value="2">
        
        </TabPanel>
      </TabContext>
    </Box>
  );
}
