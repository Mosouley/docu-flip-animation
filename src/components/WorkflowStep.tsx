import React, { useState } from "react";
import { Check, Clock, AlertCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface WorkflowStepProps {
  title: string;
  description: string;
  status: "completed" | "current" | "pending";
  stepNumber: number;
  isLast?: boolean;
  previousStep?: string;
  nextStep?: string;
  expectedDuration?: string;
}

const WorkflowStep = ({
  title,
  description,
  status,
  stepNumber,
  isLast,
  previousStep,
  nextStep,
  expectedDuration,
}: WorkflowStepProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      <div 
        className="relative flex items-center gap-4 animate-step-in group cursor-pointer" 
        style={{
          animationDelay: `${stepNumber * 200}ms`
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col items-center">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 transform group-hover:scale-110",
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
            <div className="w-0.5 h-24 bg-gray-200 relative">
              <div 
                className={cn(
                  "absolute top-0 left-0 w-full transition-all duration-500",
                  status === "completed" ? "h-full bg-workflow-success" : "h-0 bg-workflow-primary",
                  "after:content-[''] after:absolute after:w-2 after:h-2 after:bg-workflow-primary after:rounded-full after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:transform after:scale-0 group-hover:after:scale-100 after:transition-transform after:duration-300"
                )}
              />
            </div>
          )}
        </div>
        <div className="flex-1 transform transition-all duration-300 group-hover:translate-x-2">
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>

      {isExpanded && (
        <Card className="mt-4 ml-14 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg">Timeline Details</CardTitle>
            <CardDescription>Expected duration: {expectedDuration}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {previousStep && (
                <div className="flex items-center text-gray-600 group/link">
                  <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover/link:-translate-x-1" />
                  <span>Previous: {previousStep}</span>
                </div>
              )}
              {nextStep && (
                <div className="flex items-center text-gray-600 group/link">
                  <ArrowRight className="w-4 h-4 mr-2 transition-transform group-hover/link:translate-x-1" />
                  <span>Next: {nextStep}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WorkflowStep;