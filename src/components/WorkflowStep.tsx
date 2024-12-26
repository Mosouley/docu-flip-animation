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
              "w-16 h-16 rounded-full flex items-center justify-center text-white transition-all duration-300 transform group-hover:scale-110",
              "before:content-[''] before:absolute before:w-20 before:h-20 before:rounded-full before:opacity-20 before:animate-pulse",
              "after:content-[''] after:absolute after:inset-0 after:rounded-full after:opacity-75 after:bg-gradient-to-b",
              "shadow-[0_10px_20px_rgba(0,0,0,0.19),_0_6px_6px_rgba(0,0,0,0.22)] hover:shadow-[0_14px_28px_rgba(0,0,0,0.25),_0_10px_10px_rgba(0,0,0,0.22)]",
              status === "completed" && [
                "bg-gradient-to-br from-workflow-success to-workflow-success/80 before:bg-workflow-success",
                "after:from-white/20 after:to-transparent"
              ],
              status === "current" && [
                "bg-gradient-to-br from-workflow-primary to-workflow-primary/80 before:bg-workflow-primary",
                "after:from-white/20 after:to-transparent"
              ],
              status === "pending" && [
                "bg-gradient-to-br from-workflow-pending to-workflow-pending/80 before:bg-workflow-pending",
                "after:from-white/20 after:to-transparent"
              ]
            )}
          >
            {status === "completed" && <Check className="w-8 h-8 drop-shadow-md" />}
            {status === "current" && <Clock className="w-8 h-8 drop-shadow-md" />}
            {status === "pending" && <span className="text-xl font-bold drop-shadow-md">{stepNumber}</span>}
          </div>
          {!isLast && (
            <div className="absolute left-full top-1/2 w-full h-1 -translate-y-1/2">
              <div className="relative w-full h-full bg-gradient-to-r from-gray-200/50 to-gray-200 rounded-full shadow-sm">
                <div 
                  className={cn(
                    "absolute top-0 left-0 h-full rounded-full transition-all duration-1000",
                    "bg-gradient-to-r shadow-[0_2px_4px_rgba(0,0,0,0.1)]",
                    status === "completed" ? [
                      "w-full",
                      "from-workflow-success/90 to-workflow-success"
                    ] : [
                      "w-0",
                      "from-workflow-primary/90 to-workflow-primary"
                    ]
                  )}
                />
              </div>
            </div>
          )}
        </div>
        <div className="mt-6 text-center transform transition-all duration-300 group-hover:translate-y-1">
          <h3 className="font-semibold text-lg mb-2 drop-shadow-sm">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>

      {isExpanded && (
        <Card className="mt-4 animate-fade-in absolute z-10 w-[280px] -left-4 shadow-xl">
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