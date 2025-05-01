import React from "react";

export type TraitSummary = {
  trait: string;
  description: string;
  suggestedCareers: string[];
  learningTips: string[];
};

type ReportCardProps = {
  trait: TraitSummary;
};

const ReportCard: React.FC<ReportCardProps> = ({ trait }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-2xl p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-blue-600 mb-2">{trait.trait}</h2>
      <p className="text-gray-700 mb-4">{trait.description}</p>

      <div className="mb-4">
        <h3 className="font-semibold text-gray-800 mb-1">Suggested Careers</h3>
        <ul className="list-disc list-inside text-gray-600">
          {trait.suggestedCareers.map((career, index) => (
            <li key={index}>{career}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-1">Learning Tips</h3>
        <ul className="list-disc list-inside text-gray-600">
          {trait.learningTips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReportCard;
