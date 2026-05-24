#!/usr/bin/env python3
# ================================================================
#  🦊 RedFox AI Bot — النسخة الخارقة v6 "FUSION ENGINE"
#
#  المفهوم: كل النماذج الـ15 تعمل معاً كمحرك واحد
#
#  مراحل الصنع عند طلب ملف/كود:
#   المرحلة 1 — التخطيط    : نموذج سريع يفهم الطلب ويصنع خطة
#   المرحلة 2 — الكتابة    : نموذج قوي يكتب الكود الكامل
#   المرحلة 3 — المراجعة   : 3 نماذج مختلفة تراجع وترصد الأخطاء
#   المرحلة 4 — التصحيح    : نموذج متخصص يطبق كل التصحيحات
#   المرحلة 5 — التحسين    : نموذج إبداعي يحسن الجودة والأداء
#   المرحلة 6 — التوثيق    : نموذج يكتب الشرح والاقتراحات
#   النتيجة   — ملف واحد قوي جداً + شرح + اقتراحات
#
#  الرسائل العادية: نموذج واحد ذكي سريع (بدون pipeline)
# ================================================================

import telebot
import requests
import json
import threading
import time
import os
import re
import ast
import tempfile
from collections import deque
from telebot.types import InlineKeyboardMarkup, InlineKeyboardButton

# ================================================================
#  الإعدادات
# ================================================================
BOT_TOKEN   = "8561044007:AAHlszGh__8hD9jmvNANnTxhx7ibk0vaWqc"
MAX_HISTORY = 12
API_URL     = "https://zeneath.vectorion.in/app/newapi/api2.php"

FILE_LINE_THRESHOLD    = 25
FILE_CHAR_THRESHOLD    = 1000
HISTORY_CODE_MAX_LINES = 8
HISTORY_MSG_MAX_CHARS  = 600
HISTORY_SAFE_LIMIT     = 5000

MAX_RETRIES  = 3
BASE_TIMEOUT = 120

EDIT_INTERVAL       = 0.25
UPDATE_CHARS_FAST   = 4
UPDATE_CHARS_NORMAL = 15

DOT_INTERVAL = 0.70
DOT_FRAMES   = ["⏳", "⏳ ·", "⏳ · ·", "⏳ · · ·", "⏳ · ·", "⏳ ·"]

HEADERS = {
    "User-Agent"      : "Mozilla/5.0 (Linux; Android 16; SM-A165F)",
    "Accept"          : "text/event-stream, application/json",
    "Content-Type"    : "application/json",
    "x-id-token"      : "eyJhbGciOiJSUzI1NiIsImtpZCI6IjJiMzZhYjQxYTczOTJlMTRlNjM1ZmRlM2M2YWYwOWZlYmFhM2YyZDYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUmVkRm94IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0lhc3QycGQ1MXhTS0xpbm9MdlgxWDdwenQ1NUpRU3J6MlZvNzA5a1lYUFZoakc0UT1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbSJ6ZW5lYXRoLWFpIiwiYXVkIjoiemVuZWF0aC1haSIsImF1dGhfdGltZSI6MTc3NzkxNDc0OSwidXNlcl9pZCI6IjRqU0luTWl1R1ZoaGdkS3dobkNIamxGM25hdTEiLCJzdWIiOiI0alNJbk1pdUdWaGhnZEt3aG5DSGpsRjNuYXUxIiwiaWF0IjoxNzc3OTE1OTU1LCJleHAiOjE3Nzc5MTk1NTUsImVtYWlsIjoicmVkZm94ZGV2ZW1haWw3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA2NjE1MDQzNjg1NjQxMDA3MzM4Il0sImVtYWlsIjpbInJlZGZveGRldmVtYWlsN0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJjdXN0b20ifX0.f0geyRFHYfKdIYwSn54mkYTbWYovH2FLINa3DqX1h2fEP8hewy_Mt9sekEN3GML-P11SC7ZORUnz9Nki97344m0nujelLXCB-K_hSg--9AYzdFAdVjqVyiZ-tQpQWAcYrLiVdPz6pJA2Wyh3zmJ-Kzqu3aX5a1kAgdBJoCQozfwYYj6wzbG8OhpTvhLppn9k9P9BlgFKcoNqxOnGRxOVXM1teVUR9cOu70denp792aPg9P8xfPQ_75s4vPD2RK-9L4R-geaNb53AMwQ8ZR9FsgkMRafrNcHC61_Vpepb_SpNNIdahUjhqvtOqsqR-L5elQ8zokQtQS0fncTqq3QMFA",
    "authorization"   : "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjJiMzZhYjQxYTczOTJlMTRlNjM1ZmRlM2M2YWYwOWZlYmFhM2YyZDYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUmVkRm94IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0lhc3QycGQ1MXhTS0xpbm9MdlgxWDdwenQ1NUpRU3J6MlZvNzA5a1lYUFZoakc0UT1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbSJ6ZW5lYXRoLWFpIiwiYXVkIjoiemVuZWF0aC1haSIsImF1dGhfdGltZSI6MTc3NzkxNDc0OSwidXNlcl9pZCI6IjRqU0luTWl1R1ZoaGdkS3dobkNIamxGM25hdTEiLCJzdWIiOiI0alNJbk1pdUdWaGhnZEt3aG5DSGpsRjNuYXUxIiwiaWF0IjoxNzc3OTE1OTU1LCJleHAiOjE3Nzc5MTk1NTUsImVtYWlsIjoicmVkZm94ZGV2ZW1haWw3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA2NjE1MDQzNjg1NjQxMDA3MzM4Il0sImVtYWlsIjpbInJlZGZveGRldmVtYWlsN0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJjdXN0b20ifX0.f0geyRFHYfKdIYwSn54mkYTbWYovH2FLINa3DqX1h2fEP8hewy_Mt9sekEN3GML-P11SC7ZORUnz9Nki97344m0nujelLXCB-K_hSg--9AYzdFAdVjqVyiZ-tQpQWAcYrLiVdPz6pJA2Wyh3zmJ-Kzqu3aX5a1kAgdBJoCQozfwYYj6wzbG8OhpTvhLppn9k9P9BlgFKcoNqxOnGRxOVXM1teVUR9cOu70denp792aPg9P8xfPQ_75s4vPD2RK-9L4R-geaNb53AMwQ8ZR9FsgkMRafrNcHC61_Vpepb_SpNNIdahUjhqvtOqsqR-L5elQ8zokQtQS0fncTqq3QMFA",
    "x-requested-with": "com.vectorion.ai",
    "origin"          : "https://zeneath.vectorion.in",
}

