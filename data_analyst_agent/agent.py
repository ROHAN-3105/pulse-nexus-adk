# --- shared env loader (top of file) ---
import os
from pathlib import Path
from dotenv import load_dotenv

# Load project-root .env once per proces
root_env = Path(__file__).resolve().parents[1] / ".env"
if root_env.exists():
    load_dotenv(root_env)
# --- end env loader ---


from google.adk.agents import Agent
from .tools.wearable_csv_tool import summarize_wearable_csv

root_agent = Agent(
    model="gemini-2.0-flash",
    name="data_analyst_agent",
    description="Analyzes simple wearable CSV telemetry for early warning signs.",
    instruction="""
You are the Data-Analyst agent for post-discharge monitoring.
You have a tool called summarize_wearable_csv which takes a file path
to a CSV with columns: timestamp, hr, spo2, and returns basic trends.

When the user asks about wearable data:
- Call summarize_wearable_csv with the CSV path they provide.
- Read the returned trend_notes and vital ranges.
- Explain, in 2–4 sentences, whether there are signs of deterioration.
- Use clinical but simple language (e.g., 'episodes of fast heart rate',
  'oxygen levels dropped to concerning range').

If the user does not provide a valid path, ask them to confirm it.
""",
    tools=[summarize_wearable_csv],
)
