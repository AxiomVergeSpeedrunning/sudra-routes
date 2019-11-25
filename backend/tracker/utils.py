import json

translations = [
    ('GameDifficulty', 'difficulty'),
    ('ItemPercent', 'overall_item_percentage'),
    ('ScreenPercent', 'overall_map_percentage'),
    ('TraceCurrentHP', 'current_health'),
    ('TraceMaxHP', 'max_health'),
    ('BubblesPopped', 'red_goo_destroyed'),
    ('BlocksBroken', 'bricks_destroyed'),
    ('CreaturesGlitched', 'creatures_glitched'),
    ('NumDeaths', 'deaths'),
    ('InGameAreaName', 'area_name'),
    ('CurrentAreaItemPercent', 'area_item_percentage'),
    ('CurrentAreaScreenPercent', 'area_map_percentage'),
]


def translate_data(data, tracker_info):
    parsed = json.loads(data)

    for orig, new in translations:
        setattr(tracker_info, new, parsed.get(orig))
