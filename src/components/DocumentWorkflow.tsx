import React from "react";
import WorkflowStep from "./WorkflowStep";

const workflowSteps = [
  {
    title: "Document Submission",
    description: "Initial document upload and basic information entry",
    status: "completed" as const,
  },
  {
    title: "Initial Review",
    description: "Document screening and validation by the review team",
    status: "completed" as const,
  },
  {
    title: "Technical Assessment",
    description: "Detailed technical evaluation of document contents",
    status: "current" as const,
  },
  {
    title: "Stakeholder Review",
    description: "Review and feedback from relevant stakeholders",
    status: "pending" as const,
  },
  {
    title: "Final Approval",
    description: "Final review and approval from authorized personnel",
    status: "pending" as const,
  },
  {
    title: "Document Publishing",
    description: "Document publication and distribution to relevant parties",
    status: "pending" as const,
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
          />
        ))}
      </div>
    </div>
  );
};

export default DocumentWorkflow;