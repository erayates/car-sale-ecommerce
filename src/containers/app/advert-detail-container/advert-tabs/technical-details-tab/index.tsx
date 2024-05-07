import {
  safetyFeatureOptions,
  multimediaOptions,
  interiorEquipmentOptions,
} from "@/lib/utils";

import { FaCheck } from "react-icons/fa6";

export default function TechnicalDetailsTab({ advert }: { advert: any }) {
  const renderSafetyFeatures = () => {
    return safetyFeatureOptions.map((option) => (
      <p
        key={option}
        className="text-sm flex items-center bg-slate-700 text-white rounded-md px-4 py-2 font-semibold gap-2"
      >
        {advert.safety.includes(option) ? (
          <FaCheck className="text-xl text-yellow-400" />
        ) : (
          ""
        )}
        {option}
      </p>
    ));
  };

  const renderInteriorFeatures = () => {
    return interiorEquipmentOptions.map((option) => (
      <p
        key={option}
        className="text-sm flex items-center bg-slate-700 text-white rounded-md px-4 py-2 font-semibold gap-2"
      >
        {advert.interior.includes(option) ? (
          <FaCheck className="text-xl text-yellow-400" />
        ) : (
          ""
        )}
        {option}
      </p>
    ));
  };

  const renderMultimediaOptions = () => {
    return multimediaOptions.map((option) => (
      <p
        key={option}
        className="text-sm flex items-center bg-slate-700 text-white rounded-md px-4 py-2 font-semibold gap-2"
      >
        {advert.multimedia.includes(option) ? (
          <FaCheck className="text-xl text-yellow-400" />
        ) : (
          ""
        )}
        {option}
      </p>
    ));
  };

  return (
    <div className="space-y-12">
      <div>
        <h3 className="font-semibold text-2xl">
          Technical details of the car:
        </h3>
        <p className="text-sm font-semibold">
          You can observe all technical features of the car from here.
        </p>
      </div>
      <div className="">
        <h4 className="text-lg font-semibold text-blue-600">
          Safety Features:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-2">
          {renderSafetyFeatures()}
        </div>
      </div>

      <div className="">
        <h4 className="text-lg font-semibold text-blue-600">
          Interior Features:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-2">
          {renderInteriorFeatures()}
        </div>
      </div>

      <div className="">
        <h4 className="text-lg font-semibold text-blue-600">
          Multimedia Features:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-2">
          {renderMultimediaOptions()}
        </div>
      </div>
    </div>
  );
}
