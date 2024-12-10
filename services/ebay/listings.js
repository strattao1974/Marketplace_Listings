export async function getActiveListings(ebayClient) {
  const response = await ebayClient.getMySoldItems({
    limit: 100,
    filter: 'Active'
  });

  return response.itemSummaries || [];
}

export function getNewListings(listings) {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return listings.filter(l => new Date(l.timeStarted) > oneDayAgo);
}

export function getTopViewed(listings, limit = 3) {
  return listings
    .sort((a, b) => (b.watchCount || 0) - (a.watchCount || 0))
    .slice(0, limit);
}

export function getTotalViews(listings) {
  return listings.reduce((sum, l) => sum + (l.watchCount || 0), 0);
}