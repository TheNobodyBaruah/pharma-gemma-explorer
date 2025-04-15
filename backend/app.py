
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import disease, target
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import logging
from backend.utils.vertex_ai_client import query_llm

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
    Generate a response to a user message using TxGemma model.
    """
    # REVIEW/ADJUST prompt structure for TxGemma-27B chat model
    # Consider adding system instructions or using specific roles format
    prompt = f"""User: {request.message}
    
    Assistant:"""
    
    try:
        # Query the language model
        raw_response = query_llm(prompt)
        
        # REVIEW/ADJUST parsing: Check if TxGemma-27B chat adds prefixes/suffixes 
        # or needs specific formatting extraction
        response = raw_response.strip()
        
        return {"response": response}
        
    except ConnectionError as e:
        logging.error(f"LLM connection error for chat: {e}")
        raise HTTPException(status_code=503, detail="Could not connect to the AI service.")
    except Exception as e:
        logging.error(f"Unexpected error in chat: {e}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred while generating response.")

@app.get("/")
async def root():
    return {"message": "TxGemma Therapeutic Development API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