# ================================================================
#  النماذج الـ15 مع أدوارها في الـ FUSION ENGINE
# ================================================================
ALL_MODELS = {
    "deepseek-v3.2"          : "⚡ ديب سيك v3.2",
    "deepseek-r1"            : "🧠 ديب سيك R1",
    "kimi-k2"                : "🌙 كيمي K2",
    "qwen-3-235b"            : "🔬 كوين 3 235B",
    "qwen-vl-max"            : "👁 كوين VL ماكس",
    "grok-4.2-reasoning"     : "🧬 جروك 4.2 متقدم",
    "grok-4.2"               : "⚙️ جروك 4.2",
    "grok-4.1-fast-reasoning": "🚀 جروك 4.1 سريع",
    "grok-4.1"               : "🔷 جروك 4.1",
    "grok-3"                 : "🔹 جروك 3",
    "claude-opus-4.6"        : "🎭 كلود أوبس 4.6",
    "claude-sonnet-4.6"      : "🎵 كلود سونيت 4.6",
    "llama-4.1"              : "🦙 لاما 4.1",
    "mistral-small-creative" : "🌊 ميسترال إبداعي",
    "sarvam-105b"            : "🌸 سارفام 105B",
}

# ================================================================
#  توزيع النماذج على مراحل FUSION ENGINE
#  كل مرحلة تختار أفضل نموذج لمهمتها
# ================================================================
FUSION_PIPELINE = {
    # المرحلة 1: التخطيط والفهم — نموذج سريع ومنطقي
    "planner"   : "grok-4.1-fast-reasoning",

    # المرحلة 2: الكتابة — أقوى نموذج كود
    "writer"    : "deepseek-v3.2",

    # المرحلة 3: المراجعون الثلاثة — ثلاثة نماذج مختلفة
    "reviewer_1": "grok-4.2-reasoning",     # تفكير عميق
    "reviewer_2": "claude-opus-4.6",        # جودة عالية
    "reviewer_3": "qwen-3-235b",            # دقة وتفاصيل

    # المرحلة 4: التصحيح — نموذج منطقي قوي
    "fixer"     : "deepseek-r1",

    # المرحلة 5: التحسين — نموذج إبداعي
    "optimizer" : "kimi-k2",

    # المرحلة 6: التوثيق — نموذج واضح وسهل
    "doc_writer": "claude-sonnet-4.6",

    # النموذج الافتراضي للمحادثة العادية
    "chat"      : "grok-4.2",
}

# النماذج المتاحة للمستخدم للاختيار (للمحادثة العادية)
MODELS = ALL_MODELS

# ================================================================
#  كلمات كشف طلب الكود/الملف
# ================================================================
CODE_REQUEST_KEYWORDS = [
    # عربي
    "اكتب", "صنع", "اصنع", "انشئ", "أنشئ", "ابن", "ابني", "بنيلي",
    "اعمل", "أعمل", "طور", "طوّر", "برمج", "برمجة", "ملف", "كود",
    "سكريبت", "تطبيق", "موقع", "api", "بوت", "خوارزمية", "دالة",
    "فنكشن", "كلاس", "مشروع", "قاعدة بيانات", "واجهة", "صفحة",
    "عدّل", "عدل", "حسّن", "حسن", "أضف", "اضف", "غيّر", "غير",
    "اصلح", "أصلح", "نفّذ", "نفذ", "حوّل", "حول", "طبّق",
    # إنجليزي شائع
    "create", "write", "build", "make", "generate", "code", "script",
    "function", "class", "implement", "develop", "program", "file",
    "app", "bot", "api", "fix", "edit", "update", "add", "improve",
    "optimize", "refactor", "convert",
]

def is_code_request(text):
    """يكشف إذا كان الطلب يستدعي تشغيل FUSION ENGINE"""
    t = text.lower()
    # كشف بالكلمات المفتاحية
    for kw in CODE_REQUEST_KEYWORDS:
        if kw in t:
            return True
    # كشف بذكر امتدادات ملفات
    if re.search(r"\.(py|js|ts|html|css|php|go|rs|java|kt|cs|cpp|sql|sh|vue|jsx|tsx)\b", t, re.I):
        return True
    return False

# ================================================================
#  امتدادات الملفات
# ================================================================
CODE_EXT = {
    "python": "py", "py": "py", "javascript": "js", "js": "js",
    "typescript": "ts", "ts": "ts", "jsx": "jsx", "tsx": "tsx",
    "html": "html", "htm": "html", "css": "css", "scss": "scss",
    "sass": "sass", "less": "less", "svg": "svg", "php": "php",
    "ruby": "rb", "rb": "rb", "go": "go", "golang": "go",
    "rust": "rs", "rs": "rs", "java": "java", "kotlin": "kt",
    "kt": "kt", "kts": "kts", "swift": "swift", "csharp": "cs",
    "c#": "cs", "cs": "cs", "c": "c", "cpp": "cpp", "c++": "cpp",
    "cxx": "cpp", "cc": "cpp", "h": "h", "hpp": "hpp",
    "objc": "m", "objective-c": "m", "bash": "sh", "sh": "sh",
    "shell": "sh", "zsh": "zsh", "fish": "fish", "powershell": "ps1",
    "ps1": "ps1", "batch": "bat", "bat": "bat", "cmd": "cmd",
    "json": "json", "jsonc": "jsonc", "yaml": "yaml", "yml": "yml",
    "toml": "toml", "xml": "xml", "csv": "csv", "ini": "ini",
    "cfg": "cfg", "conf": "conf", "env": "env", "dotenv": "env",
    "properties": "properties", "sql": "sql", "mysql": "sql",
    "postgresql": "sql", "sqlite": "sql", "graphql": "graphql",
    "gql": "graphql", "markdown": "md", "md": "md", "rst": "rst",
    "tex": "tex", "latex": "tex", "dart": "dart", "flutter": "dart",
    "haskell": "hs", "erlang": "erl", "elixir": "ex", "ex": "ex",
    "exs": "exs", "clojure": "clj", "scala": "scala", "lua": "lua",
    "perl": "pl", "r": "r", "julia": "jl", "nim": "nim", "zig": "zig",
    "vue": "vue", "svelte": "svelte", "astro": "astro",
    "dockerfile": "dockerfile", "makefile": "makefile",
    "terraform": "tf", "tf": "tf", "hcl": "hcl", "solidity": "sol",
    "sol": "sol", "proto": "proto", "protobuf": "proto",
    "gdscript": "gd", "gd": "gd", "txt": "txt", "text": "txt",
    "plain": "txt",
}

