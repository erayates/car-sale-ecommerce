import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import GeneralInfoStep from "./general-info-step";
import TechnicalDetailsStep from "./technical-details-step";
import UploadPhotosStep from "./upload-photos-step";
import FinishStep from "../finish-step";
import { FaCheckSquare } from "react-icons/fa";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdvertFormSchema } from "@/schemes/advertFormSchema";
import FormError from "./form-error";
import upload from "@/lib/upload";
import { toast } from "react-toastify";
import { useUserStore } from "@/providers/userProvider";
import { UserType } from "@/types/user";

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

export default function AdvertMultiStepForm({
  advert,
  advertId,
}: {
  advert?: AdvertInterface;
  advertId?: string;
}) {
  const currentUser = useUserStore((state) => state.currentUser as UserType);
  const methods = useForm<FormData>({
    resolver: zodResolver(AdvertFormSchema),
    defaultValues:
      advert &&
      AdvertFormSchema.parse({
        ...advert,
        title: advert.title,
        yearOfModel: advert.yearOfModel.toString(),
        enginePower: advert.enginePower.toString(),
        engineSize: advert.engineSize.toString(),
        mileage: advert.mileage.toString(),
        photos: advert.photos ?? [],
        price: advert.price.toString(),
      }),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = async (data: FormData | any) => {
    try {
      const photos = data.photos;
      let images = [];

      for (let i = 0; i < photos.length; i++) {
        const photoURL = await upload(photos[i], "gallery");
        images.push(photoURL);
      }

      delete data.photos;

      if (advert) {
        const response = await fetch(`/api/v1/adverts/${advertId}`, {
          method: "PUT",
          body: JSON.stringify({
            ...data,
            images: images,
            uid: currentUser.uid,
          }),
        });

        handleNext();

        if (response.ok && response.status === 200) {
          toast.success("Your advert updated successfully.");
          return;
        }
        toast.error("Update process failed. Something went wrong!");
        return;
      }

      const response = await fetch(`/api/v1/adverts`, {
        method: "POST",
        body: JSON.stringify({
          ...data,
          images: images,
          uid: currentUser.uid,
        }),
      });

      handleNext();

      if (response.ok && response.status === 201) {
        toast.success("Your process successfully done!");
        return;
      }

      toast.error("Process failed. Something went wrong!");
    } catch (err) {
      toast.error("Process failed. Someting went wrong!");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  {step.component}

                  <Box sx={{ mb: 2 }}>
                    <div style={{ display: "flex" }}>
                      <Box
                        sx={{
                          backgroundColor: "primary.main",
                          display: "flex",
                          width: "fit-content",
                          borderRadius: "8px",
                          mt: 1,
                          mr: 1,
                        }}
                      >
                        {index < steps.length - 1 ? (
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            type="button"
                          >
                            Continue
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            sx={{ mt: 1, mr: 1 }}
                            type="submit"
                          >
                            Finish
                          </Button>
                        )}
                      </Box>

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

          {Object.keys(errors).length > 0 &&
            activeStep === steps.length - 1 && <FormError />}

          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <p className="text-green-400 font-semibold flex gap-2 items-center">
                <FaCheckSquare className="text-3xl" />
                Congratulations! Your ad has been forwarded to us. We will
                publish your ad as soon as possible.
              </p>
            </Paper>
          )}
        </Box>
      </form>
    </FormProvider>
  );
}
