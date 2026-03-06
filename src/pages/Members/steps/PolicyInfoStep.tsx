import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Select from "../../../components/form/Select";
import { Member } from "../../../models";
import { mockGroups } from "../../../data";

interface PolicyInfoStepProps {
  formData: Partial<Member>;
  onChange: (field: keyof Member, value: string | boolean) => void;
  onGroupChange?: (groupName: string, groupNumber: string) => void;
  errors?: Record<string, string>;
}

export default function PolicyInfoStep({
  formData,
  onChange,
  onGroupChange,
  errors = {},
}: PolicyInfoStepProps) {
  const groupOptions = mockGroups.map((group) => ({
    value: group.id,
    label: group.name,
  }));

  const handleGroupChange = (groupId: string) => {
    const selectedGroup = mockGroups.find((g) => g.id === groupId);
    if (selectedGroup && onGroupChange) {
      onGroupChange(selectedGroup.name, selectedGroup.groupNumber);
    } else if (selectedGroup) {
      // Fallback to individual onChange calls
      onChange("accountGroupName", selectedGroup.name);
      onChange("groupNumber", selectedGroup.groupNumber);
    }
  };

  // Find the selected group ID based on the group name
  const selectedGroupId =
    mockGroups.find((g) => g.name === formData.accountGroupName)?.id || "";

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-base font-medium text-gray-800 dark:text-white/90">
          Policy Information
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label>
              Account / Group Name <span className="text-red-500">*</span>
            </Label>
            <Select
              options={groupOptions}
              placeholder="Select account/group"
              value={selectedGroupId}
              onChange={handleGroupChange}
              className="dark:bg-dark-900"
            />
            {errors.accountGroupName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.accountGroupName}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="groupNumber">
              Group Number <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="groupNumber"
              value={formData.groupNumber || ""}
              onChange={(e) => onChange("groupNumber", e.target.value)}
              disabled
              className="bg-gray-100 dark:bg-gray-800"
            />
            <p className="mt-1 text-xs text-gray-500">
              Auto-filled based on selected group
            </p>
          </div>
          <div>
            <Label htmlFor="planName">
              Plan Name <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="planName"
              value={formData.planName || ""}
              onChange={(e) => onChange("planName", e.target.value)}
              required
            />
            {errors.planName && (
              <p className="mt-1 text-xs text-red-500">{errors.planName}</p>
            )}
          </div>
          <div>
            <Label htmlFor="planId">
              Plan ID / Plan Number <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="planId"
              value={formData.planId || ""}
              onChange={(e) => onChange("planId", e.target.value)}
              required
            />
            {errors.planId && (
              <p className="mt-1 text-xs text-red-500">{errors.planId}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="cobra"
              checked={formData.cobra || false}
              onChange={(e) => onChange("cobra", e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
            />
            <Label htmlFor="cobra" className="mb-0">
              COBRA Flag
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}
