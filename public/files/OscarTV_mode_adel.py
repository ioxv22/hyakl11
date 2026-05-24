import telebot
from telebot.types import InlineKeyboardMarkup, InlineKeyboardButton
import requests

TOKEN = "8698833792:AAFfNiikAiaKzeQ28hB7_p9t16eMl6v9UIE"
bot = telebot.TeleBot(TOKEN)

user_data = {}

def search_series_mode(search_term_mode):
    url_mode = f"https://admin.dramaramadan.net/api/series/?page=1&limit=20&search={search_term_mode}&app_version=9"
    
    try:
        response_mode = requests.get(url_mode)
        response_mode.raise_for_status()
        data_mode = response_mode.json()
        
        if data_mode["status"] == "success" and data_mode["data"]:
            return data_mode["data"]
        else:
            return []
    except Exception as e_mode:
        print(f"حدث خطأ أثناء البحث: {e_mode}")
        return []

def get_seasons_mode(series_id_mode):
    url_mode = f"https://admin.dramaramadan.net/api/seasons/?series_id={series_id_mode}"
    
    try:
        response_mode = requests.get(url_mode)
        response_mode.raise_for_status()
        data_mode = response_mode.json()
        
        if data_mode["status"] == "success" and data_mode["data"]:
            return data_mode["data"]
        else:
            return []
    except:
        return [{"id": series_id_mode, "season_number": 1}]

def get_episodes_mode(season_id_mode):
    url_mode = f"https://admin.dramaramadan.net/api/episodes/?season_id={season_id_mode}"
    headers_mode = {
        'User-Agent': 'okhttp/4.12.0',
        'Accept-Encoding': 'gzip'
    }
    
    try:
        response_mode = requests.get(url_mode, headers=headers_mode)
        response_mode.raise_for_status()
        data_mode = response_mode.json()
        
        if data_mode["status"] == "success" and data_mode["data"]:
            return data_mode["data"]
        else:
            return []
    except Exception as e_mode:
        print(f"حدث خطأ أثناء جلب الحلقات: {e_mode}")
        return []

def get_watch_links_mode(episode_id_mode):
    url_mode = f"https://admin.dramaramadan.net/api/episodes/show.php?id={episode_id_mode}"
    headers_mode = {
        'User-Agent': 'okhttp/4.12.0',
        'Accept-Encoding': 'gzip'
    }
    
    try:
        response_mode = requests.get(url_mode, headers=headers_mode)
        response_mode.raise_for_status()
        data_mode = response_mode.json()
        
        if data_mode["status"] == "success" and data_mode["data"]:
            return data_mode["data"]["watch_links"]
        else:
            return []
    except Exception as e_mode:
        print(f"حدث خطأ أثناء جلب الروابط: {e_mode}")
        return []

@bot.message_handler(commands=['start'])
def start_mode(message):
    bot.reply_to(message, "🎬 *مرحباً بك في بوت البحث عن المسلسلات*\n\nأرسل اسم المسلسل الذي تبحث عنه وسأقوم بالبحث لك.\n\nمثال: `البيت` أو `رجالة البيت`", parse_mode="Markdown")

@bot.message_handler(func=lambda message: True)
def search_mode(message):
    user_id = message.chat.id
    search_word = message.text
    
    msg = bot.reply_to(message, "🔍 جاري البحث عن المسلسلات...")
    
    series_list = search_series_mode(search_word)
    
    if not series_list:
        bot.edit_message_text("❌ لم يتم العثور على مسلسلات بهذا الاسم. حاول مرة أخرى.", user_id, msg.message_id)
        return
    
    user_data[user_id] = {"series_list": series_list}
    
    keyboard = InlineKeyboardMarkup(row_width=1)
    for idx, series in enumerate(series_list):
        keyboard.add(InlineKeyboardButton(f"{series['title_ar']} (⭐ {series['rating']})", callback_data=f"series_{idx}"))
    
    bot.edit_message_text("📺 *اختر المسلسل:*", user_id, msg.message_id, parse_mode="Markdown", reply_markup=keyboard)

