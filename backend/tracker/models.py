from django.db import models
from django.contrib.auth.models import User


class TrackerInformation(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='tracker_info', primary_key=True)
    difficulty = models.CharField(max_length=256, null=True, blank=True)
    area_item_percentage = models.IntegerField(null=True, blank=True)
    area_map_percentage = models.IntegerField(null=True, blank=True)
    current_health = models.IntegerField(null=True, blank=True)
    max_health = models.IntegerField(null=True, blank=True)
    red_goo_destroyed = models.IntegerField(null=True, blank=True)
    bricks_destroyed = models.IntegerField(null=True, blank=True)
    creatures_glitched = models.IntegerField(null=True, blank=True)
    deaths = models.IntegerField(null=True, blank=True)
    area_name = models.CharField(max_length=256, null=True, blank=True)
    overall_item_percentage = models.IntegerField(null=True, blank=True)
    overall_map_percentage = models.IntegerField(null=True, blank=True)


class ItemTracker(models.Model):
    main_info = models.OneToOneField(
        TrackerInformation,
        on_delete=models.CASCADE,
        related_name='item_info',
        primary_key=True,
    )

    # Tools
    address_bomb = models.BooleanField(null=True, blank=True)
    address_disruptor_1 = models.BooleanField(null=True, blank=True)
    address_disruptor_2 = models.BooleanField(null=True, blank=True)
    bioflux_1 = models.BooleanField(null=True, blank=True)
    bioflux_2 = models.BooleanField(null=True, blank=True)
    drill = models.BooleanField(null=True, blank=True)
    drone = models.BooleanField(null=True, blank=True)
    drone_teleport = models.BooleanField(null=True, blank=True)
    enhanced_launch = models.BooleanField(null=True, blank=True)
    grapple = models.BooleanField(null=True, blank=True)
    high_jump = models.BooleanField(null=True, blank=True)
    lab_coat = models.BooleanField(null=True, blank=True)
    password_tool = models.BooleanField(null=True, blank=True)
    red_coat = models.BooleanField(null=True, blank=True)
    sudran_key = models.BooleanField(null=True, blank=True)
    trench_coat = models.BooleanField(null=True, blank=True)

    # Weapons
    disruptor = models.BooleanField(null=True, blank=True)
    data_bomb = models.BooleanField(null=True, blank=True)
    distortion_field = models.BooleanField(null=True, blank=True)
    firewall = models.BooleanField(null=True, blank=True)
    flamethrower = models.BooleanField(null=True, blank=True)
    inertial_pulse = models.BooleanField(null=True, blank=True)
    ion_beam = models.BooleanField(null=True, blank=True)
    kilver = models.BooleanField(null=True, blank=True)
    lightning_gun = models.BooleanField(null=True, blank=True)
    multi_disruptor = models.BooleanField(null=True, blank=True)
    nova = models.BooleanField(null=True, blank=True)
    reflector = models.BooleanField(null=True, blank=True)
    reverse_slicer = models.BooleanField(null=True, blank=True)
    shards = models.BooleanField(null=True, blank=True)
    quantum_variegator = models.BooleanField(null=True, blank=True)
    tethered_charge = models.BooleanField(null=True, blank=True)
    hypo_atomizer = models.BooleanField(null=True, blank=True)
    voranj = models.BooleanField(null=True, blank=True)
    orbital_discharge = models.BooleanField(null=True, blank=True)
    turbine_pulse = models.BooleanField(null=True, blank=True)

    # Collectables
    health_nodes = models.IntegerField(null=True, blank=True)
    power_nodes = models.IntegerField(null=True, blank=True)

    health_fragments = models.IntegerField(null=True, blank=True)
    power_fragments = models.IntegerField(null=True, blank=True)

    note_count = models.IntegerField(null=True, blank=True)
