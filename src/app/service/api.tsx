import axios from 'axios';
import { mapFormDataToApiPayload } from '../components/Utils/UiUtilis';

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
const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InNNMV95QXhWOEdWNHlOLUI2ajJ4em1pazVBbyIsImtpZCI6InNNMV95QXhWOEdWNHlOLUI2ajJ4em1pazVBbyJ9.eyJhdWQiOiJhcGk6Ly81MGU2NDcyNy01N2MxLTQzNmUtOTdjMi1mYjNiZGFiNTJhZmIiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC80NmFiNjQ0ZC02NzUzLTRmMWEtODI2OC01ZTljNjJmMTgxNDIvIiwiaWF0IjoxNzcxMDU4NTY3LCJuYmYiOjE3NzEwNTg1NjcsImV4cCI6MTc3MTA2MjQ2NywiYWlvIjoiazJaZ1lHQ3F1cXYyTkpmNzdyVzkvNnpmaXY5ZENRQT0iLCJhcHBpZCI6IjUwZTY0NzI3LTU3YzEtNDM2ZS05N2MyLWZiM2JkYWI1MmFmYiIsImFwcGlkYWNyIjoiMSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzQ2YWI2NDRkLTY3NTMtNGYxYS04MjY4LTVlOWM2MmYxODE0Mi8iLCJvaWQiOiI2ZGE0MmNiZi05NzZhLTRkZmYtODMxMi0xN2YxOTg5MWU2ZmMiLCJyaCI6IjEuQVRnQVRXU3JSbE5uR2stQ2FGNmNZdkdCUWlkSDVsREJWMjVEbDhMN085cTFLdnNBQUFBNEFBLiIsInJvbGVzIjpbIkFQSU0uQWNjZXNzIl0sInN1YiI6IjZkYTQyY2JmLTk3NmEtNGRmZi04MzEyLTE3ZjE5ODkxZTZmYyIsInRpZCI6IjQ2YWI2NDRkLTY3NTMtNGYxYS04MjY4LTVlOWM2MmYxODE0MiIsInV0aSI6IkRsLV9ZeXpBQkVXUkI1Yld2c05CQUEiLCJ2ZXIiOiIxLjAiLCJ4bXNfZnRkIjoiUjdTczZzRWtkQWQxSkpsZ2RfYlRibUhHR01JeEJOV29wdFNINXhLLTdzSUJkWE5sWVhOMExXUnpiWE0ifQ.odftwE8GSh1z7ybdpRF9QeD5w8Gab_aOqqMPbUOwZdpWfP9BjuQRRBt4mV_9AcBFmPaC8wzU8UKMNe9k21pWc3LwU4JN9NOxTqpW8eIN8KANm06zIvRYUjr84t7Xtf84rbTc1JVicWbsOqlPlhRttRJlW4PkcTcvuOrspzoqCXo7MAgIcJS9Q-I6zDQLFJxxlKuP9PF6U6_XYd-8EYYJN537qkQEyf2ZCAF-5tWqimwQsJ7EMQD7cpi1yeD-Kr_DNRq73Imf7yHF7n8w8amMTKV0kzc35pBfTc7hVGRz5RuOJlcanRxVM_ZbYFS4J5i59ENf9O3Zk_u_T3gymoUcHQ';
const subscriptionKey = '9e16f4849c124245baf84a1d4f9bcc6e'; //ad8c056dfd0d424383d8c36700dbfaf2

export async function fetchNonClientNewProject() {
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
