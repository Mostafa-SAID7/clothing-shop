# Getting Started Guide

Quick start guide to get the Clothing Shop application running locally.

## 🚀 5-Minute Quick Start

### Prerequisites Check

```bash
# Check Node.js version (need 18+)
node --version

# Check pnpm version (need 8+)
pnpm --version

# Check PostgreSQL (need 14+)
psql --version
```

### Step 1: Clone & Install

```bash
# Clone repository
git clone https://github.com/Mostafa-SAID7/clothing-shop
cd clothing-shop

# Install dependencies
pnpm install
```

### Step 2: Setup Environment

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your settings
# Minimum required:
# - DATABASE_URL=postgresql://user:password@localhost:5432/clothing_shop
# - STRIPE_SECRET_KEY=sk_test_...
```

### Step 3: Initialize Database

```bash
# Navigate to database directory
cd lib/db

# Apply migrations
pnpm run push

# Return to root
cd ../..
```

### Step 4: Generate API Code

```bash
# Navigate to API spec directory
cd lib/api-spec

# Generate client code
pnpm run codegen

# Return to root
cd ../..
```

### Step 5: Start Services

**Terminal 1 - Backend**:
```bash
cd api-server
pnpm run dev
# Should see: "Server listening on port 3000"
```

**Terminal 2 - Frontend**:
```bash
cd style-haven
pnpm run dev
# Should see: "Local: http://localhost:5173/"
```

### Step 6: Access Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/api/healthz

---

## 📚 Documentation Structure

### For Different Roles

**Frontend Developers** → Start with:
1. [Frontend Setup](./FRONTEND.md) - React, Vite, Tailwind
2. [Development Workflow](./DEVELOPMENT.md) - Local development
3. [API Reference](./API.md) - Available endpoints

**Backend Developers** → Start with:
1. [Backend Setup](./BACKEND.md) - Express, TypeScript
2. [Database Schema](./DATABASE.md) - PostgreSQL, Drizzle
3. [Development Workflow](./DEVELOPMENT.md) - Local development

**Full Stack Developers** → Start with:
1. [Architecture Overview](./ARCHITECTURE.md) - System design
2. [Development Workflow](./DEVELOPMENT.md) - Full stack setup
3. All other docs as needed

**DevOps/Deployment** → Start with:
1. [Backend Setup](./BACKEND.md) - Deployment section
2. [Frontend Setup](./FRONTEND.md) - Building & deployment
3. [Architecture Overview](./ARCHITECTURE.md) - Scalability

---

## 🔧 Common Setup Issues

### Issue: "DATABASE_URL is required"

**Solution**:
```bash
# Check .env.local exists
ls -la .env.local

# Verify DATABASE_URL is set
grep DATABASE_URL .env.local

# If not set, edit .env.local and add:
DATABASE_URL=postgresql://postgres:password@localhost:5432/clothing_shop
```

### Issue: "Port 3000 already in use"

**Solution**:
```bash
# Use different port
PORT=3001 pnpm run dev

# Or kill process using port 3000
# On macOS/Linux:
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue: "Cannot connect to PostgreSQL"

**Solution**:
```bash
# Check PostgreSQL is running
pg_isready -h localhost -p 5432

# Test connection
psql postgresql://user:password@localhost:5432/clothing_shop

# If database doesn't exist, create it:
createdb clothing_shop
```

### Issue: "Module not found" errors

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Regenerate API code
cd lib/api-spec
pnpm run codegen
cd ../..
```

---

## 📖 Documentation Map

```
docs/
├── GETTING_STARTED.md      ← You are here
├── README.md               ← Project overview
├── BACKEND.md              ← Backend setup & API
├── FRONTEND.md             ← Frontend setup & architecture
├── DATABASE.md             ← Database schema & migrations
├── API.md                  ← API endpoints reference
├── DEVELOPMENT.md          ← Development workflow
└── ARCHITECTURE.md         ← System design overview
```

---

## 🎯 Next Steps

### After Getting Started

1. **Read the README** - Understand project structure
2. **Choose your path**:
   - Frontend dev? → [Frontend Setup](./FRONTEND.md)
   - Backend dev? → [Backend Setup](./BACKEND.md)
   - Full stack? → [Architecture Overview](./ARCHITECTURE.md)
3. **Follow Development Workflow** - [Development Guide](./DEVELOPMENT.md)
4. **Reference API** - [API Reference](./API.md)

### First Feature to Build

Try adding a simple feature to understand the workflow:

1. **Update API Spec** - Add endpoint to `lib/api-spec/openapi.yaml`
2. **Generate Code** - Run `pnpm run codegen` in `lib/api-spec`
3. **Implement Backend** - Add route in `api-server/src/routes`
4. **Implement Frontend** - Use generated hook in `style-haven/src`
5. **Test** - Verify in browser and with curl

---

## 🛠️ Essential Commands

### Development

```bash
# Start backend
cd api-server && pnpm run dev

