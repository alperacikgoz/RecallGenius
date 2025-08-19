import React, { useState } from "react";
import axios from "axios";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  TextField,
  MenuItem,
  Box,
  Chip,
  Avatar,
} from "@mui/material";
import { LightMode, DarkMode, InfoOutlined } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const getTheme = (dark) =>
  createTheme({
    palette: {
      mode: dark ? "dark" : "light",
      primary: { main: "#6d42e2" },
      secondary: { main: "#18becb" },
      background: {
        default: dark ? "#1a1833" : "#f5f7fa",
        paper: dark ? "#24244a" : "#fff",
      },
    },
    shape: { borderRadius: 18 },
    typography: { fontFamily: "Inter, Rubik, Roboto, Arial, sans-serif" },
  });

function clampText(text, max = 38) {
  return text && text.length > max ? text.slice(0, max - 3) + "..." : text;
}

function CardGrid({ cards, onOpenDetail, theme }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 38,
        margin: "36px auto 0 auto",
        maxWidth: 1100,
        placeItems: "center",
      }}
    >
      {cards.map((card, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.07, boxShadow: "0 6px 30px #18becb44" }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          style={{
            background: theme.palette.background.paper,
            borderRadius: 19,
            boxShadow: "0 2px 16px #18becb13",
            minHeight: 195,
            minWidth: 190,
            maxWidth: 260,
            padding: "28px 16px 20px 16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            position: "relative",
          }}
          onClick={() => onOpenDetail(card)}
        >
          <Avatar
            sx={{
              bgcolor: "#6d42e2",
              width: 45,
              height: 45,
              mb: 1.5,
              boxShadow: "0 2px 8px #18becb14",
            }}
          >
            <InfoOutlined fontSize="medium" />
          </Avatar>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              color: "#1b164b",
              textAlign: "center",
              mb: 1.2,
              fontSize: "1.09rem",
              textTransform: "capitalize",
              letterSpacing: 0.2,
              wordBreak: "break-word",
              lineHeight: 1.16,
            }}
          >
            {clampText(card.concept, 34)}
          </Typography>
          <Chip
            label={card.difficulty}
            size="small"
            sx={{
              bgcolor: "#18becb",
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              letterSpacing: 0.5,
              mt: 0.4,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

function CardDetailModal({ open, card, onClose, theme, onQuiz }) {
  if (!card) return null;
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(25,24,52,.82)",
            zIndex: 1002,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.93, y: 40 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            style={{
              background: theme.palette.background.paper,
              borderRadius: 22,
              minWidth: 540,
              maxWidth: 800,
              width: "90vw",
              maxHeight: "90vh",
              boxShadow: "0 8px 44px #18becb3b",
              padding: "36px 38px 30px 38px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Kapat */}
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                top: 18,
                right: 18,
                background: "none",
                border: "none",
                fontSize: 22,
                color: "#9599bb",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
            {/* Kart başlık ve görsel */}
            <Box
              sx={{ display: "flex", alignItems: "flex-start", gap: 3, mb: 2 }}
            >
              <img
                src={card.image_url}
                alt="AI görseli"
                style={{
                  width: 180,
                  height: 130,
                  borderRadius: 12,
                  objectFit: "cover",
                  background: "#f5f6fa",
                  boxShadow: "0 1px 8px #6d42e22a",
                }}
              />
              <Box>
                <Typography
                  variant="h4"
                  fontWeight={900}
                  sx={{ color: "#6d42e2", mb: 1, letterSpacing: 0.5 }}
                >
                  {card.concept}
                </Typography>
                <Chip
                  label={"Seviye: " + card.difficulty}
                  size="medium"
                  sx={{
                    bgcolor: "#18becb",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 16,
                    mb: 2,
                    mt: 0.5,
                  }}
                />
              </Box>
            </Box>
            {/* Özet */}
            <Typography fontWeight={700} color="primary" sx={{ mb: 0.5 }}>
              Özet:
            </Typography>
            <Typography variant="body1" sx={{ color: "#181833", mb: 1.1 }}>
              {card.summary}
            </Typography>
            {/* Gerçek Hayat Örneği */}
            <Typography fontWeight={700} sx={{ color: "#7e7ea7", mb: 0.5 }}>
              Gerçek Hayat Örneği:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#7e7ea7",
                fontSize: 17,
                mb: 1.2,
                borderLeft: "3px solid #18becb",
                pl: 1.3,
                fontStyle: "italic",
              }}
            >
              {card.example}
            </Typography>
            {/* Quiz Soru */}
            {card.quiz_question && (
              <Box
                sx={{
                  bgcolor: "#f7faff",
                  borderRadius: 3,
                  p: 1.2,
                  mb: 1.3,
                  mt: 1.2,
                }}
              >
                <Typography fontWeight={700} color="secondary">
                  Quiz Soru:
                </Typography>
                <Typography>{card.quiz_question}</Typography>
              </Box>
            )}
            <Box sx={{ display: "flex", gap: 1.7 }}>
              <Button
                size="medium"
                variant="contained"
                sx={{
                  background: "linear-gradient(90deg,#6d42e2,#18becb 90%)",
                  borderRadius: 4,
                  fontWeight: 600,
                  px: 2.4,
                }}
                onClick={() => onQuiz(card)}
              >
                Quiz Çöz
              </Button>
              <Button
                size="medium"
                sx={{
                  color: "#18becb",
                  borderRadius: 4,
                  fontWeight: 600,
                  px: 2.2,
                  border: "2.2px solid #18becb",
                }}
              >
                Öğrendim!
              </Button>
            </Box>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function QuizModal({ open, card, onClose }) {
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [checking, setChecking] = useState(false);

  if (!card) return null;

  const handleCheck = async () => {
    setChecking(true);
    setFeedback("");
    setResult(null);
    try {
      const res = await axios.post("http://127.0.0.1:8000/evaluate_answer", {
        question: card.quiz_question,
        correct_answer: card.quiz_answer,
        user_answer: answer,
      });
      setResult(res.data.dogru_mu === "evet");
      setFeedback(res.data.aciklama);
    } catch {
      setFeedback("Bağlantı hatası!");
      setResult(null);
    }
    setChecking(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(19,18,38,0.93)",
            zIndex: 1100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.97, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.93, y: 30 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 32,
              minWidth: 260,
              maxWidth: 360,
              boxShadow: "0 12px 48px #18becb36",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                top: 14,
                right: 16,
                background: "none",
                border: "none",
                fontSize: 22,
                color: "#9599bb",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
            <Typography variant="h6" mb={2} color="primary">
              {card.concept} Quiz
            </Typography>
            <Typography variant="body2" mb={1.7}>
              <b>Soru:</b> {card.quiz_question}
            </Typography>
            <TextField
              label="Cevabınız"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              fullWidth
              autoFocus
            />
            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                onClick={handleCheck}
                disabled={checking || !answer.trim()}
              >
                Cevabı Kontrol Et
              </Button>
              <Button variant="outlined" color="secondary" onClick={onClose}>
                Kapat
              </Button>
            </Box>
            {feedback && (
              <Typography mt={2} color={result ? "success.main" : "error.main"}>
                {feedback}
              </Typography>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);
  const theme = getTheme(dark);
  const [concept, setConcept] = useState("");
  const [difficulty, setDifficulty] = useState("orta");
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");
  const [detailCard, setDetailCard] = useState(null);
  const [quizCard, setQuizCard] = useState(null);

  const generateCard = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/generate_card",
        {},
        { params: { concept, difficulty } }
      );
      setCards([res.data, ...cards]);
      setConcept("");
    } catch {
      setError("Kart oluşturulamadı. Backend aktif mi?");
    }
    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{ bgcolor: "#24244a", boxShadow: "0 8px 32px #6d42e235" }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ flexGrow: 1, letterSpacing: 1.5 }}
          >
            <span role="img" aria-label="logo">
              💡
            </span>{" "}
            RecallGenius
          </Typography>
          <IconButton onClick={() => setDark((d) => !d)} color="inherit">
            {dark ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ pt: 4, pb: 7, minHeight: "90vh" }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            textAlign: "center",
            mt: 1,
            mb: 0.5,
            background: "linear-gradient(90deg,#6d42e2,#18becb 90%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Akıllı Eğitim Kartları
        </Typography>
        <Typography
          sx={{ textAlign: "center", mb: 3, color: "#7578b6", fontSize: 18 }}
        >
          AI destekli, hızlı, eğlenceli ve modern öğren!
        </Typography>
        {/* Arama Barı */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            bgcolor: "#fff",
            borderRadius: 5,
            px: 3,
            py: 2,
            boxShadow: "0 2px 20px #18becb13",
            maxWidth: 650,
            mx: "auto",
            mb: 3,
          }}
        >
          <TextField
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            placeholder="Kavram veya konu"
            size="small"
            sx={{ flex: 2 }}
          />
          <TextField
            select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            size="small"
            sx={{ minWidth: 90, flex: 1 }}
          >
            <MenuItem value="kolay">Kolay</MenuItem>
            <MenuItem value="orta">Orta</MenuItem>
            <MenuItem value="zor">Zor</MenuItem>
          </TextField>
          <Button
            variant="contained"
            onClick={generateCard}
            disabled={!concept.trim() || loading}
            sx={{
              fontWeight: 600,
              background: "linear-gradient(90deg,#6d42e2,#18becb 90%)",
              minWidth: 124,
            }}
          >
            {loading ? "Oluşturuluyor..." : "KART OLUŞTUR"}
          </Button>
        </Box>

        {error && (
          <Typography color="error" textAlign="center" sx={{ my: 2 }}>
            {error}
          </Typography>
        )}

        <CardGrid cards={cards} onOpenDetail={setDetailCard} theme={theme} />

        {/* Detay Modal */}
        <CardDetailModal
          open={!!detailCard}
          card={detailCard}
          onClose={() => setDetailCard(null)}
          theme={theme}
          onQuiz={(card) => {
            setQuizCard(card);
            setDetailCard(null);
          }}
        />

        {/* Quiz Modal */}
        <QuizModal
          open={!!quizCard}
          card={quizCard}
          onClose={() => setQuizCard(null)}
        />

        <div
          style={{
            textAlign: "center",
            marginTop: 60,
            color: "#9596b5",
            fontSize: 13,
          }}
        >
          © 2025 RecallGenius AI Platform. Powered by Gemini AI
        </div>
      </Container>
    </ThemeProvider>
  );
}
