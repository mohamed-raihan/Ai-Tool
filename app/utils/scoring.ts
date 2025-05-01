// Types for our scoring system
export interface Answer {
    questionId: string;
    value: number;
    category: string;
}

export interface Question {
    id: string;
    text: string;
    category: string;
    framework: Framework;
}

export type Framework = 'PERSONALITY' | 'RIASEC' | 'LEARNING_STYLE' | 'WORK_VALUES';

interface CategoryScore {
    score: number;
    total: number;
    percentage: number;
}

export interface TestResult {
    personality: {
        introversion: CategoryScore;
        extroversion: CategoryScore;
        thinking: CategoryScore;
        feeling: CategoryScore;
        sensing: CategoryScore;
        intuition: CategoryScore;
    };
    riasec: {
        realistic: CategoryScore;
        investigative: CategoryScore;
        artistic: CategoryScore;
        social: CategoryScore;
        enterprising: CategoryScore;
        conventional: CategoryScore;
    };
    learningStyle: {
        visual: CategoryScore;
        auditory: CategoryScore;
        kinesthetic: CategoryScore;
        reading: CategoryScore;
    };
    workValues: {
        achievement: CategoryScore;
        independence: CategoryScore;
        recognition: CategoryScore;
        relationships: CategoryScore;
        support: CategoryScore;
        workingConditions: CategoryScore;
    };
}

export function calculateScores(answers: Record<string, string>, questions: Question[]): TestResult {
    // Initialize result structure
    const result: TestResult = {
        personality: {
            introversion: { score: 0, total: 0, percentage: 0 },
            extroversion: { score: 0, total: 0, percentage: 0 },
            thinking: { score: 0, total: 0, percentage: 0 },
            feeling: { score: 0, total: 0, percentage: 0 },
            sensing: { score: 0, total: 0, percentage: 0 },
            intuition: { score: 0, total: 0, percentage: 0 },
        },
        riasec: {
            realistic: { score: 0, total: 0, percentage: 0 },
            investigative: { score: 0, total: 0, percentage: 0 },
            artistic: { score: 0, total: 0, percentage: 0 },
            social: { score: 0, total: 0, percentage: 0 },
            enterprising: { score: 0, total: 0, percentage: 0 },
            conventional: { score: 0, total: 0, percentage: 0 },
        },
        learningStyle: {
            visual: { score: 0, total: 0, percentage: 0 },
            auditory: { score: 0, total: 0, percentage: 0 },
            kinesthetic: { score: 0, total: 0, percentage: 0 },
            reading: { score: 0, total: 0, percentage: 0 },
        },
        workValues: {
            achievement: { score: 0, total: 0, percentage: 0 },
            independence: { score: 0, total: 0, percentage: 0 },
            recognition: { score: 0, total: 0, percentage: 0 },
            relationships: { score: 0, total: 0, percentage: 0 },
            support: { score: 0, total: 0, percentage: 0 },
            workingConditions: { score: 0, total: 0, percentage: 0 },
        },
    };

    // Process each answer
    questions.forEach(question => {
        const answer = answers[question.id];
        if (!answer) return;

        const score = parseInt(answer);
        
        // Update appropriate category based on framework and category
        switch (question.framework) {
            case 'PERSONALITY':
                updatePersonalityScore(result.personality, question.category, score);
                break;
            case 'RIASEC':
                updateRiasecScore(result.riasec, question.category, score);
                break;
            case 'LEARNING_STYLE':
                updateLearningStyleScore(result.learningStyle, question.category, score);
                break;
            case 'WORK_VALUES':
                updateWorkValuesScore(result.workValues, question.category, score);
                break;
        }
    });

    // Calculate percentages for all categories
    calculatePercentages(result);

    return result;
}

function updatePersonalityScore(
    personality: TestResult['personality'],
    category: string,
    score: number
) {
    const categoryMap: Record<string, keyof TestResult['personality']> = {
        'introversion': 'introversion',
        'extroversion': 'extroversion',
        'thinking': 'thinking',
        'feeling': 'feeling',
        'sensing': 'sensing',
        'intuition': 'intuition',
    };

    const key = categoryMap[category.toLowerCase()];
    if (key && personality[key]) {
        personality[key].score += score;
        personality[key].total += 5; // Assuming 5-point Likert scale
    }
}

function updateRiasecScore(
    riasec: TestResult['riasec'],
    category: string,
    score: number
) {
    const categoryMap: Record<string, keyof TestResult['riasec']> = {
        'realistic': 'realistic',
        'investigative': 'investigative',
        'artistic': 'artistic',
        'social': 'social',
        'enterprising': 'enterprising',
        'conventional': 'conventional',
    };

    const key = categoryMap[category.toLowerCase()];
    if (key && riasec[key]) {
        riasec[key].score += score;
        riasec[key].total += 5;
    }
}

function updateLearningStyleScore(
    learningStyle: TestResult['learningStyle'],
    category: string,
    score: number
) {
    const categoryMap: Record<string, keyof TestResult['learningStyle']> = {
        'visual': 'visual',
        'auditory': 'auditory',
        'kinesthetic': 'kinesthetic',
        'reading': 'reading',
    };

    const key = categoryMap[category.toLowerCase()];
    if (key && learningStyle[key]) {
        learningStyle[key].score += score;
        learningStyle[key].total += 5;
    }
}

function updateWorkValuesScore(
    workValues: TestResult['workValues'],
    category: string,
    score: number
) {
    const categoryMap: Record<string, keyof TestResult['workValues']> = {
        'achievement': 'achievement',
        'independence': 'independence',
        'recognition': 'recognition',
        'relationships': 'relationships',
        'support': 'support',
        'workingConditions': 'workingConditions',
    };

    const key = categoryMap[category.toLowerCase()];
    if (key && workValues[key]) {
        workValues[key].score += score;
        workValues[key].total += 5;
    }
}

