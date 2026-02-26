FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# system dependencies
RUN apt-get update && apt-get install -y gcc && rm -rf /var/lib/apt/lists/*

# install python deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# copy project
COPY . .

# collect static files
RUN python manage.py collectstatic --noinput

EXPOSE 8000

# run using gunicorn (production server)
CMD ["gunicorn", "devmate.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]
