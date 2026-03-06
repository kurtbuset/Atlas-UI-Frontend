import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Select from "../../../components/form/Select";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { CalenderIcon } from "../../../icons";
import { Member } from "../../../models";

interface IdentityInfoStepProps {
  formData: Partial<Member>;
  onChange: (field: keyof Member, value: string) => void;
  errors?: Record<string, string>;
}

export default function IdentityInfoStep({
  formData,
  onChange,
  errors = {},
}: IdentityInfoStepProps) {
  const sexOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const stateOptions = [
    { value: "VT", label: "VT" },
    { value: "VA", label: "VA" },
    { value: "WA", label: "WA" },
    { value: "WV", label: "WV" },
    { value: "WI", label: "WI" },
    { value: "WY", label: "WY" },
  ];

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Only digits
    if (value.length <= 9) {
      onChange("zipCode", value);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-base font-medium text-gray-800 dark:text-white/90">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label htmlFor="firstName">
              First Name <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="firstName"
              value={formData.firstName || ""}
              onChange={(e) => onChange("firstName", e.target.value)}
              required
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
            )}
          </div>
          <div>
            <Label htmlFor="middleInitial">Middle Initial</Label>
            <Input
              type="text"
              id="middleInitial"
              maxLength={1}
              value={formData.middleInitial || ""}
              onChange={(e) => onChange("middleInitial", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="lastName">
              Last Name <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="lastName"
              value={formData.lastName || ""}
              onChange={(e) => onChange("lastName", e.target.value)}
              required
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
            )}
          </div>
          <div>
            <Label htmlFor="birthdate">
              Date of Birth <span className="text-red-500">*</span>
            </Label>
            <div className="relative w-full flatpickr-wrapper">
              <Flatpickr
                value={formData.birthdate || ""}
                onChange={(dates) => {
                  if (dates.length > 0) {
                    onChange("birthdate", dates[0].toISOString().split("T")[0]);
                  }
                }}
                options={{
                  dateFormat: "Y-m-d",
                  maxDate: "today",
                }}
                placeholder="Select birthdate"
                className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <CalenderIcon className="size-6" />
              </span>
            </div>
            {errors.birthdate && (
              <p className="mt-1 text-xs text-red-500">{errors.birthdate}</p>
            )}
          </div>
          <div>
            <Label>
              Gender <span className="text-red-500">*</span>
            </Label>
            <Select
              options={sexOptions}
              placeholder="Select gender"
              value={formData.sex || ""}
              onChange={(value) => onChange("sex", value)}
              className="dark:bg-dark-900"
            />
            {errors.sex && (
              <p className="mt-1 text-xs text-red-500">{errors.sex}</p>
            )}
          </div>
          <div>
            <Label htmlFor="ssn">
              SSN <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="ssn"
              value={formData.ssn || ""}
              onChange={(e) => onChange("ssn", e.target.value)}
              placeholder="***-**-9872"
              required
            />
            {errors.ssn && (
              <p className="mt-1 text-xs text-red-500">{errors.ssn}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-base font-medium text-gray-800 dark:text-white/90">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label htmlFor="phoneNumber">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              type="tel"
              id="phoneNumber"
              value={formData.phoneNumber || ""}
              onChange={(e) => onChange("phoneNumber", e.target.value)}
              placeholder="(555) 123-4567"
              required
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-xs text-red-500">{errors.phoneNumber}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              type="email"
              id="email"
              value={formData.email || ""}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="jacob.smith@email.com"
              required
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-base font-medium text-gray-800 dark:text-white/90">
          Address
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <Label htmlFor="addressLine1">
              Address Line 1 <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="addressLine1"
              value={formData.addressLine1 || ""}
              onChange={(e) => onChange("addressLine1", e.target.value)}
              required
            />
            {errors.addressLine1 && (
              <p className="mt-1 text-xs text-red-500">{errors.addressLine1}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="addressLine2">
              Address Line 2{" "}
              <span className="text-sm text-gray-500">(Optional)</span>
            </Label>
            <Input
              type="text"
              id="addressLine2"
              value={formData.addressLine2 || ""}
              onChange={(e) => onChange("addressLine2", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="city">
              City <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="city"
              value={formData.city || ""}
              onChange={(e) => onChange("city", e.target.value)}
              required
            />
            {errors.city && (
              <p className="mt-1 text-xs text-red-500">{errors.city}</p>
            )}
          </div>
          <div>
            <Label>
              State <span className="text-red-500">*</span>
            </Label>
            <Select
              options={stateOptions}
              placeholder="Select state"
              value={formData.state || ""}
              onChange={(value) => onChange("state", value)}
              className="dark:bg-dark-900"
            />
            {errors.state && (
              <p className="mt-1 text-xs text-red-500">{errors.state}</p>
            )}
          </div>
          <div>
            <Label htmlFor="zipCode">
              Zip Code (5-9 digits) <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="zipCode"
              value={formData.zipCode || ""}
              onChange={handleZipCodeChange}
              placeholder="12345 or 12345-6789"
              required
            />
            {errors.zipCode && (
              <p className="mt-1 text-xs text-red-500">{errors.zipCode}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
