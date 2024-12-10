# Marketplace Listing Summary Service

A Node.js service that generates daily summaries of your marketplace listings from eBay, Gumtree, and Facebook Marketplace.

## Prerequisites

- Node.js (v16 or higher)
- npm (Node Package Manager)
- Linux-based operating system
- API credentials for the marketplaces you want to integrate

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd marketplace-summary
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# eBay API Credentials
EBAY_CLIENT_ID=your_ebay_client_id
EBAY_CLIENT_SECRET=your_ebay_client_secret
EBAY_REFRESH_TOKEN=your_ebay_refresh_token

# Email Configuration
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password
EMAIL_FROM=your_email@example.com
EMAIL_TO=recipient@example.com
```

## API Setup Instructions

### eBay API Setup

1. Create an eBay developer account at [eBay Developer Program](https://developer.ebay.com)
2. Create a new application in the developer portal
3. Generate your credentials:
   - Client ID
   - Client Secret
4. Generate a refresh token:
   - Use eBay's OAuth playground
   - Select required scopes (https://api.ebay.com/oauth/api_scope)
   - Complete the authorization flow
   - Save the refresh token

### Email Configuration

1. Configure your SMTP server details:
   - For Gmail: Use `smtp.gmail.com` and port `587`
   - Enable 2FA and generate an app password
2. Update the `.env` file with your SMTP credentials

## Running the Service

1. Start the service:
```bash
npm start
```

The service will:
- Run continuously in the background
- Send daily summaries at 9 AM
- Log activity to the console

2. To run as a system service on Linux:

Create a systemd service file:
```bash
sudo nano /etc/systemd/system/marketplace-summary.service
```

Add the following content:
```ini
[Unit]
Description=Marketplace Listing Summary Service
After=network.target

[Service]
Type=simple
User=your_username
WorkingDirectory=/path/to/marketplace-summary
ExecStart=/usr/bin/npm start
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start the service:
```bash
sudo systemctl enable marketplace-summary
sudo systemctl start marketplace-summary
```

Check service status:
```bash
sudo systemctl status marketplace-summary
```

## Project Structure

```
├── config/
│   └── platforms.js      # Platform-specific configurations
├── services/
│   ├── ebay/
│   │   ├── auth.js       # eBay authentication
│   │   ├── listings.js   # Listing management
│   │   └── messages.js   # Message handling
│   ├── ebay.js          # eBay service integration
│   └── emailService.js   # Email formatting and sending
├── .env                 # Environment variables
├── index.js            # Main application entry
└── package.json        # Project dependencies
```

## Monitoring and Logs

View service logs:
```bash
sudo journalctl -u marketplace-summary -f
```

## Troubleshooting

1. eBay API Issues:
   - Verify API credentials
   - Check refresh token expiration
   - Ensure required scopes are enabled

2. Email Issues:
   - Verify SMTP credentials
   - Check firewall settings
   - Ensure port 587 is open

3. Service Not Starting:
   - Check logs: `sudo journalctl -u marketplace-summary`
   - Verify file permissions
   - Ensure Node.js is installed correctly

## License

MIT License - See LICENSE file for details