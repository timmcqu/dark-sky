(function () {
  "use strict";
  var RELAY = "https://formsubmit.co/ajax/9e30fb114bdd52baca9ba3fc044fe19b";
  var SKUS = {
    ra: {
      title: "Site survey pack",
      lede: "A written observation file you keep with the emergency action plan — people, ways out, holes, confined space, medical access.",
      price: "$500",
      amount: "500",
      chase: "",
      stripe: "",
      gets: [
        "A fillable observation template for one named property",
        "First-in annex: people, ways out, excavation, confined space, medical, apparatus path",
        "How to keep the file with the emergency action plan",
        "Emailed after the deposit posts"
      ]
    },
    cards: {
      title: "Field cards pack",
      lede: "Emergency and contingency procedures the PIC briefs the crew before launch — one card per problem.",
      price: "$250",
      amount: "250",
      chase: "",
      stripe: "",
      gets: [
        "Flyaway, lost link, crash, battery fire, medical",
        "Abort, 911, and the 10-day FAA report if the crash qualifies",
        "Print, laminate, and keep them with the crew’s emergency kit"
      ]
    },
    eventpack: {
      title: "Event window pack",
      lede: "The risk file for a venue and a date. Score people, air, and ground before gates. Update it when conditions change. Close it with an after-action.",
      price: "$750",
      amount: "750",
      chase: "",
      stripe: "",
      gets: [
        "Risk matrix before the event — crowd, TFR, packs, EMS access",
        "Live assessment while you are there",
        "After-action, contingency procedures, and sample language for the venue operations file"
      ]
    },
    soft: {
      title: "Fusion Sensor",
      lede: "Fusion Sensor on your laptop. You already have the radios.",
      price: "$2,000",
      amount: "2000",
      chase: "",
      stripe: "",
      gets: [
        "Fusion Sensor console on a laptop you already own",
        "Live map: authorized aircraft marked as authorized, other transmitting aircraft flagged",
        "Spectrum on 2.4 and 5.8 GHz, ADS-B for manned traffic",
        "Fingerprints for Avata, Autel, Mini, and the rest",
        "Exportable log when someone asks what was in the air",
        "You supply the radios. We send the license after payment."
      ]
    },
    basic_m: {
      title: "Monitoring · Basic",
      lede: "One site on a live map. Authorized aircraft are marked as authorized. Other transmitting aircraft are flagged. Alerts. Ninety days of records.",
      price: "$250 / month",
      amount: "250",
      chase: "",
      stripe: "",
      gets: [
        "One named site on a live map your operations team can keep",
        "Authorized aircraft marked as authorized; other transmitting aircraft flagged",
        "Alerts when an unauthorized aircraft is transmitting",
        "Ninety days of archive when counsel asks what happened",
        "Setup email after the first payment posts"
      ]
    },
    basic_y: {
      title: "Monitoring · Basic (year)",
      lede: "Same as Basic. One year, paid once. You save two months versus paying monthly.",
      price: "$2,500 / year",
      amount: "2500",
      chase: "",
      stripe: "",
      gets: [
        "One named site on a live map your operations team can keep",
        "Authorized aircraft marked as authorized; other transmitting aircraft flagged",
        "Alerts when an unauthorized aircraft is transmitting",
        "Ninety days of archive",
        "One invoice for the year"
      ]
    },
    pro_m: {
      title: "Monitoring · Pro",
      lede: "Multi-site. API. Webhooks. Two-year archive.",
      price: "$750 / month",
      amount: "750",
      chase: "",
      stripe: "",
      gets: ["Multi-site", "API and webhooks", "Two-year archive"]
    },
    pro_y: {
      title: "Monitoring · Pro (year)",
      lede: "Same as Pro. One year, paid once.",
      price: "$7,500 / year",
      amount: "7500",
      chase: "",
      stripe: "",
      gets: ["Multi-site", "API and webhooks", "Two-year archive"]
    },
    campus: {
      title: "Campus & Facility Assurance",
      lede: "Four flown visits a year with stills and thermal, detection while we are on site, and one observation file. Not unattended 24/7 monitoring.",
      price: "$18,000 / year",
      amount: "18000",
      chase: "",
      stripe: "",
      gets: [
        "Four flown visits with stills and thermal",
        "Detection while we are on site (we bring the radios)",
        "One observation file the emergency action plan can keep",
        "Setup email after payment so we lock the visit dates"
      ]
    },
    build: {
      title: "Construction Progress",
      lede: "Weekly or bi-weekly progress flights while the job is open. Thermal as needed. Air map on request.",
      price: "$2,500 / month",
      amount: "2500",
      chase: "",
      stripe: "",
      gets: [
        "Weekly or bi-weekly progress flights while the job is open",
        "Thermal when the deck or the hole needs heat",
        "Air map on request",
        "Setup email after the first payment posts"
      ]
    },
    venue: {
      title: "Venue & Event Season",
      lede: "Named dates: pre-survey, coverage while gates are open, air map, and close-out file.",
      price: "$8,500 / season",
      amount: "8500",
      chase: "",
      stripe: "",
      gets: [
        "Pre-survey before the first named date",
        "Coverage while gates are open",
        "Air map and close-out file",
        "Setup email after payment so we lock the season dates"
      ]
    },
    risk_report: {
      title: "Unauthorized Drone Risk Assessment Report",
      lede: "A written score for the place you named: findings, recommended monitoring level, and what to do next. Instant after payment.",
      price: "$79",
      amount: "79",
      chase: "",
      stripe: "",
      gets: [
        "A written risk score for the named location, out of 100",
        "What drove the score: people, airspace, prior incidents",
        "The monitoring or event package we recommend",
        "Plain-language next steps you can print and send upstairs",
        "Open the report on the next page immediately after payment"
      ]
    },
    obs_templates: {
      title: "Observation File Template Pack",
      lede: "Professional templates and a how-to so your site, event, or emergency plan has a file first-in can actually use.",
      price: "$49",
      amount: "49",
      chase: "",
      stripe: "",
      gets: [
        "Site observation template you fill for a named property",
        "Event and first-in annex: gates, pinch, apparatus, medical",
        "How-to guide so the file actually gets used",
        "PDF download on the thank-you page — no waiting on email"
      ]
    },
    training_pack: {
      title: "Airspace Awareness Essentials",
      lede: "Remote ID, how to run a monitoring session, and a first-responder checklist. Print it and keep it with the crew’s emergency kit.",
      price: "$99",
      amount: "99",
      chase: "",
      stripe: "",
      gets: [
        "Remote ID in language a crew can brief",
        "How to run a monitoring session: authorized list, hold unknown contacts, export the log",
        "First-responder size-up checklist: scene, abort, 911, battery",
        "PDF download on the thank-you page — print and keep with the crew’s emergency kit"
      ]
    },
    eap_pack: {
      title: "Emergency Action Plan Pack",
      lede: "Professional templates your company uses to build its Emergency Action Plan. Fill in your site: how people report an emergency, exits, assembly, medical, and how first-in companies get in. PDF and an editable file, immediately after payment.",
      price: "$149",
      amount: "149",
      chase: "",
      stripe: "",
      gets: [
        "Professional templates you complete for your named site",
        "Reporting, exit routes, assembly, medical, and first-in access",
        "PDF plus an editable file for your operations team",
        "Instant download on the thank-you page",
        "Drafting aid covering the topics OSHA expects in an EAP (29 CFR 1910.38 / 1926.35)",
        "You write the plan. This is not an inspection and not a PE stamp"
      ]
    },
    airspace_report: {
      title: "Named Location Airspace Awareness Report",
      lede: "One named place. A written summary from your risk inputs and airspace context, delivered after payment.",
      price: "$149",
      amount: "149",
      chase: "",
      stripe: "",
      gets: [
        "Written summary for one named campus, job, or venue",
        "Risk score from the facts you submit",
        "Airspace context in plain language",
        "Recommended next step (monitoring or a single-event package)",
        "Open the report on the thank-you page and save as PDF"
      ]
    },
    event_package: {
      title: "Single-Event Airspace Awareness Package",
      lede: "Know what is in the air before the gates open, while the event is running, and after it closes. You leave with a written record.",
      price: "$2,495",
      amount: "2495",
      chase: "",
      stripe: "",
      gets: [
        "Pre-event risk survey for the named place and dates",
        "Live coverage on the event day(s): authorized aircraft marked as authorized, other transmitting aircraft flagged",
        "Post-event air map and observation file",
        "Setup email after payment so we lock the dates"
      ]
    },
    events_3: {
      title: "Multi-Event Airspace Package · 3 Events",
      lede: "Coordinated coverage for three named dates — tours, campus series, VIP movements. Each stop gets a survey, live coverage, and a post-event file.",
      price: "$6,495",
      amount: "6495",
      chase: "",
      stripe: "",
      gets: [
        "Three named dates in one package",
        "Pre-event risk survey at each stop",
        "Live coverage on each event day",
        "Post-event air map and observation file at each stop",
        "One operations contact for the series",
        "Setup email after payment so we lock the dates"
      ]
    },
    events_5: {
      title: "Multi-Event Airspace Package · 5 Events",
      lede: "Coordinated coverage for five named dates — tours, campus series, VIP movements. Same deliverable at every stop.",
      price: "$9,995",
      amount: "9995",
      chase: "",
      stripe: "",
      gets: [
        "Five named dates in one package",
        "Pre-event risk survey at each stop",
        "Live coverage on each event day",
        "Post-event air map and observation file at each stop",
        "One operations contact for the series",
        "Setup email after payment so we lock the dates"
      ]
    },
    scene: {
      title: "Drone over the scene",
      lede: "A first-in pocket card for fire and EMS when a drone is over the scene. Print it. Instant file after payment.",
      price: "$19",
      amount: "19",
      chase: "",
      stripe: "",
      gets: [
        "Firefighter size-up: clock, heading, height, what is under it",
        "What to write and the one sentence to command",
        "911 first if people are in danger",
        "Printable PDF after payment"
      ]
    },
    job: {
      title: "Jobsite drone log",
      lede: "A one-page log for an unauthorized drone over one named job. Superintendent fills it. Instant file after payment.",
      price: "$19",
      amount: "19",
      chase: "",
      stripe: "",
      gets: [
        "Log lines: time, clock, heading, photo, RID if visible, who you called",
        "For one named job — keep it with the job file",
        "911 first if people are in danger",
        "Printable PDF after payment"
      ]
    },
    school: {
      title: "School and venue size-up",
      lede: "Admin paper when a drone is over a crowd, campus, or venue. Print it. Instant file after payment.",
      price: "$29",
      amount: "29",
      chase: "",
      stripe: "",
      gets: [
        "Size-up: who has eyes, clock from a named door, what is under it",
        "What to write and who your site already named to call",
        "911 first if people are in danger",
        "Printable PDF after payment"
      ]
    },
    incident: {
      title: "Unauthorized drone incident file",
      lede: "The write-down: photos, time, direction, RID number if visible, who was called. Instant file after payment.",
      price: "$29",
      amount: "29",
      chase: "",
      stripe: "",
      gets: [
        "Incident file for one named place",
        "Photos, time, direction, RID if a display showed one, who you called",
        "911 first if people are in danger",
        "Printable PDF after payment"
      ]
    },
    crew: {
      title: "Crew paper bundle",
      lede: "All four files: scene card, jobsite log, school and venue size-up, incident file. Instant files after payment.",
      price: "$49",
      amount: "49",
      chase: "",
      stripe: "",
      gets: [
        "Drone over the scene — fire / EMS pocket card",
        "Jobsite drone log — one named job",
        "School and venue size-up — admin paper",
        "Unauthorized drone incident file — photos, time, who was called",
        "Four printable PDFs after payment"
      ]
    },

    rid: {
      title: "Remote ID Receiver Board",
      lede: "USB-C ESP32-S3 board for Remote ID receive. We ship it after payment. Receive only. No battery in the box.",
      price: "$39",
      amount: "39",
      chase: "",
      stripe: "",
      photo: "assets/attach/rid.webp?v=1",
      gets: [
        "ESP32-S3 Remote ID Receiver Board with USB-C",
        "Receive only — it does not jam or send a command",
        "No battery or charger in the box",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    listen: {
      title: "Radio + dipole",
      lede: "USB radio with a dipole kit. SMA. Receive only. We ship it after payment.",
      price: "$79",
      amount: "79",
      chase: "",
      stripe: "",
      photo: "assets/attach/listen.webp?v=1",
      gets: [
        "USB radio in a shielded enclosure, SMA connector",
        "Dipole kit: elements, base, extension, suction and mini-tripod mounts",
        "Receive only — it does not jam or transmit",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    ant1090: {
      title: "1090 MHz antenna",
      lede: "SMA whip tuned for 1090 MHz crewed-aircraft broadcasts. We ship it after payment.",
      price: "$29",
      amount: "29",
      chase: "",
      stripe: "",
      photo: "assets/attach/ant1090.webp?v=1",
      gets: [
        "SMA 1090 MHz antenna, about 7.5 inches",
        "Hinged base so it stands next to a radio",
        "Receive only",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email"
      ]
    },
    case: {
      title: "Small hard case",
      lede: "Weatherproof hard case for the board and radio. Pick-and-pluck foam. We ship it after payment.",
      price: "$29",
      amount: "29",
      chase: "",
      stripe: "",
      photo: "assets/attach/case.webp?v=1",
      gets: [
        "Small weatherproof hard case with latches and a purge valve",
        "Pick-and-pluck foam so the radios stay still",
        "Interior about 8 × 5.5 × 3.75 inches",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email"
      ]
    },
    starter: {
      title: "Radio starter",
      lede: "The board and the radio together. Receive only. Not Fusion Sensor. We ship both after payment.",
      price: "$99",
      amount: "99",
      chase: "",
      stripe: "",
      photo: "assets/attach/starter.webp?v=1",
      gets: [
        "Remote ID Receiver Board (USB-C, no battery)",
        "Radio + dipole kit",
        "Receive only. No Fusion Sensor license in this SKU",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email"
      ]
    },
    rider: {
      title: "Portable Remote ID detector",
      lede: "Pocket Remote ID receiver for first responders and site crews. Receives broadcast Remote ID up to about 3 miles. Maps the aircraft and, when it is sent, the pilot. Receive only.",
      price: "$1,799",
      amount: "1799",
      chase: "",
      stripe: "",
      photo: "assets/attach/rider.jpg?v=1",
      gets: [
        "Dronetag RIDER portable Remote ID receiver",
        "ASTM F3411 receive — 2.4 GHz Bluetooth and Wi-Fi",
        "About 3 miles of broadcast Remote ID receive",
        "Maps the aircraft and, when it is sent, the pilot",
        "IP54, USB-C, 6–10 h. 134×53×20 mm, 64 g",
        "Built-in cell ships with the unit. No spare pack",
        "Receive only — it does not jam or transmit",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    therm256: {
      title: "Handheld thermal camera, 256 class",
      lede: "Handheld 256×192 thermal for site picture. Heat contrast, not a medical reading, not a firefighting helmet camera.",
      price: "$549",
      amount: "549",
      chase: "",
      stripe: "",
      photo: "assets/attach/therm256.jpg?v=1",
      gets: [
        "Handheld 256×192 thermal camera",
        "Heat contrast for site picture — not a medical reading",
        "Not a firefighting helmet camera",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    therm320: {
      title: "Handheld thermal camera, 320 class",
      lede: "Handheld 320×240 thermal, IP67, for SAR / site picture. Heat contrast only.",
      price: "$2,199",
      amount: "2199",
      chase: "",
      stripe: "",
      photo: "assets/attach/therm320.jpg?v=1",
      gets: [
        "Handheld 320×240 thermal camera — not 640",
        "IP67 housing for SAR and site picture",
        "Heat contrast only — not a medical reading, not a firefighting camera",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    adsbkit: {
      title: "ADS-B + Remote ID receiver kit",
      lede: "Board plus radio, 1090 and 978 antennas, and a small hard case. Receive only. Not Fusion Sensor.",
      price: "$199",
      amount: "199",
      chase: "",
      stripe: "",
      photo: "assets/attach/adsbkit.jpg?v=1",
      gets: [
        "Remote ID Receiver Board (USB-C, no battery)",
        "Radio with dipole",
        "1090 MHz and 978 MHz receive antennas",
        "Small hard case",
        "Receive only. Not Fusion Sensor",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email"
      ]
    },
    ant2458: {
      title: "2.4 / 5.8 GHz directional antenna",
      lede: "Dual-band directional receive panel, 13 dBi, 2.4 and 5.8 GHz. Passive receive only. N-Female (buyer may need N-to-SMA).",
      price: "$99",
      amount: "99",
      chase: "",
      stripe: "",
      photo: "assets/attach/ant2458.jpg?v=1",
      gets: [
        "Dual-band directional receive panel, 13 dBi",
        "2.4 GHz and 5.8 GHz in one panel",
        "Passive receive only — it does not transmit",
        "N-Female jack (buyer may need N-to-SMA)",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email"
      ]
    },
    r2kit: {
      title: "Motorola two-way radio + surveillance earpiece",
      lede: "A Motorola UHF two-way radio with a discreet acoustic-tube earpiece for field and site comms. The buyer licenses their own radio use. Ships at factory default — no programming sold. Not a jammer.",
      price: "$1,199",
      amount: "1199",
      chase: "",
      stripe: "",
      photo: "assets/attach/r2kit.jpg?v=1",
      gets: [
        "Motorola UHF two-way radio (analog + digital)",
        "Acoustic-tube earpiece with inline mic and PTT",
        "Ships at factory default. No programming sold",
        "Buyer licenses their own use (Part 90). We do not hold the license",
        "Comms — not a C-UAS transmitter, not a jammer",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    r2mic: {
      title: "Motorola speaker microphone",
      lede: "A Motorola speaker microphone for the locked Motorola two-way radio. Clip it to a vest and talk without pulling the radio off the belt.",
      price: "$179",
      amount: "179",
      chase: "",
      stripe: "",
      photo: "assets/attach/r2mic.jpg?v=1",
      gets: [
        "Motorola remote speaker microphone",
        "Fits the locked Motorola two-way radio",
        "Large PTT so the radio stays on the belt",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    "batt-expro": {
      title: "Extra battery for FLIR E5 Pro / E6 Pro / E8 Pro",
      lede: "Official extra battery for a FLIR E5 Pro, E6 Pro, or E8 Pro handheld thermal. Will not fit a TOPDON TC004, a Seek Reveal 300, or a pocket FLIR C5 / C8.",
      price: "$109",
      amount: "109",
      chase: "",
      stripe: "",
      photo: "assets/attach/batt-expro.jpg?v=1",
      gets: [
        "Official extra battery for FLIR E5 Pro / E6 Pro / E8 Pro",
        "Keep one charged so the camera stays in the lane",
        "Will not fit TOPDON TC004, Seek Reveal 300, or FLIR C5 / C8",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    case1200: {
      title: "Pelican 1200 medium hard case",
      lede: "A Pelican 1200 medium hard case for a radio, a receive board, and the small attach that does not fit the compact case. Watertight and crushproof, with pick-and-pluck foam.",
      price: "$139",
      amount: "139",
      chase: "",
      stripe: "",
      photo: "assets/attach/case1200.jpg?v=1",
      gets: [
        "Pelican 1200 medium hard case, black with foam",
        "Watertight, crushproof, dustproof",
        "Pick-and-pluck foam so the kit stays put",
        "Step up from the small case — interior about 9.3 × 7.1 × 4.1 in",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    radiopouch: {
      title: "Condor MOLLE radio pouch",
      lede: "A Condor MOLLE radio pouch that keeps a handheld radio on a carrier or a pack. Default Olive Drab. Hook-and-loop flap, elastic retention.",
      price: "$49",
      amount: "49",
      chase: "",
      stripe: "",
      photo: "assets/attach/radiopouch.jpg?v=1",
      gets: [
        "Condor MOLLE radio pouch, Olive Drab",
        "Holds a handheld radio with room for antenna and ear bud",
        "Hook-and-loop flap and mid-body elastic",
        "Weaves onto a carrier, a pack, or a belt panel",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    lightspeak: {
      title: "Spotlight and loudspeaker payload",
      lede: "A spotlight and loudspeaker payload for a contractor aircraft the buyer already has. One unit that lights a lane and talks to the ground. Not an airframe.",
      price: "$2,999",
      amount: "2999",
      chase: "",
      stripe: "",
      photo: "assets/attach/lightspeak.jpg?v=1",
      gets: [
        "Spotlight and loudspeaker in one payload",
        "Hangs on an airframe the buyer already has — not an aircraft we sell",
        "Live voice, file playback, and text-to-speech",
        "Payload, not a jammer",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },

    pirecv: {
      title: "Pi Receiver",
      lede: "Pi Receiver for Remote ID and ADS-B airspace awareness. Official power and case, receive board, radio + dipole, 1090 whip. No battery. Not Fusion Sensor. Not V4. Receive only.",
      price: "$399",
      amount: "399",
      chase: "",
      stripe: "",
      photo: "assets/products/raspberry-pi-5-remote-id-adsb-receiver.jpg?v=1",
      gets: [
        "Raspberry Pi 5, 4 GB",
        "Official 27 W USB-C power supply",
        "Official Raspberry Pi 5 case with fan — no battery",
        "Remote ID Receiver Board",
        "Radio + dipole",
        "1090 MHz antenna",
        "Not Fusion Sensor. Not V4. Receive only",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    scan: {
      title: "TinySA Ultra portable spectrum scanner",
      lede: "TinySA Ultra handheld spectrum scanner. Walk a site and see what is on the air. Receive / scan only. 32 GB card. Built-in cell ships with the unit. No spare pack. Not a 640 thermal.",
      price: "$349",
      amount: "349",
      chase: "",
      stripe: "",
      photo: "assets/products/tinysa-ultra-portable-spectrum-scanner.jpg?v=1",
      gets: [
        "TinySA Ultra Plus handheld spectrum scanner",
        "32 GB microSD card",
        "Built-in cell ships inside the unit. No spare pack",
        "Receive / scan only — we do not sell a generator or a jammer",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    mlx32: {
      title: "Thermal camera module, 32×24 I2C",
      lede: "32×24 thermal camera module you wire to a host over I2C. A module, not a handheld camera, and not a medical thermometer. No cable, no host, no cell.",
      price: "$149",
      amount: "149",
      chase: "",
      stripe: "",
      photo: "assets/products/thermal-camera-module-32x24-i2c.jpg?v=1",
      gets: [
        "32×24 I2C thermal camera module only",
        "No cable, no host, no cell",
        "Not a handheld camera. Not medical",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    duck2458: {
      title: "2.4 / 5.8 GHz omni receive antenna, RP-SMA",
      lede: "Dual-band indoor omni receive antenna. Articulating RP-SMA whip — not SMA. Passive receive only.",
      price: "$59",
      amount: "59",
      chase: "",
      stripe: "",
      photo: "assets/products/24-58-omni-listen-antenna-rp-sma.jpg?v=1",
      gets: [
        "Dual-band 2.4 / 5.8 GHz indoor omni duck",
        "RP-SMA male. Not SMA. No adapter in the box",
        "Passive receive only — it does not transmit",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    omni2458: {
      title: "2.4 / 5.8 GHz outdoor omni receive antenna",
      lede: "Outdoor dual-band omni receive antenna. Fiberglass stick, N-Female. No mount in the box. Passive receive only.",
      price: "$79",
      amount: "79",
      chase: "",
      stripe: "",
      photo: "assets/products/24-58-outdoor-omni-listen-antenna.jpg?v=1",
      gets: [
        "Outdoor dual-band 2.4 / 5.8 GHz fiberglass omni",
        "N-Female. Not SMA. No mount and no jumper in the box",
        "Passive receive only — it does not transmit",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    sdradv: {
      title: "Advanced radio kit with filter",
      lede: "USB radio with dipole, a 1090 / 978 SAW filter, and a 1090 whip. The filter the $79 and $199 kits do not include. Receive only. Not V4.",
      price: "$279",
      amount: "279",
      chase: "",
      stripe: "",
      photo: "assets/products/listen-radio-dipole.jpg?v=1",
      gets: [
        "Radio + dipole",
        "Dual-band 1090 / 978 SAW filter + LNA",
        "1090 MHz SMA whip",
        "Not V4. Not the $79 or $199 kits. Receive only. No battery",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    rfalert: {
      title: "Remote ID Receiver Alert Kit",
      lede: "USB-C Remote ID alert board with assembled OLED and weatherproof box. Buyer seats the board. More than the $39 bare board. No LiPo. Receive only.",
      price: "$129",
      amount: "129",
      chase: "",
      stripe: "",
      photo: "assets/products/remote-id-receive-board.jpg?v=1",
      gets: [
        "Remote ID Receiver Board",
        "Assembled 128×64 OLED with buttons — no solder",
        "Weatherproof enclosure with clear lid",
        "USB-C only. No LiPo. Buyer seats the board",
        "More than the $39 bare board. Receive only",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },

    pistarter: {
      title: "Pi Receiver Starter",
      lede: "Raspberry Pi 4 starter kit for Remote ID and a wideband radio. Official 15 W USB-C, receive board, radio + dipole. No case. No 1090 whip. Not the $399 Pi 5 kit. Not Fusion Sensor. Not V4. Receive only.",
      price: "$279",
      amount: "279",
      chase: "",
      stripe: "",
      photo: "assets/products/raspberry-pi-4-4gb-remote-id-adsb-listener.jpg?v=1",
      gets: [
        "Raspberry Pi 4, 4 GB",
        "Official 15 W USB-C power supply — not a 27 W Pi 5 brick",
        "Remote ID Receiver Board",
        "Radio + dipole. No 1090 SMA whip in this kit",
        "No official case. No battery. No pre-flashed microSD",
        "Not the $399 Pi 5 receiver. Not Fusion Sensor. Not V4. Receive only",
        "Ships from Dark Sky Systems after Stripe clears",
        "Weekend orders ship Monday. Tracking by email"
      ]
    },
    pipro: {
      title: "Pi Receiver Dual-Band",
      lede: "Raspberry Pi 5 professional kit for Remote ID plus 1090 and 978. Official 27 W and official case. Dual-channel filter on the radio — that filter is why this kit costs more. Not Fusion Sensor. Not V4. Receive only.",
      price: "$549",
      amount: "549",
      chase: "",
      stripe: "",
      photo: "assets/products/raspberry-pi-5-4gb-professional-listener.jpg?v=1",
      gets: [
        "Raspberry Pi 5, 4 GB",
        "Official 27 W USB-C PD and official Pi 5 case with fan — no battery",
        "Remote ID Receiver Board",
        "Radio + dipole",
        "1090 SMA whip and 978 SMA whip",
        "Dual-channel 1090 / 978 filter. The expensive line — about $95 of the kit",
        "Not Fusion Sensor. Not V4. Indoor case, not a weather box. Receive only",
        "Ships from Dark Sky Systems after Stripe clears",
        "Weekend orders ship Monday. Tracking by email"
      ]
    },
    pioutdoor: {
      title: "Pi Receiver Outdoor",
      lede: "Raspberry Pi 5 outdoor kit: IP66 box, Remote ID board, radio, 9 dBi N-female 1090, SMA-to-N jumper. Indoor power brick. Outdoor stick does not screw onto the radio. No battery. Weekend orders ship Monday. Receive only.",
      price: "$649",
      amount: "649",
      chase: "",
      stripe: "",
      photo: "assets/products/outdoor-1090-mhz-9dbi-n-female-base-antenna.jpg?v=1",
      gets: [
        "Raspberry Pi 5, 4 GB — no official indoor case",
        "Official 27 W USB-C — indoor brick, not weatherproof",
        "Remote ID Receiver Board",
        "Radio + dipole (dipole is spare indoor)",
        "IP66 weatherproof box, clear lid. Buyer drills. Not NEMA 4X",
        "Outdoor 1090, 9 dBi, N-female. SMA-male to N-male jumper included",
        "No battery. Not Fusion Sensor. Not V4. Weekend orders ship Monday",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    adsbfeeder: {
      title: "Pi ADS-B Feeder",
      lede: "Raspberry Pi 4 feeder for 1090 and 978. Official 15 W, radio, both band whips. No Remote ID board. Not the $199 ADS-B + Remote ID kit. One radio — the two whips are not simultaneous. Not Fusion Sensor. Not V4. Receive only.",
      price: "$299",
      amount: "299",
      chase: "",
      stripe: "",
      photo: "assets/products/raspberry-pi-4-4gb-remote-id-adsb-listener.jpg?v=1",
      gets: [
        "Raspberry Pi 4, 4 GB",
        "Official 15 W USB-C power supply",
        "Radio + dipole",
        "1090 SMA whip and 978 SMA whip",
        "No Remote ID board. No hard case. Not the $199 kit",
        "One radio — two whips are not simultaneous without a switch you already have",
        "Not Fusion Sensor. Not V4. No battery. No pre-flashed microSD. Receive only",
        "Ships from Dark Sky Systems after Stripe clears",
        "Weekend orders ship Monday. Tracking by email"
      ]
    },

    esprid: {
      title: "Remote ID Receiver Display",
      lede: "Pocket ESP32 Remote ID scanner with a color display. USB-C only. Not the $39 bare board and not the $129 OLED kit. Not pre-flashed. No LiPo. Receive only.",
      price: "$79",
      amount: "79",
      chase: "",
      stripe: "",
      photo: "assets/products/esp32-remote-id-scanner-color-display-front.jpg?v=1",
      gets: [
        "One ESP32 color-display receive board, USB-C, PCB antenna, three buttons",
        "Not the $39 bare board. Not the $129 OLED kit",
        "Not pre-flashed — shop ships the board as they ship it",
        "USB-C only. No LiPo. Receive only",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    espmesh: {
      title: "Remote ID Receiver Mesh",
      lede: "ESP32 receiver for Remote ID on Wi-Fi and Bluetooth, plus 802.15.4 mesh backhaul. Thread is not a Remote ID radio. Board + flanged box. Not pre-flashed. USB-C. No LiPo.",
      price: "$89",
      amount: "89",
      chase: "",
      stripe: "",
      photo: "assets/products/esp32-mesh-listener-board.jpg?v=1",
      gets: [
        "ESP32 receive board — Wi-Fi + BLE + 802.15.4 mesh backhaul",
        "Flanged weatherproof box with cable glands",
        "Thread / Zigbee is mesh only — Remote ID is Wi-Fi + BLE",
        "Not pre-flashed. USB-C only. No LiPo. PCB antenna, no external whip",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    espsite: {
      title: "Remote ID Receiver Site",
      lede: "Permanent-install ESP32 Remote ID receiver in a large IP66 box. PoE is 5 V USB-C power only — the board has no Ethernet. w.FL antenna chain. Not pre-flashed. No LiPo.",
      price: "$179",
      amount: "179",
      chase: "",
      stripe: "",
      photo: "assets/products/esp32-site-listener-ip66-enclosure.jpg?v=1",
      gets: [
        "w.FL ESP32 receive board + large IP66 box",
        "802.3af → USB-C 5 V splitter (power only; board has no Ethernet)",
        "RJ-45 gland, PG-9 gland, w.FL→SMA pigtail, SMA↔RP-SMA adapter, RP-SMA 2.4 GHz duck",
        "Not pre-flashed. Buyer drills gland holes. USB-C. No LiPo",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },

    sd64: {
      title: "Official Raspberry Pi 64GB microSD Card (Blank)",
      lede: "Official Raspberry Pi 64GB microSD, sold blank. No OS and no receiver image. We do not flash it. Weekend orders ship Monday.",
      price: "$49",
      amount: "49",
      chase: "",
      stripe: "",
      photo: "assets/products/official-raspberry-pi-64gb-microsd-blank.jpg?v=1",
      gets: [
        "Official Raspberry Pi 64 GB microSD, blank as shipped",
        "No OS. No receiver image. Not pre-flashed",
        "Not 32 / 128 / 256 GB",
        "Weekend orders ship Monday",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    ant1090x: {
      title: "Outdoor 1090 MHz Receive Antenna (N-Female)",
      lede: "Outdoor 1090 receive antenna, N-female 9 dBi, plus SMA-male to N-male jumper. Does not screw onto the radio alone. Receive only. Weekend orders ship Monday.",
      price: "$329",
      amount: "329",
      chase: "",
      stripe: "",
      photo: "assets/products/outdoor-1090-mhz-9dbi-n-female-listen-antenna.jpg?v=1",
      gets: [
        "Mast-mount 1090, N-female, 9 dBi",
        "SMA-male to N-male jumper included",
        "Not the indoor SMA whip. No Pi. No radio",
        "Passive receive only",
        "Weekend orders ship Monday",
        "Ships from Dark Sky Systems after Stripe clears"
      ]
    },
    adsbpair: {
      title: "Dual-Band 1090 / 978 Receive Antenna Kit",
      lede: "1090 and 978 SMA whips plus a short unfiltered jumper. One radio — not simultaneous. Receive only. Weekend orders ship Monday.",
      price: "$59",
      amount: "59",
      chase: "",
      stripe: "",
      photo: "assets/products/1090-mhz-5dbi-sma-listen-whip-lock.png?v=1",
      gets: [
        "1090 SMA whip and 978 SMA whip",
        "Short SMA male–male jumper, unfiltered",
        "One radio — not simultaneous without a switch or second radio",
        "No radio in the box. Receive only",
        "Weekend orders ship Monday",
        "Ships from Dark Sky Systems after Stripe clears"
      ]
    },
    piarmor: {
      title: "Raspberry Pi 5 Aluminum Case with Fan",
      lede: "Indoor aluminum Raspberry Pi 5 case with blower. Not the official plastic case. Not weatherproof. Pi not included. Weekend orders ship Monday.",
      price: "$29",
      amount: "29",
      chase: "",
      stripe: "",
      photo: "assets/products/raspberry-pi-5-aluminum-case-fan.jpg?v=1",
      gets: [
        "Aluminum plates, blower, tape, screws, tools",
        "Pi 5 only — will not fit Pi 4",
        "Pi board not included. Not weatherproof",
        "Not the official ABS case",
        "Weekend orders ship Monday",
        "Ships from Dark Sky Systems after Stripe clears"
      ]
    },
    pi27w: {
      title: "Official Raspberry Pi 27W USB-C Power Supply",
      lede: "Official Raspberry Pi 27W USB-C PD brick for a Pi 5. Indoor, US plug. Not the 15W Pi 4 supply. Pi not included. Weekend orders ship Monday.",
      price: "$29",
      amount: "29",
      chase: "",
      stripe: "",
      photo: "assets/products/official-raspberry-pi-27w-usb-c-black.jpg?v=1",
      gets: [
        "Official 27 W USB-C PD, US plug, 1.2 m",
        "For Raspberry Pi 5 — not the 15 W Pi 4 brick",
        "Indoor. Not weatherproof. No Pi in the box",
        "Weekend orders ship Monday",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    smajump: {
      title: "SMA to SMA Jumper Cable (Unfiltered)",
      lede: "Six-inch SMA-to-SMA jumper. Unfiltered coax — not a SAW. No antenna. Weekend orders ship Monday.",
      price: "$24",
      amount: "24",
      chase: "",
      stripe: "",
      photo: "assets/products/sma-male-male-rg316-jumper-lock.png?v=1",
      gets: [
        "SMA male–male jumper, about 6 in, unfiltered",
        "Not a filter. Not an antenna",
        "Weekend orders ship Monday",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    encl66: {
      title: "Outdoor Weatherproof Project Enclosure (IP66)",
      lede: "Large IP66 clear-lid project box, about 5×7×3 in. Buyer drills. Not NEMA 4X. No computer. Weekend orders ship Monday.",
      price: "$39",
      amount: "39",
      chase: "",
      stripe: "",
      photo: "assets/products/ip66-weatherproof-project-enclosure-905.jpg?v=1",
      gets: [
        "Large IP66 clear-lid box, about 5 × 7 × 3 in",
        "No glands. Buyer drills. Not NEMA 4X",
        "No Pi and no ESP32 in the box",
        "Weekend orders ship Monday",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    ant24chain: {
      title: "2.4 GHz Receive Whip Kit for w.FL Boards",
      lede: "2.4 GHz chain for w.FL boards: w.FL→SMA pigtail, SMA↔RP-SMA adapter, RP-SMA duck. Not one cable. No board. Weekend orders ship Monday.",
      price: "$39",
      amount: "39",
      chase: "",
      stripe: "",
      photo: "assets/products/24ghz-rpsma-listen-duck-945.jpg?v=1",
      gets: [
        "w.FL → SMA pigtail",
        "SMA plug to RP-SMA jack adapter",
        "RP-SMA 2.4 GHz duck, 5 dBi",
        "Not a single cable. No board. Not for PCB-antenna boards",
        "Weekend orders ship Monday",
        "Ships from Dark Sky Systems after Stripe clears"
      ]
    },
    espbox: {
      title: "Flanged Weatherproof Enclosure for ESP32 Boards",
      lede: "Small flanged weatherproof ESP32 box with two glands. Will not fit Pi 4/5. Not the large IP66 box. No board. Weekend orders ship Monday.",
      price: "$24",
      amount: "24",
      chase: "",
      stripe: "",
      photo: "assets/products/flanged-weatherproof-esp32-enclosure-3931.jpg?v=1",
      gets: [
        "Flanged weatherproof box, two glands, IP65 class",
        "ESP32 / Feather-size. Will not fit Pi 4 / 5",
        "Not the large IP66 box. No board",
        "Weekend orders ship Monday",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    pistart1090: {
      title: "Raspberry Pi Starter Receiver + 1090 Antenna",
      lede: "Pi 4 starter kit plus the 1090 SMA whip it omits. $289 vs $308 separate — save $19. Not pre-flashed. Receive only. Weekend orders ship Monday.",
      price: "$289",
      amount: "289",
      chase: "",
      stripe: "",
      photo: "assets/products/raspberry-pi-4-4gb-remote-id-adsb-listener.jpg?v=1",
      gets: [
        "Raspberry Pi 4 4 GB, official 15 W, Remote ID board, radio + dipole",
        "1090 SMA whip (the starter page does not include it)",
        "Live $308 → bundle $289. Save $19",
        "Not pre-flashed. No case. No battery. Not V4. Receive only",
        "Weekend orders ship Monday",
        "Ships from Dark Sky Systems after Stripe clears"
      ]
    },
    espridlisten: {
      title: "ESP32 Color Remote ID Scanner + Radio",
      lede: "Color-display ESP32 Remote ID board plus radio + dipole. $139 vs $158 separate — save $19. Not the $99 starter. Not pre-flashed. Weekend orders ship Monday.",
      price: "$139",
      amount: "139",
      chase: "",
      stripe: "",
      photo: "assets/products/esp32-remote-id-scanner-color-display-front.jpg?v=1",
      gets: [
        "ESP32 color-display Remote ID board",
        "Radio + dipole",
        "Live $158 → bundle $139. Save $19",
        "Not the $99 starter. Not pre-flashed. No LiPo. Receive only",
        "Weekend orders ship Monday",
        "Ships from Dark Sky Systems after Stripe clears"
      ]
    },
    rfalertlisten: {
      title: "Remote ID Alert Board + Radio",
      lede: "Alert board with OLED and box, plus radio + dipole. $179 vs $208 separate — save $29. Not the $99 starter. Not pre-flashed. Weekend orders ship Monday.",
      price: "$179",
      amount: "179",
      chase: "",
      stripe: "",
      photo: "assets/products/remote-id-receive-board.jpg?v=1",
      gets: [
        "Remote ID board + assembled OLED + small weatherproof box",
        "Radio + dipole",
        "Live $208 → bundle $179. Save $29",
        "Not the $99 starter. Not pre-flashed. No LiPo. Receive only",
        "Weekend orders ship Monday",
        "Ships from Dark Sky Systems after Stripe clears"
      ]
    },


    picam3: {
      title: "Raspberry Pi Camera Module 3",
      lede: "12 MP visual CSI camera with autofocus. 200 mm 15-pin ribbon. A Pi 5 needs a 22-pin to 15-pin adapter (about $3, not included). Not thermal. Not medical. No battery.",
      price: "$59",
      amount: "59",
      chase: "",
      stripe: "",
      photo: "assets/products/raspberry-pi-camera-module-3.jpg?v=1",
      gets: [
        "One Raspberry Pi Camera Module 3 (standard 75°) + 200 mm 15-pin CSI ribbon",
        "Visual CSI only — not thermal, not medical, not a drone camera we fly",
        "A Raspberry Pi 5 needs a 22-pin to 15-pin adapter (about $3, not in this order)",
        "No battery. Pairs with Pi receiver kits",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    picam3w: {
      title: "Raspberry Pi Camera Module 3 Wide",
      lede: "12 MP visual CSI camera with autofocus and a 120° lens. 200 mm 15-pin ribbon. A Pi 5 needs a 22-pin to 15-pin adapter (about $3, not included). Not thermal. No battery.",
      price: "$89",
      amount: "89",
      chase: "",
      stripe: "",
      photo: "assets/products/raspberry-pi-camera-module-3-wide.jpg?v=1",
      gets: [
        "One Raspberry Pi Camera Module 3 Wide (120°) + 200 mm 15-pin CSI ribbon",
        "Visual CSI only — not thermal, not medical, not a drone camera we fly",
        "A Raspberry Pi 5 needs a 22-pin to 15-pin adapter (about $3, not in this order)",
        "No battery. Pairs with Pi receiver kits",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    lepton160: {
      title: "Thermal camera module, 160×120 USB",
      lede: "160×120 thermal camera module over USB. Module, not a handheld. Not the 32×24 I2C row. No cell. USB cable not in the box. Not medical.",
      price: "$649",
      amount: "649",
      chase: "",
      stripe: "",
      photo: "assets/products/thermal-camera-module-160x120-usb.jpg?v=1",
      gets: [
        "One 160×120 thermal core on a USB UVC board",
        "Module — not a handheld, not the $149 32×24 I2C module, not the $549 handheld",
        "USB cable is not in the box. No cell. Not medical",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    usbll: {
      title: "USB low-light camera module, 2MP",
      lede: "Named 2 MP USB UVC board for low-light site picture. Not CSI. Not thermal. Not a generic webcam. Cable in the box. No battery.",
      price: "$89",
      amount: "89",
      chase: "",
      stripe: "",
      photo: "assets/products/usb-low-light-camera-module-2mp.jpg?v=1",
      gets: [
        "One named 2 MP USB low-light camera board + USB-to-4-pin cable",
        "USB UVC — not CSI, not thermal, not a generic webcam",
        "No battery. Not medical. Not a drone camera we fly",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    ridrtr: {
      title: "USB-C Remote ID Receiver Board (Ready-to-Run)",
      lede: "Same USB-C Remote ID Receiver Board. We load the receiver firmware on the board before it ships. Extra business day. Ships from us after we load it. Receive only.",
      price: "$79",
      amount: "79",
      chase: "",
      stripe: "",
      photo: "assets/attach/rid.webp?v=1",
      gets: [
        "Same USB-C Remote ID Receiver Board",
        "We load the receiver firmware on the board before it ships",
        "Extra business day. Ships from Dark Sky Systems after we load it",
        "No battery or charger in the box",
        "Receive only",
        "Tracking by email to the address on the receipt"
      ]
    },
    espridrtr: {
      title: "Remote ID Receiver Display (Ready-to-Run)",
      lede: "Same color-display ESP32 Remote ID scanner. We load the receiver firmware on the board before it ships. Extra business day. Ships from us after we load it. Receive only.",
      price: "$129",
      amount: "129",
      chase: "",
      stripe: "",
      photo: "assets/products/esp32-remote-id-scanner-color-display-front.jpg?v=1",
      gets: [
        "Same ESP32 color-display receive board, USB-C, PCB antenna, three buttons",
        "We load the receiver firmware on the board before it ships",
        "Extra business day. Ships from Dark Sky Systems after we load it",
        "USB-C only. No LiPo. Receive only",
        "Tracking by email to the address on the receipt"
      ]
    },
    rfalertrtr: {
      title: "Remote ID Receiver Alert Kit (Ready-to-Run)",
      lede: "Same Remote ID alert board with display. We load the receiver firmware on the board before it ships. Extra business day. Ships from us after we load it. Receive only.",
      price: "$179",
      amount: "179",
      chase: "",
      stripe: "",
      photo: "assets/products/remote-id-receive-board.jpg?v=1",
      gets: [
        "Same Remote ID Receiver Board, assembled OLED, weatherproof enclosure",
        "We load the receiver firmware on the board before it ships",
        "Extra business day. Ships from Dark Sky Systems after we load it",
        "USB-C only. No LiPo. Receive only",
        "Tracking by email to the address on the receipt"
      ]
    },
    espmeshrtr: {
      title: "Remote ID Receiver Mesh (Ready-to-Run)",
      lede: "Same ESP32 mesh-capable Remote ID receiver. We load the receiver firmware on the board before it ships. Extra business day. Ships from us after we load it. Receive only.",
      price: "$139",
      amount: "139",
      chase: "",
      stripe: "",
      photo: "assets/products/esp32-mesh-listener-board.jpg?v=1",
      gets: [
        "Same ESP32 receive board and flanged weatherproof box",
        "We load the receiver firmware on the board before it ships",
        "Extra business day. Ships from Dark Sky Systems after we load it",
        "USB-C only. No LiPo. Receive only",
        "Tracking by email to the address on the receipt"
      ]
    },
    espsitertr: {
      title: "Remote ID Receiver Site (Ready-to-Run)",
      lede: "Same ESP32 site receiver module. We load the receiver firmware on the board before it ships. Extra business day. Ships from us after we load it. Receive only.",
      price: "$249",
      amount: "249",
      chase: "",
      stripe: "",
      photo: "assets/products/esp32-site-listener-ip66-enclosure.jpg?v=1",
      gets: [
        "Same w.FL ESP32 receive board, IP66 box, PoE-to-USB-C power, antenna chain",
        "We load the receiver firmware on the board before it ships",
        "Extra business day. Ships from Dark Sky Systems after we load it",
        "USB-C. No LiPo. Receive only",
        "Tracking by email to the address on the receipt"
      ]
    },
    starterrtr: {
      title: "Radio starter (Ready-to-Run)",
      lede: "Same Radio starter. We load the receiver firmware on the receive board before it ships. Extra business day. Ships from us after we load it. Receive only.",
      price: "$149",
      amount: "149",
      chase: "",
      stripe: "",
      photo: "assets/attach/starter.webp?v=1",
      gets: [
        "Same Remote ID Receiver Board and radio + dipole",
        "We load the receiver firmware on the receive board before it ships",
        "Extra business day. Ships from Dark Sky Systems after we load it",
        "Receive only. No Fusion Sensor license in this SKU",
        "Tracking by email"
      ]
    },
    adsbkitrtr: {
      title: "ADS-B + Remote ID Receiver Kit (Ready-to-Run)",
      lede: "Same ADS-B + Remote ID receiver kit. We load the receiver firmware on the receive board before it ships. Extra business day. Ships from us after we load it. Receive only.",
      price: "$259",
      amount: "259",
      chase: "",
      stripe: "",
      photo: "assets/attach/adsbkit.jpg?v=1",
      gets: [
        "Same Remote ID Receiver Board, radio, 1090 and 978 antennas, hard case",
        "We load the receiver firmware on the receive board before it ships",
        "Extra business day. Ships from Dark Sky Systems after we load it",
        "Receive only. Not Fusion Sensor",
        "Tracking by email"
      ]
    },
    pistarterrtr: {
      title: "Pi Receiver (Ready-to-Run)",
      lede: "Same Raspberry Pi Remote ID + ADS-B receiver kit. We load the receiver image on a 64GB card before it ships. Extra business day. Ships from us after we load it. Receive only.",
      price: "$349",
      amount: "349",
      chase: "",
      stripe: "",
      photo: "assets/products/raspberry-pi-4-4gb-remote-id-adsb-listener.jpg?v=1",
      gets: [
        "Same Raspberry Pi 4 4 GB kit — official 15 W, Remote ID board, radio + dipole",
        "We load the receiver image on a 64GB card before it ships",
        "Extra business day. Ships from Dark Sky Systems after we load it",
        "No official case. No 1090 SMA whip. No battery",
        "Not Fusion Sensor. Not V4. Receive only",
        "Weekend +1 day. Tracking by email"
      ]
    },
    pirecvrtr: {
      title: "Pi Receiver (Ready-to-Run)",
      lede: "Same Raspberry Pi Remote ID + ADS-B receiver kit. We load the receiver image on a 64GB card before it ships. Extra business day. Ships from us after we load it. Receive only.",
      price: "$479",
      amount: "479",
      chase: "",
      stripe: "",
      photo: "assets/products/raspberry-pi-5-remote-id-adsb-receiver.jpg?v=1",
      gets: [
        "Same Pi Receiver — official 27 W, official case, Remote ID, radio, 1090 whip",
        "We load the receiver image on a 64GB card before it ships",
        "Extra business day. Ships from Dark Sky Systems after we load it",
        "No battery. Not Fusion Sensor. Not V4. Receive only",
        "Tracking by email to the address on the receipt"
      ]
    },
    piprortr: {
      title: "Pi Receiver Dual-Band (Ready-to-Run)",
      lede: "Same Raspberry Pi professional Remote ID + dual-band ADS-B kit. We load the receiver image on a 64GB card before it ships. Extra business day. Ships from us after we load it. Receive only.",
      price: "$629",
      amount: "629",
      chase: "",
      stripe: "",
      photo: "assets/products/raspberry-pi-5-4gb-professional-listener.jpg?v=1",
      gets: [
        "Same Pi Receiver Dual-Band plus 1090, 978, and the dual-channel filter",
        "We load the receiver image on a 64GB card before it ships",
        "Extra business day. Ships from Dark Sky Systems after we load it",
        "No battery. Not Fusion Sensor. Not V4. Receive only",
        "Weekend +1 day. Tracking by email"
      ]
    },
    pioutdoorrtr: {
      title: "Pi Receiver Outdoor (Ready-to-Run)",
      lede: "Same Raspberry Pi outdoor permanent receiver. We load the receiver image on a 64GB card before it ships. Extra business day. Ships from us after we load it. Receive only.",
      price: "$729",
      amount: "729",
      chase: "",
      stripe: "",
      photo: "assets/products/outdoor-1090-mhz-9dbi-n-female-base-antenna.jpg?v=1",
      gets: [
        "Same Pi 5 outdoor kit — IP66 box, Remote ID, radio, 9 dBi N-female 1090, jumper",
        "We load the receiver image on a 64GB card before it ships",
        "Extra business day. Ships from Dark Sky Systems after we load it",
        "Indoor power brick. No battery. Not Fusion Sensor. Not V4. Receive only",
        "Weekend +1 day. Tracking by email"
      ]
    },
    adsbfeederrtr: {
      title: "Pi ADS-B Feeder (Ready-to-Run)",
      lede: "Same dual-band ADS-B feeder kit. We load the receiver image on a 64GB card before it ships. Extra business day. Ships from us after we load it. Receive only.",
      price: "$369",
      amount: "369",
      chase: "",
      stripe: "",
      photo: "assets/products/raspberry-pi-4-4gb-remote-id-adsb-listener.jpg?v=1",
      gets: [
        "Same Pi 4 feeder — official 15 W, radio, 1090 and 978 whips",
        "We load the receiver image on a 64GB card before it ships",
        "Extra business day. Ships from Dark Sky Systems after we load it",
        "No Remote ID board. Not the $199 kit. Not Fusion Sensor. Not V4. Receive only",
        "Weekend +1 day. Tracking by email"
      ]
    },

    radio: {
      title: "Fusion Sensor + radios",
      lede: "Same console. We kit, flash, and ship the radios, then complete initial setup and a first monitoring session with you.",
      price: "$4,500",
      amount: "4500",
      chase: "",
      stripe: "",
      gets: [
        "Everything in Software",
        "ESP32-S3 OpenDroneID receiver, flashed",
        "ADS-B 1090 receiver",
        "SDR receive on 2.4 GHz and 5.8 GHz",
        "Antennas and USB",
        "Kit, test, ship",
        "Initial setup and first monitoring session with you"
      ]
    }
  };

  var LINKS = window.DSS_STRIPE || {};
  Object.keys(SKUS).forEach(function (k) {
    if (LINKS[k]) SKUS[k].stripe = LINKS[k];
  });
  var CHECKOUT_API = (window.DSS_CHECKOUT && window.DSS_CHECKOUT.api) ? String(window.DSS_CHECKOUT.api).replace(/\/$/, "") : "";
  var MANAGED = { scene: 1, job: 1, school: 1, incident: 1, crew: 1 };

  var params = new URLSearchParams(location.search);
  var key = params.get("sku") || "soft";
  if (!SKUS[key]) key = "soft";
  var sku = SKUS[key];
  var useManaged = !!(CHECKOUT_API && MANAGED[key]);

  function startManagedCheckout(email) {
    return fetch(CHECKOUT_API + "/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sku: key, email: email || undefined })
    }).then(function (r) {
      return r.json().then(function (j) {
        if (!r.ok || !j || !j.url) throw new Error((j && j.error) || "checkout");
        location.href = j.url;
      });
    });
  }

  var title = document.getElementById("sku-title");
  var lede = document.getElementById("sku-lede");
  var price = document.getElementById("sku-price");
  var gets = document.getElementById("sku-gets");
  var btn = document.getElementById("btnPay");
  var status = document.getElementById("orderStatus");
  var form = document.getElementById("order");

  document.title = sku.title + " — Checkout — Dark Sky Systems";
  if (title) title.textContent = sku.title;
  if (lede) lede.textContent = sku.lede;
  var existPhoto = document.getElementById("sku-photo");
  if (existPhoto) existPhoto.remove();
  if (sku.photo && title) {
    var img = document.createElement("img");
    img.id = "sku-photo";
    img.className = "sku-hero-photo";
    img.src = sku.photo;
    img.alt = sku.title;
    img.width = 1000;
    img.height = 720;
    title.insertAdjacentElement("afterend", img);
  }
  if (price) price.textContent = sku.price;
  var isPack = key === "ra" || key === "cards" || key === "eventpack";
  var isVolume = key === "scene" || key === "job" || key === "school" || key === "incident" || key === "crew";
  var isAttach = key === "rid" || key === "listen" || key === "ant1090" || key === "case" || key === "starter" || key === "rider" || key === "therm256" || key === "therm320" || key === "adsbkit" || key === "ant2458" || key === "r2kit" || key === "r2mic" || key === "batt-expro" || key === "case1200" || key === "radiopouch" || key === "lightspeak" || key === "sd64" || key === "ant1090x" || key === "adsbpair" || key === "piarmor" || key === "pi27w" || key === "smajump" || key === "encl66" || key === "ant24chain" || key === "espbox" || key === "pistart1090" || key === "espridlisten" || key === "rfalertlisten" || key === "picam3" || key === "picam3w" || key === "lepton160" || key === "usbll" || key === "ridrtr" || key === "espridrtr" || key === "rfalertrtr" || key === "espmeshrtr" || key === "espsitertr" || key === "starterrtr" || key === "adsbkitrtr" || key === "pistarterrtr" || key === "pirecvrtr" || key === "piprortr" || key === "pioutdoorrtr" || key === "adsbfeederrtr";
  var eyebrow = document.getElementById("sku-eyebrow");
  var fine = document.getElementById("sku-fine");
  if (eyebrow) {
    eyebrow.textContent = (key === "event_package" || key === "events_3" || key === "events_5")
      ? "Event coverage · Checkout"
      : (isAttach ? "Field attach · Checkout" : (isVolume ? "Crew paper · Checkout" : (isPack ? "Digital packs · Checkout" : (key === "soft" || key === "radio" ? "Detect Drones · Checkout" : "Plans · Checkout"))));
  }
  var payHref = sku.stripe || sku.chase || "";
  var payOnStripe = !!sku.stripe || useManaged;
  if (fine) {
    if (key === "soft" || key === "radio") {
      fine.textContent = payOnStripe
        ? "Fusion Sensor is receive-only. It identifies what is transmitting; it does not jam, spoof, or intercept aircraft. Pay with Stripe next. Deposit lands in Dark Sky Systems LLC."
        : "Fusion Sensor is receive-only. It identifies what is transmitting; it does not jam, spoof, or intercept aircraft. Deposit lands in Dark Sky Systems LLC.";
    } else {
      fine.textContent = payOnStripe
        ? "Pay with Stripe next. Deposit lands in Dark Sky Systems LLC."
        : "Deposit lands in Dark Sky Systems LLC.";
    }
  }
  var lead = document.getElementById("order-lead");
  if (lead) {
    if (key === "risk_report") lead.textContent = "Pay $79. On the next page you open the scored report for the place you just named. Save it as PDF.";
    else if (key === "obs_templates") lead.textContent = "Pay $49. The thank-you page gives you the PDF immediately. No waiting on email.";
    else if (key === "eap_pack") lead.textContent = "Pay $149. The thank-you page gives you the PDF and the editable file immediately.";
    else if (key === "training_pack") lead.textContent = "Pay $99. Download the pack on the next page and print the checklists.";
    else if (key === "airspace_report") lead.textContent = "Pay $149. Open the named-location report on the next page and save it as PDF.";
    else if (key === "scene" || key === "job") lead.textContent = "Pay $19. Instant file after payment. Print it and keep it with the crew.";
    else if (key === "school" || key === "incident") lead.textContent = "Pay $29. Instant file after payment. Print it and keep it with the site file.";
    else if (key === "crew") lead.textContent = "Pay $49. All four files after payment. Print them and keep them with the crew.";
    else if (isAttach) lead.textContent = "Pay with Stripe. We ship to the address on the receipt. Tracking by email. Receive only.";
    else if (payOnStripe) lead.textContent = "Name and email if you want a setup note. Pay with Stripe next. Deposit lands in Dark Sky Systems LLC.";
    else lead.textContent = "Name and email. After the deposit posts, we send next steps.";
  }
  var trust = document.getElementById("payTrust");
  if (trust) {
    if (key === "risk_report" || key === "airspace_report") {
      trust.textContent = "Use the same browser you scored or named the place in. After Stripe, the report opens. Print or Save as PDF. No card data is stored on darksky.systems.";
    } else if (key === "obs_templates" || key === "training_pack" || key === "eap_pack") {
      trust.textContent = "After Stripe, the thank-you page has a Download button. Click it. That is the whole delivery. No card data is stored on darksky.systems.";
    } else if (isAttach) {
      trust.textContent = "Hardware from Dark Sky Systems. Tracking by email. Receive only. No card data is stored on darksky.systems.";
    } else if (isVolume) {
      trust.textContent = "After payment we email the PDF. Print it and keep it. No card data is stored on darksky.systems.";
    }
  }
  if (params.get("paid") === "1") {
    location.replace("paid.html?sku=" + encodeURIComponent(key));
    return;
  }
  if (btn) btn.textContent = (sku.stripe || useManaged) ? "Continue to Stripe" : "Save details";
  var wrapEarly = document.getElementById("payWrap");
  var payEarly = document.getElementById("payNow");
  if (payEarly && (sku.stripe || useManaged)) {
    payEarly.href = sku.stripe || "#";
    payEarly.textContent = "Pay with Stripe";
    if (wrapEarly) wrapEarly.hidden = false;
    if (useManaged) {
      payEarly.addEventListener("click", function (ev) {
        ev.preventDefault();
        startManagedCheckout(val("oEmail")).catch(function () {
          if (sku.stripe) location.href = sku.stripe;
        });
      });
    }
  }
  document.querySelectorAll(".sku-switch a").forEach(function (a) {
    if (a.getAttribute("data-sku") === key) a.setAttribute("aria-current", "page");
  });
  if (gets) {
    gets.innerHTML = sku.gets.map(function (line) {
      return "<li>" + line + "</li>";
    }).join("");
  }

  function val(id) {
    var el = document.getElementById(id);
    return el && el.value ? el.value.replace(/\s+/g, " ").trim() : "";
  }

  function sendNotice(text) {
    return fetch(RELAY, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: "Dark Sky Systems — ORDER " + sku.price,
        _template: "box",
        _captcha: "false",
        kind: "ORDER",
        sku: key,
        amount: sku.amount,
        name: val("oName"),
        email: val("oEmail"),
        organization: val("oOrg") || "(none)",
        window: val("oWindow") || "(none)",
        message: text
      })
    }).catch(function () { return null; });
  }

  if (form) {
    form.addEventReceiver("submit", function (ev) {
      ev.preventDefault();
      if (typeof form.reportValidity === "function" && !form.reportValidity()) return;
      var hp = form.querySelector('input[name="botcheck"]');
      if (hp && hp.checked) return;
      var lines = [
        "Dark Sky Systems — ORDER",
        "SKU: " + sku.title,
        "Amount: " + sku.price,
        "Name: " + val("oName"),
        "Email: " + val("oEmail"),
        "Org: " + (val("oOrg") || "(none)"),
        "Window: " + (val("oWindow") || "(none)"),
        payOnStripe
          ? (useManaged
            ? "Next: customer pays a Stripe Checkout Session with Managed Payments. Do not mint Chase for this order."
            : "Next: customer pays the Stripe Payment Link. Do not mint Chase for this order.")
          : "Next: mint a Chase payment link for this customer and amount. Do not reuse a public invid."
      ];
      var wrap = document.getElementById("payWrap");
      var payNow = document.getElementById("payNow");
      if (useManaged) {
        if (status) {
          status.hidden = false;
          status.textContent = "Opening Stripe. We do not store your card.";
        }
        sendNotice(lines.join("\n"));
        startManagedCheckout(val("oEmail")).catch(function () {
          if (status) status.textContent = "Checkout is not ready. Use the Payment Link.";
          if (payNow && sku.stripe) {
            payNow.href = sku.stripe;
            payNow.textContent = "Pay with Stripe";
            if (wrap) wrap.hidden = false;
          }
        });
        return;
      }
      var href = sku.stripe || sku.chase || "";
      if (payNow && href) {
        if (sku.stripe && val("oEmail")) {
          href += (href.indexOf("?") >= 0 ? "&" : "?") + "prefilled_email=" + encodeURIComponent(val("oEmail"));
        }
        payNow.href = href;
        payNow.textContent = sku.stripe ? "Pay with Stripe" : "Pay";
        if (wrap) wrap.hidden = false;
        if (status) {
          status.hidden = false;
          status.textContent = sku.stripe
            ? "Details saved. Pay with Stripe next. We do not store your card."
            : "Details saved. Pay next. We do not store your card.";
        }
      } else {
        if (wrap) wrap.hidden = true;
        if (status) {
          status.hidden = false;
          status.textContent = "Details saved. We email a pay link to this address.";
        }
      }
      sendNotice(lines.join("\n"));
    });
  }
})();
