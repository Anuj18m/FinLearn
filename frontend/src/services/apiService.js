import api from './api';

export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

export const moduleService = {
  getAllModules: async () => {
    const response = await api.get('/modules');
    return response.data;
  },

  getModuleBySlug: async (slug) => {
    const response = await api.get(`/modules/${slug}`);
    return response.data;
  },

  createModule: async (moduleData) => {
    const response = await api.post('/modules', moduleData);
    return response.data;
  },

  updateModule: async (id, moduleData) => {
    const response = await api.put(`/modules/${id}`, moduleData);
    return response.data;
  },

  deleteModule: async (id) => {
    const response = await api.delete(`/modules/${id}`);
    return response.data;
  }
};

export const quizService = {
  getQuizByModuleId: async (moduleId) => {
    const response = await api.get(`/quizzes/module/${moduleId}`);
    return response.data;
  },

  submitQuiz: async (quizData) => {
    const response = await api.post('/quizzes/submit', quizData);
    return response.data;
  },

  getAllQuizzes: async () => {
    const response = await api.get('/quizzes');
    return response.data;
  },

  createQuiz: async (quizData) => {
    const response = await api.post('/quizzes', quizData);
    return response.data;
  },

  updateQuiz: async (id, quizData) => {
    const response = await api.put(`/quizzes/${id}`, quizData);
    return response.data;
  },

  deleteQuiz: async (id) => {
    const response = await api.delete(`/quizzes/${id}`);
    return response.data;
  }
};

export const progressService = {
  getUserProgress: async () => {
    const response = await api.get('/progress');
    return response.data;
  },

  getModuleProgress: async (moduleId) => {
    const response = await api.get(`/progress/module/${moduleId}`);
    return response.data;
  },

  getUserStats: async () => {
    const response = await api.get('/progress/stats');
    return response.data;
  }
};
