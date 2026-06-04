import {
  FaLinkedinIn,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

function ShareJob({ job }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 mt-6">
      <h3 className="text-xl font-semibold mb-5">
        Share This Job
      </h3>

      <div className="flex gap-3">
        <button
          onClick={() =>
            window.open(
              `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`,
              "_blank"
            )
          }
          className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center"
        >
          <FaLinkedinIn />
        </button>

        <button
          onClick={() =>
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
              "_blank"
            )
          }
          className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center"
        >
          <FaFacebookF />
        </button>

        <button
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet?url=${window.location.href}&text=${job.title}`,
              "_blank"
            )
          }
          className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"
        >
          <FaTwitter />
        </button>

        <button
          onClick={() =>
            window.open(
              `https://wa.me/?text=${job.title}%20${window.location.href}`,
              "_blank"
            )
          }
          className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center"
        >
          <FaWhatsapp />
        </button>
      </div>
    </div>
  );
}

export default ShareJob;