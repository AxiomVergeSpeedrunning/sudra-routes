import json
from .translations import translations


def generate_tree(data, instance, translator):
    for translation in translator:
        if len(translation) == 3:
            orig, new, translator = translation

            try:
                getattr(instance, new)
            except AttributeError:
                setattr(instance, new, {})

            generate_tree(data.get(orig), getattr(instance, new), translator)
            continue

        orig, new = translation

        setattr(instance, new, data.get(orig))


def translate_data(data, tracker_info):
    parsed = json.loads(data)
    generate_tree(parsed, tracker_info, translations)
