import { useState } from 'react';
import axiosInstance from './axiousInstance';

export const useValidationApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationResult, setValidationResult] = useState(null);

  /**
   * Validate a ticket by ID
   * @param {string} ticketId - UUID of the ticket
   * @param {string} method - 'QR_SCAN' or 'MANUAL'
   * @returns {Promise<Object>} Validation result
   */
  const validateTicket = async (ticketId, method = 'QR_SCAN') => {
    setLoading(true);
    setError(null);
    setValidationResult(null);

    try {
      const response = await axiosInstance.post('/ticket-validations', {
        id: ticketId,
        method: method
      });

      setValidationResult(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Không thể xác thực vé';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Reset validation state
   */
  const resetValidation = () => {
    setValidationResult(null);
    setError(null);
    setLoading(false);
  };

  return {
    loading,
    error,
    validationResult,
    validateTicket,
    resetValidation
  };
};
