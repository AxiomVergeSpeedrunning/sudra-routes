import json

translations = [
    ('GameDifficulty', 'difficulty'),
    ('ItemCount', 'overall_item_percentage'),
    ('ScreenCount', 'overall_map_percentage'),
    ('HitPoints', 'current_health'),
    ('MaxHitPoints', 'max_health'),
    ('RedGooDestroyed', 'red_goo_destroyed'),
    ('BricksDestroyed', 'bricks_destroyed'),
    ('CreaturesGlitched', 'creatures_glitched'),
    ('NumDeaths', 'deaths'),
    ('AreaName', 'area_name'),
    ('ItemsCounts', 'area_item_percentage'),
    ('ScreenCounts', 'area_map_percentage'),
]


def translate_data(data, tracker_info):
    parsed = json.loads(data)

    for orig, new in translations:
        setattr(tracker_info, new, parsed.get(orig))
