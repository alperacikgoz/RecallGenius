# 📚 RecallGenius – Yapay Zeka Destekli Flashcard Platformu (Full-Stack)

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue?style=for-the-badge&logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Gemini](https://img.shields.io/badge/Gemini-1.5%20Flash-8A2BE2?style=for-the-badge)](https://ai.google.dev/)

RecallGenius, öğrencilerin kendi kavramlarına göre **flashcard** oluşturabildiği; sistemin de **seçilen zorluk seviyesine göre açıklama (Başlangıç / Orta / İleri)**, **gerçek hayattan örnek** ve **quiz sorusu + cevap** ürettiği modern bir eğitim uygulamasıdır.  
Kullanıcı, kartı oluştururken **seviye** seçer; AI **öğrenci dostu** içerik döndürür ve kullanıcı **quiz** ile kendini ölçebilir.

## Ekran Görüntüsü
<img width="1919" height="1018" alt="image" src="https://github.com/user-attachments/assets/4c99b796-2eb7-406b-92d8-10afdce8b1ed" />

<img width="1918" height="1022" alt="image" src="https://github.com/user-attachments/assets/d3af9a1f-a80d-42fb-a3fd-dd992b000cf3" />

## ✨ Özellikler

- 📝 **Flashcard oluşturma** (kavram + seviye seçimi)
- 🤖 **AI üretimi**: seçilen seviyede kısa ve anlaşılır **açıklama (summary)**
- 🌍 **Gerçek hayat örneği (example)** üretimi
- ❓ **Quiz**: tek cümlelik soru ve doğru cevap + **değerlendirme**
- ⚡ **Anında geri bildirim** (doğru/yanlış + açıklama)
- 🎨 **Modern arayüz**: React + MUI + Framer Motion


## 🛠️ Teknoloji Yığını

### Backend
- Python 3.10+  
- FastAPI  
- Uvicorn  
- Pydantic  
- SQLite  

### Frontend
- React (Vite)  
- TypeScript  
- Tailwind CSS  
- Zustand (state management)  
- React Router  

### AI Entegrasyonu
- Google Gemini API  


### Kurulum

---

#### 1) Backend (FastAPI)

1. **Klasöre geçin ve sanal ortamı oluşturup aktive edin**
   ```bash
   cd backend
   python -m venv venv
   # Windows: .\venv\Scripts\activate
   # macOS/Linux: source venv/bin/activate

2. **Gerekli Python paketlerini TEK TEK kurun**
   ```bash
   pip install fastapi
   pip install "uvicorn[standard]"
   pip install pydantic
   pip install python-dotenv
   pip install requests
   pip install langchain-google-genai
   pip install google-generativeai
   pip install pillow

3. **.env dosyasını oluşturun (Gemini anahtarı) Ve API başlatın**
   ```bash
   # backend/.env
   GOOGLE_API_KEY=YOUR_GEMINI_API_KEY
   uvicorn app:app --reload

#### 2) Frontend (React + Vite)
   ```bash
   cd frontend
   npm install
   npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
   npm install framer-motion axios
   npm run dev













