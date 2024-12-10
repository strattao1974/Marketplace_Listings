import { getEbayToken, createEbayClient } from './ebay/auth.js';
import { getActiveListings, getNewListings, getTopViewed, getTotalViews } from './ebay/listings.js';
import { getUnreadMessages } from './ebay/messages.js';

export async function getEbaySummary() {
  try {
    const token = await getEbayToken();
    const ebayClient = createEbayClient(token);

    // Get active listings
    const listings = await getActiveListings(ebayClient);
    const unreadMessages = await getUnreadMessages(ebayClient);

    return {
      platform: 'eBay',
      activeListings: listings.length,
      newListings: getNewListings(listings).length,
      totalViews: getTotalViews(listings),
      topViewed: getTopViewed(listings),
      unreadMessages: unreadMessages.length
    };
  } catch (error) {
    console.error('eBay API Error:', error);
    return {
      platform: 'eBay',
      error: 'Failed to fetch eBay data'
    };
  }
}