# ================================================================
#  حالة المستخدمين
# ================================================================
user_state = {}
state_lock = threading.Lock()

def get_user(uid):
    with state_lock:
        if uid not in user_state:
            user_state[uid] = {
                "model"       : None,
                "history"     : deque(maxlen=MAX_HISTORY * 2),
                "lock"        : threading.Lock(),
                "total_msgs"  : 0,
                "total_files" : 0,
                "fusion_runs" : 0,
                "joined_at"   : time.time(),
            }
        return user_state[uid]

# ================================================================
#  البوت
# ================================================================
bot = telebot.TeleBot(BOT_TOKEN, parse_mode=None)
_last_edit      = {}
_last_edit_lock = threading.Lock()

def safe_edit(chat_id, msg_id, text):
    key = (chat_id, msg_id)
    now = time.time()
    with _last_edit_lock:
        diff = now - _last_edit.get(key, 0)
        if diff < EDIT_INTERVAL:
            time.sleep(EDIT_INTERVAL - diff)
        _last_edit[key] = time.time()
    try:
        bot.edit_message_text(chat_id=chat_id, message_id=msg_id, text=text)
    except Exception:
        pass

def safe_delete(chat_id, msg_id):
    try:
        bot.delete_message(chat_id, msg_id)
    except Exception:
        pass

def safe_send(chat_id, text):
    try:
        return bot.send_message(chat_id, text)
    except Exception:
        return None

# ================================================================
#  ضغط الـ history
# ================================================================
def _compress_msg(text, max_code_lines, max_chars):
    def repl(m):
        lang  = m.group(1) or "code"
        lines = m.group(2).splitlines()
        if len(lines) > max_code_lines:
            preview = "\n".join(lines[:max_code_lines])
            return f"```{lang}\n{preview}\n# ... [{len(lines)} سطر]\n```"
        return m.group(0)
    c = re.sub(r"```(\w[\w+\-#.]*)?[ \t]*\n(.*?)```", repl, text, flags=re.DOTALL)
    if len(c) > max_chars:
        c = c[:max_chars] + "…"
    return c

def compress_history(history_deque):
    messages = list(history_deque)
    total    = sum(len(m["content"]) for m in messages)
    if total <= HISTORY_SAFE_LIMIT:
        ml, mc = HISTORY_CODE_MAX_LINES, HISTORY_MSG_MAX_CHARS
    else:
        messages = ([messages[0]] + messages[-5:]) if len(messages) > 6 else messages
        ml, mc   = 4, 350
    return [{"role": m["role"], "content": _compress_msg(m["content"], ml, mc)} for m in messages]

# ================================================================
#  استدعاء API — نموذج واحد، رد كامل
# ================================================================
def call_model_full(model_key, messages, timeout=None):
    """
    يستدعي نموذجاً ويُعيد الرد الكامل كنص.
    لا يبث — يُكمل ثم يُعيد.
    """
    t = timeout or BASE_TIMEOUT
    payload = {
        "action"       : "query",
        "aiKey"        : model_key,
        "messages"     : messages,
        "uid"          : "4jSInMiuGVhhgdKwhnCHjlF3nau1",
        "email"        : "redfoxdevemail7@gmail.com",
        "useSearch"    : False,
        "skipDeduction": True,
    }
    result = ""
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            resp = requests.post(
                API_URL, headers=HEADERS,
                data=json.dumps(payload),
                stream=True, timeout=t + (attempt - 1) * 30,
            )
            for line in resp.iter_lines():
                if not line:
                    continue
                decoded = line.decode("utf-8")
                if not decoded.startswith("data: "):
                    continue
                raw = decoded[6:]
                if "[DONE]" in raw:
                    break
                try:
                    chunk = json.loads(raw)["choices"][0]["delta"].get("content", "")
                    if chunk:
                        result += chunk
                except Exception:
                    continue
            if result.strip():
                return result
        except Exception:
            pass
        if attempt < MAX_RETRIES:
            time.sleep(attempt * 2.0)
    return result or "[فشل الاستدعاء]"

# ================================================================
#  البث المباشر (للمحادثة العادية)
# ================================================================
def stream_model(model_key, messages):
    payload = {
        "action"       : "query",
        "aiKey"        : model_key,
        "messages"     : messages,
        "uid"          : "4jSInMiuGVhhgdKwhnCHjlF3nau1",
        "email"        : "redfoxdevemail7@gmail.com",
        "useSearch"    : False,
        "skipDeduction": True,
    }
    got = False
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            resp = requests.post(
                API_URL, headers=HEADERS,
                data=json.dumps(payload),
                stream=True, timeout=BASE_TIMEOUT + (attempt - 1) * 30,
            )
            for line in resp.iter_lines():
                if not line:
                    continue
                decoded = line.decode("utf-8")
                if not decoded.startswith("data: "):
                    continue
                raw = decoded[6:]
                if "[DONE]" in raw:
                    return
                try:
                    chunk = json.loads(raw)["choices"][0]["delta"].get("content", "")
                    if chunk:
                        got = True
                        yield chunk
                except Exception:
                    continue
            if got:
                return
        except Exception as e:
            pass
        if attempt < MAX_RETRIES:
            time.sleep(attempt * 2.0)
    if not got:
        yield "⚠️ تعذّر الاتصال. حاول مرة أخرى أو غيّر النموذج."

# ================================================================
#  رسالة الانتظار المتحركة مع نص
# ================================================================
class StatusMessage:
    """رسالة حالة تُحدَّث لعرض تقدم FUSION ENGINE"""
    def __init__(self, chat_id):
        self.chat_id  = chat_id
        self.msg_id   = None
        self._lock    = threading.Lock()
        self._running = False
        self._dot_t   = None
        self._frame   = 0
        self._base    = ""

    def start(self, text):
        msg = safe_send(self.chat_id, text)
        if msg:
            self.msg_id   = msg.message_id
            self._base    = text
            self._running = True
            self._dot_t   = threading.Thread(target=self._animate, daemon=True)
            self._dot_t.start()

    def update(self, text):
        self._base = text
        with self._lock:
            if self.msg_id:
                try:
                    bot.edit_message_text(
                        chat_id    = self.chat_id,
                        message_id = self.msg_id,
                        text       = text,
                    )
                except Exception:
                    pass

    def _animate(self):
        frames = DOT_FRAMES
        while self._running:
            time.sleep(DOT_INTERVAL)
            if not self._running:
                break
            dot = frames[self._frame % len(frames)]
            self._frame += 1
            with self._lock:
                if self.msg_id:
                    try:
                        bot.edit_message_text(
                            chat_id    = self.chat_id,
                            message_id = self.msg_id,
                            text       = self._base + "  " + dot,
                        )
                    except Exception:
                        pass

    def stop_animate(self):
        self._running = False
        if self._dot_t:
            self._dot_t.join(timeout=1.2)

    def delete(self):
        self.stop_animate()
        if self.msg_id:
            safe_delete(self.chat_id, self.msg_id)
            self.msg_id = None