# Start frontend
cd style-haven && pnpm run dev

# Type checking
pnpm run typecheck:all

# Generate API code
cd lib/api-spec && pnpm run codegen
```

### Database

```bash
# Apply migrations
cd lib/db && pnpm run push

# Force apply (use with caution)
cd lib/db && pnpm run push-force
```

### Production

```bash
# Build backend
cd api-server && pnpm run build

# Build frontend
cd style-haven && pnpm run build

# Start production backend
cd api-server && pnpm run start
```

---

## 📋 Project Structure Quick Reference

```
clothing-shop/
├── api-server/              # Express backend
│   └── src/
│       ├── index.ts        # Entry point
│       ├── app.ts          # Express setup
│       └── routes/         # API endpoints
│
├── style-haven/             # React frontend
│   └── src/
│       ├── App.tsx         # Router & providers
│       ├── pages/          # Route components
│       └── components/     # UI components
│
├── lib/                     # Shared libraries
│   ├── api-spec/           # OpenAPI definition
│   ├── api-client-react/   # Generated hooks
│   ├── api-zod/            # Generated schemas
│   └── db/                 # Database layer
│
└── docs/                    # Documentation
    ├── GETTING_STARTED.md  # This file
    ├── BACKEND.md
    ├── FRONTEND.md
    ├── DATABASE.md
    ├── API.md
    ├── DEVELOPMENT.md
    └── ARCHITECTURE.md
```

---

## 🔐 Security Checklist

Before deploying to production:

- [ ] Change all default passwords
- [ ] Set strong JWT_SECRET
- [ ] Use HTTPS/TLS
- [ ] Enable CORS for specific origins only
- [ ] Set up rate limiting
- [ ] Enable database encryption
- [ ] Use environment variables for secrets
- [ ] Enable logging and monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Regular security updates

---

## 🚀 Deployment Checklist

Before deploying:

- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Build artifacts generated
- [ ] Security checks completed
- [ ] Performance optimized
- [ ] Monitoring configured

---

## 📞 Getting Help

### Documentation

- **Architecture Questions** → [Architecture Guide](./ARCHITECTURE.md)
- **Backend Questions** → [Backend Setup](./BACKEND.md)
- **Frontend Questions** → [Frontend Setup](./FRONTEND.md)
- **Database Questions** → [Database Guide](./DATABASE.md)
- **API Questions** → [API Reference](./API.md)
- **Development Questions** → [Development Guide](./DEVELOPMENT.md)

### Common Issues

1. Check [Troubleshooting](./DEVELOPMENT.md#troubleshooting) section
2. Review error messages in terminal
3. Check browser console (F12)
4. Check backend logs

### Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Stripe Documentation](https://stripe.com/docs)

---

## 🎓 Learning Path

### Week 1: Setup & Basics
- [ ] Complete Getting Started
- [ ] Understand project structure
- [ ] Run backend and frontend
- [ ] Make first API call

### Week 2: Frontend Development
- [ ] Read Frontend Setup
- [ ] Create a new page
- [ ] Add a component
- [ ] Use React Query hook

### Week 3: Backend Development
- [ ] Read Backend Setup
- [ ] Add new API endpoint
- [ ] Update database schema
- [ ] Test with curl/Postman

### Week 4: Full Stack Feature
- [ ] Design feature
- [ ] Update API spec
- [ ] Implement backend
- [ ] Implement frontend
- [ ] Test end-to-end

---

## 📝 Tips & Best Practices

### Development

1. **Keep terminals organized** - Use separate terminals for backend, frontend, database
2. **Watch for errors** - Check terminal output for errors
3. **Use browser DevTools** - F12 for debugging frontend
4. **Test API with curl** - Verify backend before frontend
5. **Commit frequently** - Small, focused commits

### Code Quality

1. **Run type checking** - `pnpm run typecheck:all`
2. **Follow conventions** - Match existing code style
3. **Write comments** - Explain complex logic
4. **Test your changes** - Manual testing before commit
5. **Review before commit** - Check what you're committing

### Performance

1. **Monitor bundle size** - Check frontend build size
2. **Use React DevTools** - Profile component renders
3. **Check database queries** - Use EXPLAIN ANALYZE
4. **Enable caching** - Use React Query caching
5. **Optimize images** - Use appropriate formats

---

## 🎉 You're Ready!

You now have:
- ✅ Project cloned and dependencies installed
- ✅ Environment configured
- ✅ Database initialized
- ✅ Backend and frontend running
- ✅ Access to comprehensive documentation

**Next**: Choose your path and start building!

---

**Last Updated**: May 2026  
**Version**: 1.0.0
