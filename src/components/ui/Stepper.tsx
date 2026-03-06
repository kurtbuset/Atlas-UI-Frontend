import { CheckCircleIcon } from "../../icons";

interface Step {
  id: number;
  title: string;
  subtitle: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                  index < currentStep
                    ? "border-brand-500 bg-brand-500 text-white"
                    : index === currentStep
                      ? "border-brand-500 bg-white text-brand-500 dark:bg-gray-900"
                      : "border-gray-300 bg-white text-gray-400 dark:border-gray-700 dark:bg-gray-900"
                }`}
              >
                {index < currentStep ? (
                  <CheckCircleIcon className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-semibold">{step.id}</span>
                )}
              </div>
              <div className="mt-2 text-center">
                <p
                  className={`text-sm font-medium ${
                    index <= currentStep
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-400 dark:text-gray-600"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {step.subtitle}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`mx-2 h-0.5 flex-1 transition-all ${
                  index < currentStep
                    ? "bg-brand-500"
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
