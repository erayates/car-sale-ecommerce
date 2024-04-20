import { FaInfoCircle } from "react-icons/fa";

export default function FinishStep() {
  return (
    <div className="px-12 lg:px-48 my-4 flex flex-col gap-4 text-blue-400 text-center items-center justify-center">
      <FaInfoCircle className="text-5xl" />
      <p>
        You are one step away from adding your ad to our site. After pressing
        the finish button below, your ad will be forwarded to us. After
        reviewing this advertisement sent to us, if it does not pose any
        problems, it will be published on our website. This process is completed
        in an average of 24 - 48 hours.
      </p>
    </div>
  );
}
