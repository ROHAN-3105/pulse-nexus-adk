import csv
from typing import Dict

def summarize_wearable_csv(csv_path: str) -> Dict:
    """
    Tool: summarize_wearable_csv
    Reads a CSV with columns: timestamp, hr, spo2
    Returns simple trend notes for tachycardia and low SpO2.
    """
    hrs = []
    spo2s = []

    with open(csv_path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            try:
                if row.get("hr"):
                    hrs.append(int(row["hr"]))
                if row.get("spo2"):
                    spo2s.append(int(row["spo2"]))
            except ValueError:
                continue

    notes = []
    if hrs and max(hrs) >= 110:
        notes.append("Episodes of tachycardia (heart rate >= 110 bpm).")
    if spo2s and min(spo2s) <= 92:
        notes.append("Oxygen saturation dropped to <= 92%.")
    if not notes:
        notes.append("No clearly dangerous trends in the provided window.")

    return {
        "status": "ok",
        "samples_count": len(hrs),
        "hr_min": min(hrs) if hrs else None,
        "hr_max": max(hrs) if hrs else None,
        "spo2_min": min(spo2s) if spo2s else None,
        "spo2_max": max(spo2s) if spo2s else None,
        "trend_notes": notes,
    }
