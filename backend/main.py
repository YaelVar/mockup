import os
import re
import logging
from enum import Enum
from typing import Dict, Optional

import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel, Field
import google.generativeai as genai
from google.api_core import retry
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

# Config logging
logging.basicConfig(level=logging.INFO)

load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")
if API_KEY:
    genai.configure(api_key=API_KEY)
else:
    logging.warning("GOOGLE_API_KEY no encontrada. Las llamadas a IA estarán deshabilitadas.")

app = FastAPI(title="KRAMPUS - Enterprise Resilience Edition")

# CORS habilitado para que tu React pueda conectar
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializar modelo solo si existe API_KEY
model: Optional[genai.GenerativeModel] = None
if API_KEY:
    try:
        model = genai.GenerativeModel("models/gemini-1.5-flash")
    except Exception:
        logging.exception("No se pudo inicializar el modelo generativo. IA deshabilitada.")
        model = None

class TransactionType(str, Enum):
    domestic = "domestic"
    international = "international"
    other = "other"

class TransactionRequest(BaseModel):
    REQ_AUTH_ID: str = Field(..., alias="REQ-AUTH-ID")
    REQ_ACCOUNT_ID: str = Field(..., alias="REQ-ACCOUNT-ID")
    REQ_AMOUNT: float = Field(..., alias="REQ-AMOUNT")
    REQ_TIMESTAMP: int = Field(..., alias="REQ-TIMESTAMP")
    REQ_LATITUDE: Optional[str] = Field(None, alias="REQ-LATITUDE")
    REQ_DEVICE_ID: Optional[str] = Field(None, alias="REQ-DEVICE-ID")

    class Config:
        allow_population_by_field_name = True

class AnalyzeRequest(BaseModel):
    transaction_request: TransactionRequest

    class Config:
        schema_extra = {
            "example": {
                "transaction_request": {
                    "REQ-AUTH-ID": "9999999999",
                    "REQ-ACCOUNT-ID": "000000001",
                    "REQ-AMOUNT": 9999.0,
                    "REQ-TIMESTAMP": 20251218030000,
                    "REQ-LATITUDE": "40.7128",
                    "REQ-DEVICE-ID": "HACKER-PC-ROOT",
                }
            }
        }

class AnalyzeResponse(BaseModel):
    score: float
    status: str
    source: str
    case: str

@app.post("/analyze_fraud", response_model=AnalyzeResponse)
async def analyze_fraud(payload: AnalyzeRequest) -> Dict:
    """Analiza una transacción y devuelve un score de riesgo entre 0 y 1.

    El endpoint ahora acepta un JSON con `transaction_request` que contiene campos `REQ-...`.
    """

    tr = payload.transaction_request

    # Mapear campos del request al formato interno
    account_id = tr.REQ_ACCOUNT_ID
    amount = tr.REQ_AMOUNT
    # Por ahora asumimos domestic por defecto — puede ajustarse según reglas de negocio
    txn_type = TransactionType.domestic

    score = 0.0
    case = "success"

    # Normalizar account
    account_clean = account_id.replace(" ", "").replace("-", "")

    # --- Lógica Determinística ---
    if amount >= 10000:
        score = 0.9
        case = "case2"
    elif txn_type == TransactionType.international:
        score = 0.85
        case = "case3"
    elif txn_type == TransactionType.other:
        score = 0.75
        case = "case4"
    elif amount > 5000:
        score = 0.7
        case = "case1"
    else:
        score = 0.2
        case = "success"

    # --- Refinamiento con IA (si está disponible) ---
    source = "KRAMPUS"
    if model is not None:
        try:
            compact_prompt = (
                f"Analista de Fraude. Evalúa riesgo 0 a 1 (solo número). "
                f"Transferencia de {amount} a cuenta {account_clean}. "
                f"Dispositivo: {tr.REQ_DEVICE_ID or 'unknown'}"
            )

            response = model.generate_content(
                compact_prompt,
                request_options={
                    "retry": retry.Retry(predicate=retry.if_exception_type(Exception))
                },
            )

            text = response.text.strip()
            m = re.search(r"([-+]?[0-9]*\.?[0-9]+)", text)
            if m:
                ai_score = float(m.group(1))
                ai_score = max(0.0, min(1.0, ai_score))
                score = (score + ai_score) / 2
                source = "KRAMPUS + IA"
            else:
                logging.warning("Respuesta IA sin número parseable: %s", text)
        except Exception:
            logging.exception("Fallo al invocar modelo IA, se usará solo la lógica determinística.")

    final_score = round(min(score, 1.0), 4)
    status = "RECHAZADO" if final_score > 0.6 else "APROBADO"

    return {
        "score": final_score,
        "status": status,
        "source": source,
        "case": case,
    }


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
