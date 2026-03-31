import axios from 'axios';
import { ApprovalUpdatePayload, mapFormDataToApiPayload } from '../components/Utils/UiUtilis';
import { PublicClientApplication } from '@azure/msal-browser';
import dummy from "./dummyData.json"
import requestorDummy from "./requestorDummyData.json";
const subscriptionKey = '9e16f4849c124245baf84a1d4f9bcc6e'; //ad8c056dfd0d424383d8c36700dbfaf2
const BASE_URL = 'https://apim-alixdev.alixpartners.com/etrm/v1';
export async function fetchNonClientNewProject(token: string) {
  try {
    const response = await axios.get(
      'https://apim-alixdev.alixpartners.com/etrm/v1/etrm_request/nonclientnewproject',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Ocp-Apim-Subscription-Key': subscriptionKey,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error fetching data:', error?.response?.data || error?.message);
    throw error;
    // return sampleResponse;
  }
}

export async function submitNonClientNewProject(formData: any, token: string) {
  try {
    const apiPayload = mapFormDataToApiPayload(formData);
    const response = await axios.post(
      'https://apim-alixdev.alixpartners.com/etrm/v1/interoperatibility/submit_request',
      apiPayload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Ocp-Apim-Subscription-Key': subscriptionKey,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error posting data:', error?.response?.data || error?.message);
    throw error;
  }
}

export async function fetchExistingProjectMetadata(idOrName: string, token: string) {
  try {
    const response = await axios.get(
      `https://apim-alixdev.alixpartners.com/etrm/v1/etrm_request_existing_metadata/getexistingprojectids/${encodeURIComponent(
        idOrName
      )}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Ocp-Apim-Subscription-Key': subscriptionKey,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error fetching existing project metadata:',
      error?.response?.data || error?.message
    );
    throw error;
  }
}

const msalConfig = {
    auth: {
    clientId: '50e64727-57c1-436e-97c2-fb3bdab52afb',
    authority: 'https://login.microsoftonline.com/46ab644d-6753-4f1a-8268-5e9c62f18142',
    redirectUri: 'http://localhost:5173/',
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

const msalInstance = new PublicClientApplication(msalConfig);
let isMsalInitialized = false;

export const initializeMsalClient = async () => {
  if (!isMsalInitialized) {
    // Initialize MSAL and handle any pending redirect response.
    await msalInstance.initialize();
    try {
      const redirectResponse = await msalInstance.handleRedirectPromise();
      if (redirectResponse && redirectResponse.account) {
        // set the active account so subsequent silent token calls know which account to use
        msalInstance.setActiveAccount(redirectResponse.account);
      }
    } catch (e) {
      // swallow; we'll surface errors during token acquisition
      // eslint-disable-next-line no-console
      console.warn('handleRedirectPromise failed:', e);
    }
    isMsalInitialized = true;
  }
};

const tokenRequest = { scopes: ['api://50e64727-57c1-436e-97c2-fb3bdab52afb/.default'] };

export const generateToken = async () => {
  let account = msalInstance.getAllAccounts()[0];
  try {
    // If we don't have an account yet, attempt an interactive login.
    if (!account) {
      try {
        const loginResponse = await msalInstance.loginPopup(tokenRequest);
        account = loginResponse?.account;
        console.log('acount',account);
      } catch (loginPopupError) {
        // Popup might be blocked. Fall back to redirect which is more reliable in restricted environments.
        console.warn(
          'loginPopup failed (popups may be blocked). Falling back to redirect:',
          loginPopupError
        );
        // This will redirect the page and not return a token immediately.
        await msalInstance.loginRedirect(tokenRequest);
        return null;
      }
    }

    // Try silent acquisition first (best UX).
    const response = await msalInstance.acquireTokenSilent({
      ...tokenRequest,
      account,
    });
    // do not log tokens to console in production
    console.log('response', response);
    return response.accessToken;
  } catch (silentError) {
    // Silent token acquisition failed. Try interactive popup first.
    console.warn('Silent token failed, trying popup:', silentError);
    try {
      const popupResponse = await msalInstance.acquireTokenPopup(tokenRequest);
      console.log('popupResponse', popupResponse);
      return popupResponse.accessToken;
    } catch (popupError) {
      // Popup failed (commonly blocked). Fall back to redirect interactive flow.
      console.warn(
        'acquireTokenPopup failed (popups may be blocked). Falling back to redirect:',
        popupError
      );
      await msalInstance.acquireTokenRedirect(tokenRequest);
      return null;
    }
  }
};

export async function submitOffboardingRequest(payload: any, token: string) {
  console.log('payload', payload);
  try {
    const response = await axios.post(
      'https://apim-alixdev.alixpartners.com/etrm/v1/etrm_interoperatibility/offboard',
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Ocp-Apim-Subscription-Key': subscriptionKey,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Offboarding POST API response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error posting offboarding data:', error?.response?.data || error?.message);
    throw error;
  }
}


export async function getDashboardDetails(userName: string, token: string | null) {
  try {
      const response = await axios.get(
        `https://apim-alixdev.alixpartners.com/etrm/v1/etrm_dashboard/get_all/Jake White`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
   //  return dummy;
  } catch (error: any) {
    console.error('Error posting data:', error?.response?.data || error?.message);
    throw error;
  }
}

export async function getRequestorDashboardDetails(userName: string, token: string | null) {
  try {
      const response = await axios.get(
        `https://apim-alixdev.alixpartners.com/etrm/v1/etrm_dashboard_requestor/get_all/Sandeep Chollangi`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    // return requestorDummy;
  } catch (error: any) {
    console.error('Error posting data:', error?.response?.data || error?.message);
    throw error;
  }
}

export async function updateApprovalById(
  approvalID: string,
  payload: ApprovalUpdatePayload,
  token: string
) {
  const url = `${BASE_URL}/dashboard_update_by_approval/approval_update/${encodeURIComponent(
    approvalID
  )}`;

  try {
    const response = await axios.put(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error: any) {
    // Normalize error for caller
    const serverData = error?.response?.data;
    const message = serverData ?? error?.message ?? 'Unknown error';
    console.error('PUT approval update error', message);
    throw message;
  }
}