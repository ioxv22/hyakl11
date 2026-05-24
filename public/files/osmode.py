import requests
import os
import random
import webbrowser
from concurrent.futures import ThreadPoolExecutor, as_completed

DEFAULT_HEADERS = {
    'User-Agent': 'okhttp/4.12.0',
    'Accept-Encoding': 'gzip',
}

# قائمة أوضاع الفلترة
FILTERS = [
    {"name": "🕒 أحدث حلقة", "type": "latest_episode", "priority": 1},
    {"name": "🆕 الأحدث", "type": "newest", "priority": 2},
    {"name": "⭐ الأعلى تقييماً", "type": "top_rated", "priority": 3},
    {"name": "👁️ الأكثر مشاهدة", "type": "most_viewed", "priority": 4},
    {"name": "🎲 عشوائي", "type": "random", "priority": 5},
    {"name": "🎭 دراما", "type": "genre_دراما", "priority": 6},
    {"name": "😂 كوميدي", "type": "genre_كوميدي", "priority": 7},
    {"name": "💥 أكشن", "type": "genre_أكشن", "priority": 8},
    {"name": "🔪 تشويق", "type": "genre_تشويق وإثارة", "priority": 9},
    {"name": "🕵️ جريمة", "type": "genre_جريمة", "priority": 10},
    {"name": "❤️ رومانسي", "type": "genre_رومانسي", "priority": 11},
    {"name": "👻 رعب", "type": "genre_رعب", "priority": 12},
    {"name": "🧞 فانتازيا", "type": "genre_فانتازيا", "priority": 13},
    {"name": "🏰 تاريخي", "type": "genre_تاريخي", "priority": 14},
]

FILTERS.sort(key=lambda x: x["priority"])

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def get_series_by_api_filter(filter_type, limit=6):
    try:
        params = {
            'page': 1,
            'limit': limit,
            'app_version': '9',
            'sort_by': filter_type
        }
        response = requests.get('https://admin.dramaramadan.net/api/series/', params=params, headers=DEFAULT_HEADERS, timeout=8)
        if response.status_code == 200:
            data = response.json()
            if data.get("status") == "success" and data.get("data"):
                return data["data"]
        return []
    except:
        return []

def get_random_series(limit=6):
    try:
        random_page = random.randint(1, 35)
        params = {'page': random_page, 'limit': limit, 'app_version': '9'}
        response = requests.get('https://admin.dramaramadan.net/api/series/', params=params, headers=DEFAULT_HEADERS, timeout=8)
        if response.status_code == 200:
            data = response.json()
            if data.get("status") == "success" and data.get("data"):
                return data["data"]
        return []
    except:
        return []

def get_series_by_genre(genre, limit=6):
    series_list = []
    try:
        for page in range(1, 3):
            params = {'page': page, 'limit': 20, 'app_version': '9'}
            response = requests.get('https://admin.dramaramadan.net/api/series/', params=params, headers=DEFAULT_HEADERS, timeout=8)
            if response.status_code == 200:
                data = response.json()
                if data.get("status") == "success" and data.get("data"):
                    for series in data["data"]:
                        if len(series_list) >= limit:
                            break
                        series_genres = [g.lower() for g in series.get('genres', [])]
                        if genre.lower() in series_genres:
                            series_list.append(series)
                else:
                    break
            else:
                break
        return series_list[:limit]
    except:
        return []

def get_filtered_series_list(filter_type, limit=6):
    if filter_type == "random":
        return get_random_series(limit=limit)
    elif filter_type in ["top_rated", "most_viewed", "newest", "latest_episode"]:
        return get_series_by_api_filter(filter_type, limit=limit)
    elif filter_type.startswith("genre_"):
        genre = filter_type.replace("genre_", "")
        return get_series_by_genre(genre, limit=limit)
    return []

def load_single_filter(filter_info, limit=6):
    series_list = get_filtered_series_list(filter_info["type"], limit=limit)
    return {
        "number": filter_info["priority"],
        "name": filter_info["name"],
        "series": series_list
    }

