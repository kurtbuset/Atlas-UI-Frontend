interface VerificationBadgeProps {
  isVerified: boolean;
  verifiedAt?: string;
}

export default function VerificationBadge({
  isVerified,
  verifiedAt,
}: VerificationBadgeProps) {
  if (!isVerified) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-full dark:bg-red-900/20 dark:border-red-800">
        <svg
          className="w-4 h-4 text-red-600 dark:text-red-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-xs font-medium text-red-700 dark:text-red-300">
          Identity Not Verified
        </span>
      </div>
    );
  }

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full dark:bg-green-900/20 dark:border-green-800">
      <svg
        className="w-4 h-4 text-green-600 dark:text-green-400"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      <span className="text-xs font-medium text-green-700 dark:text-green-300">
        ID Verified {verifiedAt && `at ${formatTime(verifiedAt)}`}
      </span>
    </div>
  );
}
