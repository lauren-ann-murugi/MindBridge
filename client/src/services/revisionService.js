// import axios from 'axios';

// // Create a configured instance mapping directly to your Flask server port
// const API = axios.create({
//   baseURL: 'http://localhost:5000/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Structural Interceptor Pipeline: Fires automatically before EVERY single network request
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Unified exported service engine endpoints
// export const revisionService = {
//   getFlashcards: async () => {
//     const response = await API.get('/revision/flashcards');
//     return response.data;
//   },
  
//   createFlashcard: async (flashcardData) => {
//     const response = await API.get('/revision/flashcards', flashcardData);
//     return response.data;
//   },

//   getWeakTopics: async () => {
//     const response = await API.get('/revision/weak-topics');
//     return response.data;
//   },

//   getQuizzes: async () => {
//     const response = await API.get('/revision/quizzes');
//     return response.data;
//   },

//   getTimeline: async () => {
//     const response = await API.get('/revision/timeline');
//     return response.data;
//   },

//   getAiInsights: async () => {
//     const response = await API.get('/revision/ai-insights');
//     return response.data;
//   },

//   generateAiQuiz: async () => {
//     const response = await API.post('/revision/generate-quiz');
//     return response.data;
//   }
// };

// export default revisionService;








import api from './api';

// Named Exports matched exactly with the Page imports
export const getFlashcards = async () => {
  const response = await api.get('/revision/flashcards');
  return response.data;
};

export const getQuizzes = async () => {
  const response = await api.get('/revision/quizzes');
  return response.data;
};

export const getWeakTopics = async () => {
  const response = await api.get('/revision/weak-topics');
  return response.data;
};

export const getRevisionTimeline = async () => {
  const response = await api.get('/revision/timeline');
  return response.data;
};

export const getAIInsights = async () => {
  const response = await api.get('/revision/ai-insights');
  return response.data;
};

export const markFlashcardKnown = async (cardId) => {
  const response = await api.post(`/revision/flashcards/${cardId}/known`, {});
  return response.data;
};

export const markFlashcardUnknown = async (cardId) => {
  const response = await api.post(`/revision/flashcards/${cardId}/unknown`, {});
  return response.data;
};

export const startQuiz = async (quizId) => {
  const response = await api.post(`/revision/quizzes/${quizId}/start`, {});
  return response.data;
};

export const startDeepDive = async (topicName) => {
  const response = await api.post('/revision/deep-dive', { topic: topicName });
  return response.data;
};

// Unified default fallback export structure
const revisionService = {
  getFlashcards,
  getQuizzes,
  getWeakTopics,
  getRevisionTimeline,
  getAIInsights,
  markFlashcardKnown,
  markFlashcardUnknown,
  startQuiz,
  startDeepDive,
};

export default revisionService;