import { gql } from "@apollo/client";
import type { CPUser } from "./queries";

// ============ changeContact ============
export const CLIENT_PORTAL_USER_REQUEST_CHANGE_EMAIL = gql`
  mutation ClientPortalUserRequestChangeEmail($newEmail: String!) {
    clientPortalUserRequestChangeEmail(newEmail: $newEmail)
  }
`;

export const CLIENT_PORTAL_USER_CONFIRM_CHANGE_EMAIL = gql`
  mutation ClientPortalUserConfirmChangeEmail($code: String!) {
    clientPortalUserConfirmChangeEmail(code: $code) {
      _id
      email
      isEmailVerified
    }
  }
`;

export const CLIENT_PORTAL_USER_REQUEST_CHANGE_PHONE = gql`
  mutation ClientPortalUserRequestChangePhone($newPhone: String!) {
    clientPortalUserRequestChangePhone(newPhone: $newPhone)
  }
`;

export const CLIENT_PORTAL_USER_CONFIRM_CHANGE_PHONE = gql`
  mutation ClientPortalUserConfirmChangePhone($code: String!) {
    clientPortalUserConfirmChangePhone(code: $code) {
      _id
      phone
      isPhoneVerified
    }
  }
`;

export type ClientPortalUserRequestChangeEmailVariables = { newEmail: string };
export type ClientPortalUserRequestChangeEmailData = { clientPortalUserRequestChangeEmail: string };

export type ClientPortalUserConfirmChangeEmailVariables = { code: string };
export type ClientPortalUserConfirmChangeEmailData = { clientPortalUserConfirmChangeEmail: CPUser };

export type ClientPortalUserRequestChangePhoneVariables = { newPhone: string };
export type ClientPortalUserRequestChangePhoneData = { clientPortalUserRequestChangePhone: string };

export type ClientPortalUserConfirmChangePhoneVariables = { code: string };
export type ClientPortalUserConfirmChangePhoneData = { clientPortalUserConfirmChangePhone: CPUser };

// ============ loginWithCredentials ============
export const CLIENT_PORTAL_USER_LOGIN_WITH_CREDENTIALS = gql`
  mutation ClientPortalUserLoginWithCredentials(
    $email: String
    $phone: String
    $password: String
  ) {
    clientPortalUserLoginWithCredentials(
      email: $email
      phone: $phone
      password: $password
    )
  }
`;

export type ClientPortalUserLoginWithCredentialsVariables = {
  email?: string;
  phone?: string;
  password?: string;
};

// Returns JSON — typically { token, refreshToken }
export type ClientPortalUserLoginWithCredentialsData = {
  clientPortalUserLoginWithCredentials: Record<string, unknown>;
};

// ============ loginWithOTP ============
export const CLIENT_PORTAL_USER_REQUEST_OTP = gql`
  mutation ClientPortalUserRequestOTP($identifier: String!) {
    clientPortalUserRequestOTP(identifier: $identifier)
  }
`;

export const CLIENT_PORTAL_USER_LOGIN_WITH_OTP = gql`
  mutation ClientPortalUserLoginWithOTP(
    $identifier: String!
    $otp: String!
  ) {
    clientPortalUserLoginWithOTP(identifier: $identifier, otp: $otp)
  }
`;

export type ClientPortalUserRequestOTPVariables = {
  identifier: string;
};

export type ClientPortalUserRequestOTPData = {
  clientPortalUserRequestOTP: string;
};

export type ClientPortalUserLoginWithOTPVariables = {
  identifier: string;
  otp: string;
};

// Returns JSON — typically { token, refreshToken }
export type ClientPortalUserLoginWithOTPData = {
  clientPortalUserLoginWithOTP: Record<string, unknown>;
};

// ============ loginWithSocial ============
export const CLIENT_PORTAL_USER_LOGIN_WITH_SOCIAL = gql`
  mutation ClientPortalUserLoginWithSocial(
    $provider: SocialAuthProvider!
    $token: String!
  ) {
    clientPortalUserLoginWithSocial(provider: $provider, token: $token)
  }
`;

export type ClientPortalUserLoginWithSocialVariables = {
  provider: SocialAuthProvider;
  token: string;
};

// Returns token string
export type ClientPortalUserLoginWithSocialData = {
  clientPortalUserLoginWithSocial: string;
};

// ============ password ============
export const CLIENT_PORTAL_USER_FORGOT_PASSWORD = gql`
  mutation ClientPortalUserForgotPassword($identifier: String!) {
    clientPortalUserForgotPassword(identifier: $identifier)
  }
`;

export const CLIENT_PORTAL_USER_RESET_PASSWORD = gql`
  mutation ClientPortalUserResetPassword(
    $token: String
    $identifier: String
    $code: String
    $newPassword: String!
  ) {
    clientPortalUserResetPassword(
      token: $token
      identifier: $identifier
      code: $code
      newPassword: $newPassword
    )
  }
`;

