from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MessageRequest(BaseModel):
    message: str
    context: dict = {}

@app.post("/api/clinical")
async def clinical_agent(request: MessageRequest):
    # Import and call your clinical_core_agent
    from clinical_core_agent import process_clinical_query
    response = process_clinical_query(request.message)
    return {"response": response, "agent": "clinical"}

@app.post("/api/bioSentry")
async def bio_sentry_agent(request: MessageRequest):
    # Import and call your bio_sentry_agent
    from bio_sentry_agent import process_biosentry_query
    response = process_biosentry_query(request.message)
    return {"response": response, "agent": "bioSentry"}

@app.post("/api/dataAnalyst")
async def data_analyst_agent(request: MessageRequest):
    # Import and call your data_analyst_agent
    from data_analyst_agent import process_data_query
    response = process_data_query(request.message)
    return {"response": response, "agent": "dataAnalyst"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)