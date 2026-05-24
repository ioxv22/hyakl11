import telebot
from telebot.types import InlineKeyboardMarkup, InlineKeyboardButton
import requests
import time

VETREX_TOKEN = '7839933596:AAFRs_OKJ5rYDb_bRvBAAECHkso9tvnyK5s'  
bot = telebot.TeleBot(VETREX_TOKEN)

STICKER_ID = 'CAACAgIAAxkBAAIMcmjDndyMvCb2OBQhIGobGVZU4f6JAAK0IwACmEspSN65vs0qW-TZNgQ'
START_PHOTO = 'https://t.me/VETREX_PHOTO/6'

VETREX_CHANNEL = 'https://t.me/VETREX_AI'
VETREX_DEV = 'https://t.me/VETREX_3'


vetrex_users = {}


def get_main_keyboard():
    markup = InlineKeyboardMarkup()
    markup.add(InlineKeyboardButton('• Create Video (Text) •', callback_data='create_video_text'))
    markup.add(InlineKeyboardButton('• Create Video (Image) •', callback_data='create_video_image'))
    markup.add(
        InlineKeyboardButton('• Channel •', url=VETREX_CHANNEL),
        InlineKeyboardButton('• Developer •', url=VETREX_DEV)
    )
    return markup

def get_back_keyboard():
    markup = InlineKeyboardMarkup()
    markup.add(InlineKeyboardButton('• Back •', callback_data='back'))
    return markup

def get_aspect_ratio_keyboard():
    markup = InlineKeyboardMarkup()
    markup.add(
        InlineKeyboardButton('• 16:9 (Landscape) •', callback_data='aspect_16_9'),
        InlineKeyboardButton('• 9:16 (Portrait) •', callback_data='aspect_9_16')
    )
    markup.add(InlineKeyboardButton('• Back •', callback_data='back'))
    return markup


@bot.message_handler(commands=['start'])
def start_command(message):
    chat_id = message.chat.id
    first_name = message.from_user.first_name
    from_id = message.from_user.id
    vetrex_users[chat_id] = {'state': None, 'image': None, 'prompt': None, 'aspect_ratio': '16:9'}
    
    s = f"[{first_name}](tg://user?id={from_id})"
    text = f"• Welcome {s}\n• VETREX Veo 3.1 Video Generation Bot\n• Create 8‑second videos from text or single image\n• Powered by Google Veo 3.1 Fast"
    
    bot.send_photo(chat_id, START_PHOTO, caption=text, parse_mode='Markdown', reply_markup=get_main_keyboard())


@bot.callback_query_handler(func=lambda call: True)
def callback_query(call):
    chat_id = call.message.chat.id
    first_name = call.from_user.first_name
    from_id = call.from_user.id
    user = vetrex_users.get(chat_id, {'state': None, 'image': None, 'prompt': None, 'aspect_ratio': '16:9'})
    
    if call.data == 'back':
        vetrex_users[chat_id] = {'state': None, 'image': None, 'prompt': None, 'aspect_ratio': '16:9'}
        text = f"• Welcome {first_name}\n• VETREX Veo 3.1 Video Generation Bot"
        try:
            bot.edit_message_caption(caption=text, chat_id=chat_id, message_id=call.message.message_id, parse_mode='Markdown', reply_markup=get_main_keyboard())
        except:
            bot.delete_message(chat_id, call.message.message_id)
            bot.send_photo(chat_id, START_PHOTO, caption=text, parse_mode='Markdown', reply_markup=get_main_keyboard())

    elif call.data == 'create_video_text':
        vetrex_users[chat_id] = {'state': 'text_prompt', 'image': None, 'prompt': None, 'aspect_ratio': '16:9'}
        bot.edit_message_caption(caption="• Send the text prompt for your video 🎥:", chat_id=chat_id, message_id=call.message.message_id, reply_markup=get_back_keyboard())

    elif call.data == 'create_video_image':
        vetrex_users[chat_id] = {'state': 'image_upload', 'image': None, 'prompt': None, 'aspect_ratio': '16:9'}
        bot.edit_message_caption(caption="• Send ONE image (no start/end frame)\n• Then you'll provide the prompt and aspect ratio", chat_id=chat_id, message_id=call.message.message_id, reply_markup=get_back_keyboard())

    
    elif call.data in ('aspect_16_9', 'aspect_9_16'):
        if user['state'] != 'await_aspect_ratio':
            bot.answer_callback_query(call.id, "You are not at aspect ratio step.")
            return
        ar = '16:9' if call.data == 'aspect_16_9' else '9:16'
        user['aspect_ratio'] = ar
        user['state'] = None
        bot.delete_message(chat_id, call.message.message_id)
        
        process_video_api(chat_id, user['prompt'], ar, [user['image']] if user['image'] else None)


