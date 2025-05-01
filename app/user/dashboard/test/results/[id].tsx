// pages/results/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PdfExportButton from '@/app/user/components/PdfExportButton';
import styles from '../../styles/Results.module.css';

type TestResult = {
  userId: string;
  testName: string;
  completedAt: string;
  scores: {
    category: string;
    score: number;
    percentile: number;
    interpretation: string;
  }[];
  overallScore: number;
  overallPercentile: number;
  overallInterpretation: string;
};

export default function TestResultsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // Fetch test results from your API or database
    // This is a mock implementation - replace with your actual data fetching
    const fetchTestResult = async () => {
      try {
        // In real implementation, fetch from your API
        // const response = await fetch(`/api/test-results/${id}`);
        
        // Mock data for demonstration
        const mockData: TestResult = {
          userId: id as string,
          testName: "Professional Aptitude Assessment",
          completedAt: new Date().toISOString(),
          scores: [
            {
              category: "Verbal Reasoning",
              score: 78,
              percentile: 82,
              interpretation: "Strong verbal reasoning skills. Able to comprehend and analyze written information effectively."
            },
            {
              category: "Numerical Reasoning",
              score: 71,
              percentile: 75,
              interpretation: "Good numerical reasoning ability. Demonstrates competence in working with numerical data."
            },
            {
              category: "Abstract Reasoning",
              score: 85,
              percentile: 90,
              interpretation: "Excellent abstract reasoning. Shows strong ability to identify patterns and logical rules."
            },
            {
              category: "Spatial Reasoning",
              score: 65,
              percentile: 60,
              interpretation: "Average spatial reasoning skills. Can visualize and manipulate objects in space."
            },
            {
              category: "Problem Solving",
              score: 80,
              percentile: 85,
              interpretation: "Strong problem-solving skills. Efficiently approaches and resolves complex problems."
            }
          ],
          overallScore: 76,
          overallPercentile: 78,
          overallInterpretation: "The candidate demonstrates strong overall cognitive abilities with particular strengths in abstract reasoning and problem-solving. Their performance places them in the upper quartile of test-takers, indicating high potential for roles requiring analytical thinking and pattern recognition. Verbal and numerical reasoning results are also above average, suggesting good all-round cognitive performance. The candidate is likely to excel in roles that require quick adaptation to new concepts and complex problem-solving."
        };
        
        setTestResult(mockData);
      } catch (error) {
        console.error('Error fetching test results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestResult();
  }, [id]);

  if (loading) {
    return <div className={styles.container}>Loading results...</div>;
  }

  if (!testResult) {
    return <div className={styles.container}>Test results not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Psychometric Test Results</h1>
        <PdfExportButton testResult={testResult} />
      </div>
      
      <div className={styles.testInfo}>
        <p><strong>Test:</strong> {testResult.testName}</p>
        <p><strong>Completed:</strong> {new Date(testResult.completedAt).toLocaleDateString()}</p>
        <p><strong>Candidate ID:</strong> {testResult.userId}</p>
      </div>
      
      <div className={styles.overallResults}>
        <h2>Overall Results</h2>
        <div className={styles.scoreBox}>
          <div className={styles.scoreItem}>
            <span className={styles.scoreLabel}>Overall Score</span>
            <span className={styles.scoreValue}>{testResult.overallScore}</span>
          </div>
          <div className={styles.scoreItem}>
            <span className={styles.scoreLabel}>Percentile</span>
            <span className={styles.scoreValue}>{testResult.overallPercentile}%</span>
          </div>
          <div className={styles.scoreItem}>
            <span className={styles.scoreLabel}>Range</span>
            <span className={styles.scoreValue}>
              {testResult.overallPercentile >= 90 ? 'Excellent' : 
               testResult.overallPercentile >= 75 ? 'Above Average' : 
               testResult.overallPercentile >= 40 ? 'Average' : 
               testResult.overallPercentile >= 25 ? 'Below Average' : 
               'Needs Improvement'}
            </span>
          </div>
        </div>
        
        <div className={styles.interpretation}>
          <h3>Interpretation</h3>
          <p>{testResult.overallInterpretation}</p>
        </div>
      </div>
      
      <div className={styles.detailedResults}>
        <h2>Detailed Scores</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Score</th>
              <th>Percentile</th>
              <th>Range</th>
              <th>Interpretation</th>
            </tr>
          </thead>
          <tbody>
            {testResult.scores.map((score, index) => (
              <tr key={index}>
                <td>{score.category}</td>
                <td>{score.score}</td>
                <td>{score.percentile}%</td>
                <td>
                  {score.percentile >= 90 ? 'Excellent' : 
                   score.percentile >= 75 ? 'Above Average' : 
                   score.percentile >= 40 ? 'Average' : 
                   score.percentile >= 25 ? 'Below Average' : 
                   'Needs Improvement'}
                </td>
                <td>{score.interpretation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}