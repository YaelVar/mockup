import os
import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel, Field
import google.generativeai as genai
from google.api_core import retry
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
# Asegúrate de que la variable en tu .env sea GOOGLE_API_KEY
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

app = FastAPI(title="KRAMPUS - Enterprise Resilience Edition")

# CORS habilitado para que tu React pueda conectar
app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"], 
    allow_methods=["*"], 
    allow_headers=["*"]
)

model = genai.GenerativeModel('gemini-1.5-flash')

class TransactionData(BaseModel):
    account_id: str
    amount: float
    type: str

@app.post("/analyze_fraud")
async def analyze_fraud(data: TransactionData):
    score = 0.0
    case = "success"
    
    account_clean = data.account_id.replace(" ", "").replace("-", "")
    
    # --- Lógica Determinística ---
    # Caso 2: Intento de vaciar cuenta (Saldo aprox 12450)
    if data.amount >= 10000:
        score = 0.9
        case = "case2"
    # Caso 3: Internacional
    elif data.type == "international":
        score = 0.85
        case = "case3"
    # Caso 4: Otros bancos (CCI)
    elif data.type == "other":
        score = 0.75
        case = "case4"
    # Caso 1: Dispositivo/Interbank inusual
    elif data.amount > 5000:
        score = 0.7
        case = "case1"
    else:
        score = 0.2
        case = "success"

    # --- Refinamiento con IA ---
    try:
        # Enviamos contexto para que la IA decida un score
        compact_prompt = f"Analista de Fraude. Evalúa riesgo 0 a 1 (solo número). Transferencia de {data.amount} a cuenta tipo {data.type}."
        
        response = model.generate_content(
            compact_prompt,
            request_options={'retry': retry.Retry(predicate=retry.if_exception_type(Exception))}
        )
        ai_score = float(response.text.strip())
        score = (score + ai_score) / 2
        source = "KRAMPUS + IA"
    except Exception:
        source = "KRAMPUS"

    return {
        "score": round(min(score, 1.0), 4),
        "status": "RECHAZADO" if score > 0.6 else "APROBADO",
        "source": source,
        "case": case
    }

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)