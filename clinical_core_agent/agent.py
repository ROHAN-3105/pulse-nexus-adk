from google.adk.agents import LlmAgent
from clinical_core_agent.tools.rag_tool import rag_tool


clinical_core_root = LlmAgent(
    name="clinical_core_agent",
    model="gemini-2.0-flash-exp",
    description=(
        "Clinical reasoning core that combines Bio-Sentry and Data-Analyst agents "
        "outputs, and consults local guidelines before deciding."
    ),
    instruction="""
... (your long instruction text here, unchanged) ...
""",
    tools=[rag_tool],
)

# ADK EXPECTS a variable called root_agent exported from this module
root_agent = clinical_core_root
