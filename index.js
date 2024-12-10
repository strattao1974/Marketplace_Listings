import 'dotenv/config';
import schedule from 'node-schedule';
import { getEbaySummary } from './services/ebay.js';
import { sendDailySummary } from './services/emailService.js';

async function generateDailySummary() {
  try {
    // Fetch summaries from all platforms
    const ebaySummary = await getEbaySummary();
    
    // For demo purposes, we're only implementing eBay
    // You would add similar functions for Gumtree and Facebook Marketplace
    const summaries = [ebaySummary];
    
    // Send email with summaries
    await sendDailySummary(summaries);
    
    console.log('Daily summary email sent successfully');
  } catch (error) {
    console.error('Error generating daily summary:', error);
  }
}

// Schedule daily email at 9 AM
schedule.scheduleJob('0 9 * * *', generateDailySummary);

console.log('Marketplace Summary Service started. Emails will be sent daily at 9 AM.');

