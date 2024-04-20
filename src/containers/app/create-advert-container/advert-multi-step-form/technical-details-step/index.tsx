import {
  safetyFeatureOptions,
  interiorEquipmentOptions,
  multimediaOptions,
} from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

export default function TechnicalDetailsStep() {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-2xl">Technical Details:</h3>
      <p className="text-md text-blue-500">
        Pick at least one feature from each category. You will get an error if
        you dont do that.
      </p>
      <div>
        <p className="text-lg">Safety:</p>
        <div className="bg-yellow-100 rounded-lg grid grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {safetyFeatureOptions.map((item, idx) => (
            <div className="flex items-center gap-2" key={idx}>
              <Checkbox
                name="safety"
                register={register}
                value={item}
                setValue={setValue}
                getValues={getValues}
              />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-lg">Interior Equipment:</p>
        <div className="bg-yellow-100 rounded-lg grid grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {interiorEquipmentOptions.map((item, idx) => (
            <div className="flex items-center gap-2" key={idx}>
              <Checkbox
                name="interior"
                register={register}
                value={item}
                setValue={setValue}
                getValues={getValues}
              />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-lg">Multimedia:</p>
        <div className="bg-yellow-100 rounded-lg grid grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {multimediaOptions.map((item, idx) => (
            <div className="flex items-center gap-2" key={idx}>
              <Checkbox
                name="multimedia"
                register={register}
                value={item}
                setValue={setValue}
                getValues={getValues}
              />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
