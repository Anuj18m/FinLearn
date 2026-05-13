import api from './api';

export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data.data;
  }
};

export const moduleService = {
  getAllModules: async () => {
    const response = await api.get('/modules');
    return response.data.data;
  },

  getModuleBySlug: async (slug) => {
    const response = await api.get(`/modules/${slug}`);
    return response.data.data;
  },

  createModule: async (moduleData) => {
    const response = await api.post('/modules', moduleData);
    return response.data.data;
  },

  updateModule: async (id, moduleData) => {
    const response = await api.put(`/modules/${id}`, moduleData);
    return response.data.data;
  },

  deleteModule: async (id) => {
    const response = await api.delete(`/modules/${id}`);
    return response.data.data;
  }
};

export const quizService = {
  getQuizByModuleId: async (moduleId) => {
    const response = await api.get(`/quizzes/module/${moduleId}`);
    return response.data.data;
  },

  submitQuiz: async (quizData) => {
    const response = await api.post('/quizzes/submit', quizData);
    return response.data.data;
  },

  getAllQuizzes: async () => {
    const response = await api.get('/quizzes');
    return response.data.data;
  },

  createQuiz: async (quizData) => {
    const response = await api.post('/quizzes', quizData);
    return response.data.data;
  },

  updateQuiz: async (id, quizData) => {
    const response = await api.put(`/quizzes/${id}`, quizData);
    return response.data.data;
  },

  deleteQuiz: async (id) => {
    const response = await api.delete(`/quizzes/${id}`);
    return response.data.data;
  }
};

export const progressService = {
  getUserProgress: async () => {
    const response = await api.get('/progress');
    return response.data.data;
  },

  getModuleProgress: async (moduleId) => {
    const response = await api.get(`/progress/module/${moduleId}`);
    return response.data.data;
  },

  getUserStats: async () => {
    const response = await api.get('/progress/stats');
    return response.data.data;
  }
};

export const adminService = {
  getPlatformStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data.data;
  },

  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data.data;
  }
};
