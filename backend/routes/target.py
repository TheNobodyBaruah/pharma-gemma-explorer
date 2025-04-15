
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
import logging
from backend.utils.vertex_ai_client import query_llm

router = APIRouter()

class TargetRequest(BaseModel):
    target: str = Field(..., min_length=2, description="Name or symbol of target protein")
    count: int = Field(5, ge=1, le=10, description="Number of molecules to generate")

@router.post("/")
async def generate_molecules(request: TargetRequest):
    """
    Generate potential drug molecules targeting a specific protein using Vertex AI.
    """
    logging.info(f"Received request for molecules targeting: {request.target}")
    
    # REVIEW/ADJUST prompt phrasing for optimal TxGemma-27B molecule SMILES generation
    prompt = f"""Generate {request.count} potential drug molecules (as SMILES strings) that could target the protein "{request.target}".
    
    Please provide the response as a comma-separated list of valid SMILES strings.
    Example format: CC(=O)OC1=CC=CC=C1C(=O)O, C1=CC=C(C=C1)C(=O)O
    
    Target: "{request.target}"
    SMILES:"""
    
    try:
        # Query the language model
        raw_response = query_llm(prompt)
        logging.debug(f"Raw LLM response for target {request.target}: {raw_response}")
        
        # REVIEW/ADJUST parsing: Check TxGemma-27B output format for SMILES lists
        # (e.g., comma-separated, newline-separated, JSON?)
        if not raw_response:
            molecules = []
        else:
            # Basic parsing: split by comma, strip whitespace, filter empty strings
            molecules = [mol.strip() for mol in raw_response.split(',') if mol.strip()]
        
        # Transform into expected response format
        molecule_objects = [
            {
                "id": f"mol-{i}",
                "smiles": smiles,
                "target": request.target
            } for i, smiles in enumerate(molecules)
        ]
        
        logging.info(f"Generated {len(molecule_objects)} molecules for {request.target}")
        
        return {"molecules": molecule_objects}
        
    except ConnectionError as e:
        logging.error(f"LLM connection error for target {request.target}: {e}")
        raise HTTPException(status_code=503, detail="Could not connect to the AI service.")
    except Exception as e:
        logging.error(f"Unexpected error querying LLM for target {request.target}: {e}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred while querying the AI model.")
