import React from "react";
import { Check, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkflowStepProps {
  title: string;
  description: string;
  status: "completed" | "current" | "pending";
  stepNumber: number;
  isLast?: boolean;
}

const WorkflowStep = ({
  title,
  description,
  status,
  stepNumber,
  isLast,
}: WorkflowStepProps) => {
  return (
    <div className="relative flex items-center gap-4 animate-step-in" style={{
      animationDelay: `${stepNumber * 200}ms`
    }}>
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors",
            status === "completed" && "bg-workflow-success",
            status === "current" && "bg-workflow-primary",
            status === "pending" && "bg-workflow-pending"
          )}
        >
          {status === "completed" && <Check className="w-5 h-5" />}
          {status === "current" && <Clock className="w-5 h-5" />}
          {status === "pending" && <span>{stepNumber}</span>}
        </div>
        {!isLast && (
          <div className="w-0.5 h-full bg-gray-200 relative">
            {status === "completed" && (
              <div className="absolute top-0 left-0 w-full h-full bg-workflow-success animate-progress-line" />
            )}
          </div>
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default WorkflowStep;