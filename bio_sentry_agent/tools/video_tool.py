from typing import Dict, List


def analyze_video_stub(video_path: str) -> Dict:
    """
    Tool: analyze_video_stub

    This is a stub video-analysis tool for the Bio-Sentry agent.

    Input:
      video_path: string path or identifier for a patient video.
                  In ADK Web, this could be the artifact path of an uploaded file.

    Output:
      Dict with a list of 'observations' which the agent will combine with text.
    """

    # In a real system, you would:
    # - Load the video from disk or cloud storage.
    # - Call a Gemini multimodal model with the video and a prompt.
    # - Parse model output into structured observations.
    #
    # For hackathon demo, we just echo the path and return neutral observations.

    observations: List[str] = [
        f"Video '{video_path}' received (stub analysis).",
        "No automated video analysis implemented yet; rely primarily on text description.",
    ]

    return {
        "status": "ok",
        "video_path": video_path,
        "observations": observations,
    }
