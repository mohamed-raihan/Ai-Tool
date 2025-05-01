interface Question {
  id: string;
  category: string;
}

export function calculateScores(
  answers: Record<string, string>,
  questions: Question[]
): Record<string, number> {
  // Initialize scores object
  const scores: Record<string, { total: number; count: number }> = {};
  
  // Process each answer
  questions.forEach(question => {
    const answer = answers[question.id];
    const category = question.category;
    
    // Initialize category if it doesn't exist
    if (!scores[category]) {
      scores[category] = { total: 0, count: 0 };
    }
    
    // Add the answer value to the category total
    scores[category].total += parseInt(answer);
    scores[category].count += 1;
  });
  
  // Calculate average scores for each category
  const finalScores: Record<string, number> = {};
  Object.entries(scores).forEach(([category, { total, count }]) => {
    finalScores[category] = Math.round((total / count) * 100);
  });
  
  return finalScores;
} 