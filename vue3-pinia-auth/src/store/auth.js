import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useAuth = defineStore('auth-store', () => {
  const user = ref(null);
  const authenticated = ref(false);

  const register = async (credentials) => {
    try {
      await axios.get('/sanctum/csrf-cookie');
      await axios.post('/register', credentials);
      getUser();
    } catch (error) {
      user.value = null;
      authenticated.value = false;
      console.error('Error loading new arrivals:', error);
      return error;
    }
  };

  const login = async function (credentials) {
    try {
      await axios.get('/sanctum/csrf-cookie');
      await axios.post('/login', credentials);
      getUser();
    } catch (err) {
      authenticated.value = false;
      user.value = null;
      console.error('Error loading new arrivals:', err);
      return err;
    }
  };

  const logout = async function () {
    try {
      await axios.post('/logout');
      user.value = null;
      authenticated.value = false;
    } catch (err) {
      console.error('Error loading new arrivals:', err);
      return err;
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get('/api/user');
      user.value = response.data;
      authenticated.value = true;
    } catch (error) {
      user.value = null;
      authenticated.value = false;
      console.error('Error loading new arrivals:', error);
      return error;
    }
  };

  return {
    user,
    register,
    login,
    getUser,
    logout,
    authenticated,
  };
});
