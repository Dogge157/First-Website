# 🚂 Railway Deployment Troubleshooting

## Common Issues and Solutions

### Issue: "Not Found" on Health Check

**Symptoms:**
- Backend health check returns "Not found"
- Railway deployment appears successful but API doesn't respond

**Solutions:**

#### 1. Check Railway Logs
1. Go to your Railway project dashboard
2. Click on your service
3. Go to "Deployments" tab
4. Click on the latest deployment
5. Check the logs for errors

#### 2. Verify Environment Variables
Make sure these are set in Railway:
```
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here
```

#### 3. Check Root Directory
- In Railway project settings, ensure "Root Directory" is set to `backend`
- Not the entire repository, just the `backend` folder

#### 4. Manual Deployment Steps
1. **Delete and recreate the Railway project**
2. **Connect to GitHub**: Select `Dogge157/kraftskivan`
3. **Set Root Directory**: `backend`
4. **Add Environment Variables**:
   ```
   SECRET_KEY=skare2025-secret-key-change-this
   JWT_SECRET_KEY=skare2025-jwt-secret-change-this
   ```
5. **Deploy**

### Issue: Port Configuration

**Symptoms:**
- App starts but doesn't respond to requests
- Port binding errors in logs

**Solution:**
The app now uses `start.py` which properly handles Railway's PORT environment variable.

### Issue: Database Creation

**Symptoms:**
- App starts but database operations fail
- "Table doesn't exist" errors

**Solution:**
The `start.py` script automatically creates database tables on startup.

## Step-by-Step Railway Deployment

### 1. Create New Railway Project
1. Go to [Railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose `Dogge157/kraftskivan`

### 2. Configure Project
1. **Set Root Directory**: `backend`
2. **Add Environment Variables**:
   ```
   SECRET_KEY=skare2025-secret-key-change-this
   JWT_SECRET_KEY=skare2025-jwt-secret-change-this
   ```

### 3. Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Check the logs for any errors

### 4. Test Health Check
1. Get your Railway URL (e.g., `https://your-app.railway.app`)
2. Visit: `https://your-app.railway.app/api/health`
3. Should return: `{"message":"Backend is running!","status":"healthy"}`

## Debugging Commands

### Check Railway Logs
```bash
# In Railway dashboard, check deployment logs
# Look for Python errors, import errors, or port issues
```

### Test Locally with Railway URL
```bash
# Test if Railway app is responding
curl https://your-app.railway.app/api/health
```

### Common Error Messages

#### "Module not found"
- Check `requirements.txt` includes all dependencies
- Railway should install them automatically

#### "Port already in use"
- Railway handles this automatically
- The `start.py` script uses the correct PORT

#### "Database locked"
- SQLite might have issues on Railway
- Consider using PostgreSQL for production

## Alternative: Use Render.com

If Railway continues to have issues, try [Render.com](https://render.com):

1. **Create new Web Service**
2. **Connect GitHub**: `Dogge157/kraftskivan`
3. **Set Root Directory**: `backend`
4. **Build Command**: `pip install -r requirements.txt`
5. **Start Command**: `python start.py`
6. **Add Environment Variables** (same as Railway)

## Success Indicators

✅ **Health Check Works**: `https://your-app.railway.app/api/health` returns success  
✅ **No Errors in Logs**: Railway deployment logs show no Python errors  
✅ **Environment Variables Set**: All required variables are configured  
✅ **Root Directory Correct**: Set to `backend`, not the entire repo  

## Next Steps After Successful Deployment

1. **Get your Railway URL**
2. **Update Vercel environment variable**:
   ```
   REACT_APP_API_URL=https://your-app.railway.app
   ```
3. **Redeploy Vercel** (should happen automatically)
4. **Test login/registration** on your Vercel site

## 🎯 Quick Fix Checklist

- [ ] Railway project root directory = `backend`
- [ ] Environment variables set
- [ ] Deployment logs show no errors
- [ ] Health check endpoint responds
- [ ] Vercel environment variable updated
- [ ] Vercel redeployed

If you're still having issues, share the Railway deployment logs and I can help debug further!