# ================================================================
#  ✅ FUSION ENGINE — المحرك المركزي
# ================================================================

def fusion_engine(user_request, history_context, chat_id, status_msg):
    """
    يُشغّل الـ pipeline الكامل ويُعيد:
      final_code  : str  — الكود النهائي المحسَّن
      explanation : str  — شرح بسيط
      suggestions : str  — اقتراحات (اختياري)
      pipeline_log: list — سجل كل مرحلة
    """
    log = []

    # ── سياق المحادثة السابقة ────────────────────────────────
    ctx = ""
    if history_context:
        ctx = "سياق المحادثة السابقة:\n"
        for m in history_context[-4:]:
            role = "المستخدم" if m["role"] == "user" else "المساعد"
            snippet = m["content"][:300]
            ctx += f"[{role}]: {snippet}\n"
        ctx += "\n"

    # ╔══════════════════════════════════════════════════════════╗
    # ║  المرحلة 1 — التخطيط (grok-4.1-fast-reasoning)          ║
    # ╚══════════════════════════════════════════════════════════╝
    status_msg.update(
        "🔮 FUSION ENGINE يعمل...\n\n"
        "━━━━━━━━━━━━━━━━━━━━━\n"
        "📋 المرحلة 1/6 — التخطيط\n"
        f"   🚀 {ALL_MODELS['grok-4.1-fast-reasoning']}\n"
        "━━━━━━━━━━━━━━━━━━━━━"
    )

    plan_prompt = (
        f"{ctx}"
        f"الطلب: {user_request}\n\n"
        "أنت مخطط خبير. حلل الطلب وأنتج خطة تقنية مختصرة تشمل:\n"
        "1. اللغة/الإطار المناسب\n"
        "2. الهيكل العام للكود (مكونات/دوال رئيسية)\n"
        "3. المتطلبات والمكتبات\n"
        "4. نقاط الحذر والتحديات\n"
        "أجب بشكل منظم ومختصر (بدون كود)."
    )
    plan = call_model_full(
        FUSION_PIPELINE["planner"],
        [{"role": "user", "content": plan_prompt}],
        timeout=60,
    )
    log.append(("📋 التخطيط", FUSION_PIPELINE["planner"], plan[:200]))

    # ╔══════════════════════════════════════════════════════════╗
    # ║  المرحلة 2 — الكتابة (deepseek-v3.2)                    ║
    # ╚══════════════════════════════════════════════════════════╝
    status_msg.update(
        "🔮 FUSION ENGINE يعمل...\n\n"
        "━━━━━━━━━━━━━━━━━━━━━\n"
        "✅ المرحلة 1 — التخطيط: اكتملت\n"
        "✍️ المرحلة 2/6 — الكتابة\n"
        f"   ⚡ {ALL_MODELS['deepseek-v3.2']}\n"
        "━━━━━━━━━━━━━━━━━━━━━"
    )

    write_prompt = (
        f"{ctx}"
        f"الطلب الأصلي: {user_request}\n\n"
        f"الخطة التقنية المعتمدة:\n{plan}\n\n"
        "أنت مبرمج خبير محترف. اكتب الكود الكامل بناءً على الخطة أعلاه.\n"
        "متطلبات صارمة:\n"
        "• الكود كامل 100% — لا اختصارات ولا '...' ولا تعليقات مكان الكود\n"
        "• معالجة الأخطاء شاملة\n"
        "• تعليقات توضيحية مفيدة\n"
        "• أفضل الممارسات والمعايير الاحترافية\n"
        "• الكود جاهز للتشغيل الفوري\n"
        "ضع الكود داخل ```language\\n...``` فقط."
    )
    raw_code = call_model_full(
        FUSION_PIPELINE["writer"],
        [{"role": "user", "content": write_prompt}],
        timeout=150,
    )
    log.append(("✍️ الكتابة", FUSION_PIPELINE["writer"], "تم"))

    # ╔══════════════════════════════════════════════════════════╗
    # ║  المرحلة 3 — المراجعة المتوازية (3 نماذج)               ║
    # ╚══════════════════════════════════════════════════════════╝
    status_msg.update(
        "🔮 FUSION ENGINE يعمل...\n\n"
        "━━━━━━━━━━━━━━━━━━━━━\n"
        "✅ المرحلة 1 — التخطيط: اكتملت\n"
        "✅ المرحلة 2 — الكتابة: اكتملت\n"
        "🔍 المرحلة 3/6 — المراجعة المتوازية\n"
        f"   🧬 {ALL_MODELS['grok-4.2-reasoning']}\n"
        f"   🎭 {ALL_MODELS['claude-opus-4.6']}\n"
        f"   🔬 {ALL_MODELS['qwen-3-235b']}\n"
        "━━━━━━━━━━━━━━━━━━━━━"
    )

    review_prompt_template = (
        f"الطلب الأصلي: {user_request}\n\n"
        f"الكود المكتوب:\n{raw_code}\n\n"
        "أنت مراجع كود خبير. راجع الكود بدقة وأبلّغ عن:\n"
        "1. الأخطاء المنطقية والبرمجية\n"
        "2. مشاكل الأمان (SQL injection, XSS, إلخ)\n"
        "3. مشاكل الأداء\n"
        "4. الكود الناقص أو غير المكتمل\n"
        "5. أخطاء الصياغة والبنية\n"
        "قدّم ملاحظاتك كقائمة مرقمة واضحة. إذا لم يوجد خطأ قل 'الكود سليم'."
    )

    reviews     = ["", "", ""]
    rev_models  = ["reviewer_1", "reviewer_2", "reviewer_3"]
    rev_threads = []

    def do_review(idx, model_key):
        reviews[idx] = call_model_full(
            FUSION_PIPELINE[model_key],
            [{"role": "user", "content": review_prompt_template}],
            timeout=90,
        )

    for i, mk in enumerate(rev_models):
        t = threading.Thread(target=do_review, args=(i, mk), daemon=True)
        rev_threads.append(t)
        t.start()

    for t in rev_threads:
        t.join(timeout=100)

    combined_reviews = (
        f"مراجعة {ALL_MODELS[FUSION_PIPELINE['reviewer_1']]}:\n{reviews[0]}\n\n"
        f"مراجعة {ALL_MODELS[FUSION_PIPELINE['reviewer_2']]}:\n{reviews[1]}\n\n"
        f"مراجعة {ALL_MODELS[FUSION_PIPELINE['reviewer_3']]}:\n{reviews[2]}"
    )
    log.append(("🔍 المراجعة", "3 نماذج", "تمت"))

    # ╔══════════════════════════════════════════════════════════╗
    # ║  المرحلة 4 — التصحيح (deepseek-r1)                      ║
    # ╚══════════════════════════════════════════════════════════╝
    status_msg.update(
        "🔮 FUSION ENGINE يعمل...\n\n"
        "━━━━━━━━━━━━━━━━━━━━━\n"
        "✅ المرحلة 1 — التخطيط: اكتملت\n"
        "✅ المرحلة 2 — الكتابة: اكتملت\n"
        "✅ المرحلة 3 — المراجعة: اكتملت\n"
        "🔧 المرحلة 4/6 — التصحيح\n"
        f"   🧠 {ALL_MODELS['deepseek-r1']}\n"
        "━━━━━━━━━━━━━━━━━━━━━"
    )

    fix_prompt = (
        f"الطلب الأصلي: {user_request}\n\n"
        f"الكود الحالي:\n{raw_code}\n\n"
        f"ملاحظات المراجعين الثلاثة:\n{combined_reviews}\n\n"
        "أنت مصحح كود خبير. طبّق جميع التصحيحات اللازمة بناءً على ملاحظات المراجعين.\n"
        "متطلبات صارمة:\n"
        "• أعد كتابة الكود الكامل بعد التصحيح\n"
        "• لا تترك أي خطأ مذكور في المراجعات\n"
        "• الكود يجب أن يكون مكتملاً 100% وجاهزاً للتشغيل\n"
        "ضع الكود فقط داخل ```language\\n...```"
    )
    fixed_code = call_model_full(
        FUSION_PIPELINE["fixer"],
        [{"role": "user", "content": fix_prompt}],
        timeout=150,
    )
    log.append(("🔧 التصحيح", FUSION_PIPELINE["fixer"], "تم"))

    # ╔══════════════════════════════════════════════════════════╗
    # ║  المرحلة 5 — التحسين (kimi-k2)                          ║
    # ╚══════════════════════════════════════════════════════════╝
    status_msg.update(
        "🔮 FUSION ENGINE يعمل...\n\n"
        "━━━━━━━━━━━━━━━━━━━━━\n"
        "✅ المرحلة 1 — التخطيط: اكتملت\n"
        "✅ المرحلة 2 — الكتابة: اكتملت\n"
        "✅ المرحلة 3 — المراجعة: اكتملت\n"
        "✅ المرحلة 4 — التصحيح: اكتمل\n"
        "✨ المرحلة 5/6 — التحسين\n"
        f"   🌙 {ALL_MODELS['kimi-k2']}\n"
        "━━━━━━━━━━━━━━━━━━━━━"
    )

    optimize_prompt = (
        f"الطلب الأصلي: {user_request}\n\n"
        f"الكود المصحح:\n{fixed_code}\n\n"
        "أنت خبير تحسين كود. حسّن الكود من حيث:\n"
        "1. الأداء والكفاءة (تعقيد الخوارزميات، استهلاك الذاكرة)\n"
        "2. قابلية القراءة والصيانة\n"
        "3. أنماط التصميم المناسبة\n"
        "4. إعادة استخدام الكود (DRY principle)\n"
        "5. تجربة المستخدم إذا انطبق\n"
        "أعد الكود الكامل المحسَّن داخل ```language\\n...``` فقط."
    )
    optimized_code = call_model_full(
        FUSION_PIPELINE["optimizer"],
        [{"role": "user", "content": optimize_prompt}],
        timeout=150,
    )
    log.append(("✨ التحسين", FUSION_PIPELINE["optimizer"], "تم"))

    # ╔══════════════════════════════════════════════════════════╗
    # ║  المرحلة 6 — التوثيق (claude-sonnet-4.6)                ║
    # ╚══════════════════════════════════════════════════════════╝
    status_msg.update(
        "🔮 FUSION ENGINE يعمل...\n\n"
        "━━━━━━━━━━━━━━━━━━━━━\n"
        "✅ المرحلة 1 — التخطيط: اكتملت\n"
        "✅ المرحلة 2 — الكتابة: اكتملت\n"
        "✅ المرحلة 3 — المراجعة: اكتملت\n"
        "✅ المرحلة 4 — التصحيح: اكتمل\n"
        "✅ المرحلة 5 — التحسين: اكتمل\n"
        "📝 المرحلة 6/6 — التوثيق\n"
        f"   🎵 {ALL_MODELS['claude-sonnet-4.6']}\n"
        "━━━━━━━━━━━━━━━━━━━━━"
    )

    doc_prompt = (
        f"الطلب الأصلي: {user_request}\n\n"
        f"الكود النهائي:\n{optimized_code}\n\n"
        "أنت كاتب توثيق تقني. اكتب باختصار ووضوح:\n\n"
        "## شرح سريع\n"
        "(3-5 جمل تشرح ما يفعله الكود)\n\n"
        "## كيفية الاستخدام\n"
        "(خطوات التشغيل أو الاستدعاء)\n\n"
        "## اقتراحات للتطوير (اختياري)\n"
        "(2-4 أفكار لتحسين أو توسيع الكود مستقبلاً)\n\n"
        "اكتب بالعربي بأسلوب واضح ومختصر."
    )
    documentation = call_model_full(
        FUSION_PIPELINE["doc_writer"],
        [{"role": "user", "content": doc_prompt}],
        timeout=60,
    )
    log.append(("📝 التوثيق", FUSION_PIPELINE["doc_writer"], "تم"))

    # الكود النهائي هو المحسَّن (أو المصحح إن فشل التحسين)
    final = optimized_code if optimized_code.strip() and optimized_code != "[فشل الاستدعاء]" else fixed_code
    if not final.strip() or final == "[فشل الاستدعاء]":
        final = raw_code

    return final, documentation, log

