import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import GeneralInfoStep from "./general-info-step";
import TechnicalDetailsStep from "./technical-details-step";
import UploadPhotosStep from "./upload-photos-step";
import FinishStep from "../finish-step";
import { FaCheck, FaCheckSquare } from "react-icons/fa";

const steps = [
  {
    label: "Describe general informations about your car",
    component: <GeneralInfoStep />,
  },
  {
    label: "Enter technical details of your car",
    component: <TechnicalDetailsStep />,
  },
  {
    label: "Upload car photos",
    component: <UploadPhotosStep />,
  },
  {
    label: "Finish! Create your ad now.",
    component: <FinishStep />,
  },
];

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return ( 
    <Box sx={{ width: { xs: 400, md: "100%" } }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 3 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              {step.component}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <p className="text-green-400 font-semibold flex gap-2 items-center">
            <FaCheckSquare className="text-3xl" />
            Congratulations! Your ad has been forwarded to us. We will publish
            your ad as soon as possible.
          </p>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
