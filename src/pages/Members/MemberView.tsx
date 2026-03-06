import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import GradientCard from "../../components/common/GradientCard";
import Avatar from "../../components/ui/avatar/Avatar";
import Badge from "../../components/ui/badge/Badge";
import Button from "../../components/ui/button/Button";
import {
  Skeleton,
  DashboardCardSkeleton,
  ActivityTimelineSkeleton,
  MemberHeaderSkeleton,
} from "../../components/ui/skeleton/Skeleton";
import {
  PlusIcon,
  MoreDotIcon,
  EnvelopeIcon,
  CalenderIcon,
  UserIcon,
  ChatIcon,
  TaskIcon,
  DocsIcon,
  CheckCircleIcon,
  PencilIcon,
} from "../../icons";
import { memberService, hipaaAuditService, dependentService } from "../../services";
import { Member, Dependent } from "../../models";
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
        agentUser: "Current Agent",
        success: true,
      });
    }
  };

  const handleCloseModal = () => {
    setShowVerificationModal(false);
    navigate("/members");
  };

  if (loading) {
    return (
      <>
        <PageMeta
          title="Loading Member | Atlas AI Dashboard"
          description="Loading member information"
        />
        <MemberHeaderSkeleton />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="space-y-6">
            <DashboardCardSkeleton />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DashboardCardSkeleton />
              <DashboardCardSkeleton />
              <DashboardCardSkeleton />
              <DashboardCardSkeleton />
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="rounded-card border border-gray-200/60 bg-white p-6 shadow-md dark:border-gray-800/60 dark:bg-white/[0.03] dark:shadow-xl/5">
              <Skeleton className="h-5 w-40 mb-6" shimmer />
              <ActivityTimelineSkeleton />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!member) {
    return (
      <>
        <PageMeta
          title="Member Not Found | Atlas AI Dashboard"
          description="Member not found"
        />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mb-4 text-6xl">🔍</div>
            <h2 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
              Member Not Found
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              The member you're looking for doesn't exist
            </p>
            <Button onClick={() => navigate("/members")}>
              Back to Members
            </Button>
          </div>
        </div>
      </>
    );
  }

  // Show verification modal if not verified
  if (!isVerified) {
    return (
      <>
        <PageMeta
          title="HIPAA Verification Required | Atlas AI Dashboard"
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

  return (
    <>
      <PageMeta
        title={`${member.firstName} ${member.lastName} | Atlas AI Dashboard`}
        description="Member profile and activity overview"
      />

      {/* HIPAA Verification Banner */}
      <div className="mb-4 sm:mb-6 rounded-2xl border border-gray-200/60 bg-white p-4 sm:p-6 shadow-sm dark:border-gray-800/60 dark:bg-white/[0.03]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">
              HIPAA Verification
            </h3>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Verification Type:
                </label>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  {verificationData?.verificationType
                    ? verificationData.verificationType.charAt(0).toUpperCase() +
                      verificationData.verificationType.slice(1)
                    : "Authorized"}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {verificationData?.identifiers.includes("dateOfBirth") && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-success-600 dark:text-success-400">✓</span>
                    <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      Date of Birth
                    </span>
                  </div>
                )}
                {verificationData?.identifiers.includes("memberId") && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-success-600 dark:text-success-400">✓</span>
                    <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      member Id
                    </span>
                  </div>
                )}
                {verificationData?.identifiers.includes("fullName") && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-success-600 dark:text-success-400">✓</span>
                    <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      full Name
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-success-100 px-4 py-2 dark:bg-success-900/30">
              <span className="text-sm font-semibold text-success-700 dark:text-success-400">
                HIPAA Verified ✓
              </span>
              <p className="mt-0.5 text-xs text-success-600 dark:text-success-500">
                Verified on{" "}
                {verificationData?.verifiedAt
                  ? new Date(verificationData.verifiedAt).toLocaleDateString()
                  : new Date().toLocaleDateString()}
              </p>
            </div>
            <button className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 whitespace-nowrap">
              Verification Complete →
            </button>
          </div>
        </div>
      </div>

      {/* Member Header */}
      <div className="mb-3 sm:mb-4 lg:mb-6">
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="flex-shrink-0">
            <Avatar src="/images/user/665e03626d1bbcf52404493e56003bc1.jpg" size="xlarge" status="none" />
          </div>
          <div className="flex-1 w-full min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-white/90">
                {member.firstName} {member.middleInitial ? `${member.middleInitial}. ` : ""}{member.lastName}
              </h1>
              {/* HIPAA Verified Shield Badge */}
              <div className="flex-shrink-0" title="HIPAA Verified">
                <svg
                  className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-success-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2L4 6V12C4 16.55 7.16 20.74 12 22C16.84 20.74 20 16.55 20 12V6L12 2ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z" />
                </svg>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-sm sm:text-theme-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                {member.relationshipType}
              </span>
              <span className="text-sm sm:text-theme-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {member.id}
              </span>
              <Badge
                color={member.memberStatus === "Active" ? "success" : "error"}
                variant="light"
                size="sm"
              >
                {member.memberStatus}
              </Badge>
              {member.cobra && (
                <Badge color="warning" variant="light" size="sm">
                  COBRA
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 sm:gap-6 border-b border-gray-200/40 dark:border-gray-800/40 overflow-x-auto no-scrollbar pb-px">
          <button className="pb-2.5 sm:pb-3 text-sm sm:text-theme-sm font-medium text-brand-500 border-b-2 border-brand-500 whitespace-nowrap flex-shrink-0">
            Overview
          </button>
          <button className="pb-2.5 sm:pb-3 text-sm sm:text-theme-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 whitespace-nowrap flex-shrink-0">
            Policies
          </button>
          <button className="pb-2.5 sm:pb-3 text-sm sm:text-theme-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 whitespace-nowrap flex-shrink-0">
            Claims
          </button>
          <button className="pb-2.5 sm:pb-3 text-sm sm:text-theme-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 whitespace-nowrap flex-shrink-0">
            Interactions
          </button>
          <button className="pb-2.5 sm:pb-3 text-sm sm:text-theme-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 whitespace-nowrap flex-shrink-0">
            Notes
          </button>
          <button className="pb-2.5 sm:pb-3 text-sm sm:text-theme-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 whitespace-nowrap flex-shrink-0">
            Tasks
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        {/* Left Column - Member Info & Details Grid */}
        <div className="space-y-4 sm:space-y-5 lg:space-y-6">
          {/* Household Card */}
          {member.relationshipType === "Subscriber" && (
            <GradientCard title="Household" gradient="blue">
              <div className="space-y-3 sm:space-y-4">
                {/* Subscriber */}
                <div className="flex items-start gap-2.5 sm:gap-3 md:gap-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src="/images/user/665e03626d1bbcf52404493e56003bc1.jpg" 
                      alt={`${member.firstName} ${member.lastName}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-theme-sm font-medium text-gray-800 dark:text-white/90 mb-0.5">
                      {member.firstName} {member.lastName}
                    </p>
                    <p className="text-xs sm:text-theme-xs text-gray-500 dark:text-gray-400 mb-1">
                      {member.relationshipType}
                    </p>
                    <div className="flex flex-col gap-0.5 mt-1">
                      <span className="text-xs sm:text-theme-xs text-gray-500 dark:text-gray-400">
                        Born {member.birthdate}
                      </span>
                      <span className="text-xs sm:text-theme-xs text-gray-500 dark:text-gray-400">
                        Member ID: {member.id}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dependents */}
                {dependents.map((dependent, index) => (
                  <div key={dependent.id} className="flex items-start gap-2.5 sm:gap-3 md:gap-4">
                    <div
                      className={`flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full ${
                        index === 0 ? "bg-blue-light-500" : "bg-orange-500"
                      } text-white text-sm sm:text-theme-sm font-medium flex-shrink-0`}
                    >
                      {dependent.name.split(" ").map(n => n.charAt(0)).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-theme-sm font-medium text-gray-800 dark:text-white/90 mb-0.5">
                        {dependent.name}
                      </p>
                      <p className="text-xs sm:text-theme-xs text-gray-500 dark:text-gray-400 mb-1">
                        {dependent.relationship}
                      </p>
                      <div className="flex flex-col gap-0.5 mt-1">
                        <span className="text-xs sm:text-theme-xs text-gray-500 dark:text-gray-400">
                          Born {dependent.dateOfBirth}
                        </span>
                        <span className="text-xs sm:text-theme-xs text-gray-500 dark:text-gray-400">
                          Member ID: {dependent.memberId}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <button className="flex items-center gap-2 text-sm sm:text-theme-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 mt-3 sm:mt-4 pt-2 border-t border-gray-200/40 dark:border-gray-800/40">
                  <PlusIcon className="w-4 h-4 flex-shrink-0" />
                  <span>Add Dependent</span>
                </button>
              </div>
            </GradientCard>
          )}

          {/* 2x2 Grid for Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            {/* Member Summary Card */}
            <GradientCard title="Member Info" gradient="green">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-xs sm:text-theme-xs text-gray-500 dark:text-gray-400">
                      Sex:
                    </span>
                  </div>
                  <span className="text-sm sm:text-theme-sm text-gray-800 dark:text-white/90 pl-6">
                    {member.sex}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <ChatIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-xs sm:text-theme-xs text-gray-500 dark:text-gray-400">
                      Phone:
                    </span>
                  </div>
                  <span className="text-sm sm:text-theme-sm text-gray-800 dark:text-white/90 pl-6">
                    {member.phoneNumber || "N/A"}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <DocsIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-xs sm:text-theme-xs text-gray-500 dark:text-gray-400">
                      SSN:
                    </span>
                  </div>
                  <span className="text-sm sm:text-theme-sm text-gray-800 dark:text-white/90 pl-6">
                    {member.ssn}
                  </span>
                </div>
              </div>
            </GradientCard>

            {/* Coverage Details Card */}
            <GradientCard
              title="Coverage"
              gradient="purple"
              actions={<button className="text-gray-400 hover:text-gray-600">→</button>}
            >
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <CalenderIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <p className="text-xs sm:text-theme-xs text-gray-500 dark:text-gray-400">
                      Effective Date
                    </p>
                  </div>
                  <p className="text-xs sm:text-theme-xs text-gray-600 dark:text-gray-400 pl-6">
                    {member.coverageEffectiveDate || "N/A"}
                  </p>
                </div>
                <div className="border-t border-gray-200/40 dark:border-gray-800/40 pt-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <CalenderIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <p className="text-xs sm:text-theme-xs text-gray-500 dark:text-gray-400">
                      Term Date
                    </p>
                  </div>
                  <p className="text-xs sm:text-theme-xs text-gray-500 dark:text-gray-400 pl-6 mb-1">
                    {member.coverageTermDate || "N/A"}
                  </p>
                  <p className="text-xs sm:text-theme-xs text-gray-600 dark:text-gray-400 pl-6">
                    Tier: {member.coverageTier || "N/A"}
                  </p>
                </div>
              </div>
            </GradientCard>

            {/* Plan Details */}
            <GradientCard
              title="Plan Details"
              gradient="orange"
              actions={<button className="text-gray-400 hover:text-gray-600">→</button>}
            >
              <div className="p-3 sm:p-4 rounded-lg bg-white/60 dark:bg-white/[0.02] border border-gray-100/50 dark:border-gray-800/50">
                <div className="mb-2">
                  <span className="text-sm sm:text-theme-sm font-medium text-brand-500">
                    {member.planName}
                  </span>
                </div>
                <p className="text-xs sm:text-theme-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-1">
                  Plan ID: {member.planId}
                </p>
                <p className="text-xs sm:text-theme-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Group: {member.groupNumber}
                </p>
              </div>
            </GradientCard>

            {/* Contact Info */}
            <GradientCard
              title="Contact"
              gradient="gray"
              actions={<button className="text-gray-400 hover:text-gray-600">→</button>}
            >
              <div className="space-y-2">
                <div>
                  <p className="text-xs sm:text-theme-xs text-gray-500 dark:text-gray-400 mb-1">
                    Email:
                  </p>
                  <p className="text-xs sm:text-theme-xs text-gray-700 dark:text-gray-300 break-all">
                    {member.email}
                  </p>
                </div>
                <div className="border-t border-gray-200/40 dark:border-gray-800/40 pt-2">
                  <p className="text-xs sm:text-theme-xs text-gray-500 dark:text-gray-400 mb-1">
                    Address:
                  </p>
                  <p className="text-xs sm:text-theme-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                    {member.addressLine1}
                    {member.addressLine2 && `, ${member.addressLine2}`}
                    <br />
                    {member.city}, {member.state} {member.zipCode}
                  </p>
                </div>
              </div>
            </GradientCard>
          </div>
        </div>

        {/* Right Column - Activity Timeline */}
        <div className="lg:col-span-2">
          <div className="rounded-card border border-gray-200/60 bg-gradient-to-br from-white to-indigo-50/40 shadow-md dark:border-gray-800/60 dark:from-white/[0.03] dark:to-brand-500/[0.05] dark:shadow-xl/5 overflow-hidden">
            {/* Header */}
            <div className="border-b border-gray-200/40 bg-white/95 backdrop-blur-sm px-4 sm:px-6 py-4 sm:py-6 dark:border-gray-800/40 dark:bg-gray-dark/95">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-theme-sm font-semibold text-gray-800 dark:text-white/90">
                  Activity Timeline
                </h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreDotIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                <Button
                  size="sm"
                  variant="primary"
                  startIcon={<ChatIcon className="w-4 h-4" />}
                  className="flex-shrink-0"
                >
                  <span className="hidden xs:inline">Log Call</span>
                  <span className="xs:hidden">Call</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  startIcon={<EnvelopeIcon className="w-4 h-4" />}
                  className="flex-shrink-0"
                >
                  <span className="hidden xs:inline">Send Email</span>
                  <span className="xs:hidden">Email</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  startIcon={<PencilIcon className="w-4 h-4" />}
                  className="flex-shrink-0"
                >
                  <span className="hidden xs:inline">Add Note</span>
                  <span className="xs:hidden">Note</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  startIcon={<CheckCircleIcon className="w-4 h-4" />}
                  className="flex-shrink-0"
                >
                  <span className="hidden xs:inline">Create Task</span>
                  <span className="xs:hidden">Task</span>
                </Button>
                <Link
                  to={`/members/edit/${member.id}`}
                  className="flex-shrink-0"
                >
                  <Button
                    size="sm"
                    variant="outline"
                    startIcon={<PencilIcon className="w-4 h-4" />}
                  >
                    <span className="hidden xs:inline">Edit Member</span>
                    <span className="xs:hidden">Edit</span>
                  </Button>
                </Link>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0 hidden sm:flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <MoreDotIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Timeline Content */}
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-3 sm:pt-4 space-y-3 sm:space-y-4">
              {/* HIPAA Verification Activity */}
              <div className="flex gap-3 sm:gap-4 relative">
                <div className="relative z-10 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-success-500 flex-shrink-0">
                  <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm sm:text-theme-sm font-medium text-gray-800 dark:text-white/90 mb-1">
                        HIPAA Verified
                      </h4>
                      <div className="mb-1">
                        <Badge color="success" variant="light" size="sm">
                          {verificationData?.verificationType
                            ? verificationData.verificationType.charAt(0).toUpperCase() +
                              verificationData.verificationType.slice(1)
                            : "Authorized"}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-theme-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {verificationData?.verifiedAt
                          ? new Date(verificationData.verifiedAt).toLocaleString()
                          : "Just now"}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-theme-sm text-gray-700 dark:text-gray-300 mb-2">
                    Member verified via{" "}
                    {verificationData?.identifiers
                      .map((id) => {
                        if (id === "dateOfBirth") return "Date of Birth";
                        if (id === "addressZip") return "ZIP Code";
                        if (id === "ssnLast4") return "Last 4 of SSN";
                        if (id === "memberId") return "Member ID";
                        if (id === "fullName") return "Full Name";
                        return id;
                      })
                      .join(", ")}
                  </p>

                  {verificationData?.providerName && (
                    <p className="text-theme-xs text-gray-500 dark:text-gray-400 mt-1">
                      Provider: {verificationData.providerName}
                      {verificationData.providerNPI && ` (NPI: ${verificationData.providerNPI})`}
                    </p>
                  )}
                </div>
              </div>

              {/* Placeholder for future activities */}
              <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                No additional activities yet
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-4 sm:mt-6">
            <Button variant="outline" onClick={() => navigate("/members")}>
              ← Back to Members
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
