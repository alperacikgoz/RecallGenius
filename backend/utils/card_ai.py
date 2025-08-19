from .gemini_client import llm
import random

def generate_quiz_question(concept):
    prompt = (
        f"Lütfen '{concept}' kavramı için lise öğrencisinin cevaplayabileceği, kısa ve özgün bir quiz sorusu yaz. "
        f"Her çağrıda farklı ve yeni bir soru üret. Sadece soruyu ver."
    )
    return llm.invoke(prompt).strip()

def generate_quiz_answer(quiz_question):
    prompt = f"Aşağıdaki sorunun doğru cevabını tek cümleyle, açıkça yaz: {quiz_question}"
    return llm.invoke(prompt).strip()

def ai_generate_card(concept, difficulty="orta"):
    summary_prompt = (
        f"Kısa, sade ve öğrenci dostu bir şekilde '{concept}' kavramını açıkla. "
        f"Dil: Türkçe. {difficulty.capitalize()} seviyede yaz."
    )
    summary = llm.invoke(summary_prompt)

    example_prompt = (
        f"'{concept}' kavramının lise öğrencisinin anlayacağı şekilde gerçek hayatta "
        f"nasıl karşılaşabileceğini, kısa bir örnekle açıkla. Türkçe yaz."
    )
    example = llm.invoke(example_prompt)

    quiz_question = generate_quiz_question(concept)
    quiz_answer = generate_quiz_answer(quiz_question)

    # Görsel AI ile üretiliyorsa burada koyabilirsin.
    image_url = "https://placehold.co/400x200?text=AI+Image"

    return {
        "concept": concept,
        "difficulty": difficulty,
        "summary": summary,
        "example": example,
        "quiz_question": quiz_question,
        "quiz_answer": quiz_answer,
        "image_url": image_url,
    }
