
import os
from dotenv import load_dotenv
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

# Load environment variables
load_dotenv()

# Google Cloud Configuration
GCP_PROJECT = os.getenv("GOOGLE_CLOUD_PROJECT")
GCP_LOCATION = os.getenv("GOOGLE_CLOUD_LOCATION") 
MODEL_NAME = os.getenv("VERTEX_AI_MODEL_NAME")

# Ensure necessary variables are present
if not all([GCP_PROJECT, GCP_LOCATION, MODEL_NAME]):
    logging.warning("Missing required environment variables for Vertex AI")
    # No need to raise an error during import, let individual endpoints handle missing config
