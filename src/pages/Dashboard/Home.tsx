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
  BoxIcon,
  CheckCircleIcon,
  MailIcon,
  PencilIcon,
} from "../../icons";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, []);
  // Static data for household members
  const householdMembers = [
    {
      id: 1,
      name: "Joshua Smith",
      role: "Policyholder",
      avatar: "./images/user/user-01.jpg",
      initials: "JS",
      color: "bg-brand-500",
    },
    {
      id: 2,
      name: "Owen Smith",
      role: "Member",
      avatar: "./images/user/user-02.jpg",
      birthDate: "07/03/2022",
      memberId: "D-195987341",
      initials: "OS",
      color: "bg-blue-light-500",
    },
    {
      id: 3,
      name: "Ava Smith",
      role: "Member",
      avatar: "./images/user/user-03.jpg",
      birthDate: "05/14/2019",
      memberId: "D-21000945301",
      initials: "AS",
      color: "bg-orange-500",
    },
  ];

  // Static activity timeline data
  const activities = [
    {
      id: 1,
      type: "call",
      title: "Call Logged",
      time: "Today · 2:14 PM",
      user: "Sarah · Sarah",
      description: "Member called regarding claim denial on 12/03. Referred to claims team",
      icon: ChatIcon,
      color: "bg-brand-500",
    },
    {
      id: 2,
      type: "ai",
      title: "AI Copilot Analysis",
      time: "Yesterday · 3:20 PM",
      badge: "Amber for NZW",
      description: "Owen Smith's recent visits",
      confidence: "82%",
      details: [
        { label: "COBRA", value: "21.82%" },
        { label: "Outpatient visit", note: "Frequent asthma exacerbations" },
        { label: "Followup", note: "scheduled with pulmonologist" },
      ],
      icon: BoxIcon,
      color: "bg-blue-light-500",
    },
    {
      id: 3,
      type: "note",
      title: "Internal Note",
      time: "Yesterday · 3:20 PM",
      user: "Ahmo",
      recipient: "member@email.com",
      icon: PencilIcon,
      color: "bg-warning-500",
    },
    {
      id: 4,
      type: "email",
      title: "Email Sent",
      time: "Jan 14 · 10:12 AM",
      recipient: "member@email.com",
      description: "Due May 8 · Run annual benefits relevant Schools",
      icon: MailIcon,
      color: "bg-success-500",
    },
    {
      id: 5,
      type: "case",
      title: "Alfred J.",
      time: "Yesterday · 11:37 AM",
      user: "Alfred J.",
      caseId: "Salesforce Case #-16321",
      description: "Lot's got a claims escalation ready...",
      icon: TaskIcon,
      color: "bg-gray-500",
    },
  ];

  // Static cases data
  const openCases = [
    {
      id: "#000B57",
      status: "Urgent",
      description: "Claims Denial Disputes",
    },
  ];

  const recentCases = [
    {
      id: "#21000455400",
      team: "Claims Team",
    },
  ];

  return (
    <>
      <PageMeta
        title="Member Overview | Atlas AI Dashboard"
        description="Member policyholder overview and activity timeline"
      />

      {isLoading ? (
        // Loading State
        <>
          {/* Member Header Skeleton */}
          <MemberHeaderSkeleton />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Left Column Skeletons */}
            <div className="space-y-6">
              <DashboardCardSkeleton />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DashboardCardSkeleton />
                <DashboardCardSkeleton />
                <DashboardCardSkeleton />
                <DashboardCardSkeleton />
              </div>
            </div>

            {/* Right Column - Activity Timeline Skeleton */}
            <div className="lg:col-span-2">
              <div className="rounded-card border border-gray-200/60 bg-white p-6 shadow-md dark:border-gray-800/60 dark:bg-white/[0.03] dark:shadow-xl/5">
                <Skeleton className="h-5 w-40 mb-6" shimmer />
                <ActivityTimelineSkeleton />
              </div>
            </div>
          </div>
        </>
      ) : (
        // Actual Content
        <>
          {/* Member Header - No Card Container */}
          <div className="mb-2 sm:mb-3">
            <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3 mb-2">
              <div className="flex-shrink-0">
                <Avatar src="./images/user/user-01.jpg" size="xlarge" status="none" />
              </div>
              <div className="flex-1 w-full min-w-0">
                <h1 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white/90 mb-1 sm:mb-2">
                  Joshua S. Smith
                </h1>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs sm:text-theme-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    Policyholder
                  </span>
                  <span className="text-xs sm:text-theme-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    D-21000945300
                  </span>
                  <span className="text-theme-xs text-gray-500 dark:text-gray-400">
                    No:
                  </span>
                  <Badge color="success" variant="light" size="sm">
                    Active
                  </Badge>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 sm:gap-6 border-b border-gray-200/40 dark:border-gray-800/40 overflow-x-auto no-scrollbar pb-px">
              <button className="pb-3 text-sm sm:text-theme-sm font-medium text-brand-500 border-b-2 border-brand-500 whitespace-nowrap flex-shrink-0">
                Overview
              </button>
              <button className="pb-3 text-sm sm:text-theme-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 whitespace-nowrap flex-shrink-0">
                Policies
              </button>
              <button className="pb-3 text-sm sm:text-theme-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 whitespace-nowrap flex-shrink-0">
                Claims
              </button>
              <button className="pb-3 text-sm sm:text-theme-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 whitespace-nowrap flex-shrink-0">
                Interactions
              </button>
              <button className="pb-3 text-sm sm:text-theme-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 whitespace-nowrap flex-shrink-0">
                Notes
              </button>
              <button className="pb-3 text-sm sm:text-theme-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 whitespace-nowrap flex-shrink-0">
                Tasks
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mt-2 sm:mt-3">
            {/* Left Column - Household & Summary Grid */}
            <div className="space-y-3 sm:space-y-4">
              {/* Household Card */}
              <GradientCard title="Household" gradient="blue">
                <div className="space-y-3 sm:space-y-4">
                  {householdMembers.map((member) => (
                    <div key={member.id} className="flex items-start gap-3">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full ${member.color} text-white text-theme-sm font-medium flex-shrink-0`}
                      >
                        {member.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-theme-sm font-medium text-gray-800 dark:text-white/90">
                          {member.name}
                        </p>
                        <p className="text-theme-xs text-gray-500 dark:text-gray-400">
                          {member.role}
                        </p>
                        {member.birthDate && (
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1">
                            <span className="text-theme-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                              Born {member.birthDate}
                            </span>
                            {member.memberId && (
                              <>
                                <span className="hidden sm:inline text-theme-xs text-gray-400">•</span>
                                <span className="text-theme-xs text-gray-500 dark:text-gray-400 break-all">
                                  Member ID: {member.memberId}
                                </span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  <button className="flex items-center gap-2 text-theme-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 mt-3 sm:mt-4">
                    <PlusIcon className="w-4 h-4 flex-shrink-0" />
                    <span>Add Member</span>
                  </button>
                </div>
              </GradientCard>

              {/* 2x2 Grid for Summary, Policies, and Cases */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Member Summary Card */}
                <GradientCard title="Member Summary" gradient="green">
                  <div className="space-y-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-theme-xs text-gray-500 dark:text-gray-400">
                          Emp:
                        </span>
                      </div>
                      <span className="text-theme-sm text-gray-800 dark:text-white/90">
                        Lebanon
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <ChatIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-theme-xs text-gray-500 dark:text-gray-400">
                          Phone:
                        </span>
                      </div>
                      <span className="text-theme-sm text-gray-800 dark:text-white/90">
                        (417) · 991
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <DocsIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-theme-xs text-gray-500 dark:text-gray-400">
                          Address:
                        </span>
                      </div>
                      <span className="text-theme-sm text-gray-800 dark:text-white/90">
                        1K12.5 Jefferson Ave, Apt Q, Lebanon, MO-65930
                      </span>
                    </div>
                  </div>
                </GradientCard>

            {/* Linked Policies Card */}
            <GradientCard 
              title="Linked Policies" 
              gradient="purple"
              actions={<button className="text-gray-400 hover:text-gray-600">→</button>}
            >
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <DocsIcon className="w-4 h-4 text-gray-400" />
                    <p className="text-theme-xs text-gray-500 dark:text-gray-400">
                      Group: Lebanon
                    </p>
                  </div>
                  <p className="text-theme-xs text-gray-600 dark:text-gray-400 ml-6">
                    Plan: A66583650 - PPO
                  </p>
                </div>
                <div className="border-t border-gray-200/40 dark:border-gray-800/40 pt-3">
                  <div className="flex items-center gap-2 mb-1">
                    <CalenderIcon className="w-4 h-4 text-gray-400" />
                    <p className="text-theme-xs text-gray-500 dark:text-gray-400">
                      Birthdate
                    </p>
                  </div>
                  <p className="text-theme-xs text-gray-500 dark:text-gray-400 ml-6 mb-1">
                    08/21/1994
                  </p>
                  <p className="text-theme-xs text-gray-600 dark:text-gray-400 ml-6">
                    SSN: •••• • 1254
                  </p>
                </div>
              </div>
            </GradientCard>

            {/* Open Cases */}
            <GradientCard 
              title="Open Cases (3)" 
              gradient="orange"
              actions={<button className="text-gray-400 hover:text-gray-600">→</button>}
            >
              {openCases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className="p-3 rounded-lg bg-white/60 dark:bg-white/[0.02] border border-gray-100/50 dark:border-gray-800/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-theme-sm font-medium text-brand-500">
                      {caseItem.id}
                    </span>
                    <Badge color="error" variant="light" size="sm">
                      {caseItem.status}
                    </Badge>
                  </div>
                  <p className="text-theme-xs text-gray-600 dark:text-gray-400">
                    {caseItem.description}
                  </p>
                </div>
              ))}
            </GradientCard>

            {/* Recent Cases */}
            <GradientCard 
              title="Recent Cases (2)" 
              gradient="gray"
              actions={<button className="text-gray-400 hover:text-gray-600">→</button>}
            >
              {recentCases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/60 dark:bg-white/[0.02] border border-gray-100/50 dark:border-gray-800/50"
                >
                  <div className="flex items-center gap-2">
                    <TaskIcon className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-theme-sm font-medium text-brand-500">
                        #{caseItem.id}
                      </p>
                      <p className="text-theme-xs text-gray-500 dark:text-gray-400">
                        {caseItem.team}
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">→</button>
                </div>
              ))}
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
                <Button size="sm" variant="primary" startIcon={<ChatIcon className="w-4 h-4" />} className="flex-shrink-0">
                  <span className="hidden xs:inline">Log Call</span>
                  <span className="xs:hidden">Call</span>
                </Button>
                <Button size="sm" variant="outline" startIcon={<EnvelopeIcon className="w-4 h-4" />} className="flex-shrink-0">
                  <span className="hidden xs:inline">Send Email</span>
                  <span className="xs:hidden">Email</span>
                </Button>
                <Button size="sm" variant="outline" startIcon={<PencilIcon className="w-4 h-4" />} className="flex-shrink-0">
                  <span className="hidden xs:inline">Add Note</span>
                  <span className="xs:hidden">Note</span>
                </Button>
                <Button size="sm" variant="outline" startIcon={<CheckCircleIcon className="w-4 h-4" />} className="flex-shrink-0">
                  <span className="hidden xs:inline">Create Task</span>
                  <span className="xs:hidden">Task</span>
                </Button>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0 hidden sm:flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <MoreDotIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Timeline Content */}
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-3 sm:pt-4 space-y-3 sm:space-y-4">
              {activities.map((activity, index) => {
                const IconComponent = activity.icon;
                const isLast = index === activities.length - 1;
                return (
                  <div key={activity.id} className="flex gap-3 sm:gap-4 relative">
                    {/* Vertical Line - stops partway with gap before next item */}
                    {!isLast && (
                      <div className="absolute left-4 sm:left-5 top-10 sm:top-12 w-px bg-gray-200 dark:bg-gray-800" style={{ height: 'calc(100% - 2rem)' }} />
                    )}
                    
                    {/* Icon Circle */}
                    <div
                      className={`relative z-10 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full ${activity.color} flex-shrink-0`}
                    >
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm sm:text-theme-sm font-medium text-gray-800 dark:text-white/90 mb-1">
                            {activity.title}
                          </h4>
                          {activity.badge && (
                            <div className="mb-1">
                              <Badge color="warning" variant="light" size="sm">
                                {activity.badge}
                              </Badge>
                            </div>
                          )}
                          {activity.user && activity.type === "call" && (
                            <p className="text-theme-xs text-gray-600 dark:text-gray-400 mb-1">
                              {activity.user}
                            </p>
                          )}
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-theme-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            {activity.time}
                          </p>
                        </div>
                      </div>

                      {activity.description && (
                        <p className="text-xs sm:text-theme-sm text-gray-700 dark:text-gray-300 mb-2">
                          {activity.description}
                        </p>
                      )}

                      {activity.confidence && (
                        <p className="text-theme-xs text-gray-600 dark:text-gray-400 mb-1">
                          Confidence score {activity.confidence}
                        </p>
                      )}

                      {activity.details && (
                        <div className="space-y-1 mt-1">
                          {activity.details.map((detail, idx) => (
                            <div
                              key={idx}
                              className="flex flex-wrap items-center gap-2 text-theme-xs"
                            >
                              {detail.value && (
                                <Badge color="primary" variant="light" size="sm">
                                  {detail.label} · {detail.value}
                                </Badge>
                              )}
                              {detail.note && (
                                <span className="text-gray-600 dark:text-gray-400">
                                  {detail.label} · {detail.note}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {activity.recipient && (
                        <p className="text-theme-xs text-gray-500 dark:text-gray-400 mt-1">
                          to {activity.recipient}
                        </p>
                      )}

                      {activity.caseId && (
                        <p className="text-theme-xs text-gray-500 dark:text-gray-400 mt-1">
                          {activity.caseId}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
        </>
      )}
    </>
  );
}
