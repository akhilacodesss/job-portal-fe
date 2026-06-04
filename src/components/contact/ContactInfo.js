import {
  FiMapPin,
  FiMail,
  FiPhone,
} from "react-icons/fi";

function ContactInfo() {
  return (
    <div className="space-y-4">

      <div className="bg-white p-6 rounded-2xl border hover:shadow-lg transition">
        <FiMapPin className="text-indigo-600 text-2xl mb-3" />

        <h3 className="font-semibold">
          Address
        </h3>

        <p className="text-gray-600 mt-2">
          Hyderabad, Telangana, India
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border">
        <FiMail className="text-indigo-600 text-2xl mb-3" />

        <h3 className="font-semibold">
          Email
        </h3>

        <p className="text-gray-600 mt-2">
          support@jobhub.com
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border">
        <FiPhone className="text-indigo-600 text-2xl mb-3" />

        <h3 className="font-semibold">
          Phone
        </h3>

        <p className="text-gray-600 mt-2">
          +91 98765 43210
        </p>
      </div>

    </div>
  );
}

export default ContactInfo;