@bot.message_handler(content_types=['photo'])
def handle_photo(message):
    chat_id = message.chat.id
    user = vetrex_users.get(chat_id, {'state': None, 'image': None, 'prompt': None, 'aspect_ratio': '16:9'})
    
    if user.get('state') == 'image_upload':
        if user.get('image') is not None:
            bot.reply_to(message, "• You already sent one image. Now send the prompt.", parse_mode='Markdown')
            return
            
        file_id = message.photo[-1].file_id
        file_info = bot.get_file(file_id)
        file_url = f"https://api.telegram.org/file/bot{VETREX_TOKEN}/{file_info.file_path}"
        user['image'] = file_url
        vetrex_users[chat_id] = user
        vetrex_users[chat_id]['state'] = 'image_prompt'
        bot.reply_to(message, "• Image received. Now send the prompt for the video:", parse_mode='Markdown', reply_markup=get_back_keyboard())


@bot.message_handler(content_types=['text'])
def handle_text(message):
    chat_id = message.chat.id
    user = vetrex_users.get(chat_id, {'state': None, 'image': None, 'prompt': None, 'aspect_ratio': '16:9'})
    state = user.get('state')

    if state == 'text_prompt':
        prompt = message.text.strip()
        user['prompt'] = prompt
        user['state'] = 'await_aspect_ratio'
        vetrex_users[chat_id] = user
        bot.send_message(chat_id, "• Choose aspect ratio:", reply_markup=get_aspect_ratio_keyboard())

    elif state == 'image_prompt':
        prompt = message.text.strip()
        user['prompt'] = prompt
        user['state'] = 'await_aspect_ratio'
        vetrex_users[chat_id] = user
        bot.send_message(chat_id, "• Choose aspect ratio for your video:", reply_markup=get_aspect_ratio_keyboard())

    elif message.text != '/start':
        bot.send_message(chat_id, "<b>• Please choose a command from the menu first ✨</b>", parse_mode='HTML', reply_markup=get_back_keyboard())


def process_video_api(chat_id, prompt, aspect_ratio, images):
    sticker = bot.send_sticker(chat_id, STICKER_ID)
    payload = {
        "prompt": prompt,
        "model": "veo-3.1",
        "aspect_ratio": aspect_ratio
    }
    if images:
        payload["images"] = images  

    try:
        resp = requests.post("https://vetrex.site/v1/videos/generations", json=payload, timeout=15).json()
        if 'task_id' in resp:
            task_id = resp['task_id']
            check_url = resp.get('check_url', f"https://vetrex.site/v1/videos/results/{task_id}")
            while True:
                time.sleep(10)
                res = requests.get(check_url, timeout=10).json()
                if res.get('status') == 'completed':
                    video_url = res['url']
                    caption = f"<b>{prompt[:200]}</b>\n<i>Veo 3.1・{aspect_ratio}</i>"
                    bot.send_video(chat_id, video_url, caption=caption, parse_mode='HTML', reply_markup=get_back_keyboard())
                    break
                elif res.get('status') == 'failed':
                    err = res.get('error', 'Unknown')
                    bot.send_message(chat_id, f"*• Failed:* `{err}`", parse_mode='Markdown', reply_markup=get_back_keyboard())
                    break
        else:
            err = resp.get('error', 'Could not start task')
            bot.send_message(chat_id, f"*• Error:* `{err}`", parse_mode='Markdown', reply_markup=get_back_keyboard())
    except Exception as e:
        bot.send_message(chat_id, f"*• Connection Error:* `{e}`", parse_mode='Markdown', reply_markup=get_back_keyboard())
    finally:
        try:
            bot.delete_message(chat_id, sticker.message_id)
        except:
            pass

if __name__ == "__main__":
    print("VETREX Veo 3.1 Bot running...")
    bot.polling(none_stop=True, timeout=60)