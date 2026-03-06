import Label from "../../../components/form/Label";
import Select from "../../../components/form/Select";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { CalenderIcon } from "../../../icons";
import { Member } from "../../../models";

interface CoverageInfoStepProps {
  formData: Partial<Member>;
  onChange: (field: keyof Member, value: string) => void;
  errors?: Record<string, string>;
}

export default function CoverageInfoStep({
  formData,
  onChange,
  errors = {},
}: CoverageInfoStepProps) {
  const tierOptions = [
    { value: "Single", label: "Single" },
    { value: "Family", label: "Family" },
    { value: "Employee + Spouse", label: "Employee + Spouse" },
    { value: "Employee + Children", label: "Employee + Children" },
  ];

  const relationshipOptions = [
    { value: "Subscriber", label: "Subscriber" },
    { value: "Spouse", label: "Spouse" },
    { value: "Child", label: "Child" },
    { value: "Other", label: "Other" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-base font-medium text-gray-800 dark:text-white/90">
          Coverage Details
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label htmlFor="coverageEffectiveDate">
              Coverage Effective Date <span className="text-red-500">*</span>
            </Label>
            <div className="relative w-full flatpickr-wrapper">
              <Flatpickr
                value={formData.coverageEffectiveDate || ""}
                onChange={(dates) => {
                  if (dates.length > 0) {
                    onChange(
                      "coverageEffectiveDate",
                      dates[0].toISOString().split("T")[0]
                    );
                  }
                }}
                options={{
                  dateFormat: "Y-m-d",
                }}
                placeholder="Select date"
                className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <CalenderIcon className="size-6" />
              </span>
            </div>
            {errors.coverageEffectiveDate && (
              <p className="mt-1 text-xs text-red-500">
                {errors.coverageEffectiveDate}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="coverageTermDate">
              Coverage Term Date <span className="text-red-500">*</span>
            </Label>
            <div className="relative w-full flatpickr-wrapper">
              <Flatpickr
                value={formData.coverageTermDate || ""}
                onChange={(dates) => {
                  if (dates.length > 0) {
                    onChange(
                      "coverageTermDate",
                      dates[0].toISOString().split("T")[0]
                    );
                  }
                }}
                options={{
                  dateFormat: "Y-m-d",
                  minDate: formData.coverageEffectiveDate || "today",
                }}
                placeholder="Select date"
                className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <CalenderIcon className="size-6" />
              </span>
            </div>
            {errors.coverageTermDate && (
              <p className="mt-1 text-xs text-red-500">
                {errors.coverageTermDate}
              </p>
            )}
          </div>
          <div>
            <Label>
              Coverage Tier <span className="text-red-500">*</span>
            </Label>
            <Select
              options={tierOptions}
              placeholder="Select tier"
              value={formData.coverageTier || ""}
              onChange={(value) => onChange("coverageTier", value)}
              className="dark:bg-dark-900"
            />
            {errors.coverageTier && (
              <p className="mt-1 text-xs text-red-500">{errors.coverageTier}</p>
            )}
          </div>
          <div>
            <Label>
              Relationship Type <span className="text-red-500">*</span>
            </Label>
            <Select
              options={relationshipOptions}
              placeholder="Select relationship"
              value={formData.relationshipType || ""}
              onChange={(value) => onChange("relationshipType", value)}
              className="dark:bg-dark-900"
            />
            {errors.relationshipType && (
              <p className="mt-1 text-xs text-red-500">
                {errors.relationshipType}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
