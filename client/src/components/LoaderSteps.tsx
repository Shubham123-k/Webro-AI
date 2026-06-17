import { CircleIcon, ScanLineIcon, SquareIcon, TriangleIcon } from "lucide-react";
import { useEffect, useState } from "react";

const steps = [
  { icon: ScanLineIcon, label: "Analyzing your request..." },
  { icon: SquareIcon, label: "Generating layout structure..." },
  { icon: TriangleIcon, label: "Assembling UI components..." },
  { icon: CircleIcon, label: "Finalizing your website..." },
];

const STEP_DURATION = 45000;

const LoaderSteps = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % steps.length);
    }, STEP_DURATION);

    return () => clearInterval(interval);
  }, []);

  const Icon = steps[current].icon;

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-950 relative overflow-hidden text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-fuchsia-500/10 blur-3xl animate-pulse" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border border-indigo-400/30 animate-ping" />

          {/* Middle Ring */}
          <div className="absolute inset-4 rounded-full border border-indigo-400/20" />

          {/* Icon Circle */}
          <div className="w-20 h-20 rounded-full border border-indigo-500/40 flex items-center justify-center backdrop-blur-sm">
            <Icon className="w-8 h-8 text-white animate-bounce" />
          </div>
        </div>

        {/* Step Label */}
        <p
          key={current}
          className="mt-8 text-3xl font-light text-white/90 tracking-wide animate-pulse"
        >
          {steps[current].label}
        </p>

        <p className="text-gray-400 mt-4 text-sm">
          This may take around 2-3 minutes...
        </p>
      </div>
    </div>
  );
};

export default LoaderSteps;