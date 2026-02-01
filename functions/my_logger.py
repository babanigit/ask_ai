import os
import json
import logging
from datetime import datetime
import requests
from django.conf import settings


def get_request_logger():
    
    log_dir = os.path.join(settings.BASE_DIR, "logs")
    os.makedirs(log_dir, exist_ok=True)
    
    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    log_file = os.path.join(log_dir, f"openrouter_{timestamp}.txt")

    logger = logging.getLogger(f"openrouter_{timestamp}")
    logger.setLevel(logging.INFO)
    logger.propagate = False

    handler = logging.FileHandler(log_file)
    formatter = logging.Formatter(
        "[%(asctime)s] [%(levelname)s] %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )
    
    handler.setFormatter(formatter)
    
    logger.addHandler(handler)
    
    return logger, handler
