# Deploying Django to PythonAnywhere: Beginner's Guide

## What is PythonAnywhere?

**PythonAnywhere** is a cloud-based Python hosting service that makes it easy to deploy web applications without managing servers.

### Why Choose PythonAnywhere?
- **Beginner-friendly** - No server management needed
- **Free tier available** - Great for learning and small projects
- **Python-focused** - Optimized for Python web apps
- **Quick deployment** - Get online in minutes
- **Built-in tools** - Database, file manager, console access

---

## Prerequisites

### Before You Start:
1. ✅ **Django project** working locally
2. ✅ **PythonAnywhere account** (free at [pythonanywhere.com](https://www.pythonanywhere.com))
3. ✅ **Git repository** (GitHub/GitLab) with your code
4. ✅ **Requirements.txt** file with dependencies

### Prepare Your Django Project:

#### 1. Create `requirements.txt`:
```bash
# In your local project folder
pip freeze > requirements.txt
```

#### 2. Update `settings.py`:
```python
# Add at the top of settings.py
import os

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# Add your PythonAnywhere domain
ALLOWED_HOSTS = ['yourusername.pythonanywhere.com', 'localhost', '127.0.0.1']

# Static files configuration
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Media files configuration
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

#### 3. Push to Git:
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

---

## Step-by-Step Deployment

### Step 1: Create PythonAnywhere Account

1. 🌐 Visit [pythonanywhere.com](https://www.pythonanywhere.com)
2. 📝 Click **"Pricing & signup"**
3. 🆓 Choose **"Create a Beginner account"** (free)
4. ✍️ Fill in your details and verify email

### Step 2: Open Bash Console

1. 📊 Go to your **Dashboard**
2. 💻 Click **"$ Bash"** under "New console"
3. 🎯 You'll see a terminal interface

### Step 3: Clone Your Project

```bash
# Clone your project from GitHub
git clone https://github.com/yourusername/your-project-name.git

# Navigate to your project
cd your-project-name

# Check files are there
ls -la
```

### Step 4: Create Virtual Environment

```bash
# Create virtual environment
python3.10 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Your prompt should now show (venv)
```

### Step 5: Install Dependencies

```bash
# Install your project dependencies
pip install -r requirements.txt
```

### Step 6: Configure Database

```bash
# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

### Step 7: Collect Static Files

```bash
# Collect all static files
python manage.py collectstatic --noinput
```

### Step 8: Create Web App

1. 🌐 Go to **Web tab** in PythonAnywhere dashboard
2. ➕ Click **"Add a new web app"**
3. 🔧 Choose **"Manual configuration"**
4. 🐍 Select **Python 3.10**
5. ✅ Click **"Next"**

### Step 9: Configure WSGI File

1. 📁 In **Web tab**, click on **WSGI configuration file** link
2. 🗑️ **Delete all existing content**
3. 📝 **Replace with**:

```python
import os
import sys

# Add your project directory to Python path
path = '/home/yourusername/your-project-name'
if path not in sys.path:
    sys.path.insert(0, path)

# Set Django settings module
os.environ['DJANGO_SETTINGS_MODULE'] = 'your_project_name.settings'

# Import Django WSGI application
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

### Step 10: Configure Virtual Environment

1. 🌐 In **Web tab**, find **"Virtualenv"** section
2. 📂 Enter path: `/home/yourusername/your-project-name/venv`
3. ✅ Click **checkmark** to save

### Step 11: Configure Static Files

1. 🌐 In **Web tab**, find **"Static files"** section
2. ➕ Click **"Enter URL"** and **"Enter path"**:

| URL | Directory |
|-----|-----------|
| `/static/` | `/home/yourusername/your-project-name/staticfiles` |
| `/media/` | `/home/yourusername/your-project-name/media` |

### Step 12: Reload Web App

1. 🔄 Go to top of **Web tab**
2. 🟢 Click big green **"Reload yourusername.pythonanywhere.com"** button
3. ⏱️ Wait for reload to complete

### Step 13: Test Your Application

1. 🌐 Click **"yourusername.pythonanywhere.com"** link
2. 🎉 Your Django app should be live!

---

## Database Configuration

```python
# settings.py - SQLite configuration (perfect for development)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

---

## Common Issues & Solutions

### 🚨 **Problem**: Import Error
**Solution**: Check Python path in WSGI file
```python
# Make sure this matches your actual project structure
path = '/home/yourusername/your-project-name'
```

### 🚨 **Problem**: Static Files Not Loading
**Solution**: 
1. Run `python manage.py collectstatic`
2. Check static files mapping in Web tab
3. Add to settings.py:
```python
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
```

### 🚨 **Problem**: Database Errors
**Solution**:
```bash
# Run migrations
python manage.py migrate

# Check database settings
python manage.py check --deploy
```

### 🚨 **Problem**: "DisallowedHost" Error
**Solution**: Add your domain to `ALLOWED_HOSTS`:
```python
ALLOWED_HOSTS = ['yourusername.pythonanywhere.com']
```

---

## Production Best Practices

### 🔒 **Security Settings**:
```python
# settings.py
DEBUG = False
ALLOWED_HOSTS = ['yourusername.pythonanywhere.com']

# Use environment variables for sensitive data
SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key')
```

###  **Updating Your App**:
```bash
# In PythonAnywhere console
cd your-project-name
git pull origin main
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput

# Then reload web app in Web tab
```

---

## Useful PythonAnywhere Commands

### 📂 **File Management**:
```bash
# List files
ls -la

# Edit files
nano filename.py

# Check disk usage
du -sh *
```

### 🐍 **Python Environment**:
```bash
# Activate virtual environment
source venv/bin/activate

# Check installed packages
pip list

# Install new package
pip install package_name
```

### 🗄️ **Database Commands**:
```bash
# Django shell
python manage.py shell

# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate
```

---

## Free Account Limitations

### 🆓 **Free Tier Includes**:
- ✅ 1 web app
- ✅ 512MB disk space
- ✅ 100 seconds CPU time/day
- ✅ SQLite database support

### ⬆️ **Upgrade Benefits**:
- 🚀 More CPU time
- 💾 More disk space
- 🌐 Custom domains
- 📊 Always-on tasks
- 🎯 More web apps

---

## Quick Checklist

### ✅ **Before Deployment**:
- [ ] Django project works locally
- [ ] `requirements.txt` created
- [ ] `ALLOWED_HOSTS` updated
- [ ] Static files configured
- [ ] Code pushed to Git

### ✅ **During Deployment**:
- [ ] PythonAnywhere account created
- [ ] Project cloned
- [ ] Virtual environment created
- [ ] Dependencies installed
- [ ] WSGI file configured
- [ ] Static files mapped
- [ ] Web app reloaded

### ✅ **After Deployment**:
- [ ] Website loads correctly
- [ ] Admin panel accessible
- [ ] Static files working
- [ ] Database functioning

---

## Summary

**PythonAnywhere deployment process**:

1. 🔧 **Prepare** your Django project
2. 📤 **Push** code to Git repository  
3. 🌐 **Create** PythonAnywhere account
4. 📥 **Clone** project on PythonAnywhere
5. 🐍 **Setup** virtual environment
6. ⚙️ **Configure** WSGI and static files
7. 🔄 **Reload** web application
8. 🎉 **Enjoy** your live Django app!

Your Django application is now accessible worldwide at `yourusername.pythonanywhere.com`! 🌍
