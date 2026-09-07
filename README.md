# Gemini CORS Proxy & Environment Setup Guide

A lightweight Cloudflare Worker reverse proxy designed to handle CORS restrictions and protect backend communications when integrating with the Google Gemini API.

---

## 1. Environment Credentials Setup

### GEMINI_API_KEY
1. Navigate to Google AI Studio ([https://aistudio.google.com/](https://aistudio.google.com/)).
2. Click "Get API key" > "Create API key" (bind or create a Google Cloud project).
3. Copy the generated key and store it in your Flutter app's .env file as GEMINI_API_KEY.
(Note: You can use the Gemini API to generate images if your Google Cloud Billing account is enabled for paid usage).

### CLOUDFLARE_ACCOUNT_ID
1. Log in to the Cloudflare Dashboard ([https://dash.cloudflare.com/](https://dash.cloudflare.com/)).
2. Go to AI > Workers AI (or navigate to Workers & Pages).
3. Locate the REST API section on the right-hand panel.
4. Copy your Account ID and store it in your .env file as CLOUDFLARE_ACCOUNT_ID.

### CLOUDFLARE_API_TOKEN
1. Click your profile avatar at the top-right corner > My Profile > API Tokens.
2. Click "Create Token" > select "Create Custom Token".
3. Configure the permissions as follows:
   * Account Permissions:
     - Workers Agents Configuration: Edit
     - Containers: Edit
     - Workers Observability: Edit
     - Workers Builds Configuration: Edit
     - Workers AI: Edit
     - Cloudflare Pages: Edit
     - Workers R2 Storage: Edit
     - Workers Tail: Read
     - Workers KV Storage: Edit
     - Workers Scripts: Edit
     - Account Settings: Read
   * Zone Permissions:
     - All zones - Workers Routes: Edit
   * User Permissions:
     - All users - Memberships: Read
     - All users - User Details: Read
4. Click "Continue to summary" > "Create Token".
5. Copy the generated token and save it as CLOUDFLARE_API_TOKEN.

---

## 2. Cloudflare CORS Proxy Deployment Steps

### Step 1: Open the Project Directory
Open this folder in VS Code or your system terminal:
> cd my-cors-proxy

### Step 2: Configure wrangler.toml
Open wrangler.toml and update the "name" field if you wish to use a custom worker name:
> name = "my-cors-proxy"
> main = "index.js"
> compatibility_date = "2024-01-01"

### Step 3: Authenticate and Deploy
Run the following commands in your terminal:
1. Log in to your Cloudflare account via browser:
> npx wrangler login

2. Deploy the Worker to Cloudflare:
> npx wrangler deploy

### Step 4: Obtain and Verify Proxy URL
Upon successful deployment, Wrangler will output your live URL:
> Published my-cors-proxy
> https://my-cors-proxy.<your-subdomain>.workers.dev

Copy this URL and set it as CLOUDFLARE_PROXY_URL in your Flutter application's .env configuration file.
