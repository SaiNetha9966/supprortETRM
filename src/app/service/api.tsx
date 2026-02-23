import axios from 'axios';
import { mapFormDataToApiPayload } from '../components/Utils/UiUtilis';
import { PublicClientApplication } from "@azure/msal-browser";

const sampleResponse = {
  result: {
    sap_project_ids: ['SAP00001', 'SAP00002', 'SAP00003'],
    project_code_names: ['AlphaGreen', 'StackApplication'],
    tools: [
      {
        ToolId: '83567d882b3eb65402fbf092f291bfb2',
        ToolName: 'Container Utilization Optimizer',
        Category: 'AlixPartners Platform',
        ToolTip: 'NA',
        Recommended: true,
      },
      {
        ToolId: '8c26f5802bfab65402fbf092f291bf37',
        ToolName: 'Tool Builder',
        Category: 'AlixPartners Platform',
        ToolTip: 'NA',
        Recommended: true,
      },
      {
        ToolId: '91e5fd082b3eb65402fbf092f291bf15',
        ToolName: 'Team Site',
        Category: 'Most Requested',
        ToolTip: 'NA',
        Recommended: true,
      },
      {
        ToolId: '1cd7ec8c3bf6ba908ec29aae53e45ac9',
        ToolName: 'MS Teams',
        Category: 'Collaboration',
        ToolTip: 'NA',
        Recommended: false,
      },
      {
        ToolId: '2006bc043b32ba908ec29aae53e45a50',
        ToolName: 'Email',
        Category: 'File Exchange',
        ToolTip: 'NA',
        Recommended: false,
      },
      {
        ToolId: '34d38fdc3b7abe908ec29aae53e45a04',
        ToolName: 'Cloud IaaS Services (Servers in Cloud)',
        Category: 'Cloud',
        ToolTip: 'NA',
        Recommended: false,
      },
      {
        ToolId: '5873c3dc3b7abe908ec29aae53e45a1a',
        ToolName: 'PowerBI Workspace',
        Category: 'Reporting/Visualization',
        ToolTip: 'NA',
        Recommended: false,
      },
    ],
    users: [
      { name: 'Bridgette', userID: 'bmiu', emailID: 'bmiu@alixpartners.com' },
      { name: 'Brett', userID: 'bberger', emailID: 'bberger@alixpartners.com' },
      { name: 'Brian', userID: 'bmaloney', emailID: 'bmaloney@alixpartners.com' },
      { name: 'Brian', userID: 'blaforgia', emailID: 'blaforgia@alixpartners.com' },
      { name: 'Elizabeth', userID: 'ehinchey', emailID: 'ehinchey@alixpartners.com' },
      { name: 'Jan', userID: 'jkantowsky', emailID: 'jkantowsky@alixpartners.com' },
      { name: 'James', userID: 'jwestcott', emailID: 'jwestcott@alixpartners.com' },
      { name: 'Luca', userID: 'lramella', emailID: 'lramella@alixpartners.com' },
      { name: 'Lizzie', userID: 'lizzie.prieto', emailID: 'lizzie.prieto@alixpartners.com' },
      { name: 'Lorenzo', userID: 'lformiconi', emailID: 'lformiconi@alixpartners.com' },
      { name: 'Lorie', userID: 'ldirks', emailID: 'ldirks@alixpartners.com' },
      { name: 'Patrick', userID: 'palves', emailID: 'palves@alixpartners.com' },
      {
        name: 'Digvijay',
        userID: 'digvijay.bhalsing',
        emailID: 'digvijay.bhalsing@alixpartners.com',
      },
      { name: 'Eric', userID: 'epleitez', emailID: 'epleitez@alixpartners.com' },
      { name: 'Masaki', userID: 'mshuto', emailID: 'mshuto@alixpartners.com' },
      { name: 'Meka', userID: 'meka.pratimareddy', emailID: 'meka.pratimareddy@alixpartners.com' },
      { name: 'Alasdair', userID: 'adonald', emailID: 'adonald@alixpartners.com' },
      { name: 'Alessandro', userID: 'amissaglia', emailID: 'amissaglia@alixpartners.com' },
      { name: 'Charles', userID: 'cspence', emailID: 'cspence@alixpartners.com' },
      { name: 'Joe', userID: 'ckewish', emailID: 'ckewish@alixpartners.com' },
    ],
  },
};
const subscriptionKey = '9e16f4849c124245baf84a1d4f9bcc6e'; //ad8c056dfd0d424383d8c36700dbfaf2

export async function fetchNonClientNewProject(token:string) {
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

    console.log('API response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching data:', error?.response?.data || error?.message);
    throw error;
    // return sampleResponse;
  }
}

export async function submitNonClientNewProject(formData: any) {
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
    console.log('POST API response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error posting data:', error?.response?.data || error?.message);
    throw error;
  }
}

export async function fetchExistingProjectMetadata(idOrName: string) {
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
    console.log('Existing project metadata response:', response.data);
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
    clientId: "50e64727-57c1-436e-97c2-fb3bdab52afb",
    authority: "https://login.microsoftonline.com/46ab644d-6753-4f1a-8268-5e9c62f18142",
    redirectUri: "http://localhost:5173",
  },
  cache: {
    cacheLocation: "sessionStorage",
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
      console.warn("handleRedirectPromise failed:", e);
    }
    isMsalInitialized = true;
  }
};

const tokenRequest = { scopes: ["api://50e64727-57c1-436e-97c2-fb3bdab52afb/.default"] };

export const generateToken = async () => {
  let account = msalInstance.getAllAccounts()[0];
  try {
    // If we don't have an account yet, attempt an interactive login.
    if (!account) {
      try {
        const loginResponse = await msalInstance.loginPopup(tokenRequest);
        account = loginResponse?.account;
      } catch (loginPopupError) {
        // Popup might be blocked. Fall back to redirect which is more reliable in restricted environments.
        console.warn("loginPopup failed (popups may be blocked). Falling back to redirect:", loginPopupError);
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
   console.log("response",response)
    return response.accessToken;
  } catch (silentError) {
    // Silent token acquisition failed. Try interactive popup first.
    console.warn("Silent token failed, trying popup:", silentError);
    try {
      const popupResponse = await msalInstance.acquireTokenPopup(tokenRequest);
      console.log("popupResponse" ,popupResponse)
      return popupResponse.accessToken;
    } catch (popupError) {
      // Popup failed (commonly blocked). Fall back to redirect interactive flow.
      console.warn("acquireTokenPopup failed (popups may be blocked). Falling back to redirect:", popupError);
      await msalInstance.acquireTokenRedirect(tokenRequest);
      return null;
    }
  }
};