def load_all_filters_parallel(limit=6):
    all_filters_data = []
    
    print("   ", end="")
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = {}
        for filter_info in FILTERS:
            future = executor.submit(load_single_filter, filter_info, limit)
            futures[future] = filter_info["priority"]
        
        for future in as_completed(futures):
            filter_num = futures[future]
            filter_data = future.result()
            if filter_data and filter_data["series"]:
                all_filters_data.append(filter_data)
            print(".", end="", flush=True)
    
    all_filters_data.sort(key=lambda x: x["number"])
    return all_filters_data

def get_seasons(series_id):
    try:
        params = {'series_id': series_id, 'app_version': '9'}
        response = requests.get('https://admin.dramaramadan.net/api/seasons/', params=params, headers=DEFAULT_HEADERS, timeout=8)
        if response.status_code == 200:
            data = response.json()
            if data.get("status") == "success" and data.get("data"):
                return data["data"]
        return [{"id": series_id, "season_number": 1}]
    except:
        return [{"id": series_id, "season_number": 1}]

def get_episodes(season_id):
    try:
        params = {'season_id': season_id, 'app_version': '9'}
        response = requests.get('https://admin.dramaramadan.net/api/episodes/', params=params, headers=DEFAULT_HEADERS, timeout=8)
        if response.status_code == 200:
            data = response.json()
            if data.get("status") == "success" and data.get("data"):
                return data["data"]
        return []
    except:
        return []

def get_watch_links(episode_id):
    try:
        url = f"https://admin.dramaramadan.net/api/episodes/show.php?id={episode_id}"
        response = requests.get(url, headers=DEFAULT_HEADERS, timeout=8)
        if response.status_code == 200:
            data = response.json()
            if data.get("status") == "success" and data.get("data"):
                watch_links = data["data"].get("watch_links", [])
                return [{"quality": link.get("quality", "غير معروف"), "url": link.get("url")} for link in watch_links]
        return []
    except:
        return []

def get_full_image_url(path):
    if not path:
        return None
    if path.startswith('http'):
        return path
    return f"https://admin.dramaramadan.net{path}"

def open_image(url):
    if url:
        webbrowser.open(url)
        return True
    return False

def display_all_filters(all_filters_data):
    """عرض جميع الفلاتر مع ترقيم مستمر"""
    current_global_idx = 1
    
    for filter_data in all_filters_data:
        if filter_data["number"] == 1:
            print(f"\n{'='*100}")
            print(f"  🔥 {filter_data['number']}. {filter_data['name']} 🔥")
            print(f"{'='*100}")
        elif filter_data["number"] == 2:
            print(f"\n{'='*100}")
            print(f"  ⭐ {filter_data['number']}. {filter_data['name']} ⭐")
            print(f"{'='*100}")
        else:
            print(f"\n{'='*100}")
            print(f"  📌 {filter_data['number']}. {filter_data['name']}")
            print(f"{'='*100}")
        
        for idx, series in enumerate(filter_data["series"], 1):
            title = series.get('title_ar', 'بدون عنوان')
            rating = series.get('rating', '0.0')
            year = series.get('release_year', 'N/A')
            country = series.get('country', '')
            genres = series.get('genres', [])
            genre_str = ', '.join(genres[:2]) if genres else '-'
            views = series.get('views_count', 0)
            
            poster = series.get('poster', '')
            poster_url = get_full_image_url(poster)
            
            status = series.get('status', '')
            status_icon = '🟢' if status == 'ongoing' else '✅' if status == 'completed' else ''
            
            try:
                rating_num = float(rating)
                stars = '⭐' * min(5, int(rating_num)) + '☆' * (5 - min(5, int(rating_num)))
            except:
                stars = '☆☆☆☆☆'
            
            print(f"\n  [{current_global_idx:3}] 🎬 {title}")
            print(f"       {stars} ({rating}) | 📅 {year} | 🌍 {country} | 👁️ {views:,} {status_icon}")
            print(f"       🎭 {genre_str}")
            if poster_url:
                print(f"       🖼️  {poster_url}")
            
            current_global_idx += 1
        
        print(f"{'='*100}")
    
    return current_global_idx - 1

