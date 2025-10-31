"use client";

import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import useStore from "@/store";
import { userLogin, userSignUp } from "@/api/users";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/routes/localRoutes";
import { toast } from "react-toastify";
import { useGoogleLogin } from '@react-oauth/google';
import { appleLoginApi, googleLoginApi } from "@/api/oauth";

function useLogin() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const defaultValues = {
    email: '',
    password: '',
    confirmPassword: '',
    country_code: {
      name: "United Arab Emirates",
      dial_code: "+971",
      code: "AE",
    },
    phone_number: '',
  }

  const [values, setValues] = useState(defaultValues);

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [apiInitiated, setApiInitiated] = useState(false);

  const [googleUser, setGoogleUser] = useState();

  const [appleLoginValue, setAppleLoginValue] = useState({});


  const router = useRouter();

  const platform = useStore(state => state.platform)
  const setPlatform = useStore(state => state.setPlatform)

  const updateCurrentUser = useStore(state => state.updateCurrentUser)
  const updateAuthToken = useStore(state => state.updateAuthToken)

  const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || "";

  const googleLogin = useGoogleLogin({
    redirect_uri: redirectUri,
    onSuccess: (codeResponse) => setGoogleUser(codeResponse),
    onError: (error) => console.log('Google login Failed:', error)
  });

  const loginErrors = useMemo(() => {
    let valuesError = []

    if (!values?.email || !/\S+@\S+\.\S+/.test(values?.email)) {
      valuesError.push('Please enter a valid email address.')
    }

    if (!values?.password || values?.password.length < 6) {
      valuesError.push('Password must be at least 6 characters long.')
    }
    return valuesError;
  }, [values]);

  const signUpErrors = useMemo(() => {
    let valuesError = []

    if (!values.name) {
      valuesError.push('Please enter a name.')
    }

    if (!values?.email || !/\S+@\S+\.\S+/.test(values?.email)) {
      valuesError.push('Please enter a valid email address.')
    }

    if (!values?.password || values?.password.length < 6) {
      valuesError.push('Password must be at least 6 characters long.')
    }

    if (!values?.confirmPassword || values?.confirmPassword !== values?.password) {
      valuesError.push('Passwords do not match.')
    }

    if (!values?.country_code || !values?.phone_number) {
      valuesError.push('Please provide a phone number.')
    }
    return valuesError
  }, [values]);

  const loginApiErrors = useCallback((errorString: string) => apiInitiated && loginErrors.includes(errorString), [apiInitiated, loginErrors]);

  const registerApiErrors = useCallback((errorString: string) => apiInitiated && signUpErrors.includes(errorString), [apiInitiated, signUpErrors]);


  const { mutate, isPending: isLoading } = useMutation({
    mutationKey: ["loginUser"],
    mutationFn: userLogin,
    onSuccess: (data) => {
      if (data) {
        updateCurrentUser(data.data.user_details);
        updateAuthToken(data.data.token)
        // if (data.data.user_details?.company?.subscriptions?.length > 0) {
        router.push(routes.blogs.create) // TODO: onboarding condition
        // }
        // else {
        //   router.push(routes.onboarding.home)
        // }
      }
    },
    onError: (error) => {
    }
  });

  const { mutate: signUserApi, isPending: isUserRegistering } = useMutation({
    mutationKey: ["userSignUp"],
    mutationFn: userSignUp,
    onSuccess: (data) => {
      if (data) {
        toast.success("User registered successfully")
        setValues(defaultValues)
        updateCurrentUser(data.data.user_details);
        updateAuthToken(data.data.token)
        router.push(routes.blogs.create) // TODO: onboarding condition
      }
    },
    onError: (error) => {
    }
  });

  const { mutate: googleLoginApiHandler, isPending: isGoogleLoading } = useMutation({
    mutationKey: ["googleLoginApi"],
    mutationFn: googleLoginApi,
    onSuccess: (data) => {
      if (data) {
        updateCurrentUser(data.data.user_details);
        updateAuthToken(data.data.token)
        // if (data.data.user_details?.company?.subscriptions?.length > 0) {
        router.push(routes.blogs.create) // TODO: onboarding condition
        // }
        // else {
        //   router.push(routes.onboarding.home)
        // }
      }
    },
    onError: (error) => {
    }
  });

  const { mutate: appleLoginApiHandler, isPending: isAppleLoading } = useMutation({
    mutationKey: ["appleLoginApi"],
    mutationFn: appleLoginApi,
    onSuccess: (data) => {
      if (data) {
        updateCurrentUser(data.data.user_details);
        updateAuthToken(data.data.token)
        // if (data.data.user_details?.company?.subscriptions?.length > 0) {
        router.push(routes.blogs.create) // TODO: onboarding condition
        // }
        // else {
        //   router.push(routes.onboarding.home)
        // }
      }
    },
    onError: (error) => {
    }
  });

  useEffect(
    () => {
      if (googleUser) {
        // googleUser?.access_token
        googleLoginApiHandler({
          access_token: googleUser.access_token
        })
      }
    },
    [googleUser, googleLoginApiHandler]
  );

  useEffect(() => {
    if (Object.keys(appleLoginValue).length > 0) {
      appleLoginApiHandler(appleLoginValue)
    }
  }, [appleLoginApiHandler, appleLoginValue])

  const handleUserLogin = useCallback(() => {
    setApiInitiated(true);
    if (loginErrors?.length === 0) {
      mutate({
        email: values?.email,
        password: values?.password
      });
    }
  }, [mutate, loginErrors, values]);

  const handleUserSignUp = useCallback(() => {
    setApiInitiated(true);
    if (signUpErrors?.length === 0) {
      signUserApi({
        email: values?.email,
        password: values?.password,
        confirmPassword: values?.confirmPassword,
        country_code: values?.country_code?.dial_code,
        phone_number: values?.phone_number,
        name: values?.name
      })
    }
  }, [signUpErrors, values, signUserApi]);

  const onSignUpClick = useCallback(() => {
    setValues(defaultValues);
    router.push(routes.signUp.home)
  }, [router, setValues]);

  const onSignInClick = useCallback(() => {
    setValues(defaultValues);
    router.push(routes.login.home)
  }, [router, setValues]);

  const updateFields = useCallback((data: any) => {
    setValues(prev => ({
      ...prev,
      [data.key]: data.value
    }))
  }, [setValues]);

  return {
    isLoading,
    handleUserLogin,
    email, setEmail,
    password, setPassword,
    emailError,
    emailErrorMessage,
    passwordError,
    passwordErrorMessage,
    router,
    onSignUpClick,
    onSignInClick,
    updateFields,
    values,
    handleUserSignUp,
    loginErrors,
    signUpErrors,
    loginApiErrors,
    registerApiErrors,
    confirmPassword, setConfirmPassword,
    apiInitiated,
    isUserRegistering,
    googleLogin,
    platform, setPlatform, setGoogleUser, isGoogleLoading,
    isAppleLoading, setAppleLoginValue
  };
}

export default useLogin;