export type ClientPortalUserForgotPasswordVariables = {
  identifier: string;
};

export type ClientPortalUserForgotPasswordData = {
  clientPortalUserForgotPassword: string;
};

export type ClientPortalUserResetPasswordVariables = {
  token?: string;
  identifier?: string;
  code?: string;
  newPassword: string;
};

export type ClientPortalUserResetPasswordData = {
  clientPortalUserResetPassword: string;
};

// ============ register ============
export type CPUserType = "customer" | "company";

export type ClientPortalUserRegisterInput = {
  phone?: string;
  email?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  userType?: CPUserType;
  code?: string;
  propertiesData?: Record<string, unknown>;
};

export const CLIENT_PORTAL_USER_REGISTER = gql`
  mutation ClientPortalUserRegister(
    $phone: String
    $email: String
    $username: String
    $password: String
    $firstName: String
    $lastName: String
    $userType: CPUserType
    $code: String
    $propertiesData: JSON
  ) {
    clientPortalUserRegister(
      phone: $phone
      email: $email
      username: $username
      password: $password
      firstName: $firstName
      lastName: $lastName
      userType: $userType
      code: $code
      propertiesData: $propertiesData
    ) {
      _id
      email
      phone
      username
      firstName
      lastName
      isVerified
      isEmailVerified
      isPhoneVerified
      createdAt
    }
  }
`;

export type ClientPortalUserRegisterVariables = ClientPortalUserRegisterInput;

export type ClientPortalUserRegisterData = {
  clientPortalUserRegister: CPUser;
};

// ============ registerWithSocial ============
export type SocialAuthProvider = "google" | "facebook" | "apple" | "twitter";

export const CLIENT_PORTAL_USER_REGISTER_WITH_SOCIAL = gql`
  mutation ClientPortalUserRegisterWithSocial(
    $provider: SocialAuthProvider!
    $token: String!
  ) {
    clientPortalUserRegisterWithSocial(provider: $provider, token: $token) {
      _id
      email
      phone
      username
      firstName
      lastName
      socialAuthProviders
      isVerified
      isEmailVerified
      isPhoneVerified
      createdAt
    }
  }
`;

export type ClientPortalUserRegisterWithSocialVariables = {
  provider: SocialAuthProvider;
  token: string;
};

export type ClientPortalUserRegisterWithSocialData = {
  clientPortalUserRegisterWithSocial: CPUser;
};

// ============ session ============
export const CLIENT_PORTAL_LOGOUT = gql`
  mutation ClientPortalLogout {
    clientPortalLogout
  }
`;

export const CLIENT_PORTAL_USER_REFRESH_TOKEN = gql`
  mutation ClientPortalUserRefreshToken($refreshToken: String!) {
    clientPortalUserRefreshToken(refreshToken: $refreshToken)
  }
`;

export type ClientPortalUserRefreshTokenVariables = {
  refreshToken: string;
};

export type ClientPortalUserRefreshTokenData = {
  clientPortalUserRefreshToken: string;
};

export type ClientPortalLogoutData = {
  clientPortalLogout: string;
};

// ============ social ============
export const CLIENT_PORTAL_USER_LINK_SOCIAL_ACCOUNT = gql`
  mutation ClientPortalUserLinkSocialAccount(
    $provider: SocialAuthProvider!
    $token: String!
  ) {
    clientPortalUserLinkSocialAccount(provider: $provider, token: $token) {
      _id
      socialAuthProviders
    }
  }
`;

export const CLIENT_PORTAL_USER_UNLINK_SOCIAL_ACCOUNT = gql`
  mutation ClientPortalUserUnlinkSocialAccount($provider: SocialAuthProvider!) {
    clientPortalUserUnlinkSocialAccount(provider: $provider) {
      _id
      socialAuthProviders
    }
  }
`;

export type ClientPortalUserLinkSocialAccountVariables = {
  provider: SocialAuthProvider;
  token: string;
};

export type ClientPortalUserLinkSocialAccountData = {
  clientPortalUserLinkSocialAccount: CPUser;
};

export type ClientPortalUserUnlinkSocialAccountVariables = {
  provider: SocialAuthProvider;
};

export type ClientPortalUserUnlinkSocialAccountData = {
  clientPortalUserUnlinkSocialAccount: CPUser;
};

// ============ verify ============
export const CLIENT_PORTAL_USER_VERIFY = gql`
  mutation ClientPortalUserVerify(
    $userId: String
    $code: String!
    $email: String
    $phone: String
  ) {
    clientPortalUserVerify(
      userId: $userId
      code: $code
      email: $email
      phone: $phone
    ) {
      _id
      isVerified
      isEmailVerified
      isPhoneVerified
    }
  }
`;

export type ClientPortalUserVerifyVariables = {
  userId?: string;
  code: string;
  email?: string;
  phone?: string;
};

export type ClientPortalUserVerifyData = {
  clientPortalUserVerify: CPUser;
};
