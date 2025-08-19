import os
from langchain_google_genai import GoogleGenerativeAI
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")

# Gemini 1.5 flash text model (ücretsiz, hızlı)
llm = GoogleGenerativeAI(model="gemini-1.5-flash-latest", api_key=API_KEY)
