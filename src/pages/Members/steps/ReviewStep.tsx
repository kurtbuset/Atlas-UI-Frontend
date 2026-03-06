import { Member } from "../../../models";

interface ReviewStepProps {
  formData: Partial<Member>;
}

export default function ReviewStep({ formData }: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-base font-medium text-gray-800 dark:text-white/90">
          Review Information
        </h3>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Please review all information before saving.
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800/50">
        <h4 className="mb-3 text-sm font-semibold text-gray-800 dark:text-white">
          Identity Information
        </h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Name:</span>
            <p className="text-gray-800 dark:text-white">
              {formData.firstName} {formData.middleInitial}{" "}
              {formData.lastName}
            </p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">
              Date of Birth:
            </span>
            <p className="text-gray-800 dark:text-white">
              {formData.birthdate}
            </p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Gender:</span>
            <p className="text-gray-800 dark:text-white">{formData.sex}</p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">SSN:</span>
            <p className="text-gray-800 dark:text-white">{formData.ssn}</p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Phone:</span>
            <p className="text-gray-800 dark:text-white">
              {formData.phoneNumber}
            </p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Email:</span>
            <p className="text-gray-800 dark:text-white">{formData.email}</p>
          </div>
          <div className="col-span-2">
            <span className="text-gray-500 dark:text-gray-400">Address:</span>
            <p className="text-gray-800 dark:text-white">
              {formData.addressLine1}
              {formData.addressLine2 && `, ${formData.addressLine2}`}
              <br />
              {formData.city}, {formData.state} {formData.zipCode}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800/50">
        <h4 className="mb-3 text-sm font-semibold text-gray-800 dark:text-white">
          Policy Information
        </h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">
              Account/Group:
            </span>
            <p className="text-gray-800 dark:text-white">
              {formData.accountGroupName}
            </p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">
              Group Number:
            </span>
            <p className="text-gray-800 dark:text-white">
              {formData.groupNumber}
            </p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Plan Name:</span>
            <p className="text-gray-800 dark:text-white">
              {formData.planName}
            </p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Plan ID:</span>
            <p className="text-gray-800 dark:text-white">{formData.planId}</p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">COBRA:</span>
            <p className="text-gray-800 dark:text-white">
              {formData.cobra ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800/50">
        <h4 className="mb-3 text-sm font-semibold text-gray-800 dark:text-white">
          Coverage Information
        </h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">
              Effective Date:
            </span>
            <p className="text-gray-800 dark:text-white">
              {formData.coverageEffectiveDate}
            </p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Term Date:</span>
            <p className="text-gray-800 dark:text-white">
              {formData.coverageTermDate}
            </p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Tier:</span>
            <p className="text-gray-800 dark:text-white">
              {formData.coverageTier}
            </p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">
              Relationship:
            </span>
            <p className="text-gray-800 dark:text-white">
              {formData.relationshipType}
            </p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Status:</span>
            <p className="text-gray-800 dark:text-white">
              {formData.memberStatus}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
