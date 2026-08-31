// Dark Sky Systems LLC — DSS-FP Field Pad sled
// Drawing: /cutsheet/  ·  DSS-FP-CS REV A
// H4M body values are MEASURE-ON-UNIT start. Do not use Amazon box size.
// Confirm panel_t at the RIGHT EDGE before printing.

h4m_w   = 78.0;   // mm  body width   MEASURE-ON-UNIT
h4m_h   = 128.0;  // mm  body height  MEASURE-ON-UNIT
h4m_t   = 24.0;   // mm  body thick   MEASURE-ON-UNIT
panel_t = 45.9;   // mm  Envelope A overall. CONFIRM at right edge.
bezel_f = 47.5;   // mm  DERIVED start: (440.4 − 15.6" 16:9 active)/2. MEASURE-ON-UNIT.

clearance = 0.45; // mm per side (pocket = H4M + 0.45/side)
jaw_w     = 28.0; // mm U-clamp jaw / front hook, behind glass plane
wall      = 1.60; // mm PRINT SETTING: 4 perimeters @ 0.4 mm nozzle
gyroid    = 30;   // % infill
m3_n      = 2;    // pinch screws

// Envelope A (primary): 440.4 × 254.4 × 45.9 mm
// Envelope B (do not mix): 400.4 × 254.4 × 58.8 mm
// Pocket inner: [h4m_w, h4m_h] + 2*clearance, open front (screen + wheel free)
// USB-C toward panel, slot to panel rear. SMA top×1, SMA bottom×2 notches.
