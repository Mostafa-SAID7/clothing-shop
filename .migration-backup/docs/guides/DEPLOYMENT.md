# Deployment Guide

Complete guide for deploying Style Haven to various platforms.

## Table of Contents

- [Vercel (Recommended)](#vercel-recommended)
- [Netlify](#netlify)
- [AWS](#aws)
- [DigitalOcean](#digitalocean)
- [Docker](#docker)
- [Environment Variables](#environment-variables)
- [Post-Deployment](#post-deployment)

---

## Vercel (Recommended)

Vercel is the easiest and recommended platform for Next.js applications.

### Prerequisites

- GitHub/GitLab/Bitbucket account
- Vercel account (free tier available)
- Stripe account with live API keys

### Steps

1. **Push to Git Repository**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**

   In Vercel project settings, add:

   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key
   STRIPE_SECRET_KEY=sk_live_your_key
   NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait ~2 minutes for build to complete
   - Your site is live! 🎉

### Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_BASE_URL` to your custom domain

### Automatic Deployments

Vercel automatically deploys:

- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

---

## Netlify

### Steps

1. **Build the Project**

   ```bash
   npm run build
   ```

2. **Deploy to Netlify**

   Option A - Netlify CLI:

   ```bash
   npm install -g netlify-cli
   netlify login
   netlify init
   netlify deploy --prod
   ```

   Option B - Netlify Dashboard:
   - Drag and drop the `out` folder
   - Or connect your Git repository

3. **Configure Environment Variables**

   In Netlify dashboard → Site settings → Environment variables:

   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key
   STRIPE_SECRET_KEY=sk_live_your_key
   NEXT_PUBLIC_BASE_URL=https://your-site.netlify.app
   ```

4. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

---

## AWS

### Using AWS Amplify

1. **Install Amplify CLI**

   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   ```

2. **Initialize Amplify**

   ```bash
   amplify init
   amplify add hosting
   ```

3. **Deploy**
   ```bash
   amplify publish
   ```

### Using AWS EC2

1. **Launch EC2 Instance**
   - Ubuntu 22.04 LTS
   - t2.micro (free tier eligible)
   - Open ports 80, 443, 22

2. **SSH into Instance**

   ```bash
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

3. **Install Dependencies**

   ```bash
   sudo apt update
   sudo apt install nodejs npm nginx
   ```

4. **Clone and Build**

   ```bash
   git clone <your-repo>
   cd clothing-shop
   npm install
   npm run build
   ```

5. **Configure Nginx**

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Start Application**

   ```bash
   npm start
   ```

7. **Use PM2 for Process Management**
   ```bash
   npm install -g pm2
   pm2 start npm --name "clothing-shop" -- start
   pm2 startup
   pm2 save
   ```

---

## DigitalOcean

### Using App Platform

1. **Create New App**
   - Go to DigitalOcean App Platform
   - Connect your GitHub repository

2. **Configure Build**

   ```
   Build Command: npm run build
   Run Command: npm start
   ```

3. **Add Environment Variables**

   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key
   STRIPE_SECRET_KEY=sk_live_your_key
   NEXT_PUBLIC_BASE_URL=https://your-app.ondigitalocean.app
   ```

4. **Deploy**
   - Click "Deploy"
   - App will be live in ~5 minutes

---

## Docker

### Dockerfile

Create `Dockerfile` in project root:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      - STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
      - NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
    restart: unless-stopped
```

### Build and Run

```bash
docker build -t clothing-shop .
docker run -p 3000:3000 --env-file .env clothing-shop
```

Or with Docker Compose:

```bash
docker-compose up -d
```

---

## Environment Variables

### Required Variables

| Variable                             | Description            | Example                  |
| ------------------------------------ | ---------------------- | ------------------------ |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | `pk_live_...`            |
| `STRIPE_SECRET_KEY`                  | Stripe secret key      | `sk_live_...`            |
| `NEXT_PUBLIC_BASE_URL`               | Your app's URL         | `https://yourdomain.com` |

### Security Notes

- ✅ Use **live** keys for production
- ✅ Use **test** keys for development
- ❌ Never commit `.env` file to Git
- ✅ Use platform-specific secret management
- ✅ Rotate keys periodically

---

## Post-Deployment

### 1. Test Checkout Flow

- [ ] Browse products
- [ ] Add items to cart
- [ ] Complete checkout with test card
- [ ] Verify success page
- [ ] Check Stripe dashboard for payment

### 2. Configure Stripe Webhooks

1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`

### 3. Set Up Monitoring

- **Vercel Analytics**: Built-in analytics
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **Google Analytics**: User analytics

### 4. Performance Optimization

- Enable CDN caching
- Optimize images
- Enable compression
- Set up proper caching headers

### 5. Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] API rate limiting configured
- [ ] CORS properly configured
- [ ] Security headers set
- [ ] Regular dependency updates

### 6. SEO Setup

- [ ] Add sitemap.xml
- [ ] Configure robots.txt
- [ ] Set up meta tags
- [ ] Add structured data
- [ ] Submit to Google Search Console

---

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Working

- Ensure variables are set in platform dashboard
- Restart the application after adding variables
- Check variable names (case-sensitive)

### Stripe Errors

- Verify API keys are correct
- Check if using test vs live keys
- Ensure `NEXT_PUBLIC_BASE_URL` is correct

### 404 Errors

- Check Next.js routing configuration
- Verify build completed successfully
- Check server logs for errors

---

## Support

For deployment issues:

- Check [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- Review platform-specific documentation
- Open an issue on GitHub
