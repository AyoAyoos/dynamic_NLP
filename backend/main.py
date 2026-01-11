import os
import google.generativeai as genai
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import uvicorn

# 1. Load the Secret Key
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("❌ ERROR: No API Key found! Did you create the .env file?")
else:
    genai.configure(api_key=api_key)
    print("✅ Gemini API Connected!")

app = FastAPI()

# 2. Allow React to talk to Python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Answers(BaseModel):
    responses: dict[str, int]

@app.post("/analyze")
async def analyze_aq(data: Answers):
    answers = data.responses
    
    # --- MATH ENGINE ---
    def get_score(idx): return answers.get(f"q{idx}", 0)

    control = sum(get_score(i) for i in [1, 2, 3])
    ownership = sum(get_score(i) for i in range(4, 12))
    reach = sum(get_score(i) for i in range(12, 17))
    endurance = sum(get_score(i) for i in range(17, 22))
    attitude = sum(get_score(i) for i in [22, 23])

    total_score = (control + ownership + reach + endurance + attitude) * 2

    if total_score >= 180: label = "Climber"
    elif total_score >= 160: label = "Moderate Climber"
    elif total_score >= 140: label = "Camper"
    elif total_score >= 120: label = "Moderate Camper"
    else: label = "Quitter"

    # --- AI ENGINE (The Dynamic Part) ---
    
    # 1. Build the Persona and Data
    prompt = f"""
    You are an expert Industrial Psychologist specializing in Adversity Quotient (AQ).
    Analyze this student's resilience profile:

    - Total AQ: {total_score} (Category: {label})
    - Control (Influence): {control} / 15
    - Ownership (Accountability): {ownership} / 40
    - Reach (Spillover impact): {reach} / 25
    - Endurance (Duration impact): {endurance} / 25
    - Attitude: {attitude} / 10

    Instructions:
    1. Do NOT list the numbers. Explain what they REVEAL about the student's mindset.
    2. If Ownership is high but Control is low, explain that they feel responsible but helpless.
    3. If Reach is low, warn them about letting stress affect their personal life.
    4. Give 3 sentences of specific, actionable advice.
    5. Speak directly to the student ("You..."). Keep it encouraging but honest.
    """

    try:
        # 2. Call Gemini
        model = genai.GenerativeModel('gemini-flash-latest')
        response = model.generate_content(prompt)
        ai_text = response.text
    except Exception as e:
        ai_text = f"AI Error: {str(e)}"

    # --- RETURN EVERYTHING ---
    return {
        "scores": {
            "control": control,
            "ownership": ownership,
            "reach": reach,
            "endurance": endurance,
            "attitude": attitude,
            "total": total_score,
            "label": label
        },
        "ai_analysis": ai_text
    }

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)