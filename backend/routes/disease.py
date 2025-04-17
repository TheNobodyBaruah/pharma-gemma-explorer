
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
import logging
import os
from backend.utils.vertex_ai_client import query_llm
from backend.utils.kimi_client import query_kimi

router = APIRouter()

class DiseaseRequest(BaseModel):
    disease: str = Field(..., min_length=3, description="Name of the disease")

@router.post("/")
async def generate_targets(request: DiseaseRequest):
    """
    Generate potential drug targets for a given disease using either Vertex AI or Kimi.
    """
    logging.info(f"Received request for targets for disease: {request.disease}")
    
    disease_name = request.disease
    raw_response = ""
    
    try:
        # Check environment variable to decide which LLM to use
        if os.getenv('USE_KIMI_TESTING') == 'true':
            logging.info(f"Using Kimi for disease targets: {disease_name}")
            # --- Kimi Specific Prompt ---
            kimi_system_prompt = "You are an expert in pharmacology and bioinformatics. Your task is to identify potential drug targets for a given disease."
            kimi_user_prompt = f"""Identify potential drug target receptors associated with the disease "{disease_name}". 
            Focus on established or highly probable targets. 
            Respond ONLY with a comma-separated list of target receptor names or symbols. 
            Do not include explanations, introductory sentences, or any text other than the list. 
            Example format: TargetA, TargetB, TargetC"""
            
            raw_response = query_kimi(kimi_system_prompt, kimi_user_prompt)
        else:
            # --- Existing Vertex AI Logic ---
            logging.info(f"Using Vertex AI for disease targets: {disease_name}")
            
            # REVIEW/ADJUST prompt phrasing for optimal TxGemma-27B target generation
            vertex_prompt = f"""Identify potential drug target receptors associated with the disease "{disease_name}".

            Please provide the response as a comma-separated list of target receptor names or symbols.
            Example format: TargetA, TargetB, TargetC

            Disease: "{disease_name}"
            Target Receptors:"""
            
            raw_response = query_llm(vertex_prompt)
            
        logging.debug(f"Raw LLM response for {disease_name}: {raw_response}")
        
        # Parse the response
        if not raw_response:
            targets = []
        else:
            # Basic parsing: split by comma, strip whitespace, filter empty strings
            targets = [target.strip() for target in raw_response.split(',') if target.strip()]
        
        logging.info(f"Parsed targets for {disease_name}: {targets}")
        
        return {"targets": targets}
        
    except ConnectionError as e:
        logging.error(f"LLM connection error for disease {disease_name}: {e}")
        raise HTTPException(status_code=503, detail="Could not connect to the AI service.")
    except ValueError as e:
        logging.error(f"Value error for disease {disease_name}: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except RuntimeError as e:
        logging.error(f"Runtime error for disease {disease_name}: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        logging.error(f"Unexpected error querying LLM for disease {disease_name}: {e}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred while querying the AI model.")
