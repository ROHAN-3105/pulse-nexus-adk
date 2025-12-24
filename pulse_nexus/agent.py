# --- shared env loader (top of file) ---
import os
from pathlib import Path
from dotenv import load_dotenv

# Load project-root .env once per process
root_env = Path(__file__).resolve().parents[1] / ".env"
if root_env.exists():
    load_dotenv(root_env)
# --- end env loader ---
from google.adk.agents import Agent
from google.adk.tools import AgentTool

from bio_sentry_agent import root_agent as bio_sentry_root
from data_analyst_agent import root_agent as data_analyst_root
from clinical_core_agent import root_agent as clinical_core_root

# OLD (wrong for your version):
# bio_sentry_tool = AgentTool(agent=bio_sentry_root, name="bio_sentry_agent")
# data_analyst_tool = AgentTool(agent=data_analyst_root, name="data_analyst_agent")
# clinical_core_tool = AgentTool(agent=clinical_core_root, name="clinical_core_agent")

# NEW (positional only):
bio_sentry_tool = AgentTool(bio_sentry_root)
data_analyst_tool = AgentTool(data_analyst_root)
clinical_core_tool = AgentTool(clinical_core_root)



root_agent = Agent(
    model="gemini-2.0-flash",
    name="pulse_nexus_root",
    description=(
        "Pulse-Nexus coordinator: orchestrates Bio-Sentry, Data-Analyst, "
        "and Clinical-Reasoning agents for post-discharge monitoring."
    ),
    instruction="""
You are the Pulse-Nexus root coordinator.

You have access to three specialist agents exposed as tools:

1) bio_sentry_agent
   - Input: natural-language description of symptoms and optional video path.
   - Output JSON:
     {
       "suggested_severity": "<low|moderate|high>",
       "red_flags": ["..."],
       "summary": "..."
     }

2) data_analyst_agent
   - Input: instructions including path to a wearable CSV (e.g. wearable_samples.csv).
   - Output JSON-like dict:
     {
       "status": "ok",
       "samples_count": <int>,
       "hr_min": ...,
       "hr_max": ...,
       "spo2_min": ...,
       "spo2_max": ...,
       "trend_notes": ["..."]
     }

3) clinical_core_agent
   - Input: combined context (Bio-Sentry output, Data-Analyst output, and optional history).
   - Output JSON:
     {
       "risk_level": "<Low|Watch closely|Critical – escalate>",
       "escalate_now": <true|false>,
       "reasoning_trace": ["..."],
       "handover": "..."
     }

COORDINATION FLOW
-----------------
When the user sends information about a patient:

1) Extract:
   - Symptom description (text, including any mentioned video path).
   - Any provided wearable CSV path (default: 'wearable_samples.csv' if not specified).
   - Relevant clinical background if the user includes it.

2) Call bio_sentry_agent:
   - Pass ONLY the symptom description (and mention any video path).
   - Capture its JSON output.

3) Call data_analyst_agent:
   - If a wearable CSV path is available (e.g. 'wearable_samples.csv'),
     ask it to analyze that file.
   - If no wearable data is available, you may skip this call and note that in context.

4) Call clinical_core_agent:
   - Provide a single textual message that embeds:
     - "Bio-Sentry:" followed by the JSON from step 2.
     - "Data-Analyst:" followed by the JSON/dict from step 3 (or a note if skipped).
     - "Context:" including any clinical history the user gave (diagnosis, surgery, comorbidities).

5) Return ONLY the JSON from clinical_core_agent to the user.

OUTPUT FORMAT
--------------
Always return the final answer as JSON from the clinical_core_agent, with no extra text:

{
  "risk_level": "<Low|Watch closely|Critical – escalate>",
  "escalate_now": <true|false>,
  "reasoning_trace": ["..."],
  "handover": "..."
}

Do not expose intermediate tool calls unless specifically asked; they are part of internal reasoning.
""",
    tools=[bio_sentry_tool, data_analyst_tool, clinical_core_tool],
)
