import EbayApi from 'ebay-node-api';
import { platformConfigs } from '../../config/platforms.js';

export async function getEbayToken() {
  const ebay = new EbayApi({
    clientId: platformConfigs.ebay.clientId,
    clientSecret: platformConfigs.ebay.clientSecret,
    refreshToken: platformConfigs.ebay.refreshToken,
    env: 'PRODUCTION'
  });
  
  return ebay.getAccessToken();
}

export function createEbayClient(token) {
  const ebay = new EbayApi({
    clientId: platformConfigs.ebay.clientId,
    clientSecret: platformConfigs.ebay.clientSecret,
    refreshToken: platformConfigs.ebay.refreshToken,
    env: 'PRODUCTION'
  });
  
  ebay.setAccessToken(token);
  return ebay;
}