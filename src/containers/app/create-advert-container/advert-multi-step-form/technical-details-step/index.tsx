import { safetyFeatureOptions, interiorEquipmentOptions, multimediaOptions } from "@/lib/utils";

export default function TechnicalDetailsStep() {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-2xl">Technical Details:</h3>
      <div>
        <p className="text-lg">Safety:</p>
        <div className="bg-yellow-100 rounded-lg grid grid-cols-4 gap-4 p-4">
          {safetyFeatureOptions.map((item, idx) => (
            <div className="flex items-center gap-2" key={idx}>
              <input type="checkbox" />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-lg">Interior Equipment:</p>
        <div className="bg-yellow-100 rounded-lg grid grid-cols-4 gap-4 p-4">
          {interiorEquipmentOptions.map((item, idx) => (
            <div className="flex items-center gap-2" key={idx}>
              <input type="checkbox" />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-lg">Multimedia:</p>
        <div className="bg-yellow-100 rounded-lg grid grid-cols-4 gap-4 p-4">
          {multimediaOptions.map((item, idx) => (
            <div className="flex items-center gap-2" key={idx}>
              <input type="checkbox" />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
