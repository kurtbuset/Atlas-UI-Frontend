import { useState, useCallback } from "react";
import { VerificationData } from "../components/hipaa/HipaaVerificationModal";

interface VerificationState {
  isVerified: boolean;
  verificationData: VerificationData | null;
}

export const useHipaaVerification = () => {
  const [verificationState, setVerificationState] = useState<VerificationState>(
    {
      isVerified: false,
      verificationData: null,
    },
  );

  const setVerified = useCallback((data: VerificationData) => {
    setVerificationState({
      isVerified: true,
      verificationData: data,
    });
  }, []);

  const clearVerification = useCallback(() => {
    setVerificationState({
      isVerified: false,
      verificationData: null,
    });
  }, []);

  return {
    isVerified: verificationState.isVerified,
    verificationData: verificationState.verificationData,
    setVerified,
    clearVerification,
  };
};
