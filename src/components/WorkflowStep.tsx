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
    <div className="relative flex-1 min-w-[200px] max-w-[250px]">
      <div 
        className="relative flex flex-col items-center animate-step-in group cursor-pointer" 
        style={{
          animationDelay: `${stepNumber * 200}ms`
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col items-center relative">
          <div
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center text-white transition-all duration-300 transform group-hover:scale-110 shadow-lg",
              "before:content-[''] before:absolute before:w-20 before:h-20 before:rounded-full before:opacity-20 before:animate-pulse",
              status === "completed" && "bg-workflow-success before:bg-workflow-success",
              status === "current" && "bg-workflow-primary before:bg-workflow-primary",
              status === "pending" && "bg-workflow-pending before:bg-workflow-pending"
            )}
          >
            {status === "completed" && <Check className="w-8 h-8" />}
            {status === "current" && <Clock className="w-8 h-8" />}
            {status === "pending" && <span className="text-xl font-bold">{stepNumber}</span>}
          </div>
          {!isLast && (
            <div className="absolute left-full top-1/2 w-full h-0.5 bg-gray-200 -translate-y-1/2">
              <div 
                className={cn(
                  "absolute top-0 left-0 h-full transition-all duration-1000",
                  status === "completed" ? "w-full bg-workflow-success" : "w-0 bg-workflow-primary"
                )}
              />
            </div>
          )}
        </div>
        <div className="mt-4 text-center transform transition-all duration-300 group-hover:translate-y-1">
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>

      {isExpanded && (
        <Card className="mt-4 animate-fade-in absolute z-10 w-[280px] -left-4">
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