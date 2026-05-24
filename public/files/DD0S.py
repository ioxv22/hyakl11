import telebot
from telebot import types
import time

BOT_TOKEN = "8765596369:AAFTXvMXXApWBD4tHOOGcxgDtNaApkoBpfk"

bot = telebot.TeleBot(BOT_TOKEN)

ADMINS = [7766254571, 7590748974, 8245306814, 7104296944]

CHANNELS = [
    ("ROSKE MAP 📍", "https://t.me/ROSKE_NET", "ROSKE_NET"),
    ("ROSKE NET DATA 🌐", "https://t.me/HH3Q1", "HH3Q1"),
    ("T~ ROSKE NET 👤", "https://t.me/AQQAS6", "AQQAS6")
]

users = {}
blocked = {}

def check_sub(uid):
    try:
        for name, link, ch in CHANNELS:
            s = bot.get_chat_member(f"@{ch}", uid).status
            if s not in ["member", "administrator", "creator"]:
                return False
        return True
    except:
        return False

def add_user(user):
    uid = user.id
    if uid not in users:
        users[uid] = {
            "user": user.username,
            "name": user.first_name,
            "last": int(time.time())
        }

def main_menu(uid):
    kb = types.InlineKeyboardMarkup(row_width=2)
    kb.add(
        types.InlineKeyboardButton("G0 !", callback_data="go"),
        types.InlineKeyboardButton("Info", callback_data="info")
    )
    if uid in ADMINS:
        kb.add(types.InlineKeyboardButton("Admin", callback_data="admin"))
    return kb

def sub_menu():
    kb = types.InlineKeyboardMarkup()
    for name, link, ch in CHANNELS:
        kb.add(types.InlineKeyboardButton(name, url=link))
    kb.add(types.InlineKeyboardButton("Check", callback_data="checksub"))
    return kb

@bot.message_handler(commands=["start"])
def start(m):
    try:
        uid = m.from_user.id

        if uid in blocked:
            return

        if not check_sub(uid):
            with open("sub.gif","rb") as g:
                bot.send_animation(m.chat.id,g,reply_markup=sub_menu())
            return

        add_user(m.from_user)

        with open("start.gif","rb") as g:
            bot.send_animation(
                m.chat.id,
                g,
                caption="Welcome",
                reply_markup=main_menu(uid)
            )
    except:
        pass

@bot.callback_query_handler(func=lambda c: True)
def cb(c):
    try:
        uid = c.from_user.id

        if uid in blocked:
            return

        if c.data == "checksub":
            if check_sub(uid):
                add_user(c.from_user)
                with open("start.gif","rb") as g:
                    bot.edit_message_media(
                        telebot.types.InputMediaAnimation(g),
                        c.message.chat.id,
                        c.message.message_id
                    )
                bot.edit_message_caption(
                    "Welcome",
                    c.message.chat.id,
                    c.message.message_id,
                    reply_markup=main_menu(uid)
                )
            return

        if c.data == "go":
            with open("G0.gif","rb") as g:
                bot.edit_message_media(
                    telebot.types.InputMediaAnimation(g),
                    c.message.chat.id,
                    c.message.message_id
                )
            kb = types.InlineKeyboardMarkup()
            kb.add(types.InlineKeyboardButton("Back",callback_data="back"))
            bot.edit_message_caption(
                "S3nt ŲRL",
                c.message.chat.id,
                c.message.message_id,
                reply_markup=kb
            )

        elif c.data == "info":
            kb = types.InlineKeyboardMarkup()
            kb.add(types.InlineKeyboardButton("What Does This T00L Do ?",callback_data="i1"))
            kb.add(types.InlineKeyboardButton("Powered By: ?",callback_data="i2"))
            kb.add(types.InlineKeyboardButton("Back",callback_data="back"))

            bot.edit_message_caption(
                "All Info 4 This T00L",
                c.message.chat.id,
                c.message.message_id,
                reply_markup=kb
            )

        elif c.data == "i1":
            bot.answer_callback_query(
                c.id,
                "1t Dr0ps A S1te Us1ng Mult1ple 1nf3ct3d Dev1c3s",
                show_alert=True
            )

        elif c.data == "i2":
            bot.answer_callback_query(
                c.id,
                "Rider : @I0_FI\nLock : @Lo_0ck\nDiv : @AQAA7",
                show_alert=True
            )

        elif c.data == "admin" and uid in ADMINS:
            kb = types.InlineKeyboardMarkup()
            kb.add(types.InlineKeyboardButton("Active Users",callback_data="a_users"))
            kb.add(types.InlineKeyboardButton("Blocked Users",callback_data="b_users"))

            bot.edit_message_caption(
                "Admin Panel",
                c.message.chat.id,
                c.message.message_id,
                reply_markup=kb
            )

        elif c.data == "a_users" and uid in ADMINS:
            text = f"Active Users : {len(users)}\n\n"
            for i in users:
                u = users[i]
                text += f"@{u['user']} | `{i}` | {u['last']}\n"
            bot.send_message(c.message.chat.id,text,parse_mode="Markdown")

        elif c.data == "b_users" and uid in ADMINS:
            text = "Blocked Users\n\n"
            for i in blocked:
                b = blocked[i]
                text += f"{b['user']} | `{i}` | {b['reason']} | By: @{b['by']}\n"
            bot.send_message(c.message.chat.id,text,parse_mode="Markdown")

        elif c.data == "back":
            with open("start.gif","rb") as g:
                bot.edit_message_media(
                    telebot.types.InputMediaAnimation(g),
                    c.message.chat.id,
                    c.message.message_id
                )
            bot.edit_message_caption(
                "Welcome",
                c.message.chat.id,
                c.message.message_id,
                reply_markup=main_menu(uid)
            )

    except:
        pass

@bot.message_handler(commands=["Block"])
def block(m):
    try:
        if m.from_user.id not in ADMINS:
            return

        p = m.text.split()
        uid = int(p[1])
        reason = " ".join(p[2:]).replace("R:","")

        blocked[uid] = {
            "reason":reason,
            "by":m.from_user.username,
            "user":uid
        }

        bot.send_message(m.chat.id,"Blocked")

    except:
        pass

@bot.message_handler(commands=["Unblock"])
def unblock(m):
    try:
        if m.from_user.id not in ADMINS:
            return

        uid = int(m.text.split()[1])

        if uid in blocked:
            del blocked[uid]

        bot.send_message(m.chat.id,"Unblocked")

    except:
        pass

bot.infinity_polling(skip_pending=True)