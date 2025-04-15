
import logging
from google.cloud import aiplatform
from vertexai.generative_models import GenerativeModel, GenerationConfig
import backend.config as config

# Initialize the Vertex AI client
try:
    aiplatform.init(project=config.GCP_PROJECT, location=config.GCP_LOCATION)
    logging.info(f"Initialized Vertex AI client with project: {config.GCP_PROJECT}, location: {config.GCP_LOCATION}")
    
    # Initialize model
    # Using TxGemma-27B model
    model = GenerativeModel(config.MODEL_NAME)
    logging.info(f"Initialized GenerativeModel with model: {config.MODEL_NAME}")
except Exception as e:
    logging.error(f"Failed to initialize Vertex AI client: {e}")
    model = None

def query_llm(prompt: str) -> str:
    """
    Query the TxGemma language model with the given prompt and return the response.
    
    Args:
        prompt: The text prompt to send to the model
        
    Returns:
        str: The generated text response
        
    Raises:
        ConnectionError: If there's an error connecting to Vertex AI
    """
    if model is None:
        logging.error("Cannot query LLM: Vertex AI client not initialized")
        raise ConnectionError("Vertex AI client not initialized")
    
    try:
        # Configure generation parameters for TxGemma-27B
        generation_config = GenerationConfig(
            temperature=0.2,  # Lower temperature for more focused responses
            max_output_tokens=1024,  # Adjust based on your needs
            top_p=0.9,
            top_k=40
        )
        
        # TxGemma-27B expects a prompt string
        logging.info(f"Sending prompt to TxGemma: {prompt[:100]}...")
        
        # Generate content
        response = model.generate_content(
            prompt,
            generation_config=generation_config,
        )
        
        # Extract text from response
        if response and hasattr(response, 'text'):
            return response.text
        elif response and hasattr(response, 'candidates') and response.candidates:
            if hasattr(response.candidates[0], 'content') and hasattr(response.candidates[0].content, 'parts'):
                return str(response.candidates[0].content.parts[0])
        
        logging.warning(f"Received empty or invalid response from Vertex AI")
        return ""
        
    except Exception as e:
        logging.error(f"Vertex AI query failed: {e}")
        raise ConnectionError(f"Failed to query Vertex AI: {e}")
