import axios from "axios";

const API_URL = "/api/tareas/";


const getTareas = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};


const createTarea = async (token, tareaData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, tareaData, config);

  return response.data;
};


const deleteTarea = async (token, tareaId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + tareaId, config);

  return response.data;
};


const updateTarea = async (token, tareaData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + tareaData._id, tareaData, config);
  return response.data;
};

const tareaService = {
  getTareas,
  createTarea,
  deleteTarea,
  updateTarea,
};

export default tareaService;
