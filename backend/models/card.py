from pydantic import BaseModel
from typing import Optional

class Card(BaseModel):
    id: Optional[int]
    concept: str             # Girilen konu/kavram
    summary: str             # Kısa açıklama/özet (AI)
    example: str             # Gerçek hayat örneği (AI)
    image_url: Optional[str] # Görsel (şimdilik dummy)
    difficulty: str          # "kolay", "orta", "zor"
