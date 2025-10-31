"use client";

import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { resetPasswordAPI } from "@/api/users"; // API call to reset the password
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function useResetPassword() {
  const [values, setValues] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });

  const [apiInitiated, setApiInitiated] = useState(false);

  const router = useRouter();

  // Validation checks for reset password
  const resetPasswordErrors = useMemo(() => {
    const errors = [];

    if (!values.newPassword || values.newPassword.length < 6) {
      errors.push('Password must be at least 6 characters long.');
    }

    if (values.newPassword !== values.confirmNewPassword) {
      errors.push('Passwords do not match.');
    }

    return errors;
  }, [values]);

  const resetApiErrors = useCallback(
    (errorString:any) => apiInitiated && resetPasswordErrors.includes(errorString),
    [apiInitiated, resetPasswordErrors]
  );

  // Mutation for resetting password
  const { mutate, isPending: isLoading } = useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: resetPasswordAPI,
    onSuccess: () => {
      toast.success("Password reset successful!");
      router.push("/login"); // Redirect to login after successful reset
    },
    onError: (error:any) => {
      toast.error(error?.response?.data?.message || "Error resetting password, please try again.");
    },
  });

  // Handling the reset password process
  const handleResetPassword = useCallback((token: string) => {
    setApiInitiated(true);

    if (!token) {
      toast.error("Invalid or missing token.");
      return; 
    }
    if (resetPasswordErrors.length === 0) {
      mutate({
        token: token,
        password: values.newPassword,
      });
    }
  }, [mutate, resetPasswordErrors, values]);

  // Update form values
  const updateFields = useCallback((data:any) => {
    setValues((prev) => ({
      ...prev,
      [data.key]: data.value,
    }));
  }, []);

  return {
    isLoading,
    handleResetPassword,
    values,
    updateFields,
    resetApiErrors,
    apiInitiated,
  };
}

export default useResetPassword;
