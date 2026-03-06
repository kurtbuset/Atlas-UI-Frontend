import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import { memberService } from "../../services";
import { Member } from "../../models";
import Stepper from "../../components/ui/Stepper";
import IdentityInfoStep from "./steps/IdentityInfoStep";
import PolicyInfoStep from "./steps/PolicyInfoStep";
import CoverageInfoStep from "./steps/CoverageInfoStep";
import ReviewStep from "./steps/ReviewStep";
import HIPAAVerificationModal, {
  VerificationData,
} from "../../components/modals/HIPAAVerificationModal";
import { hipaaAuditService } from "../../services";

const steps = [
  { id: 1, title: "Identity Info", subtitle: "Support Text" },
  { id: 2, title: "Policy Info", subtitle: "Support Text" },
  { id: 3, title: "Coverage Info", subtitle: "Support Text" },
  { id: 4, title: "Review and Save", subtitle: "Support Text" },
];

export default function MemberFormMultiStep() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(isEdit);
  const [isVerified, setIsVerified] = useState(!isEdit);
  const [memberForVerification, setMemberForVerification] =
    useState<Member | null>(null);

  const [formData, setFormData] = useState<Partial<Member>>({
    firstName: "",
    middleInitial: "",
    lastName: "",
    birthdate: "",
    sex: "",
    ssn: "",
    phoneNumber: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    // Mock Policy Data - will be selected by user
    accountGroupName: "",
    groupNumber: "",
    planName: "",
    planId: "",
    cobra: false,
    // Coverage Data
    coverageEffectiveDate: "",
    coverageTermDate: "",
    coverageTier: "",
    relationshipType: "",
    memberStatus: "Active", // Default status
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEdit && id) {
      loadMember(id);
    }
  }, [id, isEdit]);

  const loadMember = async (memberId: string) => {
    const member = await memberService.getById(memberId);
    if (member) {
      setMemberForVerification(member);
      const { id: _, ...memberData } = member;
      setFormData(memberData);
    }
  };

  const handleVerification = (data: VerificationData) => {
    setIsVerified(true);
    setShowVerificationModal(false);

    // Log verification for audit trail
    if (memberForVerification) {
      hipaaAuditService.log({
        memberId: memberForVerification.id,
        memberName: `${memberForVerification.firstName} ${memberForVerification.lastName}`,
        verificationType: data.verificationType,
        identifiers: data.identifiers,
        providerName: data.providerName,
        providerNPI: data.providerNPI,
        providerTIN: data.providerTIN,
        verifiedAt: data.verifiedAt,
        agentUser: "Current Agent",
        success: true,
      });
    }
  };

  const handleCloseModal = () => {
    setShowVerificationModal(false);
    navigate("/members");
  };

  const handleChange = (field: keyof Member, value: string | boolean | number) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleGroupChange = (groupName: string, groupNumber: string) => {
    setFormData((prev) => ({
      ...prev,
      accountGroupName: groupName,
      groupNumber: groupNumber,
    }));
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 0) {
      // Identity Info validation
      if (!formData.firstName?.trim()) {
        newErrors.firstName = "First name is required";
      }
      if (!formData.lastName?.trim()) {
        newErrors.lastName = "Last name is required";
      }
      if (!formData.birthdate) {
        newErrors.birthdate = "Date of birth is required";
      }
      if (!formData.sex) {
        newErrors.sex = "Gender is required";
      }
      if (!formData.ssn?.trim()) {
        newErrors.ssn = "SSN is required";
      }
      if (!formData.phoneNumber?.trim()) {
        newErrors.phoneNumber = "Phone number is required";
      }
      if (!formData.email?.trim()) {
        newErrors.email = "Email address is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!formData.addressLine1?.trim()) {
        newErrors.addressLine1 = "Address line 1 is required";
      }
      if (!formData.city?.trim()) {
        newErrors.city = "City is required";
      }
      if (!formData.state) {
        newErrors.state = "State is required";
      }
      if (!formData.zipCode?.trim()) {
        newErrors.zipCode = "Zip code is required";
      } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
        newErrors.zipCode = "Zip code must be 5 or 9 digits (e.g., 12345 or 12345-6789)";
      }
    } else if (currentStep === 1) {
      // Policy Info validation
      if (!formData.accountGroupName?.trim()) {
        newErrors.accountGroupName = "Account/Group name is required";
      }
      if (!formData.planName?.trim()) {
        newErrors.planName = "Plan name is required";
      }
      if (!formData.planId?.trim()) {
        newErrors.planId = "Plan ID is required";
      }
    } else if (currentStep === 2) {
      // Coverage Info validation
      if (!formData.coverageEffectiveDate) {
        newErrors.coverageEffectiveDate = "Coverage effective date is required";
      }
      if (!formData.coverageTermDate) {
        newErrors.coverageTermDate = "Coverage term date is required";
      }
      if (!formData.coverageTier) {
        newErrors.coverageTier = "Coverage tier is required";
      }
      if (!formData.relationshipType) {
        newErrors.relationshipType = "Relationship type is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (isEdit && id) {
        await memberService.update(id, formData as Omit<Member, "id">);
      } else {
        await memberService.create(formData as Omit<Member, "id">);
      }
      navigate("/members");
    } catch (error) {
      console.error("Error saving member:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <IdentityInfoStep
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />
        );
      case 1:
        return (
          <PolicyInfoStep
            formData={formData}
            onChange={handleChange}
            onGroupChange={handleGroupChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <CoverageInfoStep
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />
        );
      case 3:
        return <ReviewStep formData={formData} />;
      default:
        return null;
    }
  };

  // Show verification modal for edit mode
  if (isEdit && !isVerified && memberForVerification) {
    return (
      <>
        <PageMeta
          title="HIPAA Verification Required | TailAdmin"
          description="Verify identity to edit member information"
        />
        <HIPAAVerificationModal
          isOpen={showVerificationModal}
          onClose={handleCloseModal}
          onVerify={handleVerification}
          memberName={`${memberForVerification.firstName} ${memberForVerification.lastName}`}
        />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mb-4 text-6xl">🔒</div>
            <h2 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
              HIPAA Verification Required
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Please complete verification to edit member information
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title={`${isEdit ? "Edit" : "Add"} Member | TailAdmin`}
        description="Member form"
      />
      <PageBreadcrumb pageTitle={isEdit ? "Edit Member" : "Add Member"} />
      <div className="space-y-6">
        <ComponentCard title="Member Data">
          <Stepper steps={steps} currentStep={currentStep} />

          <div className="mt-8">{renderStepContent()}</div>

          <div className="mt-8 flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate("/members")}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                Cancel
              </button>

              {currentStep === steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-6 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save & Close"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
