export const getApiErrorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback;

export const getFieldErrors = (error) => error?.response?.data?.errors || {};