# ================================================================
#  استخراج الكود من النص
# ================================================================
def extract_code_blocks(text):
    pattern = re.compile(r"```(\w[\w+\-#.]*)?[ \t]*\n(.*?)```", re.DOTALL)
    grouped = {}
    order   = []
    for m in pattern.finditer(text):
        lang = (m.group(1) or "txt").lower().strip()
        code = m.group(2)
        if lang not in grouped:
            grouped[lang] = []
            order.append(lang)
        grouped[lang].append(code)

    blocks = []
    for lang in order:
        merged = "\n\n".join(p.rstrip() for p in grouped[lang])
        ext    = CODE_EXT.get(lang, lang[:10] if len(lang) <= 10 else "txt")
        blocks.append({
            "lang" : lang,
            "ext"  : ext,
            "code" : merged,
            "lines": merged.count("\n") + 1,
            "chars": len(merged),
        })
    return blocks

def should_send_as_file(block):
    return (
        block["lines"] >= FILE_LINE_THRESHOLD or
        block["chars"] >= FILE_CHAR_THRESHOLD
    )

# ================================================================
#  فحص الكود العميق
# ================================================================
def verify_code(lang, code):
    issues   = []
    warnings = []
    stripped = code.strip()

    if not stripped:
        return False, "الكود فارغ"

    if lang in ("python", "py"):
        try:
            ast.parse(code)
        except SyntaxError as e:
            issues.append(f"خطأ بناء سطر {e.lineno}: {e.msg}")

    stack   = []
    pairs   = {")": "(", "]": "[", "}": "{"}
    openers = set("([{")
    in_dq   = in_sq = False
    for i, c in enumerate(code):
        if c == '"' and not in_sq:
            in_dq = not in_dq
        elif c == "'" and not in_dq:
            in_sq = not in_sq
        elif not in_dq and not in_sq:
            if c in openers:
                stack.append(c)
            elif c in pairs:
                if not stack or stack[-1] != pairs[c]:
                    issues.append(f"قوس غير مغلق '{c}' ~حرف {i}")
                    break
                stack.pop()
    if stack:
        warnings.append("أقواس لم تُغلق: " + str(stack))

    last = stripped.splitlines()[-1].strip()
    if any([last.endswith("..."), last == "...",
            last.endswith("# ..."), last.endswith("// ..."),
            re.search(r"\[truncated\]", code, re.I)]):
        warnings.append("يبدو الكود مقتطعاً")

    passed = len(issues) == 0
    parts  = []
    if issues:
        parts.append("❌ مشاكل: " + " | ".join(issues))
    if warnings:
        parts.append("⚠️ تحذير: " + " | ".join(warnings))
    if not parts:
        parts.append("✅ الكود سليم")
    return passed, " | ".join(parts)

