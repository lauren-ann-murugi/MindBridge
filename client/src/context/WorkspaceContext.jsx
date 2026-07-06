"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const WorkspaceContext = createContext(null);

export const WorkspaceProvider = ({ children }) => {
  const [activeCourse, setActiveCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the active course from the backend when the app loads
  const fetchActiveCourse = async () => {
    try {
      const response = await api.get('/student/courses/active');
      if (response.data && response.data.id) {
        setActiveCourse(response.data);
      }
    } catch (error) {
      console.error("Failed to sync workspace context:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveCourse();
  }, []);

  return (
    <WorkspaceContext.Provider value={{ activeCourse, setActiveCourse, fetchActiveCourse }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => useContext(WorkspaceContext);