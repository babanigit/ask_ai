# -----------------------------
# Stage 1 — Build Next.js frontend
# -----------------------------
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

COPY devmate-ui/package*.json ./
RUN npm install

COPY devmate-ui ./
RUN npm run build && npm run export


# -----------------------------
# Stage 2 — Django backend
# -----------------------------
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# System deps
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Python deps
COPY devmate/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy Django project
COPY devmate ./devmate

# Copy Next.js build output into Django static
COPY --from=frontend-builder /app/frontend/out ./devmate/static

WORKDIR /app/devmate

# Collect Django static (admin + your assets)
RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["gunicorn", "devmate.wsgi:application", "--bind", "0.0.0.0:8000"]
