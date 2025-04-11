
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import disease

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

@app.get("/")
async def root():
    return {"message": "TxGemma Therapeutic Development API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
