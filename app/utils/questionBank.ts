import { Question } from './scoring';

export const questions: Question[] = [
    // Personality Questions (Big Five / MBTI hybrid)
    {
        id: 'p1',
        text: 'I enjoy being the center of attention in social situations.',
        category: 'extroversion',
        framework: 'PERSONALITY'
    },
    {
        id: 'p2',
        text: 'I prefer quiet, solitary activities over group activities.',
        category: 'introversion',
        framework: 'PERSONALITY'
    },
    {
        id: 'p3',
        text: 'I make decisions based on logic rather than feelings.',
        category: 'thinking',
        framework: 'PERSONALITY'
    },
    {
        id: 'p4',
        text: 'I consider how my decisions will affect others\' feelings.',
        category: 'feeling',
        framework: 'PERSONALITY'
    },
    {
        id: 'p5',
        text: 'I prefer focusing on concrete facts and details.',
        category: 'sensing',
        framework: 'PERSONALITY'
    },
    {
        id: 'p6',
        text: 'I enjoy thinking about abstract theories and concepts.',
        category: 'intuition',
        framework: 'PERSONALITY'
    },

    // RIASEC Questions
    {
        id: 'r1',
        text: 'I enjoy working with tools and machines.',
        category: 'realistic',
        framework: 'RIASEC'
    },
    {
        id: 'r2',
        text: 'I like solving complex problems and puzzles.',
        category: 'investigative',
        framework: 'RIASEC'
    },
    {
        id: 'r3',
        text: 'I enjoy expressing myself through art, music, or writing.',
        category: 'artistic',
        framework: 'RIASEC'
    },
    {
        id: 'r4',
        text: 'I like helping and teaching others.',
        category: 'social',
        framework: 'RIASEC'
    },
    {
        id: 'r5',
        text: 'I enjoy leading and persuading others.',
        category: 'enterprising',
        framework: 'RIASEC'
    },
    {
        id: 'r6',
        text: 'I like following clear rules and organized procedures.',
        category: 'conventional',
        framework: 'RIASEC'
    },

    // Learning Style Questions
    {
        id: 'l1',
        text: 'I learn best when I can see diagrams and visual aids.',
        category: 'visual',
        framework: 'LEARNING_STYLE'
    },
    {
        id: 'l2',
        text: 'I remember information better when I hear it.',
        category: 'auditory',
        framework: 'LEARNING_STYLE'
    },
    {
        id: 'l3',
        text: 'I learn best through hands-on activities.',
        category: 'kinesthetic',
        framework: 'LEARNING_STYLE'
    },
    {
        id: 'l4',
        text: 'I prefer reading and writing to learn new information.',
        category: 'reading',
        framework: 'LEARNING_STYLE'
    },

    // Work Values Questions
    {
        id: 'w1',
        text: 'It\'s important to me to accomplish difficult tasks successfully.',
        category: 'achievement',
        framework: 'WORK_VALUES'
    },
    {
        id: 'w2',
        text: 'I value being able to work independently.',
        category: 'independence',
        framework: 'WORK_VALUES'
    },
    {
        id: 'w3',
        text: 'I want my work to be recognized and appreciated.',
        category: 'recognition',
        framework: 'WORK_VALUES'
    },
    {
        id: 'w4',
        text: 'Building positive relationships at work is important to me.',
        category: 'relationships',
        framework: 'WORK_VALUES'
    },
    {
        id: 'w5',
        text: 'I value a supportive work environment.',
        category: 'support',
        framework: 'WORK_VALUES'
    },
    {
        id: 'w6',
        text: 'Good working conditions and job security are priorities for me.',
        category: 'workingConditions',
        framework: 'WORK_VALUES'
    }
]; 