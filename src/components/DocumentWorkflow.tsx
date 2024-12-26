import React from "react";
import WorkflowStep from "./WorkflowStep";

const workflowSteps = [
  {
    title: "Document Submission",
    description: "Initial document upload and basic information entry",
    status: "completed" as const,
    expectedDuration: "1-2 days",
    nextStep: "Initial Review",
  },
  {
    title: "Initial Review",
    description: "Document screening and validation by the review team",
    status: "completed" as const,
    expectedDuration: "2-3 days",
    previousStep: "Document Submission",
    nextStep: "Technical Assessment",
  },
  {
    title: "Technical Assessment",
    description: "Detailed technical evaluation of document contents",
    status: "current" as const,
    expectedDuration: "3-5 days",
    previousStep: "Initial Review",
    nextStep: "Stakeholder Review",
  },
  {
    title: "Stakeholder Review",
    description: "Review and feedback from relevant stakeholders",
    status: "pending" as const,
    expectedDuration: "4-7 days",
    previousStep: "Technical Assessment",
    nextStep: "Final Approval",
  },
  {
    title: "Final Approval",
    description: "Final review and approval from authorized personnel",
    status: "pending" as const,
    expectedDuration: "2-3 days",
    previousStep: "Stakeholder Review",
    nextStep: "Document Publishing",
  },
  {
    title: "Document Publishing",
    description: "Document publication and distribution to relevant parties",
    status: "pending" as const,
    expectedDuration: "1 day",
    previousStep: "Final Approval",
  },
];

const DocumentWorkflow = () => {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-8 text-workflow-primary">Document Workflow Status</h2>
      <div className="space-y-8">
        {workflowSteps.map((step, index) => (
          <WorkflowStep
            key={index}
            title={step.title}
            description={step.description}
            status={step.status}
            stepNumber={index + 1}
            isLast={index === workflowSteps.length - 1}
            previousStep={step.previousStep}
            nextStep={step.nextStep}
            expectedDuration={step.expectedDuration}
          />
        ))}
      </div>
    </div>
  );
};

export default DocumentWorkflow;