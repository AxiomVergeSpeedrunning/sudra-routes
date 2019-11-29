import json
from .translations import translations


def get(instance, attr, is_dict=False):
    if is_dict:
        try:
            return instance[attr]
        except KeyError:
            instance[attr] = {}
            return instance[attr]

    return getattr(instance, attr)


def set(instance, attr, val, is_dict=False):
    if is_dict:
        instance[attr] = val
    else:
        setattr(instance, attr, val)


def generate_tree(data, instance, translator, is_dict=False):
    for translation in translator:
        if len(translation) == 3:
            orig, new, translator = translation

            if is_dict:
                try:
                    get(instance, new, is_dict)
                except AttributeError:
                    set(instance, new, {}, is_dict)

            generate_tree(data.get(orig), get(instance, new, is_dict), translator, is_dict)
            continue

        orig, new = translation

        set(instance, new, data.get(orig), is_dict)


def translate_data(data, tracker_info, is_dict=False):
    parsed = json.loads(data)
    generate_tree(parsed, tracker_info, translations, is_dict)
