import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import { memberService, hipaaAuditService, dependentService } from "../../services";
import { Member, Dependent } from "../../models";
import Badge from "../../components/ui/badge/Badge";
import HIPAAVerificationModal, {
  VerificationData,
} from "../../components/modals/HIPAAVerificationModal";

export default function MemberView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [showVerificationModal, setShowVerificationModal] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationData, setVerificationData] =
    useState<VerificationData | null>(null);
  const [dependents, setDependents] = useState<Dependent[]>([]);

  useEffect(() => {
    if (id) {
      loadMember(id);
    }
  }, [id]);

  const loadMember = async (memberId: string) => {
    setLoading(true);
    const data = await memberService.getById(memberId);
    setMember(data || null);
    
    // Load dependents if member is a subscriber
    if (data && data.relationshipType === "Subscriber") {
      const deps = await dependentService.getBySubscriberId(memberId);
      setDependents(deps);
    }
    
    setLoading(false);
  };

  const handleVerification = (data: VerificationData) => {
    setVerificationData(data);
    setIsVerified(true);
    setShowVerificationModal(false);
    
    // Log verification for audit trail
    if (member) {
      hipaaAuditService.log({
        memberId: member.id,
        memberName: `${member.firstName} ${member.lastName}`,
        verificationType: data.verificationType,
        identifiers: data.identifiers,
        providerName: data.providerName,
        providerNPI: data.providerNPI,
        providerTIN: data.providerTIN,
        verifiedAt: data.verifiedAt,
        agentUser: "Current Agent", // In production, get from auth context
        success: true,
      });
    }
  };

  const handleCloseModal = () => {
    setShowVerificationModal(false);
    navigate("/members");
  };

  if (loading) {
    return <div className="py-8 text-center text-gray-500">Loading...</div>;
  }

  if (!member) {
    return (
      <div className="py-8 text-center text-gray-500">Member not found</div>
    );
  }

  // Show verification modal if not verified
  if (!isVerified) {
    return (
      <>
        <PageMeta
          title="HIPAA Verification Required | TailAdmin"
          description="Verify identity to access member information"
        />
        <HIPAAVerificationModal
          isOpen={showVerificationModal}
          onClose={handleCloseModal}
          onVerify={handleVerification}
          memberName={`${member.firstName} ${member.lastName}`}
        />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mb-4 text-6xl">🔒</div>
            <h2 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
              HIPAA Verification Required
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Please complete verification to access member information
            </p>
          </div>
        </div>
      </>
    );
  }

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

      <div className="space-y-6">
        {/* HIPAA Verification Section */}
        <ComponentCard title="Member Profile">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800/50">
            <h3 className="mb-4 text-sm font-semibold text-gray-800 dark:text-white">
              HIPAA Verification
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div>
                  <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">
                    Verification Type:
                  </label>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    {verificationData?.verificationType 
                      ? verificationData.verificationType.charAt(0).toUpperCase() + 
                        verificationData.verificationType.slice(1)
                      : "N/A"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {verificationData?.identifiers.includes("dateOfBirth") && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Date of Birth
                      </span>
                    </div>
                  )}
                  {verificationData?.identifiers.includes("addressZip") && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        ZIP Code
                      </span>
                    </div>
                  )}
                  {verificationData?.identifiers.includes("ssnLast4") && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Last 4 of SSN
                      </span>
                    </div>
                  )}
                  {verificationData?.identifiers.slice(0, 3).map((id, idx) => {
                    if (!["dateOfBirth", "addressZip", "ssnLast4"].includes(id)) {
                      return (
                        <div key={idx} className="flex items-center gap-1.5">
                          <span className="text-green-600 dark:text-green-400">✓</span>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {id.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-green-100 px-4 py-2 dark:bg-green-900/30">
                  <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                    HIPAA Verified ✓
                  </span>
                  <p className="mt-0.5 text-xs text-green-600 dark:text-green-500">
                    Verified on {new Date(verificationData?.verifiedAt || "").toLocaleDateString()}
                  </p>
                </div>
                <button className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600">
                  Verification Complete →
                </button>
              </div>
            </div>
          </div>
        </ComponentCard>

        {/* Household Section */}
        {member.relationshipType === "Subscriber" && (
          <ComponentCard 
            title="Household"
            action={
              <button className="text-sm font-medium text-brand-500 hover:text-brand-600">
                + Add Dependent
              </button>
            }
          >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Subscriber Info Card */}
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800/50">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-lg font-semibold text-brand-600 dark:bg-brand-900/30">
                    {member.firstName.charAt(0)}{member.lastName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      {member.firstName} {member.lastName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Subscriber
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Member ID:
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      {member.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Phone:
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      {member.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dependents Table */}
              <div className="lg:col-span-2">
                {dependents.length > 0 ? (
                  <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-800/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                            Name
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                            Relationship
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                            DOB
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                            Member ID
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                        {dependents.map((dependent) => (
                          <tr key={dependent.id}>
                            <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-white">
                              {dependent.name}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                              {dependent.relationship}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                              {dependent.dateOfBirth}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                              {dependent.memberId}
                            </td>
                            <td className="px-4 py-3">
                              <Badge
                                size="sm"
                                color={
                                  dependent.status === "Active"
                                    ? "success"
                                    : "error"
                                }
                              >
                                {dependent.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-800/50">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No dependents added yet
                    </p>
                  </div>
                )}
              </div>
            </div>
          </ComponentCard>
        )}

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Member Information */}
          <ComponentCard title="Member Information">
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400">
                  Member ID:
                </label>
                <p className="mt-1 text-sm font-medium text-gray-800 dark:text-white">
                  {member.id}
                </p>
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400">
                  Date of Birth:
                </label>
                <p className="mt-1 text-sm font-medium text-gray-800 dark:text-white">
                  {member.birthdate}
                </p>
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400">
                  Phone:
                </label>
                <p className="mt-1 text-sm font-medium text-gray-800 dark:text-white">
                  {member.phoneNumber || "N/A"}
                </p>
              </div>
            </div>
          </ComponentCard>

          {/* Coverage Details */}
          <ComponentCard title="Coverage Details">
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400">
                  Effective Date:
                </label>
                <p className="mt-1 text-sm font-medium text-gray-800 dark:text-white">
                  {member.coverageEffectiveDate || "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400">
                  Term Date:
                </label>
                <p className="mt-1 text-sm font-medium text-gray-800 dark:text-white">
                  {member.coverageTermDate || "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400">
                  Coverage:
                </label>
                <p className="mt-1 text-sm font-medium text-gray-800 dark:text-white">
                  {member.coverageTier || "N/A"}
                </p>
              </div>
            </div>
          </ComponentCard>

          {/* Contact Information */}
          <ComponentCard title="Contact Information">
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400">
                  Address:
                </label>
                <p className="mt-1 text-sm font-medium text-gray-800 dark:text-white">
                  {member.addressLine1}
                  {member.addressLine2 && `, ${member.addressLine2}`}
                  <br />
                  {member.city}, {member.state} {member.zipCode}
                </p>
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400">
                  Email:
                </label>
                <p className="mt-1 text-sm font-medium text-gray-800 dark:text-white">
                  {member.email}
                </p>
              </div>
            </div>
          </ComponentCard>
        </div>

        {/* Activity Timeline */}
        <ComponentCard title="Activity Timeline">
          <div className="space-y-4">
            <div className="flex items-start gap-4 border-b border-gray-200 pb-4 dark:border-gray-700">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30">
                ✓
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  HIPAA Verified - Member Verified via DOB, ZIP Code, Last 4 of SSN
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  By Agent Sarah at {new Date(verificationData?.verifiedAt || "").toLocaleString()}
                </p>
              </div>
              <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                Call
              </button>
            </div>
          </div>
        </ComponentCard>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => navigate("/members")}
            className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Back to List
          </button>
          <div className="flex gap-3">
            <button className="rounded-lg border border-brand-500 bg-white px-6 py-2.5 text-sm font-medium text-brand-500 hover:bg-brand-50 dark:bg-gray-900 dark:hover:bg-brand-900/20">
              + Log Call
            </button>
            <button className="rounded-lg border border-brand-500 bg-white px-6 py-2.5 text-sm font-medium text-brand-500 hover:bg-brand-50 dark:bg-gray-900 dark:hover:bg-brand-900/20">
              + Add Note
            </button>
            <button className="rounded-lg border border-brand-500 bg-white px-6 py-2.5 text-sm font-medium text-brand-500 hover:bg-brand-50 dark:bg-gray-900 dark:hover:bg-brand-900/20">
              + Create Task
            </button>
            <Link
              to={`/members/edit/${member.id}`}
              className="rounded-lg bg-brand-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
            >
              Edit Member
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
