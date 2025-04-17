
import os
import logging
from openai import OpenAI, APIConnectionError, RateLimitError, APIStatusError

# Load API key from environment variable
MOONSHOT_API_KEY = os.getenv("MOONSHOT_API_KEY")
KIMI_MODEL = os.getenv("KIMI_MODEL_NAME", "moonshot-v1-8k")  # Default model if not set

if not MOONSHOT_API_KEY:
    logging.warning("MOONSHOT_API_KEY environment variable not set. Kimi testing will fail.")

# Initialize the client, pointing to the Moonshot API base URL
try:
    client = OpenAI(
        api_key=MOONSHOT_API_KEY,
        base_url="https://api.moonshot.cn/v1",  # Moonshot API endpoint
    )
except Exception as e:
     logging.error(f"Failed to initialize Moonshot client: {e}")
     client = None  # Ensure client is None if init fails

def query_kimi(system_prompt: str, user_prompt: str) -> str:
    """
    Sends prompts to the Kimi/Moonshot API and returns the text response.
    """
    if not client:
         logging.error("Moonshot client not initialized. Cannot query Kimi.")
         raise ConnectionError("Moonshot client failed to initialize.")

    if not MOONSHOT_API_KEY:
         logging.error("Missing MOONSHOT_API_KEY. Cannot query Kimi.")
         raise ValueError("Moonshot API key is not configured.")

    try:
        logging.info(f"Sending prompt to Kimi ({KIMI_MODEL}). User prompt: '{user_prompt[:100]}...'")
        completion = client.chat.completions.create(
            model=KIMI_MODEL,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.3,  # Adjust temperature for desired creativity/determinism
        )
        response_content = completion.choices[0].message.content
        logging.debug(f"Raw Kimi response: {response_content}")
        return response_content.strip() if response_content else ""

    except APIConnectionError as e:
        logging.error(f"Kimi API connection error: {e}")
        raise ConnectionError(f"Failed to connect to Kimi API: {e}") from e
    except RateLimitError as e:
        logging.error(f"Kimi API rate limit exceeded: {e}")
        raise ConnectionError(f"Kimi API rate limit hit: {e}") from e
    except APIStatusError as e:
        logging.error(f"Kimi API status error: {e.status_code} - {e.response}")
        raise ConnectionError(f"Kimi API error ({e.status_code}): {e.message}") from e
    except Exception as e:
        logging.error(f"Unexpected error querying Kimi: {e}")
        raise RuntimeError(f"An unexpected error occurred while querying Kimi: {e}") from e
