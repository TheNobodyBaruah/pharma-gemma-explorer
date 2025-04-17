
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
import logging
import os
from backend.utils.vertex_ai_client import query_llm
from backend.utils.kimi_client import query_kimi

router = APIRouter()

class TargetRequest(BaseModel):
    target: str = Field(..., min_length=2, description="Name or symbol of target protein")
    count: int = Field(5, ge=1, le=10, description="Number of molecules to generate")

@router.post("/")
async def generate_molecules(request: TargetRequest):
    """
    Generate potential drug molecules targeting a specific protein using either Vertex AI or Kimi.
    """
    logging.info(f"Received request for molecules targeting: {request.target}")
    
    target_name = request.target
    raw_response = ""
    
    try:
        # Check environment variable to decide which LLM to use
        if os.getenv('USE_KIMI_TESTING') == 'true':
            logging.info(f"Using Kimi for molecules: {target_name}")
            # --- Kimi Specific Molecule Prompt ---
            kimi_system_prompt = "You are an expert in cheminformatics and medicinal chemistry. Your task is to generate potential molecule SMILES strings for a given target."
            kimi_user_prompt = f"""Generate {request.count} potential small molecule inhibitors or binders (represented by valid SMILES strings) for the target receptor "{target_name}".
            Prioritize molecules with known activity or high likelihood based on structure/target interaction principles. 
            Respond ONLY with a comma-separated list of valid SMILES strings. 
            Do not include molecule names, explanations, or any text other than the list. 
            Example format: SMILES1,SMILES2,SMILES3"""
            
            raw_response = query_kimi(kimi_system_prompt, kimi_user_prompt)
        else:
            # --- Existing Vertex AI Logic ---
            logging.info(f"Using Vertex AI for molecules: {target_name}")
            
            # REVIEW/ADJUST prompt phrasing for optimal TxGemma-27B molecule SMILES generation
            vertex_prompt = f"""Generate {request.count} potential drug molecules (as SMILES strings) that could target the protein "{target_name}".
            
            Please provide the response as a comma-separated list of valid SMILES strings.
            Example format: CC(=O)OC1=CC=CC=C1C(=O)O, C1=CC=C(C=C1)C(=O)O
            
            Target: "{target_name}"
            SMILES:"""
            
            raw_response = query_llm(vertex_prompt)
        
        logging.debug(f"Raw LLM response for target {target_name}: {raw_response}")
        
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
        
        logging.info(f"Generated {len(molecule_objects)} molecules for {target_name}")
        
        return {"molecules": molecule_objects}
        
    except ConnectionError as e:
        logging.error(f"LLM connection error for target {target_name}: {e}")
        raise HTTPException(status_code=503, detail="Could not connect to the AI service.")
    except ValueError as e:
        logging.error(f"Value error for target {target_name}: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except RuntimeError as e:
        logging.error(f"Runtime error for target {target_name}: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        logging.error(f"Unexpected error querying LLM for target {target_name}: {e}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred while querying the AI model.")
