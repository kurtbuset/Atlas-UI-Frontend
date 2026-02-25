import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import { memberService, Member } from "../../services/memberService";
import Badge from "../../components/ui/badge/Badge";

export default function MemberView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadMember(id);
    }
  }, [id]);

  const loadMember = async (memberId: string) => {
    setLoading(true);
    const data = await memberService.getById(memberId);
    setMember(data || null);
    setLoading(false);
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
      <div className="space-y-6">
        <ComponentCard
          title="Member Data"
          action={
            <div className="flex gap-3">
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

            {/* Primary Address */}
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

            {/* City */}
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
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
