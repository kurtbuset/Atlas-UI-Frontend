import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import { memberService, Member } from "../../services/memberService";
import Badge from "../../components/ui/badge/Badge";
import HipaaVerificationModal from "../../components/hipaa/HipaaVerificationModal";
import VerificationBadge from "../../components/hipaa/VerificationBadge";
import ProtectedContent from "../../components/hipaa/ProtectedContent";
import { useHipaaVerification } from "../../hooks/useHipaaVerification";
import { useModal } from "../../hooks/useModal";

export default function MemberView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const { isOpen, openModal, closeModal } = useModal();
  const { isVerified, verificationData, setVerified } = useHipaaVerification();

  useEffect(() => {
    if (id) {
      loadMember(id);
    }
  }, [id]);

  useEffect(() => {
    // Open verification modal automatically when member data loads
    if (member && !isVerified) {
      openModal();
    }
  }, [member, isVerified, openModal]);

  const loadMember = async (memberId: string) => {
    setLoading(true);
    const data = await memberService.getById(memberId);
    setMember(data || null);
    setLoading(false);
  };

  const handleVerificationSuccess = (data: any) => {
    setVerified(data);
    closeModal();
  };

  if (loading) {
    return <div className="py-8 text-center text-gray-500">Loading...</div>;
  }

  if (!member) {
    return (
      <div className="py-8 text-center text-gray-500">Member not found</div>
    );
  }

  return (
    <>
      <PageMeta
        title="View Member | TailAdmin"
        description="View member details"
      />
      <PageBreadcrumb pageTitle="View Member" />

      {/* HIPAA Verification Modal */}
      {member && (
        <HipaaVerificationModal
          isOpen={isOpen}
          onClose={closeModal}
          member={member}
          onVerificationSuccess={handleVerificationSuccess}
        />
      )}

      <div className="space-y-6">
        <ComponentCard
          title={
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span>Member Data</span>
              <VerificationBadge
                isVerified={isVerified}
                verifiedAt={verificationData?.verifiedAt}
              />
            </div>
          }
          action={
            <div className="flex gap-3">
              {!isVerified && (
                <button
                  onClick={openModal}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Verify Identity
                </button>
              )}
              <Link
                to={`/members/edit/${member.id}`}
                className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600"
              >
                Edit
              </Link>
              <button
                onClick={() => navigate("/members")}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Back to List
              </button>
            </div>
          }
        >
          <div className="space-y-8">
            {/* Member Information */}
            <ProtectedContent isVerified={isVerified}>
              <div>
                <h3 className="mb-4 text-base font-medium text-gray-800 dark:text-white/90">
                  Member Information
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      First Name
                    </label>
                    <p className="text-base text-gray-800 dark:text-white/90">
                      {member.firstName}
                    </p>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Last Name
                    </label>
                    <p className="text-base text-gray-800 dark:text-white/90">
                      {member.lastName}
                    </p>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Sex
                    </label>
                    <p className="text-base text-gray-800 dark:text-white/90">
                      {member.sex || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Birthdate
                    </label>
                    <p className="text-base text-gray-800 dark:text-white/90">
                      {member.birthdate}
                    </p>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Member ID
                    </label>
                    <p className="text-base text-gray-800 dark:text-white/90">
                      {member.memberId}
                    </p>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      SSN
                    </label>
                    <p className="text-base text-gray-800 dark:text-white/90">
                      {member.ssn}
                    </p>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Member Status
                    </label>
                    <div>
                      <Badge
                        size="sm"
                        color={
                          member.memberStatus === "Active" ? "success" : "error"
                        }
                      >
                        {member.memberStatus}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </ProtectedContent>

            {/* Primary Address */}
            <ProtectedContent isVerified={isVerified}>
              <div>
                <h3 className="mb-4 text-base font-medium text-gray-800 dark:text-white/90">
                  Primary Address
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Address Line 1
                    </label>
                    <p className="text-base text-gray-800 dark:text-white/90">
                      {member.addressLine1 || "N/A"}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Email
                    </label>
                    <p className="text-base text-gray-800 dark:text-white/90">
                      {member.email}
                    </p>
                  </div>
                </div>
              </div>
            </ProtectedContent>

            {/* City */}
            <ProtectedContent isVerified={isVerified}>
              <div>
                <h3 className="mb-4 text-base font-medium text-gray-800 dark:text-white/90">
                  City
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      City
                    </label>
                    <p className="text-base text-gray-800 dark:text-white/90">
                      {member.city || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      State
                    </label>
                    <p className="text-base text-gray-800 dark:text-white/90">
                      {member.state || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      ZIP Code
                    </label>
                    <p className="text-base text-gray-800 dark:text-white/90">
                      {member.zipCode || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </ProtectedContent>

            {/* Verification Log */}
            {isVerified && verificationData && (
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="mb-4 text-base font-medium text-gray-800 dark:text-white/90">
                  HIPAA Compliance Log
                </h3>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900/20 dark:border-green-800">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-800 dark:text-green-300">
                        Identity verified via{" "}
                        {verificationData.identifiersUsed.join(" and ")} by{" "}
                        {verificationData.verifiedBy}
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                        Access granted for current session •{" "}
                        {new Date(verificationData.verifiedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
