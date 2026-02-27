import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import { memberService, Member } from "../../services/memberService";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import { CalenderIcon } from "../../icons";

export default function MemberForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState<Omit<Member, "id">>({
    firstName: "",
    lastName: "",
    sex: "",
    birthdate: "",
    memberId: "",
    ssn: "",
    memberStatus: "Active",
    addressLine1: "",
    city: "",
    state: "",
    zipCode: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      loadMember(id);
    }
  }, [id, isEdit]);

  const loadMember = async (memberId: string) => {
    const member = await memberService.getById(memberId);
    if (member) {
      const { id: _, ...memberData } = member;
      setFormData(memberData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (dates: Date[]) => {
    if (dates.length > 0) {
      const date = dates[0];
      const formattedDate = date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
      setFormData({
        ...formData,
        birthdate: formattedDate,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent, saveAndClose = false) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit && id) {
        await memberService.update(id, formData);
      } else {
        await memberService.create(formData);
      }

      if (saveAndClose) {
        navigate("/members");
      } else {
        // Reset form for new entry
        if (!isEdit) {
          setFormData({
            firstName: "",
            lastName: "",
            sex: "",
            birthdate: "",
            memberId: "",
            ssn: "",
            memberStatus: "Active",
            addressLine1: "",
            city: "",
            state: "",
            zipCode: "",
            email: "",
          });
        }
      }
    } catch (error) {
      console.error("Error saving member:", error);
    } finally {
      setLoading(false);
    }
  };

  const sexOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  const stateOptions = [
    { value: "MO", label: "MO" },
    { value: "IL", label: "IL" },
    { value: "KS", label: "KS" },
  ];

  return (
    <>
      <PageMeta
        title={`${isEdit ? "Edit" : "Add"} Member | TailAdmin`}
        description="Member form"
      />
      <PageBreadcrumb pageTitle={isEdit ? "Edit Member" : "Add Member"} />
      <div className="space-y-6">
        <ComponentCard title="Member Data">
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Fill out the form below with the member's information.
          </p>
          <form onSubmit={(e) => handleSubmit(e, true)}>
            <div className="space-y-6">
              {/* Member Information */}
              <div>
                <h3 className="mb-4 text-base font-medium text-gray-800 dark:text-white/90">
                  Member Information
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Sex</Label>
                    <Select
                      options={sexOptions}
                      placeholder="Select sex"
                      value={formData.sex}
                      onChange={(value) => handleSelectChange("sex", value)}
                      className="dark:bg-dark-900"
                    />
                  </div>
                  <div>
                    <Label htmlFor="birthdate">Birthdate</Label>
                    <div className="relative w-full flatpickr-wrapper">
                      <Flatpickr
                        value={formData.birthdate}
                        onChange={handleDateChange}
                        options={{
                          dateFormat: "Y-m-d",
                          maxDate: "today",
                        }}
                        placeholder="Select birthdate"
                        className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
                      />
                      <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                        <CalenderIcon className="size-6" />
                      </span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="memberId">Member ID</Label>
                    <Input
                      type="text"
                      id="memberId"
                      name="memberId"
                      value={formData.memberId}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="ssn">SSN</Label>
                    <Input
                      type="text"
                      id="ssn"
                      name="ssn"
                      value={formData.ssn}
                      onChange={handleChange}
                      placeholder="***-**-9872"
                    />
                  </div>
                  <div>
                    <Label>Member Status</Label>
                    <Select
                      options={statusOptions}
                      placeholder="Select status"
                      value={formData.memberStatus}
                      onChange={(value) =>
                        handleSelectChange("memberStatus", value)
                      }
                      className="dark:bg-dark-900"
                    />
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
                    <Label htmlFor="addressLine1">Address Line 1</Label>
                    <Input
                      type="text"
                      id="addressLine1"
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jacob.smith@email.com"
                    />
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
                    <Label htmlFor="city">City</Label>
                    <Input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label>State</Label>
                    <Select
                      options={stateOptions}
                      placeholder="Select state"
                      value={formData.state}
                      onChange={(value) => handleSelectChange("state", value)}
                      className="dark:bg-dark-900"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/members")}
                  className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  disabled={loading}
                >
                  Cancel
                </button>
                {/* <button
                  type="button"
                  onClick={(e) => handleSubmit(e, false)}
                  className="px-6 py-2.5 text-sm font-medium text-white bg-gray-500 rounded-lg hover:bg-gray-600 disabled:opacity-50"
                  disabled={loading}
                >
                  Save Changes
                </button> */}
                <button
                  type="submit"
                  className="px-6 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 disabled:opacity-50"
                  disabled={loading}
                >
                  Save & Close
                </button>
              </div>
            </div>
          </form>
        </ComponentCard>
      </div>
    </>
  );
}
