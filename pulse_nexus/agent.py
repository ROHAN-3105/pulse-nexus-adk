# pulse_nexus/agent.py

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
from clinical_core_agent import root_agent as clinical_core_root  # uses root_agent from agent.py

# Your ADK version expects AgentTool(function_or_agent) without extra kwargs.
bio_sentry_tool = AgentTool(bio_sentry_root)
data_analyst_tool = AgentTool(data_analyst_root)
clinical_core_tool = AgentTool(clinical_core_root)

root_agent = Agent(
    model="gemini-2.0-flash",
    name="pulse_nexus_root",
    description=(
        "Pulse-Nexus coordinator: orchestrates Bio-Sentry, Data-Analyst, "
        "and Clinical-Core agents for post-discharge monitoring with "
        "evidence-based guidance from local medical PDFs."
    ),
    instruction="""
You are the Pulse-Nexus root coordinator.

You have access to three specialist agents exposed as tools:

1) bio_sentry_agent
   - Input: natural-language description of symptoms and any gait/video info.
   - Output JSON:
     {
       "suggested_severity": "<low|moderate|high>",
       "red_flags": ["..."],
       "summary": "..."
     }

2) data_analyst_agent
   - Input: instructions including path to a wearable CSV
     (e.g. 'wearable_samples.csv').
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
   - Input: combined context (Bio-Sentry output, Data-Analyst output, and
     any clinical history).
   - Internally it will call a guideline tool (RAG) over local PDFs
     (e.g. 'aha_guidelines.pdf') and include that in its reasoning.
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
   - Symptom description (text, including any mentioned video/gait info).
   - Any provided wearable CSV path (default: 'wearable_samples.csv'
     if not specified but available in the project).
   - Relevant clinical background if the user includes it
     (surgery type, POD day, comorbidities, etc.).

2) Call bio_sentry_agent:
   - Pass ONLY the symptom description (and mention any video path).
   - Capture its JSON output as "Bio-Sentry".

3) Call data_analyst_agent:
   - If a wearable CSV path is available (e.g. 'wearable_samples.csv'),
     ask it to analyze that file.
   - If no wearable data is available, you may skip this call and note that
     in the context you send to clinical_core_agent.

4) Call clinical_core_agent:
   - Provide a single textual message that embeds:
     - "Bio-Sentry:" followed by the JSON from step 2.
     - "Data-Analyst:" followed by the JSON/dict from step 3
       (or a clear note if skipped).
     - "Context:" including any clinical history the user gave
       (diagnosis, surgery, POD, comorbidities).
   - Clinical-Core will then call its internal guideline tool (RAG)
     and include something like:
       "GUIDELINES: aha_guidelines.pdf [Page X] ..."

5) Return ONLY the JSON from clinical_core_agent to the user.

OUTPUT FORMAT
--------------
Always return the final answer as the JSON from clinical_core_agent,
with no extra text:

{
  "risk_level": "<Low|Watch closely|Critical – escalate>",
  "escalate_now": <true|false>,
  "reasoning_trace": ["..."],
  "handover": "..."
}

Do not expose intermediate tool calls unless specifically asked;
they are part of internal reasoning.
""",
    tools=[bio_sentry_tool, data_analyst_tool, clinical_core_tool],
)
