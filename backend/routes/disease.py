
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
import logging
from backend.utils.vertex_ai_client import query_llm

router = APIRouter()

class DiseaseRequest(BaseModel):
    disease: str = Field(..., min_length=3, description="Name of the disease")

@router.post("/")
async def generate_targets(request: DiseaseRequest):
    """
    Generate potential drug targets for a given disease using Vertex AI.
    """
    logging.info(f"Received request for targets for disease: {request.disease}")
    
    # Construct the prompt for the LLM
    prompt = f"""Identify potential drug target receptors associated with the disease "{request.disease}".

    Please provide the response as a comma-separated list of target receptor names or symbols.
    Example format: TargetA, TargetB, TargetC

    Disease: "{request.disease}"
    Target Receptors:"""
    
    try:
        # Query the language model
        raw_response = query_llm(prompt)
        logging.debug(f"Raw LLM response for {request.disease}: {raw_response}")
        
        # Parse the response
        if not raw_response:
            targets = []
        else:
            # Basic parsing: split by comma, strip whitespace, filter empty strings
            targets = [target.strip() for target in raw_response.split(',') if target.strip()]
        
        logging.info(f"Parsed targets for {request.disease}: {targets}")
        
        return {"targets": targets}
        
    except ConnectionError as e:
        logging.error(f"LLM connection error for disease {request.disease}: {e}")
        raise HTTPException(status_code=503, detail="Could not connect to the AI service.")
    except Exception as e:
        logging.error(f"Unexpected error querying LLM for disease {request.disease}: {e}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred while querying the AI model.")
