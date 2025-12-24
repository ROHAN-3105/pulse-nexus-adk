# clinical_core_agent/tools/rag_tool.py

import PyPDF2
from pathlib import Path
from google.adk.tools import FunctionTool


def search_medical_guidelines(query: str) -> str:
    """
    Very simple RAG-style lookup over local PDF guidelines.

    Inputs:
      query: short text with key vitals/symptoms
             e.g. "POD3 appendectomy, SpO2 88%, HR 110"

    Output:
      A short text block with 0–3 guideline snippets and rough citations.
    """

    guideline_files = [
        "aha_guidelines.pdf",
        "appendectomy_protocol.pdf",
    ]

    hits = []

    for pdf_name in guideline_files:
        path = Path(pdf_name)
        if not path.exists():
            continue

        try:
            with path.open("rb", "rb") as f:
                reader = PyPDF2.PdfReader(f)
                # Only scan first 10 pages
                text_chunks = []
                for i, page in enumerate(reader.pages[:10]):
                    page_text = page.extract_text() or ""
                    text_chunks.append(f"[Page {i+1}] {page_text}")
                text = "\n".join(text_chunks)

            lowered = text.lower()
            if any(k in lowered for k in ["spo2", "oxygen", "hypoxia", "post-op", "monitor"]):
                snippet = text[:400].replace("\n", " ")
                hits.append(f"{pdf_name}: {snippet}...")
        except Exception:
            continue

    if not hits:
        return (
            "GUIDELINES: No specific snippet found in local PDFs. "
            "Default: monitor SpO2 regularly; escalate if SpO2 < 92% or HR > 120, "
            "or if pain/fever are concerning."
        )

    joined = "\n".join(hits[:3])
    return f"GUIDELINES: Evidence-based recommendations found in local PDFs:\n{joined}"


# ABSOLUTE MINIMAL TOOL: only the function, no kwargs at all.
rag_tool = FunctionTool(search_medical_guidelines)