# ================================================================
#  إرسال الملف النهائي مع الشرح
# ================================================================
def send_fusion_file(chat_id, block, documentation, pipeline_log, elapsed):
    lang  = block["lang"]
    ext   = block["ext"]
    code  = block["code"]

    passed, report = verify_code(lang, code)
    v_icon = "✅" if passed else "⚠️"

    fname = f"redfox_fusion.{ext}"

    # ملخص النماذج المستخدمة
    models_used = (
        f"🚀 {ALL_MODELS[FUSION_PIPELINE['planner']]}\n"
        f"✍️ {ALL_MODELS[FUSION_PIPELINE['writer']]}\n"
        f"🔍 {ALL_MODELS[FUSION_PIPELINE['reviewer_1']]} + "
        f"{ALL_MODELS[FUSION_PIPELINE['reviewer_2']]} + "
        f"{ALL_MODELS[FUSION_PIPELINE['reviewer_3']]}\n"
        f"🔧 {ALL_MODELS[FUSION_PIPELINE['fixer']]}\n"
        f"✨ {ALL_MODELS[FUSION_PIPELINE['optimizer']]}\n"
        f"📝 {ALL_MODELS[FUSION_PIPELINE['doc_writer']]}"
    )

    caption = (
        f"🦊 RedFox FUSION ENGINE\n"
        f"{'━' * 28}\n"
        f"📄 {fname}\n"
        f"🔤 اللغة   : {lang}\n"
        f"📏 الأسطر  : {block['lines']} | الحروف: {block['chars']}\n"
        f"{v_icon} الفحص   : {report}\n"
        f"⏱ الوقت   : {elapsed}ث\n"
        f"{'━' * 28}\n"
        f"🤖 النماذج المستخدمة (6 مراحل):\n"
        f"{models_used}"
    )

    tmp_path = None
    try:
        with tempfile.NamedTemporaryFile(
            mode="w", suffix="." + ext,
            prefix="fusion_", delete=False, encoding="utf-8",
        ) as f:
            f.write(code)
            tmp_path = f.name

        with open(tmp_path, "rb") as fh:
            bot.send_document(chat_id, fh, visible_file_name=fname, caption=caption)
        return True
    except Exception as e:
        safe_send(chat_id, f"❌ خطأ في إرسال الملف: {e}")
        return False
    finally:
        if tmp_path:
            try:
                os.remove(tmp_path)
            except Exception:
                pass

# ================================================================
#  إرسال الشرح والاقتراحات
# ================================================================
def send_documentation(chat_id, documentation):
    if not documentation or not documentation.strip():
        return
    text = "📖 الشرح والاقتراحات\n" + "━" * 28 + "\n" + documentation.strip()
    # إذا كان الشرح طويلاً → قصّه
    if len(text) > 4096:
        text = text[:4050] + "\n…(مختصر)"
    safe_send(chat_id, text)

