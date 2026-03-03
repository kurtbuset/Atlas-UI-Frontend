import { useState } from "react";
import { Modal } from "../ui/modal";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { Member } from "../../services/memberService";

interface HipaaVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member;
  onVerificationSuccess: (verificationData: VerificationData) => void;
}

export interface VerificationData {
  verifiedAt: string;
  verifiedBy: string;
  verificationType: string;
  identifiersUsed: string[];
}

export default function HipaaVerificationModal({
  isOpen,
  onClose,
  member,
  onVerificationSuccess,
}: HipaaVerificationModalProps) {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [memberId, setMemberId] = useState("");
  const [callerType, setCallerType] = useState("Self");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = () => {
    setError("");
    setIsVerifying(true);

    // Simulate verification delay
    setTimeout(() => {
      const identifiersUsed: string[] = [];
      let matchCount = 0;

      // Verify DOB
      if (dateOfBirth) {
        identifiersUsed.push("Date of Birth");
        if (dateOfBirth === member.birthdate) {
          matchCount++;
        }
      }

      // Verify Zip Code
      if (zipCode) {
        identifiersUsed.push("ZIP Code");
        if (zipCode === member.zipCode) {
          matchCount++;
        }
      }

      // Verify Member ID
      if (memberId) {
        identifiersUsed.push("Member ID");
        if (memberId === member.memberId) {
          matchCount++;
        }
      }

      // Need at least 2 matching identifiers
      if (matchCount >= 2) {
        const verificationData: VerificationData = {
          verifiedAt: new Date().toISOString(),
          verifiedBy: "Agent Morey", // In production, get from auth context
          verificationType: "Standard",
          identifiersUsed,
        };
        onVerificationSuccess(verificationData);
        resetForm();
      } else {
        setError(
          "Verification failed. Please ensure at least 2 identifiers match our records.",
        );
      }

      setIsVerifying(false);
    }, 800);
  };

  const resetForm = () => {
    setDateOfBirth("");
    setZipCode("");
    setMemberId("");
    setCallerType("Self");
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-[600px] m-4">
      <div className="relative w-full max-w-[600px] overflow-y-auto rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-10">
        <div className="px-2">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20">
                <svg
                  className="w-6 h-6 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 text-lg dark:text-white/90">
                  HIPAA Identity Verification Required
                </h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Please confirm 2 identifiers to access Member PHI
                </p>
              </div>
            </div>
          </div>

          {/* Member Name (Pre-filled) */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Member Name
            </label>
            <div className="flex items-center h-11 px-4 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700">
              <span className="text-gray-800 dark:text-white/90">
                {member.firstName} {member.lastName}
              </span>
              <svg
                className="w-5 h-5 ml-auto text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <label
              htmlFor="dob"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <Input
              type="date"
              id="dob"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              placeholder="MM/DD/YYYY"
            />
          </div>

          {/* ZIP Code */}
          <div className="mb-4">
            <label
              htmlFor="zipCode"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              ZIP Code <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              id="zipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Enter ZIP Code"
            />
          </div>

          {/* Member ID */}
          <div className="mb-4">
            <label
              htmlFor="memberId"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Member ID
            </label>
            <Input
              type="text"
              id="memberId"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              placeholder="Enter Member ID"
            />
          </div>

          {/* Caller Type */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Caller Type
            </label>
            <div className="flex flex-wrap gap-3">
              {["Self", "Spouse", "Provider", "Other"].map((type) => (
                <label key={type} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="callerType"
                    value={type}
                    checked={callerType === type}
                    onChange={(e) => setCallerType(e.target.value)}
                    className="w-4 h-4 text-brand-500 border-gray-300 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Info Box */}
          <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-800">
            <p className="text-xs text-blue-700 dark:text-blue-300">
              <strong>Note:</strong> At least 2 identifiers must match our
              records to access Protected Health Information (PHI).
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 justify-end">
            <Button size="sm" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={handleVerify}
              disabled={isVerifying || !dateOfBirth || !zipCode}
            >
              {isVerifying ? "Verifying..." : "Authorize & Access Data"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
