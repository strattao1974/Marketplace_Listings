import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export async function sendDailySummary(summaries) {
  const date = formatDate(new Date());
  
  const emailContent = `
    <h1>Daily Listing Update: ${date}</h1>
    
    ${summaries.map(summary => `
      <h2>${summary.platform} Summary</h2>
      ${summary.error ? `
        <p style="color: red;">${summary.error}</p>
      ` : `
        <ul>
          <li>Active Listings: ${summary.activeListings}</li>
          <li>New Listings Today: ${summary.newListings}</li>
          <li>Total Views Today: ${summary.totalViews}</li>
          <li>Unread Messages: ${summary.unreadMessages}</li>
          <li>Top Viewed Items:
            <ul>
              ${summary.topViewed.map(item => `
                <li>${item.title} - ${item.viewCount} views</li>
              `).join('')}
            </ul>
          </li>
        </ul>
      `}
    `).join('')}
    
    <h2>Overall Summary</h2>
    <ul>
      <li>Total Active Listings: ${summaries.reduce((sum, s) => sum + (s.activeListings || 0), 0)}</li>
      <li>Total Views: ${summaries.reduce((sum, s) => sum + (s.totalViews || 0), 0)}</li>
      <li>Total Unread Messages: ${summaries.reduce((sum, s) => sum + (s.unreadMessages || 0), 0)}</li>
    </ul>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: `Daily Listing Update: ${date}`,
    html: emailContent
  });
}