# ================================================================
#  معالج الرسائل الرئيسي
# ================================================================
def handle_message_thread(message):
    uid  = message.from_user.id
    chat = message.chat.id
    user = get_user(uid)

    if not user["lock"].acquire(blocking=False):
        safe_send(chat, "⏳ رسالتك السابقة لا تزال قيد المعالجة...")
        return

    try:
        model_key = user["model"] or FUSION_PIPELINE["chat"]
        user["history"].append({"role": "user", "content": message.text})
        user["total_msgs"] += 1

        compressed = compress_history(user["history"])

        # ── هل هو طلب كود؟ ────────────────────────────────────
        if is_code_request(message.text):
            # ── FUSION ENGINE ──────────────────────────────────
            user["fusion_runs"] += 1
            status = StatusMessage(chat)
            status.start(
                "🔮 FUSION ENGINE يعمل...\n\n"
                "━━━━━━━━━━━━━━━━━━━━━\n"
                "🔄 تهيئة الـ 8 نماذج...\n"
                "━━━━━━━━━━━━━━━━━━━━━"
            )

            start_t = time.time()
            try:
                final_code, documentation, pipeline_log = fusion_engine(
                    user_request    = message.text,
                    history_context = list(user["history"])[:-1],
                    chat_id         = chat,
                    status_msg      = status,
                )
            except Exception as e:
                status.delete()
                safe_send(chat, f"❌ خطأ في FUSION ENGINE: {e}")
                user["history"].pop()
                return

            elapsed = round(time.time() - start_t, 1)

            # تحديث رسالة الحالة: الاكتمال
            status.stop_animate()
            status.update(
                f"✅ FUSION ENGINE اكتمل في {elapsed}ث\n\n"
                "━━━━━━━━━━━━━━━━━━━━━\n"
                "✅ المرحلة 1 — التخطيط\n"
                "✅ المرحلة 2 — الكتابة\n"
                "✅ المرحلة 3 — المراجعة (×3)\n"
                "✅ المرحلة 4 — التصحيح\n"
                "✅ المرحلة 5 — التحسين\n"
                "✅ المرحلة 6 — التوثيق\n"
                "━━━━━━━━━━━━━━━━━━━━━\n"
                "📤 إرسال النتيجة..."
            )

            # استخراج كتل الكود
            blocks       = extract_code_blocks(final_code)
            large_blocks = [b for b in blocks if should_send_as_file(b)]

            if not large_blocks:
                # الكود صغير → أرسله كنص
                display = final_code
                if len(display) > 4096:
                    display = display[:4050] + "\n…"
                status.update(display)
                user["history"].append({
                    "role"   : "assistant",
                    "content": _compress_msg(final_code, HISTORY_CODE_MAX_LINES, HISTORY_MSG_MAX_CHARS),
                })
                if documentation:
                    send_documentation(chat, documentation)
                return

            # أرسل الملفات
            for idx, blk in enumerate(large_blocks, 1):
                ok = send_fusion_file(chat, blk, documentation, pipeline_log, elapsed)
                if ok:
                    user["total_files"] += 1

            # أرسل الشرح منفصلاً
            send_documentation(chat, documentation)

            # احفظ في history (مضغوط)
            user["history"].append({
                "role"   : "assistant",
                "content": _compress_msg(final_code, HISTORY_CODE_MAX_LINES, HISTORY_MSG_MAX_CHARS),
            })

            # احذف رسالة الحالة
            status.delete()

        else:
            # ── محادثة عادية — نموذج واحد سريع ──────────────
            try:
                placeholder = bot.send_message(chat, "⏳")
                msg_id      = placeholder.message_id
            except Exception:
                user["history"].pop()
                return

            accumulated = ""
            last_sent   = ""
            char_buf    = ""
            total_chars = 0

            for chunk in stream_model(model_key, compressed):
                accumulated += chunk
                char_buf    += chunk
                total_chars += len(chunk)
                threshold    = UPDATE_CHARS_FAST if total_chars < 150 else UPDATE_CHARS_NORMAL
                if len(char_buf) >= threshold:
                    display = accumulated[:3900] + "\n…" if len(accumulated) > 3900 else accumulated
                    if display != last_sent:
                        safe_edit(chat, msg_id, display)
                        last_sent = display
                    char_buf = ""

            if not accumulated.strip():
                safe_edit(chat, msg_id, "⚠️ لم يصل رد. حاول مرة أخرى.")
                user["history"].pop()
                return

            final = accumulated.strip()
            if final.count("```") % 2 != 0:
                final += "\n```"

            display_final = final[:4036] + "\n\n…(الكود في الملف)" if len(final) > 4096 else final
            if display_final != last_sent:
                safe_edit(chat, msg_id, display_final)

            # هل يوجد كود كبير في الرد العادي؟
            blocks = [b for b in extract_code_blocks(final) if should_send_as_file(b)]
            if blocks:
                anim_msg = safe_send(chat, "⏳ · · ·")
                for idx, blk in enumerate(blocks, 1):
                    lang  = blk["lang"]
                    ext   = blk["ext"]
                    code  = blk["code"]
                    passed, report = verify_code(lang, code)
                    v_icon = "✅" if passed else "⚠️"
                    fname  = f"redfox_{idx}.{ext}"
                    caption = (
                        f"📄 {fname}\n"
                        f"🔤 اللغة: {lang}\n"
                        f"🤖 النموذج: {ALL_MODELS.get(model_key, model_key)}\n"
                        f"📏 الأسطر: {blk['lines']} | الحروف: {blk['chars']}\n"
                        f"{v_icon} الفحص: {report}"
                    )
                    tmp_path = None
                    try:
                        with tempfile.NamedTemporaryFile(
                            mode="w", suffix="." + ext,
                            prefix=f"rf{idx}_", delete=False, encoding="utf-8",
                        ) as f:
                            f.write(code)
                            tmp_path = f.name
                        with open(tmp_path, "rb") as fh:
                            bot.send_document(chat, fh, visible_file_name=fname, caption=caption)
                        user["total_files"] += 1
                    except Exception as e:
                        safe_send(chat, f"❌ خطأ في إرسال {fname}: {e}")
                    finally:
                        if tmp_path:
                            try:
                                os.remove(tmp_path)
                            except Exception:
                                pass
                if anim_msg:
                    safe_delete(chat, anim_msg.message_id)

            user["history"].append({
                "role"   : "assistant",
                "content": _compress_msg(final, HISTORY_CODE_MAX_LINES, HISTORY_MSG_MAX_CHARS),
            })

    except Exception as e:
        safe_send(chat, f"❌ خطأ غير متوقع: {e}")
    finally:
        user["lock"].release()

# ================================================================
#  لوحة المفاتيح
# ================================================================
def models_keyboard():
    kb = InlineKeyboardMarkup(row_width=2)
    kb.add(*[
        InlineKeyboardButton(text=label, callback_data="model:" + key)
        for key, label in ALL_MODELS.items()
    ])
    # زر وضع FUSION
    kb.add(InlineKeyboardButton(
        text="🔮 وضع FUSION (تلقائي للكود)",
        callback_data="model:fusion"
    ))
    return kb