def display_series_details(series, global_num, filter_name):
    title = series.get('title_ar', 'بدون عنوان')
    title_en = series.get('title_en', '')
    rating = series.get('rating', '0.0')
    year = series.get('release_year', 'N/A')
    country = series.get('country', '')
    genres = series.get('genres', [])
    genre_str = ', '.join(genres) if genres else 'غير محدد'
    story = series.get('story', 'لا توجد قصة متاحة')
    status = series.get('status', '')
    status_text = '🟢 مستمر' if status == 'ongoing' else '✅ مكتمل' if status == 'completed' else status
    episode_count = series.get('episode_count', '?')
    views_count = series.get('views_count', 0)
    release_date = series.get('release_date', 'N/A')
    
    poster = series.get('poster', '')
    poster_url = get_full_image_url(poster)
    
    banner = series.get('banner', '')
    banner_url = get_full_image_url(banner)
    
    try:
        rating_num = float(rating)
        stars = '⭐' * min(5, int(rating_num)) + '☆' * (5 - min(5, int(rating_num)))
    except:
        stars = '☆☆☆☆☆'
    
    print("\n" + "="*100)
    print(f"📺  [{global_num}] {title}")
    if title_en:
        print(f"     ({title_en})")
    print(f"     📍 من فلتر: {filter_name}")
    print("="*100)
    print(f"\n{stars} التقييم: {rating}")
    print(f"📅 سنة الإنتاج: {year}  |  📆 تاريخ الإصدار: {release_date}")
    print(f"🌍 الدولة: {country}  |  👁️ عدد المشاهدات: {views_count:,}")
    print(f"🎭 التصنيفات: {genre_str}")
    print(f"📊 الحالة: {status_text}  |  🎬 عدد الحلقات: {episode_count}")
    
    print(f"\n{'─' * 100}")
    print("📖 القصة:")
    for line in story.split('\n'):
        for i in range(0, len(line), 95):
            print(f"   {line[i:i+95]}")
    
    print(f"\n{'─' * 100}")
    print("🖼️  روابط الصور:")
    if poster_url:
        print(f"\n   📸 البوستر (Poster):")
        print(f"      {poster_url}")
        print(f"      💡 اضغط 1 لفتح الصورة")
    else:
        print(f"\n   📸 البوستر: لا يوجد")
    
    if banner_url:
        print(f"\n   🎨 البانر (Banner):")
        print(f"      {banner_url}")
        print(f"      💡 اضغط 2 لفتح الصورة")
    else:
        print(f"\n   🎨 البانر: لا يوجد")
    
    print("="*100)
    
    while True:
        img_input = input("\n👉 (1=بوستر, 2=بانر, Enter=رجوع): ").strip()
        if img_input == '1':
            if poster_url and open_image(poster_url):
                print("✅ تم فتح البوستر")
            else:
                print("❌ لا يوجد رابط")
        elif img_input == '2':
            if banner_url and open_image(banner_url):
                print("✅ تم فتح البانر")
            else:
                print("❌ لا يوجد رابط")
        elif img_input == '':
            break
        else:
            print("❌ 1=بوستر, 2=بانر, Enter=رجوع")

def display_seasons(seasons):
    print("\n" + "="*55)
    print("🎬  المواسم:")
    print("="*55)
    for idx, season in enumerate(seasons, 1):
        season_num = season.get('season_number', idx)
        ep_count = season.get('episode_count', '?')
        print(f"  {idx}. الموسم {season_num} ({ep_count} حلقة)")
    print("="*55)

def display_episodes(episodes):
    total = len(episodes)
    print("\n" + "="*70)
    print(f"📺  الحلقات (إجمالي {total} حلقة):")
    print("="*70)
    
    cols = 6
    rows = (total + cols - 1) // cols
    for row in range(rows):
        line = []
        for col in range(cols):
            idx = row * cols + col
            if idx < total:
                ep_num = episodes[idx].get('episode_number', idx + 1)
                line.append(f"{idx+1:2}. حلقة {ep_num:2}")
            else:
                line.append(" " * 12)
        print("   ".join(line))
    print("="*70)

