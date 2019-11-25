translations = [
    ('GameDifficulty', 'difficulty'),
    ('ItemCount', 'area_item_percentage'),
    ('ScreenCount', 'area_map_percentage'),
    ('HitPoints', 'current_health'),
    ('MaxHitPoints', 'max_health'),
    ('RedGooDestroyed', 'red_goo_destroyed'),
    ('BricksDestroyed', 'bricks_destroyed'),
    ('CreaturesGlitched', 'creatures_glitched'),
    ('NumDeaths', 'deaths'),
    ('AreaName', 'area_name'),
    ('ItemsCounts', 'overall_item_percentage'),
    ('ScreenCounts', 'overall_map_percentage'),
]


def translate_data(data, tracker_info):
    for orig, new in translations:
        setattr(tracker_info, new, data.get(orig))
