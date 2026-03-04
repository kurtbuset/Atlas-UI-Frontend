import { useState } from "react";
import { CloseIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { VerificationData } from "../../models/HIPAAAudit";

interface HIPAAVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (verificationData: VerificationData) => void;
  memberName: string;
}

export type { VerificationData };

const identifierOptions = [
  { value: "memberId", label: "Member ID" },
  { value: "fullName", label: "Full Name" },
  { value: "dateOfBirth", label: "Date of Birth" },
  { value: "addressZip", label: "Address or Zip Code" },
  { value: "ssnLast4", label: "Last 4 Digits of SSN" },
  { value: "phoneEmail", label: "Phone Number or Email" },
];

export default function HIPAAVerificationModal({
  isOpen,
  onClose,
  onVerify,
  memberName,
}: HIPAAVerificationModalProps) {
  const [verificationType, setVerificationType] = useState<string>("");
  const [selectedIdentifiers, setSelectedIdentifiers] = useState<string[]>([]);
  const [providerName, setProviderName] = useState("");
  const [providerNPI, setProviderNPI] = useState("");
  const [providerTIN, setProviderTIN] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleIdentifierToggle = (identifier: string) => {
    if (selectedIdentifiers.includes(identifier)) {
      setSelectedIdentifiers(selectedIdentifiers.filter((i) => i !== identifier));
    } else {
      if (selectedIdentifiers.length < 3) {
        setSelectedIdentifiers([...selectedIdentifiers, identifier]);
      }
    }
    setError("");
  };

  const handleVerificationTypeChange = (type: string) => {
    setVerificationType(type);
    setSelectedIdentifiers([]);
    setError("");
  };

  const handleConfirm = () => {
    // Validation
    if (!verificationType) {
      setError("Please select a verification type");
      return;
    }

    // Research type doesn't require identifiers
    if (verificationType === "research") {
      onVerify({
        verificationType,
        identifiers: [],
        verifiedAt: new Date().toISOString(),
      });
      return;
    }

    // Failed/Not Authorized doesn't require identifiers
    if (verificationType === "failed") {
      setError("Access denied. Please request HIPAA authorization form.");
      return;
    }

    // Member and Provider require exactly 3 identifiers
    if (
      (verificationType === "member" || verificationType === "provider") &&
      selectedIdentifiers.length !== 3
    ) {
      setError("Please select exactly 3 identifiers");
      return;
    }

    // Provider requires additional fields
    if (verificationType === "provider") {
      if (!providerName || !providerNPI || !providerTIN) {
        setError("Provider Name, NPI, and TIN are required");
        return;
      }
    }

    // Authorized Person - for now, require 3 identifiers (to be defined)
    if (verificationType === "authorized" && selectedIdentifiers.length !== 3) {
      setError("Please select exactly 3 identifiers");
      return;
    }

    // All validations passed
    onVerify({
      verificationType,
      identifiers: selectedIdentifiers,
      providerName: verificationType === "provider" ? providerName : undefined,
      providerNPI: verificationType === "provider" ? providerNPI : undefined,
      providerTIN: verificationType === "provider" ? providerTIN : undefined,
      verifiedAt: new Date().toISOString(),
    });
  };

  const requiresIdentifiers =
    verificationType === "member" ||
    verificationType === "provider" ||
    verificationType === "authorized";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-white p-6 shadow-xl dark:bg-gray-900">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            HIPAA Verification
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Please verify the caller's identity to proceed with accessing{" "}
            <span className="font-medium text-gray-800 dark:text-white">
              {memberName}
            </span>
            's information.
          </p>

          {/* Verification Type */}
          <div>
            <Label className="mb-3">Select Verification Type:</Label>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="member"
                  name="verificationType"
                  value="member"
                  checked={verificationType === "member"}
                  onChange={(e) => handleVerificationTypeChange(e.target.value)}
                  className="h-4 w-4 border-gray-300 text-brand-500 focus:ring-brand-500"
                />
                <Label htmlFor="member" className="mb-0">
                  Member
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="provider"
                  name="verificationType"
                  value="provider"
                  checked={verificationType === "provider"}
                  onChange={(e) => handleVerificationTypeChange(e.target.value)}
                  className="h-4 w-4 border-gray-300 text-brand-500 focus:ring-brand-500"
                />
                <Label htmlFor="provider" className="mb-0">
                  Provider
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="authorized"
                  name="verificationType"
                  value="authorized"
                  checked={verificationType === "authorized"}
                  onChange={(e) => handleVerificationTypeChange(e.target.value)}
                  className="h-4 w-4 border-gray-300 text-brand-500 focus:ring-brand-500"
                />
                <Label htmlFor="authorized" className="mb-0">
                  Authorized Person
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="failed"
                  name="verificationType"
                  value="failed"
                  checked={verificationType === "failed"}
                  onChange={(e) => handleVerificationTypeChange(e.target.value)}
                  className="h-4 w-4 border-gray-300 text-brand-500 focus:ring-brand-500"
                />
                <Label htmlFor="failed" className="mb-0">
                  Verification Failed / Not Authorized
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="research"
                  name="verificationType"
                  value="research"
                  checked={verificationType === "research"}
                  onChange={(e) => handleVerificationTypeChange(e.target.value)}
                  className="h-4 w-4 border-gray-300 text-brand-500 focus:ring-brand-500"
                />
                <Label htmlFor="research" className="mb-0">
                  Research (No Verification Required)
                </Label>
              </div>
            </div>
          </div>

          {/* Provider Fields */}
          {verificationType === "provider" && (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
              <h3 className="mb-4 text-sm font-semibold text-gray-800 dark:text-white">
                Provider Information
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="providerName">Provider Name</Label>
                  <Input
                    type="text"
                    id="providerName"
                    value={providerName}
                    onChange={(e) => setProviderName(e.target.value)}
                    placeholder="Enter provider name"
                  />
                </div>
                <div>
                  <Label htmlFor="providerNPI">Provider NPI</Label>
                  <Input
                    type="text"
                    id="providerNPI"
                    value={providerNPI}
                    onChange={(e) => setProviderNPI(e.target.value)}
                    placeholder="Enter NPI number"
                  />
                </div>
                <div>
                  <Label htmlFor="providerTIN">Provider TIN</Label>
                  <Input
                    type="text"
                    id="providerTIN"
                    value={providerTIN}
                    onChange={(e) => setProviderTIN(e.target.value)}
                    placeholder="Enter TIN"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Identifiers */}
          {requiresIdentifiers && (
            <div>
              <Label className="mb-3">
                Confirm 3 Identifiers:{" "}
                <span className="text-sm font-normal text-gray-500">
                  ({selectedIdentifiers.length}/3 selected)
                </span>
              </Label>
              <div className="space-y-2">
                {identifierOptions.map((option) => (
                  <div key={option.value} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={option.value}
                      checked={selectedIdentifiers.includes(option.value)}
                      onChange={() => handleIdentifierToggle(option.value)}
                      disabled={
                        !selectedIdentifiers.includes(option.value) &&
                        selectedIdentifiers.length >= 3
                      }
                      className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 disabled:opacity-50"
                    />
                    <Label htmlFor={option.value} className="mb-0">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Failed/Not Authorized Message */}
          {verificationType === "failed" && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
              <p className="mb-2 text-sm font-medium text-red-800 dark:text-red-400">
                Access Denied
              </p>
              <p className="mb-3 text-sm text-red-700 dark:text-red-300">
                The caller could not be verified or is not authorized to access
                this information.
              </p>
              <a
                href="#"
                className="text-sm font-medium text-red-600 underline hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                Click here for HIPAA Authorization Form
              </a>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20">
              <p className="text-sm text-red-800 dark:text-red-400">{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-4 dark:border-gray-700">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={verificationType === "failed"}
            className="rounded-lg bg-brand-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Confirm Verification
          </button>
        </div>
      </div>
    </div>
  );
}
