export const API_URL = {
    AUTH: {
        LOGIN: '/api/login/',
        SIGNUP: '/api/register/',
        FORGOT_PASSWORD: '/api/forgot-password/',
        REFRESH_TOKEN: '/api/refresh-token/',
    },

    STUDYING: {
        GET_STREAMS: '/api/stream/',
        GET_CLASSES: '/api/class/',
    },

    TEST: {
        POST_QUESTIONS: '/api/question/',
        GET_QUESTIONS: '/api/question/',
        POST_ANSWERS: '/api/student-answer/',
    },

    STUDENT: {
        BASIC: '/api/student/',
        EDUCATION: '/api/education/',
        PERSONAL: '/api/personal/',
    },
    PAYMENT: {
        CREATE_ORDER: '/api/create-payment/',
        VERIFY_ORDER: '/api/verify-payment/',
    },

    ADMIN: {
        CATEGORY: '/api/category/',
        DELETE_CATEGORY: (id: string) => `/api/category/${id}/`,
        CLASS: '/api/class/',
        DELETE_CLASS: (id: string) => `/api/class/${id}/`,
        STREAM: '/api/stream/',
        DELETE_STREAM: (id: string) => `/api/stream/${id}/`,
        PAYMENT: '/api/payment-amount/',
        DELETE_PAYMENT: (id: string) => `/api/payment-amount/${id}/`,
    },
    RESULT: {
        GET_RESULT: (uuid: string) => `/api/result/${uuid}/`,
        POST_RESULT: '/api/result-create/',
    },
    CHATBOT: {
        GET_CHATBOT: '/api/ask/',
    },

    
}