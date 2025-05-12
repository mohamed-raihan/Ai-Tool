import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
  AuthError,
  Auth,
  User,
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFcenM7qvtmJ4n-o8TCIxLZIeKBDj_ums",
  authDomain: "prepbackend.firebaseapp.com",
  projectId: "prepbackend",
  storageBucket: "prepbackend.firebasestorage.app",
  messagingSenderId: "4963764479",
  appId: "1:4963764479:web:71aa4fa65472f239f5a4ca",
  measurementId: "G-BFLN37VND1",
};

// Type definitions for better type safety
interface FirebaseAuthResult {
  success: boolean;
  error?: string;
  code?: string;
  user?: User;
  userToken?: string;
  userId?: string;
}

// Initialize Firebase
let app;
let auth: Auth | null = null;
let confirmationResult: ConfirmationResult | null = null;
let recaptchaVerifier: RecaptchaVerifier | null = null;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  auth.languageCode = "en"; // Set English as default language for OTP messages
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization error:", error);
}

/**
 * Initializes reCAPTCHA verifier
 */
export const initializeRecaptcha = async (
  containerId: string
): Promise<boolean> => {
  if (!auth) {
    console.error("Firebase auth not initialized");
    return false;
  }

  resetRecaptcha();

  try {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container with ID ${containerId} not found`);
      return false;
    }

    recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: "invisible",
      callback: () => {
        console.log("reCAPTCHA solved successfully");
      },
      "expired-callback": () => {
        console.log("reCAPTCHA expired");
        resetRecaptcha();
      },
    });

    await recaptchaVerifier.render();
    return true;
  } catch (error) {
    console.error("Error initializing reCAPTCHA:", error);
    resetRecaptcha();
    return false;
  }
};

/**
 * Sends OTP to the provided phone number
 */
export const sendOTP = async (
  phoneNumber: string
): Promise<FirebaseAuthResult> => {
  if (!auth) {
    return {
      success: false,
      error: "Firebase authentication not initialized",
      code: "auth/not-initialized",
    };
  }

  if (!recaptchaVerifier) {
    const recaptchaSuccess = await initializeRecaptcha("recaptcha-container");
    if (!recaptchaSuccess) {
      return {
        success: false,
        error: "Failed to initialize security verification",
        code: "recaptcha/init-failed",
      };
    }
  }

  try {
    // Format phone number if not already formatted
    let formattedNumber = phoneNumber;
    if (!phoneNumber.startsWith("+")) {
      formattedNumber = `+91${phoneNumber.replace(/^0+/, "")}`;
    }

    confirmationResult = await signInWithPhoneNumber(
      auth,
      formattedNumber,
      recaptchaVerifier!
    );

    return { success: true };
  } catch (error: unknown) {
    resetRecaptcha();

    if (error instanceof Error) {
      const authError = error as AuthError;
      console.error("Firebase error:", authError.code, authError.message);

      let userMessage = authError.message;

      // Handle specific error cases with user-friendly messages
      switch (authError.code) {
        case "auth/invalid-phone-number":
          userMessage =
            "Invalid phone number format. Please enter a valid Indian mobile number.";
          break;
        case "auth/quota-exceeded":
          userMessage = "SMS quota exceeded. Please try again later.";
          break;
        case "auth/too-many-requests":
          userMessage = "Too many requests. Please try again later.";
          break;
        case "auth/captcha-check-failed":
          userMessage =
            "Security verification failed. Please refresh the page.";
          break;
      }

      return {
        success: false,
        error: userMessage,
        code: authError.code,
      };
    }

    return {
      success: false,
      error: "Failed to send OTP. Please try again.",
      code: "unknown-error",
    };
  }
};

/**
 * Verifies the OTP entered by the user
 */
export const verifyOTP = async (otp: string): Promise<FirebaseAuthResult> => {
  if (!confirmationResult) {
    return {
      success: false,
      error: "No verification in progress. Please request OTP first.",
      code: "no-verification",
    };
  }

  try {
    const result = await confirmationResult.confirm(otp);
    const token = await result.user.getIdToken();

    return {
      success: true,
      user: result.user,
      userToken: token,
      userId: result.user.uid, // Add this to get the Firebase user ID
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      const authError = error as AuthError;

      let userMessage = authError.message;
      switch (authError.code) {
        case "auth/invalid-verification-code":
          userMessage = "Invalid OTP. Please check and try again.";
          break;
        case "auth/code-expired":
          userMessage = "OTP has expired. Please request a new one.";
          break;
        case "auth/credential-already-in-use":
          userMessage = "This phone number is already in use.";
          break;
      }

      return {
        success: false,
        error: userMessage,
        code: authError.code,
      };
    }

    return {
      success: false,
      error: "Verification failed. Please try again.",
      code: "verification-failed",
    };
  }
};

/**
 * Cleans up reCAPTCHA resources
 */
export const resetRecaptcha = (): void => {
  try {
    if (recaptchaVerifier) {
      recaptchaVerifier.clear();
      recaptchaVerifier = null;
    }
    confirmationResult = null;

    // Clean up DOM elements
    const badges = document.querySelectorAll(".grecaptcha-badge");
    badges.forEach((badge) => badge.remove());

    const container = document.getElementById("recaptcha-container");
    if (container) container.innerHTML = "";

    document
      .querySelectorAll('[id^="grecaptcha-"]')
      .forEach((el) => el.remove());
  } catch (error) {
    console.log("Error resetting reCAPTCHA:", error);
  }
};

/**
 * Utility function to get Firebase auth instance
 */
export const getFirebaseAuth = (): Auth | null => {
  return auth;
};