@bot.callback_query_handler(func=lambda call: True)
def callback_mode(call):
    user_id = call.message.chat.id
    data = call.data
    
    if data.startswith("series_"):
        idx = int(data.split("_")[1])
        series_list = user_data.get(user_id, {}).get("series_list", [])
        
        if idx < 0 or idx >= len(series_list):
            bot.answer_callback_query(call.id, "اختيار غير صحيح")
            return
        
        selected_series = series_list[idx]
        series_id = selected_series['id']
        
        user_data[user_id]["selected_series"] = selected_series
        user_data[user_id]["series_id"] = series_id
        
        bot.edit_message_text(f"✅ *اخترت: {selected_series['title_ar']}*\n\n🔍 جاري البحث عن المواسم...", user_id, call.message.message_id, parse_mode="Markdown")
        
        seasons = get_seasons_mode(series_id)
        
        if not seasons:
            bot.edit_message_text("❌ لا توجد مواسم متاحة لهذا المسلسل.", user_id, call.message.message_id)
            return
        
        user_data[user_id]["seasons"] = seasons
        
        if len(seasons) > 1:
            keyboard = InlineKeyboardMarkup(row_width=1)
            for idx, season in enumerate(seasons):
                season_num = season.get('season_number', idx + 1)
                keyboard.add(InlineKeyboardButton(f"الموسم {season_num}", callback_data=f"season_{idx}"))
            
            bot.edit_message_text("📺 *اختر الموسم:*", user_id, call.message.message_id, parse_mode="Markdown", reply_markup=keyboard)
        else:
            season_id = seasons[0]['id']
            season_num = seasons[0].get('season_number', 1)
            user_data[user_id]["season_id"] = season_id
            user_data[user_id]["season_num"] = season_num
            
            bot.edit_message_text(f"✅ *الموسم {season_num}*\n\n📺 جاري تحميل الحلقات...", user_id, call.message.message_id, parse_mode="Markdown")
            
            episodes = get_episodes_mode(season_id)
            
            if not episodes:
                bot.edit_message_text("❌ لا توجد حلقات متاحة لهذا الموسم.", user_id, call.message.message_id)
                return
            
            user_data[user_id]["episodes"] = episodes
            
            keyboard = InlineKeyboardMarkup(row_width=5)
            row = []
            for i, ep in enumerate(episodes):
                row.append(InlineKeyboardButton(f"{ep['episode_number']}", callback_data=f"episode_{ep['episode_number']}"))
                if (i + 1) % 5 == 0 or i == len(episodes) - 1:
                    keyboard.row(*row)
                    row = []
            
            nav_buttons = []
            nav_buttons.append(InlineKeyboardButton("🏠 القائمة الرئيسية", callback_data="main_menu"))
            keyboard.row(*nav_buttons)
            
            bot.edit_message_text(f"🎬 *{selected_series['title_ar']} - الموسم {season_num}*\n📺 *عدد الحلقات: {len(episodes)}*\n\nاختر رقم الحلقة:", user_id, call.message.message_id, parse_mode="Markdown", reply_markup=keyboard)
    
    elif data.startswith("season_"):
        idx = int(data.split("_")[1])
        seasons = user_data.get(user_id, {}).get("seasons", [])
        selected_series = user_data.get(user_id, {}).get("selected_series", {})
        
        if idx < 0 or idx >= len(seasons):
            bot.answer_callback_query(call.id, "اختيار غير صحيح")
            return
        
        season_id = seasons[idx]['id']
        season_num = seasons[idx].get('season_number', idx + 1)
        user_data[user_id]["season_id"] = season_id
        user_data[user_id]["season_num"] = season_num
        
        bot.edit_message_text(f"✅ *الموسم {season_num}*\n\n📺 جاري تحميل الحلقات...", user_id, call.message.message_id, parse_mode="Markdown")
        
        episodes = get_episodes_mode(season_id)
        
        if not episodes:
            bot.edit_message_text("❌ لا توجد حلقات متاحة لهذا الموسم.", user_id, call.message.message_id)
            return
        
        user_data[user_id]["episodes"] = episodes
        
        keyboard = InlineKeyboardMarkup(row_width=5)
        row = []
        for i, ep in enumerate(episodes):
            row.append(InlineKeyboardButton(f"{ep['episode_number']}", callback_data=f"episode_{ep['episode_number']}"))
            if (i + 1) % 5 == 0 or i == len(episodes) - 1:
                keyboard.row(*row)
                row = []
        
        nav_buttons = []
        nav_buttons.append(InlineKeyboardButton("🏠 القائمة الرئيسية", callback_data="main_menu"))
        keyboard.row(*nav_buttons)
        
        bot.edit_message_text(f"🎬 *{selected_series['title_ar']} - الموسم {season_num}*\n📺 *عدد الحلقات: {len(episodes)}*\n\nاختر رقم الحلقة:", user_id, call.message.message_id, parse_mode="Markdown", reply_markup=keyboard)
    
    elif data.startswith("episode_"):
        episode_num = int(data.split("_")[1])
        episodes = user_data.get(user_id, {}).get("episodes", [])
        selected_series = user_data.get(user_id, {}).get("selected_series", {})
        season_num = user_data.get(user_id, {}).get("season_num", 1)
        
        selected_episode = None
        for ep in episodes:
            if ep['episode_number'] == episode_num:
                selected_episode = ep
                break
        
        if not selected_episode:
            bot.answer_callback_query(call.id, "رقم الحلقة غير موجود")
            return
        
        bot.edit_message_text(f"🎬 *{selected_series['title_ar']} - الموسم {season_num} - الحلقة {episode_num}*\n\n🔍 جاري جلب روابط المشاهدة...", user_id, call.message.message_id, parse_mode="Markdown")
        
        watch_links = get_watch_links_mode(selected_episode['id'])
        
        if watch_links:
            keyboard = InlineKeyboardMarkup(row_width=1)
            for link in watch_links:
                keyboard.add(InlineKeyboardButton(f"🎥 مشاهدة بجودة {link['quality']}", url=link['url']))
            
            nav_buttons = []
            nav_buttons.append(InlineKeyboardButton("📺 العودة للحلقات", callback_data="back_to_episodes"))
            nav_buttons.append(InlineKeyboardButton("🏠 الرئيسية", callback_data="main_menu"))
            keyboard.row(*nav_buttons)
            
            bot.edit_message_text(f"📺 *{selected_series['title_ar']} - الحلقة {episode_num}*\n\nاختر جودة المشاهدة:", user_id, call.message.message_id, parse_mode="Markdown", reply_markup=keyboard)
        else:
            keyboard = InlineKeyboardMarkup(row_width=1)
            nav_buttons = []
            nav_buttons.append(InlineKeyboardButton("📺 العودة للحلقات", callback_data="back_to_episodes"))
            nav_buttons.append(InlineKeyboardButton("🏠 الرئيسية", callback_data="main_menu"))
            keyboard.row(*nav_buttons)
            bot.edit_message_text("❌ لا توجد روابط متاحة لهذه الحلقة.", user_id, call.message.message_id, reply_markup=keyboard)
    
    elif data == "back_to_episodes":
        selected_series = user_data.get(user_id, {}).get("selected_series", {})
        season_num = user_data.get(user_id, {}).get("season_num", 1)
        episodes = user_data.get(user_id, {}).get("episodes", [])
        
        keyboard = InlineKeyboardMarkup(row_width=5)
        row = []
        for i, ep in enumerate(episodes):
            row.append(InlineKeyboardButton(f"{ep['episode_number']}", callback_data=f"episode_{ep['episode_number']}"))
            if (i + 1) % 5 == 0 or i == len(episodes) - 1:
                keyboard.row(*row)
                row = []
        
        nav_buttons = []
        nav_buttons.append(InlineKeyboardButton("🏠 القائمة الرئيسية", callback_data="main_menu"))
        keyboard.row(*nav_buttons)
        
        bot.edit_message_text(f"🎬 *{selected_series['title_ar']} - الموسم {season_num}*\n📺 *عدد الحلقات: {len(episodes)}*\n\nاختر رقم الحلقة:", user_id, call.message.message_id, parse_mode="Markdown", reply_markup=keyboard)
    
    elif data == "main_menu":
        if user_id in user_data:
            del user_data[user_id]
        bot.edit_message_text("🎬 *أرسل اسم المسلسل الذي تبحث عنه*", user_id, call.message.message_id, parse_mode="Markdown")

if __name__ == "__main__":
    print("البوت يعمل...")
    bot.infinity_polling()