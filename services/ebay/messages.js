export async function getUnreadMessages(ebayClient) {
  const messages = await ebayClient.getMyMessages({
    detail_level: 'ReturnMessages',
    start_time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  });

  return messages.messages ? messages.messages.filter(m => !m.read) : [];
}