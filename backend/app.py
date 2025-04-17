
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import disease, target
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import logging
import os
from backend.utils.vertex_ai_client import query_llm
from backend.utils.kimi_client import query_kimi

app = FastAPI(
    title="TxGemma Therapeutic Development API",
    description="API for therapeutic development assistant using Vertex AI and TxGemma",
    version="0.1.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Modify in production to specify frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(disease.router, prefix="/disease", tags=["disease"])
app.include_router(target.router, prefix="/target", tags=["target"])

# Chat endpoint
class ChatRequest(BaseModel):
    message: str

@app.post("/chat/", tags=["chat"])
async def chat(request: ChatRequest):
    """
    Generate a response to a user message using either TxGemma or Kimi model.
    """
    logging.info(f"Received chat request: '{request.message[:100]}...'")
    
    raw_response = ""
    try:
        # Check environment variable to decide which LLM to use
        if os.getenv('USE_KIMI_TESTING') == 'true':
            logging.info(f"Using Kimi for chat response")
            # --- Kimi Specific Chat Prompt ---
            kimi_system_prompt = "You are TheraSpark, an AI assistant specialized in pharmacology and therapeutic development. Answer questions clearly and concisely based on your knowledge of drug discovery, medicinal chemistry, and therapeutic development."
            kimi_user_prompt = request.message
            
            raw_response = query_kimi(kimi_system_prompt, kimi_user_prompt)
        else:
            # --- Existing Vertex AI Logic ---
            logging.info(f"Using Vertex AI for chat response")
            
            # Construct a more sophisticated prompt for TxGemma
            prompt = f"""You are TheraSpark, an AI assistant specialized in pharmacology and therapeutic development.
            Answer the user's question clearly and concisely based on your knowledge of drug discovery, 
            medicinal chemistry, and therapeutic development.
            
            User Question: {request.message}
            
            TheraSpark Answer:"""
            
            raw_response = query_llm(prompt)
            
        logging.debug(f"Raw LLM response for chat: {raw_response[:200]}...")
        
        # Process the response
        response = raw_response.strip() if raw_response else "Sorry, I couldn't generate a response."
        logging.info(f"Processed response: '{response[:100]}...'")
        
        return {"response": response}
        
    except ConnectionError as e:
        logging.error(f"LLM connection error for chat: {e}")
        raise HTTPException(status_code=503, detail="Could not connect to the AI service.")
    except ValueError as e:
        logging.error(f"Value error for chat: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except RuntimeError as e:
        logging.error(f"Runtime error for chat: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        logging.error(f"Unexpected error in chat: {e}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred while generating response.")

@app.get("/")
async def root():
    return {"message": "TxGemma Therapeutic Development API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
