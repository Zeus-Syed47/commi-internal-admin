'use client';

import { useMutation } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { forgotPasswordAPI } from '@/api/users'; // Make sure this path is correct
import { toast } from 'react-toastify';

function useForgotPassword() {
  const [values, setValues] = useState({
    email: '',
  });

  const [apiInitiated, setApiInitiated] = useState(false);

  // Validation for email
  const forgotPasswordErrors = useMemo(() => {
    const errors = [];

    if (!values.email || !values.email.includes('@')) {
      errors.push('A valid email is required.');
    }
    return errors;
  }, [values]);

  const resetApiErrors = useCallback(
    (errorString: string) => apiInitiated && forgotPasswordErrors.includes(errorString),
    [apiInitiated, forgotPasswordErrors]
  );

  const { mutate, isPending: isLoading } = useMutation({
    mutationKey: ['forgotPassword'],
    mutationFn: forgotPasswordAPI,
    onSuccess: () => {
      toast.success('Password reset link sent to your email!');
    },
    onError: (error:any) => {
      toast.error(error?.response?.data?.message || 'Failed to send password reset email.');
    },
  });

  // Handle forgot password process
  const handleForgotPassword = useCallback(() => {
    setApiInitiated(true);

    if (forgotPasswordErrors.length === 0) {
      mutate({ email: values.email });
      setApiInitiated(true);
    }

  
  }, [forgotPasswordErrors, mutate, values]);

  // Update email field
  const updateFields = useCallback((data: any) => {
    setValues((prev) => ({
      ...prev,
      [data.key]: data.value,
    }));
  }, []);

  return {
    isLoading,
    handleForgotPassword,
    values,
    updateFields,
    resetApiErrors,
    apiInitiated,
  };
}

export default useForgotPassword;
