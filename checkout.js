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
      title: "Remote ID receive board",
      lede: "USB-C ESP32-S3 board for Remote ID receive. We ship it after payment. Receive only. No battery in the box.",
      price: "$39",
      amount: "39",
      chase: "",
      stripe: "",
      photo: "assets/attach/rid.webp?v=1",
      gets: [
        "ESP32-S3 Remote ID receive board with USB-C",
        "Receive only — it does not jam or send a command",
        "No battery or charger in the box",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    listen: {
      title: "Listen radio + dipole",
      lede: "USB listen radio with a dipole kit. SMA. Receive only. We ship it after payment.",
      price: "$79",
      amount: "79",
      chase: "",
      stripe: "",
      photo: "assets/attach/listen.webp?v=1",
      gets: [
        "USB listen radio in a shielded enclosure, SMA connector",
        "Dipole kit: elements, base, extension, suction and mini-tripod mounts",
        "Receive only — it does not jam or transmit",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email to the address on the receipt"
      ]
    },
    ant1090: {
      title: "1090 MHz listen antenna",
      lede: "SMA whip tuned for 1090 MHz crewed-aircraft broadcasts. We ship it after payment.",
      price: "$29",
      amount: "29",
      chase: "",
      stripe: "",
      photo: "assets/attach/ant1090.webp?v=1",
      gets: [
        "SMA 1090 MHz listen antenna, about 7.5 inches",
        "Hinged base so it sits next to a listen radio",
        "Receive only",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email"
      ]
    },
    case: {
      title: "Small hard case",
      lede: "Weatherproof hard case for the board and listen radio. Pick-and-pluck foam. We ship it after payment.",
      price: "$29",
      amount: "29",
      chase: "",
      stripe: "",
      photo: "assets/attach/case.webp?v=1",
      gets: [
        "Small weatherproof hard case with latches and a purge valve",
        "Pick-and-pluck foam so the radios sit still",
        "Interior about 8 × 5.5 × 3.75 inches",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email"
      ]
    },
    starter: {
      title: "Listen starter",
      lede: "The board and the listen radio together. Receive only. Not Fusion Sensor. We ship both after payment.",
      price: "$99",
      amount: "99",
      chase: "",
      stripe: "",
      photo: "assets/attach/starter.webp?v=1",
      gets: [
        "Remote ID receive board (USB-C, no battery)",
        "Listen radio + dipole kit",
        "Receive only. No Fusion Sensor license in this SKU",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email"
      ]
    },
    rider: {
      title: "Portable Remote ID detector",
      lede: "Pocket Remote ID receiver for first responders and site crews. Listens for broadcast Remote ID up to about 3 miles. Maps the aircraft and, when it is sent, the pilot. Receive only.",
      price: "$1,799",
      amount: "1799",
      chase: "",
      stripe: "",
      photo: "assets/attach/rider.jpg?v=1",
      gets: [
        "Dronetag RIDER portable Remote ID receiver",
        "ASTM F3411 receive — 2.4 GHz Bluetooth and Wi-Fi",
        "About 3 miles of broadcast Remote ID listen",
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
      lede: "Board plus listen radio, 1090 and 978 antennas, and a small hard case. Receive only. Not Fusion Sensor.",
      price: "$199",
      amount: "199",
      chase: "",
      stripe: "",
      photo: "assets/attach/adsbkit.jpg?v=1",
      gets: [
        "Remote ID receive board (USB-C, no battery)",
        "Listen radio with dipole",
        "1090 MHz and 978 MHz listen antennas",
        "Small hard case",
        "Receive only. Not Fusion Sensor",
        "Ships from Dark Sky Systems after Stripe clears",
        "Tracking by email"
      ]
    },
    ant2458: {
      title: "2.4 / 5.8 GHz directional listen antenna",
      lede: "Dual-band directional listen panel, 13 dBi, 2.4 and 5.8 GHz. Passive receive only. N-Female (buyer may need N-to-SMA).",
      price: "$99",
      amount: "99",
      chase: "",
      stripe: "",
      photo: "assets/attach/ant2458.jpg?v=1",
      gets: [
        "Dual-band directional listen panel, 13 dBi",
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
      lede: "A Pelican 1200 medium hard case for a listen radio, a receive board, and the small attach that does not fit the compact case. Watertight and crushproof, with pick-and-pluck foam.",
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

  var params = new URLSearchParams(location.search);
  var key = params.get("sku") || "soft";
  if (!SKUS[key]) key = "soft";
  var sku = SKUS[key];

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
  var isAttach = key === "rid" || key === "listen" || key === "ant1090" || key === "case" || key === "starter" || key === "rider" || key === "therm256" || key === "therm320" || key === "adsbkit" || key === "ant2458" || key === "r2kit" || key === "r2mic" || key === "batt-expro" || key === "case1200" || key === "radiopouch" || key === "lightspeak";
  var eyebrow = document.getElementById("sku-eyebrow");
  var fine = document.getElementById("sku-fine");
  if (eyebrow) {
    eyebrow.textContent = (key === "event_package" || key === "events_3" || key === "events_5")
      ? "Event coverage · Checkout"
      : (isAttach ? "Field attach · Checkout" : (isVolume ? "Crew paper · Checkout" : (isPack ? "Digital packs · Checkout" : (key === "soft" || key === "radio" ? "Detect Drones · Checkout" : "Plans · Checkout"))));
  }
  var payHref = sku.stripe || sku.chase || "";
  var payOnStripe = !!sku.stripe;
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
  if (btn) btn.textContent = sku.stripe ? "Continue to Stripe" : "Save details";
  var wrapEarly = document.getElementById("payWrap");
  var payEarly = document.getElementById("payNow");
  if (payEarly && sku.stripe) {
    payEarly.href = sku.stripe;
    payEarly.textContent = "Pay with Stripe";
    if (wrapEarly) wrapEarly.hidden = false;
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
    form.addEventListener("submit", function (ev) {
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
          ? "Next: customer pays the Stripe Payment Link. Do not mint Chase for this order."
          : "Next: mint a Chase payment link for this customer and amount. Do not reuse a public invid."
      ];
      var wrap = document.getElementById("payWrap");
      var payNow = document.getElementById("payNow");
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
