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
                          {member.memberId}
                        </TableCell>
                        <TableCell className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 text-start">
                          <span className="font-medium text-gray-800 text-xs sm:text-theme-sm dark:text-white/90">
                            {member.firstName} {member.lastName}
                          </span>
                        </TableCell>
                        <TableCell className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 text-gray-500 text-start text-xs sm:text-theme-sm dark:text-gray-400">
                          {member.email}
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
                              className="text-xs sm:text-sm text-blue-500 hover:text-blue-600"
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
