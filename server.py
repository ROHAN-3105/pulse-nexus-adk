from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from typing import Optional, Dict, Any

app = FastAPI(title="Pulse Nexus API", version="1.0.0")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MessageRequest(BaseModel):
    message: str
    context: Optional[Dict[str, Any]] = {}

class MessageResponse(BaseModel):
    response: str
    agent: str
    status: str = "success"

@app.get("/")
async def root():
    return {
        "message": "Pulse Nexus API is running",
        "version": "1.0.0",
        "agents": ["clinical", "bioSentry", "dataAnalyst"]
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "agents": {
            "clinical": "active",
            "bioSentry": "active",
            "dataAnalyst": "active"
        }
    }

@app.post("/api/clinical", response_model=MessageResponse)
async def clinical_agent(request: MessageRequest):
    """
    Clinical Core Agent - Medical diagnosis & treatment recommendations
    """
    try:
        # TODO: Import and use your actual clinical_core_agent
        # from clinical_core_agent import process_query
        # response = process_query(request.message)
        
        # Temporary mock response
        response_text = f"Clinical Core Agent received: '{request.message}'. "
        response_text += "This agent provides medical diagnosis and treatment recommendations. "
        response_text += "Connect your actual agent logic here."
        
        return MessageResponse(
            response=response_text,
            agent="clinical",
            status="success"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/bioSentry", response_model=MessageResponse)
async def bio_sentry_agent(request: MessageRequest):
    """
    Bio Sentry Agent - Biosecurity monitoring & alerts
    """
    try:
        # TODO: Import and use your actual bio_sentry_agent
        # from bio_sentry_agent import process_query
        # response = process_query(request.message)
        
        # Temporary mock response
        response_text = f"Bio Sentry Agent received: '{request.message}'. "
        response_text += "This agent monitors biosecurity and provides alerts. "
        response_text += "Connect your actual agent logic here."
        
        return MessageResponse(
            response=response_text,
            agent="bioSentry",
            status="success"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/dataAnalyst", response_model=MessageResponse)
async def data_analyst_agent(request: MessageRequest):
    """
    Data Analyst Agent - Wearable data analysis & insights
    """
    try:
        # TODO: Import and use your actual data_analyst_agent
        # from data_analyst_agent import process_query
        # response = process_query(request.message)
        
        # Temporary mock response
        response_text = f"Data Analyst Agent received: '{request.message}'. "
        response_text += "This agent analyzes wearable data and provides insights. "
        response_text += "Connect your actual agent logic here."
        
        return MessageResponse(
            response=response_text,
            agent="dataAnalyst",
            status="success"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    print("🚀 Starting Pulse Nexus Backend Server...")
    print("📍 Server running at: http://localhost:8000")
    print("📚 API Documentation: http://localhost:8000/docs")
    print("🔍 Health Check: http://localhost:8000/health")
    uvicorn.run(
        app, 
        host="0.0.0.0", 
        port=8000,
        log_level="info"
    )