def display_links(links, series_title, episode_num):
    print("\n" + "="*70)
    print(f"🎬  {series_title} - الحلقة {episode_num}")
    print("="*70)
    
    if not links:
        print("\n❌ لا توجد روابط")
        return
    
    for idx, link in enumerate(links, 1):
        quality = link.get('quality', 'جودة')
        url = link.get('url', '#')
        print(f"\n{idx}. 🎥 {quality}")
        print(f"   🔗 {url}")
    print("\n" + "="*70)

def show_help():
    print("\n" + "="*65)
    print("💡  الأوامر:")
    print("="*65)
    print("  →  Enter        : إضافة مسلسلات جديدة (العداد يكمل)")
    print("  →  رقم (مثال: 15) : مشاهدة مسلسل بالرقم العالمي")
    print("  →  d+رقم (مثال: d15) : تفاصيل المسلسل")
    print("  →  في التفاصيل: 1=بوستر, 2=بانر")
    print("  →  H / h        : مساعدة")
    print("  →  Q / q        : خروج")
    print("="*65)

def main():
    items_per_filter = 6
    all_filters_data = []  # تخزين جميع الفلاتر مع مسلسلاتها
    all_series_global = []  # تخزين جميع المسلسلات مع أرقامها
    
    print("="*100)
    print("""
    ╔════════════════════════════════════════════════════════════════════════════════╗
    ║                                                                                ║
    ║                         🎬  جميع المسلسلات - كل الفلاتر 🎬                      ║
    ║                                                                                ║
    ║                    ✓ ترقيم عالمي مستمر على جميع المسلسلات                       ║
    ║                    ✓ Enter يضيف مسلسلات جديدة (بدون فقدان)                      ║
    ║                    ✓ العداد يكمل من حيث انتهى                                   ║
    ║                                                                                ║
    ╚════════════════════════════════════════════════════════════════════════════════╝
    """)
    print("="*100)
    
    # التحميل الأول
    print("\n🔄 جاري تحميل المسلسلات لأول مرة...")
    all_filters_data = load_all_filters_parallel(limit=items_per_filter)
    
    if not all_filters_data:
        print("\n❌ فشل في تحميل البيانات")
        return
    
    # بناء القائمة العالمية
    for fd in all_filters_data:
        for series in fd["series"]:
            all_series_global.append({
                "series": series,
                "filter_name": fd["name"]
            })
    
    print("\n\n✅ تم التحميل بنجاح!")
    
    while True:
        clear_screen()
        
        print("="*100)
        print("""
    ╔════════════════════════════════════════════════════════════════════════════════╗
    ║                                                                                ║
    ║                         🎬  جميع المسلسلات - كل الفلاتر 🎬                      ║
    ║                                                                                ║
    ║                    ✓ ترقيم عالمي مستمر على جميع المسلسلات                       ║
    ║                    ✓ Enter يضيف مسلسلات جديدة (بدون فقدان)                      ║
    ║                    ✓ العداد يكمل من حيث انتهى                                   ║
    ║                                                                                ║
    ╚════════════════════════════════════════════════════════════════════════════════╝
        """)
        print("="*100)
        
        # عرض جميع الفلاتر
        total_series = display_all_filters(all_filters_data)
        
        print(f"\n{'='*100}")
        print(f"📊 إجمالي المسلسلات المعروضة: {total_series} مسلسل")
        print(f"📌 الترقيم مستمر من 1 إلى {total_series}")
        print(f"{'='*100}")
        print("\n💡 [Enter] مسلسلات جديدة  |  [رقم] مشاهدة  |  [d+رقم] تفاصيل  |  [H] مساعدة  |  [Q] خروج")
        print("="*100)
        
        user_input = input("\n👉 ").strip()
        
        # Enter => إضافة مسلسلات جديدة (بدون فقدان القديم)
        if user_input == "":
            print("\n🔄 جاري إضافة مسلسلات جديدة...")
            
            # جلب دفعة جديدة لكل فلتر
            new_filters_data = load_all_filters_parallel(limit=items_per_filter)
            
            if new_filters_data:
                added_count = 0
                # دمج البيانات الجديدة مع القديمة
                for new_fd in new_filters_data:
                    # البحث عن الفلتر المطابق في البيانات القديمة
                    for existing_fd in all_filters_data:
                        if existing_fd["number"] == new_fd["number"]:
                            # إضافة المسلسلات الجديدة إلى الفلتر الموجود
                            for series in new_fd["series"]:
                                existing_fd["series"].append(series)
                                all_series_global.append({
                                    "series": series,
                                    "filter_name": new_fd["name"]
                                })
                                added_count += 1
                            break
                
                total_now = len(all_series_global)
                print(f"\n✅ تم إضافة {added_count} مسلسل جديد")
                print(f"📊 إجمالي المسلسلات الآن: {total_now} مسلسل")
                print(f"📌 الأرقام من {total_now - added_count + 1} إلى {total_now} هي المسلسلات الجديدة")
                input("\n🔙 اضغط Enter للمتابعة...")
                continue
            else:
                print("❌ فشل في جلب مسلسلات جديدة")
                input("\nاضغط Enter للمتابعة...")
                continue
        
        if user_input.lower() == 'h':
            show_help()
            input("\nاضغط Enter...")
            continue
        
        if user_input.lower() == 'q':
            print("\n👋 مع السلامة!")
            break
        
        # d+رقم => تفاصيل
        if user_input.lower().startswith('d'):
            try:
                num = int(user_input[1:])
                if 1 <= num <= len(all_series_global):
                    selected = all_series_global[num - 1]
                    clear_screen()
                    display_series_details(selected["series"], num, selected["filter_name"])
                    continue
                else:
                    print(f"❌ الرقم يجب أن يكون بين 1 و {len(all_series_global)}")
                    input("\nاضغط Enter...")
                    continue
            except:
                print("❌ استخدم الصيغة: d+رقم (مثال: d15)")
                input("\nاضغط Enter...")
                continue
        
        # رقم => مشاهدة مسلسل
        try:
            series_choice = int(user_input)
            if 1 <= series_choice <= len(all_series_global):
                selected = all_series_global[series_choice - 1]
                series = selected["series"]
                series_id = series['id']
                series_title = series['title_ar']
                filter_name = selected["filter_name"]
                
                clear_screen()
                print(f"\n✅ [{series_choice}] {series_title}")
                print(f"   📍 من فلتر: {filter_name}")
                
                print("\n⏳ جاري جلب المواسم...")
                seasons = get_seasons(series_id)
                
                if len(seasons) > 1:
                    display_seasons(seasons)
                    season_input = input("\n👉 رقم الموسم (Enter للرجوع): ").strip()
                    if season_input == "":
                        continue
                    season_choice = int(season_input)
                    if 1 <= season_choice <= len(seasons):
                        season = seasons[season_choice - 1]
                    else:
                        continue
                else:
                    season = seasons[0]
                    season_num = season.get('season_number', 1)
                    print(f"\n✅ الموسم {season_num}")
                
                season_id = season['id']
                season_num = season.get('season_number', 1)
                
                print(f"\n⏳ جاري جلب حلقات الموسم {season_num}...")
                episodes = get_episodes(season_id)
                
                if not episodes:
                    print("❌ لا توجد حلقات")
                    input("\nاضغط Enter...")
                    continue
                
                display_episodes(episodes)
                
                ep_input = input("\n👉 رقم الحلقة (Enter للرجوع): ").strip()
                if ep_input == "":
                    continue
                ep_choice = int(ep_input)
                if 1 <= ep_choice <= len(episodes):
                    episode = episodes[ep_choice - 1]
                    episode_num = episode.get('episode_number', ep_choice)
                    episode_id = episode['id']
                    
                    print(f"\n⏳ جاري جلب الروابط...")
                    links = get_watch_links(episode_id)
                    
                    clear_screen()
                    display_links(links, series_title, episode_num)
                    
                    input("\n🔙 اضغط Enter للعودة...")
                    continue
            else:
                print(f"❌ الرقم بين 1 و {len(all_series_global)}")
                input("\nاضغط Enter...")
                continue
        except ValueError:
            print("❌ أمر غير معروف")
            print("   • اضغط Enter لإضافة مسلسلات جديدة")
            print("   • اكتب رقم للمشاهدة")
            print("   • اكتب d+رقم للتفاصيل")
            input("\nاضغط Enter...")
            continue

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n👋 مع السلامة! شكراً لاستخدام المشغل 🎬")