function calculatePercentages(result: TestResult) {
    // Calculate percentages for all categories
    Object.values(result).forEach((framework: Record<string, CategoryScore>) => {
        Object.values(framework).forEach((category: CategoryScore) => {
            if (category.total > 0) {
                category.percentage = (category.score / category.total) * 100;
            }
        });
    });
}

export function interpretResults(result: TestResult) {
    return {
        personalityType: interpretPersonality(result.personality),
        careerSuggestions: interpretRiasec(result.riasec),
        learningRecommendations: interpretLearningStyle(result.learningStyle),
        workplacePreferences: interpretWorkValues(result.workValues)
    };
}

function interpretPersonality(personality: TestResult['personality']) {
    // Determine dominant traits
    const traits = Object.entries(personality)
        .map(([trait, score]) => ({ trait, percentage: score.percentage }))
        .sort((a, b) => b.percentage - a.percentage);

    // Get top traits
    const dominantTraits = traits.slice(0, 3);

    return {
        dominantTraits,
        description: generatePersonalityDescription(dominantTraits),
        strengths: generateStrengths(dominantTraits),
        challenges: generateChallenges(dominantTraits)
    };
}

function interpretRiasec(riasec: TestResult['riasec']) {
    // Get top 3 RIASEC codes
    const codes = Object.entries(riasec)
        .map(([code, score]) => ({ code, percentage: score.percentage }))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 3);

    return {
        code: codes.map(c => c.code.charAt(0).toUpperCase()).join(''),
        careers: generateCareerSuggestions(codes),
        strengths: generateRiasecStrengths(codes)
    };
}

function interpretLearningStyle(learningStyle: TestResult['learningStyle']) {
    // Get dominant learning style
    const styles = Object.entries(learningStyle)
        .map(([style, score]) => ({ style, percentage: score.percentage }))
        .sort((a, b) => b.percentage - a.percentage);

    const primaryStyle = styles[0];

    return {
        primaryStyle: primaryStyle.style,
        strategies: generateLearningStrategies(primaryStyle.style),
        recommendations: generateStudyRecommendations(styles)
    };
}

function interpretWorkValues(workValues: TestResult['workValues']) {
    // Get top work values
    const values = Object.entries(workValues)
        .map(([value, score]) => ({ value, percentage: score.percentage }))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 3);

    return {
        topValues: values,
        environmentRecommendations: generateWorkEnvironmentRecommendations(values),
        careerConsiderations: generateCareerConsiderations(values)
    };
}

// Helper functions for generating specific recommendations
function generatePersonalityDescription(traits: Array<{ trait: string; percentage: number }>) {
    // Implementation for generating personality descriptions
    return `Based on your responses, you show strong ${traits[0].trait} tendencies...`;
}

function generateStrengths(traits: Array<{ trait: string; percentage: number }>) {
    // Implementation for generating strengths based on traits
    return traits.map(trait => {
        // Add specific strengths based on each trait
        return `Strong ${trait.trait} capabilities`;
    });
}

function generateChallenges(traits: Array<{ trait: string; percentage: number }>) {
    // Implementation for generating potential challenges
    return traits.map(trait => {
        // Add specific challenges based on each trait
        return `May need to balance ${trait.trait}`;
    });
}

function generateCareerSuggestions(codes: Array<{ code: string; percentage: number }>) {
    // Implementation for generating career suggestions based on RIASEC codes
    const careerMap: Record<string, string[]> = {
        realistic: ['Engineer', 'Technician', 'Mechanic'],
        investigative: ['Scientist', 'Researcher', 'Analyst'],
        artistic: ['Designer', 'Writer', 'Artist'],
        social: ['Teacher', 'Counselor', 'Social Worker'],
        enterprising: ['Manager', 'Entrepreneur', 'Sales Executive'],
        conventional: ['Accountant', 'Administrator', 'Financial Analyst']
    };

    return codes.flatMap(({ code }) => careerMap[code.toLowerCase()] || []);
}

function generateRiasecStrengths(codes: Array<{ code: string; percentage: number }>) {
    // Implementation for generating RIASEC-based strengths
    return codes.map(({ code }) => {
        // Add specific strengths based on each RIASEC code
        return `Strong ${code} capabilities`;
    });
}

function generateLearningStrategies(style: string) {
    // Implementation for generating learning strategies
    const strategies: Record<string, string[]> = {
        visual: ['Use diagrams', 'Create mind maps', 'Watch educational videos'],
        auditory: ['Listen to lectures', 'Participate in discussions', 'Use voice recordings'],
        kinesthetic: ['Hands-on practice', 'Role-playing', 'Physical activities'],
        reading: ['Take detailed notes', 'Summarize texts', 'Create written outlines']
    };

    return strategies[style.toLowerCase()] || [];
}

function generateStudyRecommendations(styles: Array<{ style: string; percentage: number }>) {
    // Implementation for generating study recommendations
    return styles.map(({ style }) => {
        // Add specific study recommendations based on each learning style
        return `Utilize ${style} learning materials`;
    });
}

function generateWorkEnvironmentRecommendations(values: Array<{ value: string; percentage: number }>) {
    // Implementation for generating work environment recommendations
    return values.map(({ value }) => {
        // Add specific recommendations based on each work value
        return `Seek environments that value ${value}`;
    });
}

function generateCareerConsiderations(values: Array<{ value: string; percentage: number }>) {
    // Implementation for generating career considerations
    return values.map(({ value }) => {
        // Add specific career considerations based on each work value
        return `Consider roles that emphasize ${value}`;
    });
} 