from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from utils.card_ai import ai_generate_card

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Gerekirse kısıtla
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerateCardRequest(BaseModel):
    concept: str
    difficulty: str = "orta"

class EvaluateRequest(BaseModel):
    question: str
    correct_answer: str
    user_answer: str

@app.post("/generate_card")
async def generate_card(request: Request):
    concept = request.query_params.get("concept")
    difficulty = request.query_params.get("difficulty", "orta")
    card = ai_generate_card(concept, difficulty)
    return card

@app.post("/evaluate_answer")
async def evaluate_answer(data: EvaluateRequest):
    try:
        if data.user_answer.strip().lower() == data.correct_answer.strip().lower():
            return {"dogru_mu": "evet", "aciklama": "Tebrikler, doğru!"}
        else:
            return {
                "dogru_mu": "hayır",
                "aciklama": f"Yanlış. Doğru cevap: {data.correct_answer}"
            }
    except Exception as e:
        return {
            "dogru_mu": "bilinmiyor",
            "aciklama": f"Hata: {str(e)}"
        }
