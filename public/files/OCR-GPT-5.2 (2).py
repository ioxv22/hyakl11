from telebot.types import InlineKeyboardButton, InlineKeyboardMarkup
import threading
import requests
import datetime
import telebot
import sqlite3
import html
import json
import os
import re
import urllib3
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
VIPCODE3 = 'zzzzzzz' #توكنك
ch = 'VIPCODE3'  # يوزر قناتك من دونـ@
ID = '6421671483'  # ايديك
ADMIN = [6421671483, 0] #ايديك
pcpc = 'https://t.me/Z_O_Z_0o0/27'
zo = telebot.TeleBot(VIPCODE3)
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
conn = sqlite3.connect('channels.db', check_same_thread=False)
cursor = conn.cursor()
cursor.execute('''CREATE TABLE IF NOT EXISTS channels (id INTEGER PRIMARY KEY, channel_name TEXT, invite_link TEXT)''')
zze = {}
zzze = {}
owner = zo.get_chat(ID)
us = owner.username
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
def subscs(user_id):
    channels = cursor.execute("SELECT channel_name, invite_link FROM channels").fetchall()
    for channel in channels:
        channel_username, invite_link = channel
        try:
            member_status = zo.get_chat_member(chat_id=channel_username, user_id=user_id).status
            if member_status not in ["member", "administrator", "creator"]:
                return False, invite_link
        except Exception as e:
            continue
    return True, None
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
def not_subscrip(message, invite_link):
    na = message.from_user.first_name
    if invite_link:
        channel_url = invite_link.replace('@', '')
        button = telebot.types.InlineKeyboardMarkup(row_width=1)
        subscribe_button = telebot.types.InlineKeyboardButton(text="اشترك", url=f"{channel_url}")
        button.add(subscribe_button)
        zo.reply_to(
            message, 
            text=f'''
❕ | عذراً عزيزي المستخدم {na}
❗️ | يجب عليك الاشتراك في قناة المطور أولاً
❕ | اشترك ثم أرسل /start 
د==========================د
د🔗 - {invite_link}
د==========================د
''',
            disable_web_page_preview=True,
            reply_markup=button
        )
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
def not_subscrip1(call, invite_link):
    na = call.from_user.first_name
    if invite_link:
        channel_url = invite_link.replace('@', '')
        button = telebot.types.InlineKeyboardMarkup(row_width=1)
        subscribe_button = telebot.types.InlineKeyboardButton(text="اشترك", url=f"{channel_url}")
        button.add(subscribe_button)
        zo.edit_message_text(
            chat_id=call.message.chat.id,
            message_id=call.message.message_id, 
            text=f'''
❕ | عذراً عزيزي المستخدم {na}
❗️ | يجب عليك الاشتراك في قناة المطور أولاً
❕ | اشترك ثم أرسل /start 
د==========================د
د🔗 - {invite_link}
د==========================د
''',
            disable_web_page_preview=True,
            reply_markup=button
        )
        zo.clear_step_handler(call.message)
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
@zo.message_handler(commands=['start'])
def vip1(ms):
    is_subscribed, channel = subscs(ms.from_user.id)
    if not is_subscribed:
        not_subscrip(ms, channel)
        return
    cid = ms.chat.id
    name1 = ms.from_user.first_name
    name = f"<a href='tg://user?id={ms.from_user.id}'>{name1}</a>"
    tx =f'''<b>Hi {name} :)</b>\n<blockquote><tg-spoiler>\nI am CatGPT-5.2, an advanced AI assistant capable of receiving messages and reading text from images and PDFs with up to 92% accuracy. Send me images or PDFs and I'll extract the text for you with ease!\n</tg-spoiler>#Note: Supports a max of 100 messages memory.</blockquote>\n<b>Speak....</b>'''
    zeco = InlineKeyboardMarkup()
    zec1 = InlineKeyboardButton("• Clear Memory •", callback_data="clear_context")
    zec2 = InlineKeyboardButton("• Source Channel •", url=f"https://t.me/{ch}")
    zec3 = InlineKeyboardButton("• Developer •", url=f"https://t.me/{us}")
    if ms.from_user.id in zze and (zze[ms.from_user.id]['zez'] or zze[ms.from_user.id]['zezez']):
        zeco.add(zec1)
    zeco.add(zec2, zec3)
    zo.send_photo(cid,pcpc,caption=tx,parse_mode='HTML',reply_markup=zeco)
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
@zo.callback_query_handler(func=lambda call: call.data == "clear_context")
def vip2(call):
    zze[call.from_user.id] = {'zez': [], 'zezez': []}
    zo.answer_callback_query(call.id, "• Dear, your chat history has been deleted")
    zeco = InlineKeyboardMarkup()
    zec2 = InlineKeyboardButton("• Source Channel •", url=f"https://t.me/{ch}")
    zec3 = InlineKeyboardButton("• Developer •", url=f"https://t.me/{us}")
    zeco.add(zec2, zec3)
    zo.edit_message_reply_markup(chat_id=call.message.chat.id,message_id=call.message.message_id,reply_markup=zeco)
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
@zo.message_handler(commands=['admin'])
def admin_command(message):
    user_id = message.from_user.id
    if user_id in ADMIN:
        markup = telebot.types.InlineKeyboardMarkup(row_width=2)
        
        user = zo.get_chat(message.from_user.id)
        owner_name = user.first_name
        owner_link = f"[{owner_name}](tg://user?id={message.from_user.id})"
        k_add = telebot.types.InlineKeyboardButton('➕ إضافة قناة', callback_data='add_channel')
        k_remove = telebot.types.InlineKeyboardButton('➖ حذف قناة', callback_data='remove_channel')
        k_show = telebot.types.InlineKeyboardButton('🗂 قائمة القنوات', callback_data='show_channels')
        k_delete_all = telebot.types.InlineKeyboardButton('🗑️ حذف جميع القنوات', callback_data='delete_all_channels')
        markup.add(k_show)
        markup.add(k_add, k_remove)
        markup.add(k_delete_all)
        zo.reply_to(
            message, 
            text=f'👤 *لوحة الأدمن*:\n\n👑 مرحباً {owner_link} في اللوحة الخاصة بك:',
            reply_markup=markup, 
            parse_mode='Markdown'
        )
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
@zo.callback_query_handler(func=lambda call: call.data == 'Back')
def show_settings(call):
    markup = telebot.types.InlineKeyboardMarkup(row_width=2)

    user = zo.get_chat(call.from_user.id)
    owner_name = user.first_name
    owner_link = f"[{owner_name}](tg://user?id={call.from_user.id})"

    k_add = telebot.types.InlineKeyboardButton('➕ إضافة قناة', callback_data='add_channel')
    k_remove = telebot.types.InlineKeyboardButton('➖ حذف قناة', callback_data='remove_channel')
    k_show = telebot.types.InlineKeyboardButton('🗂 قائمة القنوات', callback_data='show_channels')
    k_delete_all = telebot.types.InlineKeyboardButton('🗑️ حذف جميع القنوات', callback_data='delete_all_channels')
    markup.add(k_show)
    markup.add(k_add, k_remove)
    markup.add(k_delete_all)
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
    zo.edit_message_text(
        chat_id=call.message.chat.id, 
        message_id=call.message.message_id,
        text=f'👤 *لوحة الأدمن*:\n\n👑 مرحباً {owner_link} في اللوحة الخاصة بك:',
        reply_markup=markup, 
        parse_mode='Markdown'
    )
    zo.clear_step_handler(call.message)
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
@zo.callback_query_handler(func=lambda call: True)
def callback_handler(call):
    markup = telebot.types.InlineKeyboardMarkup()
    back_button = telebot.types.InlineKeyboardButton("• رجوع •", callback_data='Back')
    markup.add(back_button)

    if call.data == 'add_channel':
        add_text = '🔹 قم بإرسال يوزر القناة بـ(@) لإضافتها :'
        zo.edit_message_text(chat_id=call.message.chat.id, message_id=call.message.message_id, text=add_text, reply_markup=markup)
        zo.register_next_step_handler(call.message, add_channel)

    elif call.data == 'remove_channel':
        markup = telebot.types.InlineKeyboardMarkup()
        back_button = telebot.types.InlineKeyboardButton("• رجوع •", callback_data='Back')
        markup.add(back_button)
        delete_text = '🔸 قم بإرسال يوزر القناة بـ(@) لحذفها :'
        zo.edit_message_text(chat_id=call.message.chat.id, message_id=call.message.message_id, text=delete_text,reply_markup=markup)
        zo.register_next_step_handler(call.message, remove_channel)

    elif call.data == 'delete_all_channels':
        confirmation_markup = telebot.types.InlineKeyboardMarkup()
        confirm_button = telebot.types.InlineKeyboardButton("✔️ | تأكيد الحذف | ✔️", callback_data='confirm_delete_all')
        cancel_button = telebot.types.InlineKeyboardButton("❌ | تراجع | ❌", callback_data='cancel_delete')
        confirmation_markup.add(confirm_button, cancel_button)

        confirmation_text = '''
⚠️ | *هل أنت متأكد أنك تريد حذف جميع القنوات والمجموعات؟*
✨ | *ستتم عملية الحذف بشكل نهائي*
'''
        zo.edit_message_text(chat_id=call.message.chat.id, message_id=call.message.message_id, text=confirmation_text, parse_mode='Markdown', reply_markup=confirmation_markup)
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
    elif call.data == 'confirm_delete_all':
        cursor.execute('SELECT channel_name FROM channels')
        channels = cursor.fetchall()

        if channels:
            deletes_text = '''
👑 | عزيزي المالك 😊❤️
✔️ | *تم حذف جميع القنوات بنجاح*

🗑️ | *القنوات المحذوفة :*
د— — — — — — — — — — —
'''
            for channel in channels:
                deletes_text += f'👉 | {channel[0]}\n'
            deletes_text += 'د— — — — — — — — — — —'

            cursor.execute('DELETE FROM channels')
            conn.commit()
            zo.edit_message_text(chat_id=call.message.chat.id, message_id=call.message.message_id, text=deletes_text, parse_mode='Markdown', reply_markup=markup)
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
        else:
            erer_deletes_text = '''
⚠️ | عزيزي المالك 🌚❤️
❌ | *لا توجد قنوات لحذفها*
د— — — — — — — — — — —
'''
            zo.edit_message_text(chat_id=call.message.chat.id, message_id=call.message.message_id, text=erer_deletes_text, parse_mode='Markdown', reply_markup=markup)
    
    elif call.data == 'cancel_delete':
        cancel_text = '😮‍💨 | *تم إلغاء عملية الحذف* | 😮‍💨'
        zo.edit_message_text(chat_id=call.message.chat.id, message_id=call.message.message_id, text=cancel_text, parse_mode='Markdown', reply_markup=markup)
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
    elif call.data == 'show_channels':
        cursor.execute("SELECT channel_name FROM channels")
        channels = cursor.fetchall()
        markup = telebot.types.InlineKeyboardMarkup()
        if channels:
            show_text = '📋 قنوات الاشتراك الإجباري :'
            for channel in channels:
                channel_name = channel[0].replace("@", "")
                button = telebot.types.InlineKeyboardButton(
                    text=f'🔹 {channel_name}',
                    url=f'https://t.me/{channel_name}'
                )
                markup.add(button)
            Back = telebot.types.InlineKeyboardButton("• رجوع •", callback_data='Back')
            markup.add(Back)
            zo.edit_message_text(chat_id=call.message.chat.id, message_id=call.message.message_id, text=show_text, reply_markup=markup)
        else:
            not_exist_text = '❌ ¦ لا توجد قنوات مسجله حاليا ¦ ❌'
            Back = telebot.types.InlineKeyboardButton("• رجوع •", callback_data='Back')
            markup.add(Back)
            zo.edit_message_text(chat_id=call.message.chat.id, message_id=call.message.message_id, text=not_exist_text, reply_markup=markup)
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
def add_channel(message):
    channel_name = message.text.strip()
    if not channel_name.startswith('@'):
        channel_name = '@' + channel_name
    try:
        chat_info = zo.get_chat(channel_name)
        if chat_info.type not in ['channel', 'supergroup', 'group']:
            markup = telebot.types.InlineKeyboardMarkup()
            Back = telebot.types.InlineKeyboardButton("• رجوع •", callback_data='Back')
            markup.add(Back)
            text = '❌ ¦ يجب أن يكون اليوزر قناة أو مجموعة ¦ ❌'
            zo.reply_to(message, text=text, reply_markup=markup, parse_mode='Markdown')
            return
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
        chat_members = zo.get_chat_administrators(channel_name)
        bot_is_admin = any(member.user.id == zo.get_me().id for member in chat_members)

        if not bot_is_admin:
            markup = telebot.types.InlineKeyboardMarkup()
            Back = telebot.types.InlineKeyboardButton("• رجوع •", callback_data='Back')
            markup.add(Back)
            text = '🚫 ¦ يجب أن يكون البوت أدمن في القناة أو المجموعة  ¦ 🚫'
            zo.reply_to(message, text=text, reply_markup=markup, parse_mode='Markdown')
            return

        cursor.execute("SELECT * FROM channels WHERE channel_name = ?", (channel_name,))
        channel = cursor.fetchone()
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
        if channel:
            markup = telebot.types.InlineKeyboardMarkup()
            Back = telebot.types.InlineKeyboardButton("• رجوع •", callback_data='Back')
            Zo_text = f'''
👑 | عزيزي المالك 😢💔
❌ | القناة موجودة بالفعل 
د— — — — — — — — — — —
د - {channel_name}
د— — — — — — — — — — —
'''
            markup.add(Back)
            zo.reply_to(message, Zo_text, reply_markup=markup)
        else:
            invite_link = zo.export_chat_invite_link(chat_info.id)
            cursor.execute("INSERT INTO channels (channel_name, invite_link) VALUES (?, ?)",
                       (channel_name, invite_link))
            conn.commit()
            markup = telebot.types.InlineKeyboardMarkup()
            Back = telebot.types.InlineKeyboardButton("• رجوع •", callback_data='Back')
            Zo_text = f'''
👑 | عزيزي المالك 😊❤️
✔ | تم إضافة القناة بنجاح 
د— — — — — — — — — — —
د - {channel_name}
🔗 | رابط الدعوة: {invite_link}
د— — — — — — — — — — —
'''
            markup.add(Back)
            zo.reply_to(message, Zo_text, reply_markup=markup)
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
    except telebot.apihelper.ApiException as e:
        if "chat not found" in str(e):
            markup = telebot.types.InlineKeyboardMarkup()
            Back = telebot.types.InlineKeyboardButton("• رجوع •", callback_data='Back')
            markup.add(Back)
            text = '❌ ¦ اسم القناة أو المجموعة غير صحيح ¦ ❌'
            zo.reply_to(message, text=text, reply_markup=markup, parse_mode='Markdown')
        elif "Forbidden: bot was kicked" in str(e):
            markup = telebot.types.InlineKeyboardMarkup()
            Back = telebot.types.InlineKeyboardButton("• رجوع •", callback_data='Back')
            markup.add(Back)
            text = '🚫 ¦ البوت محظور من المجموعة أو القناة ¦ 🚫'
            zo.reply_to(message, text=text, reply_markup=markup, parse_mode='Markdown')
        else:
            zo.reply_to(message, f'خطأ: {str(e)}')
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
    except Exception as e:
        text = f"حدث خطأ: {str(e)}"
        markup = telebot.types.InlineKeyboardMarkup()
        Back = telebot.types.InlineKeyboardButton("• رجوع •", callback_data='Back')
        markup.add(Back)
        zo.reply_to(message, text=text, reply_markup=markup, parse_mode='Markdown')
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
def remove_channel(message):
    channel_name = message.text.strip()
    
    with sqlite3.connect('channels.db') as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM channels WHERE channel_name = ?", (channel_name,))
        channel = cursor.fetchone()
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
        if channel:
            cursor.execute("DELETE FROM channels WHERE channel_name = ?", (channel_name,))
            conn.commit()
            
            markup = telebot.types.InlineKeyboardMarkup()
            Back = telebot.types.InlineKeyboardButton("• رجوع •", callback_data='Back')
            Zo_text = f'''
👑 | عزيزي المالك 😢💔
✔ | تم حذف القناة بنجاح 
د— — — — — — — — — — —
د - {channel_name}
د— — — — — — — — — — —
            '''
            markup.add(Back)
            zo.send_message(
                message.chat.id,
                text=Zo_text,
                reply_markup=markup
            )
        else:
            markup = telebot.types.InlineKeyboardMarkup()
            Back = telebot.types.InlineKeyboardButton("• رجوع •", callback_data='Back')
            Zo_text = f'''
👑 | عزيزي المالك 🌚❤️
❌ | القناة غير موجودة لحذفها 
د— — — — — — — — — — —
د - {channel_name}
د— — — — — — — — — — —
            '''
            markup.add(Back)
            zo.send_message(
                message.chat.id,
                text=Zo_text,
                reply_markup=markup
            )
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
def vip3(zczcz, zczc):
    url = "https://sii3.top/api/OCR.php"
    zzzze = ",".join(zczc) if zczc else ""
    zzzzze = {'text': zczcz, 'link': zzzze}
    try:
        zw = requests.post(url, data=zzzzze)
        zwzw = zw.json().get('response', "Error : 1")
        return zwzw.replace('\\n', '\n').replace('\\"', '"')
    except:
        return "Error : ?"
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
def vip4(zecor, zecor1, text, zecor2, zecor3):
    zo.send_chat_action(zecor, 'typing')
    if zecor1 not in zze:
        zze[zecor1] = {'zez': [], 'zezez': []}
    zecor4 = zze[zecor1]
    zecor5 = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    for img in zecor2:
        zecor4['zezez'].append(img)
        if len(zecor4['zezez']) > 10:
            zecor4['zezez'].pop(0)
    zecor6 = ""
    if zecor3.reply_to_message and zecor3.reply_to_message.text:
        zecor6 = f" (Replying to: {zecor3.reply_to_message.text})"
    zecor7 = f"[{zecor5}] User: {text}{zecor6}"
    if zecor2:
        zecor7 += f"\n[User attached {len(zecor2)} images in this message]"
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
    zecor4['zez'].append(zecor7)

    zecor8 = "\n".join([f"- {url}" for url in zecor4['zezez']])
    zecor9 = "\n".join(zecor4['zez'])
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
    zeco33 = (   "You are GPT-5.2 (internal model name) and your public-facing name is ChatGPT. "
        "Do not mention your identity or name unless the user explicitly asks who you are. If asked who you are, say that you are ChatGPT powered by GPT-5.2 and always express it in the same language used by the user. "
        "Always reply in the same language as the user's latest message. Always respond directly to the user's latest input. "
        "If the user sends plain text only, treat it as complete input and respond normally. Never request an image, PDF, or file unless the user explicitly asks to extract or analyze content from such a file. "
        "Never assume a file is missing. If images are provided, analyze them normally and include them in the response. Do not default to OCR or file-upload prompts. "
        "Operational rule: Text-only message respond normally; Text plus image analyze both; Explicit request for file extraction request file if missing; No file mentioned never request one.\n\n"
        f"Visual Memory (Last 10 images):\n{zecor8}\n\n"
        f"Conversation History:\n{zecor9}\n\n"
        "Please provide your response to the latest User message."
    )
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
    zecor11 = vip3(zeco33, zecor2)
    
    zecor4['zez'].append(f"[{zecor5}] AI: {zecor11}")
    
    while len(zecor4['zez']) > 100:
        zecor4['zez'].pop(0)
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
    try:
        if zecor3.reply_to_message or zecor2:
            zo.reply_to(zecor3, zecor11, parse_mode="Markdown")
        else:
            zo.send_message(zecor, zecor11, parse_mode="Markdown")
    except:
        if zecor3.reply_to_message or zecor2:
            zo.reply_to(zecor3, zecor11)
        else:
            zo.send_message(zecor, zecor11)
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
@zo.message_handler(content_types=['photo'])
def vip6(ms):
    is_subscribed, channel = subscs(ms.from_user.id)
    if not is_subscribed:
        not_subscrip(ms, channel)
        return
    zx = zo.get_file(ms.photo[-1].file_id)
    zx1 = None
    try:
        zx2 = {'file': ('image.jpg', zo.download_file(zx.file_path))}
        zw = requests.post("https://sii3.top/api/upload.php", files=zx2)
        zx1 = zw.json().get('response')
    except:
        zx1 = None
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
    if not ms.media_group_id:
        vip4(ms.chat.id, ms.from_user.id, ms.caption or "Analyze this image", [zx1] if zx1 else [], ms)
        return
    if ms.media_group_id not in zzze:
        zzze[ms.media_group_id] = {'images': [], 'caption': None, 'message': ms}
        threading.Timer(3.0, lambda mg_id=ms.media_group_id: vip7(mg_id)).start()
    if zx1:
        zzze[ms.media_group_id]['images'].append(zx1)
    if ms.caption:
        zzze[ms.media_group_id]['caption'] = ms.caption
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
def vip7(mg_id):
    if mg_id in zzze:
        data = zzze.pop(mg_id)
        vip4(data['message'].chat.id, data['message'].from_user.id, data['caption'] or "Analyze these images", data['images'], data['message'])
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
@zo.message_handler(content_types=['text'])
def vip8(ms):
    is_subscribed, channel = subscs(ms.from_user.id)
    if not is_subscribed:
        not_subscrip(ms, channel)
        return
    if ms.text.startswith('/'):
        return
    vip4(ms.chat.id, ms.from_user.id, ms.text, [], ms)
#غير الحقوق واثبت انك فاشل اذا تريد تنقل اذكر اسمي او اسم قناتي #

#====================#
#CH : @VIPCODE3 
#DEV : @ZEC0RA1
#====================#
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
print("🖤 البوت شغال هلق 🖤")
zo.delete_webhook()
zo.infinity_polling()