# ================================================================
#  الأوامر
# ================================================================
@bot.message_handler(commands=["start"])
def cmd_start(message):
    uid  = message.from_user.id
    name = message.from_user.first_name or "صديقي"
    get_user(uid)
    bot.send_message(
        message.chat.id,
        f"👋 أهلاً {name}!\n\n"
        f"🦊 RedFox AI — FUSION ENGINE\n"
        f"━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n"
        f"🔮 عند طلب أي كود أو ملف:\n"
        f"كل النماذج الـ{len(ALL_MODELS)} تعمل معاً في 6 مراحل:\n\n"
        f"  📋 1. التخطيط    — فهم الطلب\n"
        f"  ✍️ 2. الكتابة    — كود كامل\n"
        f"  🔍 3. المراجعة   — 3 نماذج متوازية\n"
        f"  🔧 4. التصحيح   — تطبيق الإصلاحات\n"
        f"  ✨ 5. التحسين    — أداء وجودة\n"
        f"  📝 6. التوثيق   — شرح واقتراحات\n\n"
        f"💬 للمحادثة العادية: نموذج واحد سريع\n\n"
        f"👇 اختر نموذجاً للمحادثة العادية:",
        reply_markup=models_keyboard()
    )

@bot.message_handler(commands=["model", "models", "نموذج", "نماذج"])
def cmd_model(message):
    bot.send_message(
        message.chat.id,
        "🤖 اختر نموذج المحادثة العادية:\n"
        "(الكود يستخدم FUSION ENGINE تلقائياً)",
        reply_markup=models_keyboard()
    )

@bot.message_handler(commands=["clear", "reset", "مسح", "جديد"])
def cmd_clear(message):
    user = get_user(message.from_user.id)
    user["history"].clear()
    bot.send_message(message.chat.id, "🗑 تم مسح المحادثة. بداية جديدة! 🚀")

@bot.message_handler(commands=["status", "حالة"])
def cmd_status(message):
    uid  = message.from_user.id
    user = get_user(uid)
    mkey = user["model"]
    mname = ALL_MODELS.get(mkey, "تلقائي") if mkey else "تلقائي"
    turns = len(user["history"]) // 2
    history_size = sum(len(m["content"]) for m in user["history"])
    elapsed_sec = int(time.time() - user["joined_at"])
    hours, rem  = divmod(elapsed_sec, 3600)
    mins, secs  = divmod(rem, 60)
    duration    = f"{hours}س {mins}د" if hours else f"{mins}د {secs}ث"

    bot.send_message(
        message.chat.id,
        f"📊 إحصائيات جلستك\n\n"
        f"🤖 النموذج       : {mname}\n"
        f"🔮 تشغيل FUSION  : {user['fusion_runs']}\n"
        f"💬 المحادثات     : {turns}/{MAX_HISTORY}\n"
        f"📦 حجم السياق    : {history_size} حرف\n"
        f"📝 إجمالي رسائل  : {user['total_msgs']}\n"
        f"📁 ملفات مُرسلة  : {user['total_files']}\n"
        f"⏱ مدة الجلسة    : {duration}\n"
        f"🆔 معرفك         : {uid}"
    )

@bot.message_handler(commands=["help", "مساعدة"])
def cmd_help(message):
    bot.send_message(
        message.chat.id,
        "📖 قائمة الأوامر\n\n"
        "/start    — ترحيب وشرح FUSION ENGINE\n"
        "/model    — اختيار نموذج المحادثة\n"
        "/clear    — مسح سجل المحادثة\n"
        "/status   — إحصائيات جلستك\n"
        "/help     — هذه القائمة\n\n"
        "🔮 FUSION ENGINE يُفعَّل تلقائياً عند:\n"
        "• طلب كتابة كود أو ملف\n"
        "• طلب إنشاء تطبيق أو موقع\n"
        "• طلب دالة أو خوارزمية\n"
        "• طلب تعديل أو تحسين كود\n\n"
        "💡 للمحادثة العادية: يُستخدم النموذج المختار"
    )

@bot.callback_query_handler(func=lambda c: c.data.startswith("model:"))
def callback_model(call):
    uid       = call.from_user.id
    model_key = call.data.split(":", 1)[1]
    user      = get_user(uid)

    if model_key == "fusion":
        user["model"] = None
        try:
            bot.edit_message_text(
                chat_id    = call.message.chat.id,
                message_id = call.message.message_id,
                text=(
                    "✅ وضع FUSION محدد\n\n"
                    "🔮 كل طلبات الكود → FUSION ENGINE (8 نماذج)\n"
                    "💬 المحادثة العادية → نموذج سريع تلقائياً\n\n"
                    "أرسل طلبك الآن! 🚀"
                )
            )
        except Exception:
            pass
        bot.answer_callback_query(call.id, "✅ وضع FUSION")
        return

    if model_key not in ALL_MODELS:
        bot.answer_callback_query(call.id, "❌ نموذج غير معروف")
        return

    user["model"] = model_key
    mname = ALL_MODELS[model_key]
    try:
        bot.edit_message_text(
            chat_id    = call.message.chat.id,
            message_id = call.message.message_id,
            text=(
                f"✅ تم اختيار: {mname}\n\n"
                f"💬 المحادثة العادية → {mname}\n"
                f"🔮 الكود والملفات → FUSION ENGINE دائماً\n\n"
                f"أرسل رسالتك الآن! 🚀"
            )
        )
    except Exception:
        pass
    bot.answer_callback_query(call.id, "✅ " + mname)

@bot.message_handler(func=lambda m: True, content_types=["text"])
def on_message(message):
    uid  = message.from_user.id
    chat = message.chat.id
    user = get_user(uid)
    if not user["model"] and not is_code_request(message.text):
        # أول رسالة بدون نموذج وليست طلب كود
        user["model"] = FUSION_PIPELINE["chat"]
    threading.Thread(
        target=handle_message_thread,
        args=(message,),
        daemon=True
    ).start()

# ================================================================
#  نقطة الانطلاق
# ================================================================
if __name__ == "__main__":
    print("=" * 58)
    print("  🦊 RedFox AI Bot — FUSION ENGINE v6")
    print("=" * 58)
    print(f"  النماذج الكلية   : {len(ALL_MODELS)}")
    print(f"  نماذج FUSION     : 8 (6 مراحل)")
    print(f"  الامتدادات       : {len(CODE_EXT)}")
    print(f"  الذاكرة          : {MAX_HISTORY} رسالة/مستخدم")
    print(f"  الملف إذا        : >={FILE_LINE_THRESHOLD}سطر أو >={FILE_CHAR_THRESHOLD}حرف")
    print("=" * 58)
    print("  Pipeline:")
    for role, mk in FUSION_PIPELINE.items():
        print(f"    {role:15}: {ALL_MODELS.get(mk, mk)}")
    print("=" * 58)

    while True:
        try:
            bot.infinity_polling(timeout=30, long_polling_timeout=25)
        except Exception as e:
            print(f"[خطأ] {e} — إعادة المحاولة بعد 5 ثوانٍ...")
            time.sleep(5)