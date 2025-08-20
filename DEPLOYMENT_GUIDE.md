# 🚀 Deployment Guide - Skåre 2025

## The Problem
When you access the website through GitHub, the login doesn't work because the frontend is trying to connect to `localhost:5001`, but the backend is only running on your local machine.

## Solution: Deploy Both Backend and Frontend

### Step 1: Deploy Backend to Railway

1. **Go to [Railway.app](https://railway.app)** and sign up/login
2. **Create a new project** → "Deploy from GitHub repo"
3. **Select your repository**: `Dogge157/kraftskivan`
4. **Set the root directory** to `backend`
5. **Add environment variables**:
   ```
   SECRET_KEY=your-secret-key-here
   JWT_SECRET_KEY=your-jwt-secret-key-here
   ```
6. **Deploy** - Railway will automatically detect your `railway.json` and `Procfile`

### Step 2: Get Your Backend URL

After deployment, Railway will give you a URL like:
```
https://your-app-name.railway.app
```

### Step 3: Deploy Frontend to Vercel

1. **Go to [Vercel.com](https://vercel.com)** and sign up/login
2. **Create a new project** → "Import Git Repository"
3. **Select your repository**: `Dogge157/kraftskivan`
4. **Set the root directory** to `frontend`
5. **Add environment variable**:
   ```
   REACT_APP_API_URL=https://your-app-name.railway.app
   ```
   (Replace with your actual Railway URL)
6. **Deploy**

### Step 4: Test Your Deployment

1. **Backend Health Check**: Visit `https://your-app-name.railway.app/api/health`
2. **Frontend**: Visit your Vercel URL
3. **Test Registration/Login**: Should work now!

## Alternative: Quick Local Testing

If you want to test locally with the deployed backend:

1. **Get your Railway backend URL**
2. **Create a `.env` file in the frontend directory**:
   ```
   REACT_APP_API_URL=https://your-app-name.railway.app
   ```
3. **Restart your frontend**:
   ```bash
   cd frontend
   npm start
   ```

## Environment Variables Reference

### Backend (Railway)
```
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here
```

### Frontend (Vercel)
```
REACT_APP_API_URL=https://your-backend-url.railway.app
```

## Troubleshooting

### "Backend not responding"
- Check Railway dashboard for deployment status
- Verify the backend URL is correct
- Check Railway logs for errors

### "Frontend can't connect"
- Verify `REACT_APP_API_URL` environment variable is set
- Check that the backend URL is accessible
- Ensure CORS is properly configured

### Database Issues
- Railway will automatically create the SQLite database
- If you need persistent data, consider upgrading to a PostgreSQL database

## Cost
- **Railway**: Free tier available (limited usage)
- **Vercel**: Free tier available (generous limits)

## Security Notes
- Change the default secret keys in production
- Consider using environment variables for the website password
- Enable HTTPS (automatic with Railway/Vercel)

## 🎉 Success!
Once deployed, your Skåre 2025 website will work perfectly from anywhere in the world!
