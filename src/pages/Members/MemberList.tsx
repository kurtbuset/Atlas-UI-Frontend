import { useEffect, useState } from "react";
import { Link } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import { memberService, Member } from "../../services/memberService";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";

export default function MemberList() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    setLoading(true);
    const data = await memberService.getAll();
    setMembers(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      await memberService.delete(id);
      loadMembers();
    }
  };

  return (
    <>
      <PageMeta title="Members | TailAdmin" description="Manage members" />
      <PageBreadcrumb pageTitle="Members" />
      <div className="space-y-6">
        {/* HIPAA Notice */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                HIPAA Protected Information
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                Sensitive member data (Member ID, Email) is blurred for privacy.
                Click "View" to verify identity and access full PHI.
              </p>
            </div>
          </div>
        </div>

        <ComponentCard
          title="Member Data"
          action={
            <Link
              to="/members/new"
              className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 whitespace-nowrap"
            >
              <span className="sm:hidden">Add</span>
              <span className="hidden sm:inline">Add Member</span>
            </Link>
          }
        >
          {loading ? (
            <div className="py-8 text-center text-gray-500">Loading...</div>
          ) : (
            <div className="overflow-hidden rounded-lg sm:rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
              <div className="max-w-full overflow-x-auto">
                <Table>
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                      <TableCell
                        isHeader
                        className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 font-medium text-gray-500 text-start text-xs sm:text-theme-xs dark:text-gray-400"
                      >
                        Member ID
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 font-medium text-gray-500 text-start text-xs sm:text-theme-xs dark:text-gray-400"
                      >
                        Name
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 font-medium text-gray-500 text-start text-xs sm:text-theme-xs dark:text-gray-400"
                      >
                        Email
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 font-medium text-gray-500 text-start text-xs sm:text-theme-xs dark:text-gray-400"
                      >
                        Status
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 font-medium text-gray-500 text-start text-xs sm:text-theme-xs dark:text-gray-400"
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {members.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 text-gray-500 text-start text-xs sm:text-theme-sm dark:text-gray-400">
                          <span className="blur-[3px] select-none">
                            {member.memberId}
                          </span>
                        </TableCell>
                        <TableCell className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 text-start">
                          <span className="font-medium text-gray-800 text-xs sm:text-theme-sm dark:text-white/90">
                            {member.firstName} {member.lastName}
                          </span>
                        </TableCell>
                        <TableCell className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 text-gray-500 text-start text-xs sm:text-theme-sm dark:text-gray-400">
                          <span className="blur-[3px] select-none">
                            {member.email}
                          </span>
                        </TableCell>
                        <TableCell className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 text-start">
                          <Badge
                            size="sm"
                            color={
                              member.memberStatus === "Active"
                                ? "success"
                                : "error"
                            }
                          >
                            {member.memberStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 text-start">
                          <div className="flex gap-2 sm:gap-3">
                            <Link
                              to={`/members/view/${member.id}`}
                              className="text-xs sm:text-sm text-blue-500 hover:text-blue-600 font-medium"
                            >
                              View
                            </Link>
                            <Link
                              to={`/members/edit/${member.id}`}
                              className="text-xs sm:text-sm text-brand-500 hover:text-brand-600"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(member.id)}
                              className="text-xs sm:text-sm text-red-500 hover:text-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </ComponentCard>
      </div>
    </>
  );
}
