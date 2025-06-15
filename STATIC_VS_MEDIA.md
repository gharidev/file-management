# Static Files vs Media Files in Django

## What are Static Files?

Static files are assets that **do not change** during the application's runtime and are served directly by the web server.

### Characteristics of Static Files:
- **Fixed content** - remains the same for all users
- **Part of your codebase** - included in version control
- **Deployed with your application**
- **Served directly by web server** (nginx, Apache) in production
- **Cached for performance**

### Examples of Static Files:
- CSS stylesheets (`style.css`)
- JavaScript files (`main.js`)
- Images used in design (logos, icons, backgrounds)
- Fonts (`.woff`, `.ttf` files)
- Favicon
- Default/placeholder images

### In Our Project:
- `static/css/style.css` - Application styling

---

## What are Media Files?

Media files are **user-uploaded content** that can change during the application's runtime.

### Characteristics of Media Files:
- **Dynamic content** - uploaded by users during runtime
- **Not part of your codebase** - not in version control
- **Created after deployment**
- **Served by Django** in development, separate server in production
- **User-specific content**

### Examples of Media Files:
- User profile pictures
- Document uploads (PDFs, Word docs)
- Images uploaded by users
- Video/audio files uploaded by users
- Any file uploaded through forms

### In Our Project:
- Documents uploaded via the upload form
- Stored in `media/photos/` directory
- Accessible via download links

---

## Key Differences Comparison

| Aspect | Static Files | Media Files |
|--------|-------------|-------------|
| **Purpose** | Design & functionality assets | User-generated content |
| **Source** | Developer creates | Users upload |
| **Storage** | `STATIC_ROOT` / `STATICFILES_DIRS` | `MEDIA_ROOT` |
| **URL** | `STATIC_URL` (e.g., `/static/`) | `MEDIA_URL` (e.g., `/media/`) |
| **Version Control** | ✅ Included in Git | ❌ Never include in Git |
| **Changes** | Only when developer updates | Changes with user uploads |
| **Production Serving** | Web server (nginx/Apache) | Application server or CDN |
| **Caching** | Heavily cached | Limited caching |
| **Security** | Generally safe | Needs validation & scanning |

---

## Django Configuration

### Static Files Settings:
```python
# URL prefix for static files
STATIC_URL = '/static/'

# Directories where Django looks for static files
STATICFILES_DIRS = [
    BASE_DIR / "static",
]

# Directory where collected static files go in production
STATIC_ROOT = BASE_DIR / 'staticfiles'
```

### Media Files Settings:
```python
# URL prefix for media files
MEDIA_URL = '/media/'

# Directory where uploaded files are stored
MEDIA_ROOT = BASE_DIR / 'media'
```

---

## Template Usage

### Static Files in Templates:
```html
{% load static %}
<link rel="stylesheet" href="{% static 'css/style.css' %}">
<img src="{% static 'images/folder-icon.svg' %}" alt="Folder">
<script src="{% static 'js/main.js' %}"></script>
```

### Media Files in Templates:
```html
<!-- Displaying uploaded files -->
<a href="{{ document.file.url }}">{{ document.title }}</a>
<img src="{{ image.image.url }}" alt="{{ image.title }}">
```

---

## Development vs Production

### Development:
- **Static files**: Served by Django's development server
- **Media files**: Served by Django's development server
- Both accessible through Django

### Production:
- **Static files**: Collected using `collectstatic`, served by web server
- **Media files**: Served by web server or CDN, Django handles uploads
- Separation improves performance and security

---

## Security Considerations

### Static Files:
- ✅ Generally safe (controlled by developers)
- ✅ Can be cached aggressively
- ✅ No user input validation needed

### Media Files:
- ⚠️ **Security risk** - user uploads can be malicious
- ⚠️ **File type validation** required
- ⚠️ **File size limits** needed
- ⚠️ **Virus scanning** recommended
- ⚠️ **Access control** may be required

---

## Best Practices

### Static Files:
1. **Organize by type** - separate CSS, JS, images
2. **Use versioning** for cache busting
3. **Optimize images** before including
4. **Minify CSS/JS** for production
5. **Use CDN** for better performance

### Media Files:
1. **Validate file types** - only allow expected formats
2. **Limit file sizes** - prevent large uploads
3. **Sanitize filenames** - remove special characters
4. **Store outside web root** when possible
5. **Implement access controls** for sensitive files
6. **Backup regularly** - user data is valuable

---

## Common Mistakes to Avoid

### Static Files:
- ❌ Forgetting `{% load static %}` in templates
- ❌ Not running `collectstatic` in production
- ❌ Hardcoding static file paths
- ❌ Including large files in static directory

### Media Files:
- ❌ Not validating uploaded file types
- ❌ Storing media files in version control
- ❌ Not setting file size limits
- ❌ Serving media files through Django in production
- ❌ Not implementing proper access controls
