// Dark Sky Systems LLC — DSS-FP-OEM REV C
// mm · shop file · do not publish on the website
// Plate: /oem/  ·  this file: /cad/dss-fp-oem.scad
// Glass +Z. Do not clip a PortaPack or side sled.

panel_w  = 440.4;
panel_h  = 254.4;
panel_t  = 45.9;
bezel    = 18.0;
vesa     = 100;
standoff = 8.0;

can_w    = 190;
can_h    = 110;
can_t    = 36;
can_wall = 2.0;

hf_w = 120; hf_h = 75; hf_t = 12;
esp_w = 45; esp_h = 28; esp_t = 8;
gps_w = 36; gps_h = 36; gps_t = 8;

bat_w   = 190;
bat_h   = 110;
bat_t   = 52;
bat_gap = 4.0;

show_battery = 0; // 0 desk  ·  1 field dock
exploded     = 0; // 1 → 48 mm gaps
$fn = 48;

whip_l = 70;
exp_g  = exploded ? 48 : 0;

desk_d  = panel_t + standoff + can_t;              // 89.9
field_d = desk_d + bat_gap + bat_t;                // 145.9

echo("DSS-FP-OEM REV C");
echo(str("DESK  W ", panel_w, "  H ", panel_h, "  D ", desk_d));
echo(str("FIELD W ", panel_w, "  H ", panel_h, "  D ", field_d));

module roundbox(sx, sy, sz, r = 2) {
  hull() {
    for (x = [-1, 1], y = [-1, 1])
      translate([x * (sx / 2 - r), y * (sy / 2 - r), 0])
        cylinder(h = sz, r = r, center = true);
  }
}

module vesa_holes(pitch = vesa, d = 4.2, t = 20) {
  for (x = [-1, 1], y = [-1, 1])
    translate([x * pitch / 2, y * pitch / 2, 0])
      cylinder(h = t, d = d, center = true);
}

module sma_bulkhead() {
  color("#c9a227") cylinder(h = 8, d = 6.35, center = true);
  color("#222") cylinder(h = 3, d = 8, center = true);
}

module whip() {
  color("#1a1a1a") cylinder(h = whip_l, d = 5);
  color("#c9a227") cylinder(h = 6, d = 6.5);
}

module panel() {
  difference() {
    color("#141414") roundbox(panel_w, panel_h, panel_t, 3);
    translate([0, 0, panel_t / 2 - 0.6])
      color("#07140c") cube([panel_w - 2 * bezel, panel_h - 2 * bezel, 2], center = true);
    translate([0, 0, -panel_t / 2])
      vesa_holes(vesa, 4.2, 16);
  }
  // glass
  translate([0, 0, panel_t / 2 - 0.4])
    color([0.05, 0.18, 0.08, 0.85])
      cube([panel_w - 2 * bezel, panel_h - 2 * bezel, 0.8], center = true);
}

module hackrf() {
  color("#2f6b32") cube([hf_w, hf_h, hf_t], center = true);
  translate([hf_w / 2 - 6, 0, 0])
    color("#c9a227") cube([10, 12, 5], center = true); // USB
}

module esp32() {
  color("#111") cube([esp_w, esp_h, esp_t], center = true);
}

module gps() {
  color("#111") cube([gps_w, gps_h, gps_t], center = true);
}

module radio_can() {
  difference() {
    color([0.72, 0.76, 0.80, 0.38]) roundbox(can_w, can_h, can_t, 2);
    cube([can_w - 2 * can_wall, can_h - 2 * can_wall, can_t - 2 * can_wall], center = true);
  }
  // internals
  translate([8, 6, 0]) hackrf();
  translate([-62, 18, 0]) esp32();
  translate([-62, -22, 0]) gps();
  // SMA row on TOP edge: WB | RID | GPS
  for (i = [-1, 0, 1]) {
    translate([i * 28, can_h / 2, 0]) rotate([-90, 0, 0]) {
      sma_bulkhead();
      translate([0, 0, 4]) whip();
    }
  }
}

module battery() {
  color("#0d0d0d") roundbox(bat_w, bat_h, bat_t, 2);
  translate([0, -bat_h / 2 + 8, bat_t / 2 - 4])
    color("#c9a227") cube([14, 10, 8], center = true); // XT60
}

module assembly() {
  panel();
  z_can = -(panel_t / 2 + standoff + can_t / 2) - exp_g;
  translate([0, 0, z_can]) radio_can();
  if (show_battery)
    translate([0, 0, z_can - can_t / 2 - bat_gap - bat_t / 2 - exp_g])
      battery();
}

assembly();
