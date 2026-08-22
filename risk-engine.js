/* Dark Sky Systems — unauthorized-broadcast risk engine.
   Scores what Fusion Sensor can hear (RID + RF energy). Quiet is not a clearance. */
(function (w) {
  "use strict";
  var LABELS = {
    campus: "Campus / facility",
    build: "Construction",
    venue: "Stadium / event",
    plant: "Industrial / plant",
    other: "Other site",
    staff: "Staff only",
    public: "Public on site",
    dense: "Dense event or gates",
    open: "Open / uncontrolled airspace",
    airport: "Near a towered airport",
    tfr: "TFR or stadium TFR on event days",
    none: "None",
    advertised: "Advertised / publicized event",
    vip: "VIP or executive movement",
    hours: "Hours",
    days: "One to three days",
    ongoing: "Ongoing / year-round"
  };

  function assess(input) {
    var factors = [];
    function add(name, pts, why) {
      factors.push({ name: name, pts: pts, why: why });
    }

    if (input.people === "dense") add("People density", 28, "A dense crowd or gate queue is the consequence if an aircraft comes down or draws attention.");
    else if (input.people === "public") add("Public on the ground", 18, "Uninvolved people are on the property. 14 CFR 107.39 limits flight over people; a rogue aircraft does not care.");
    else add("Staff-only occupancy", 8, "Fewer uninvolved people, still a workplace. The employer still owes an emergency action plan.");

    if (input.type === "venue") add("Venue / assembly", 16, "Stadiums, festivals, and large outdoor assemblies attract cameras and hobby flights.");
    else if (input.type === "plant") add("Industrial / plant", 14, "Consequence is higher: process, chemicals, or critical kit. First-in needs the picture.");
    else if (input.type === "build") add("Open construction", 12, "Open decks and incomplete envelopes invite curiosity flights and make a downed aircraft a job-site problem.");
    else if (input.type === "campus") add("Campus / facility", 10, "Predictable crowds, rooftops, and media days. Security owns the question of who is in the air.");
    else add("Site type", 4, "A named place still needs a record if something broadcasts over it.");

    if (input.air === "tfr") add("TFR / stadium TFR", 26, "Temporary flight restrictions already say the window is sensitive. A listen gives you who is still transmitting inside it.");
    else if (input.air === "airport") add("Near a towered airport", 16, "Manned traffic is close. ADS-B on the same glass as UAS contacts is the difference between a rumor and a picture.");
    else add("Open airspace", 6, "No TFR does not mean no drones. It means you have not been handed a NOTAM as a backstop.");

    if (input.prior === "yes") add("Prior drone incidents", 18, "History is the strongest predictor. A listen log is how you stop arguing about whether it happened again.");

    if (input.draw === "advertised") add("Publicized event", 12, "Advertising a gathering is an invitation for overhead cameras.");
    else if (input.draw === "vip") add("VIP / executive movement", 10, "A named person on the ground raises the cost of an unknown aircraft.");

    if (input.access === "both") add("Public line of sight and open envelope", 14, "A flyer on the public road can see the box, and the building is not closed. That is an easy launch.");
    else if (input.access === "roof") add("Open roof or incomplete envelope", 10, "An unfinished or open roof is a target and a crash surface.");
    else if (input.access === "road") add("Line of sight from a public road", 8, "Most nuisance flights start from a parking lot or a shoulder with a view.");
    else add("Controlled ground access", 2, "Harder launch, not zero. Radio energy does not need a parking lot.");

    if (input.span === "ongoing") add("Ongoing occupancy", 12, "Year-round occupancy means a one-day listen is not the product. Monitoring is.");
    else if (input.span === "days") add("Multi-day window", 8, "A weekend or a three-day job is a named window. Single-event coverage fits.");
    else add("Hours-long window", 4, "A short window still needs a pre-brief and a close-out file.");

    if (input.night === "yes") add("Night or low-light ops", 6, "Visual acquisition is worse. Radio picture matters more.");

    if (input.under === "yes") add("People under likely flight paths", 10, "If the likely orbit is over uninvolved people, residual risk stays high even with a listen.");

    var score = 0;
    factors.forEach(function (f) { score += f.pts; });
    if (score > 100) score = 100;

    var band, plan, sku, next;
    if (input.span !== "ongoing" && (input.type === "venue" || input.people === "dense" || input.draw === "advertised" || input.draw === "vip")) {
      band = score >= 70 ? "High for this named window" : "Elevated for this named window";
      plan = "Single-Event Airspace Awareness — $2,195";
      sku = "event_package";
      next = "Lock the dates. Pre-survey, live Fusion Sensor coverage on the day, post air map, written file. Then decide if the site needs monthly monitoring.";
    } else if (score >= 72 && input.type === "campus") {
      band = "High — year-round site";
      plan = "Campus & Facility Assurance — $18,000 / year";
      sku = "campus";
      next = "Pro monitoring all year plus four flown visits and an observation file the emergency action plan can keep.";
    } else if (score >= 60 && input.type === "build") {
      band = "Elevated — open job";
      plan = "Construction Progress — $2,500 / month";
      sku = "build";
      next = "Weekly stills while the job is open. Add monitoring if the air question keeps coming up between visits.";
    } else if (score >= 58 && input.span === "ongoing") {
      band = "Elevated — several sites or a long occupancy";
      plan = "Monitoring · Pro — $750 / month";
      sku = "pro_m";
      next = "Multi-site picture, alerts, two-year archive. The ops desk keeps the map.";
    } else if (score >= 40) {
      band = "Moderate to elevated";
      plan = "Monitoring · Basic — $250 / month";
      sku = "basic_m";
      next = "One named site on a live map. Green is your list. Red is broadcasting off that list. Ninety-day archive.";
    } else {
      band = "Lower relative score — still document it";
      plan = "Monitoring · Basic — $250 / month";
      sku = "basic_m";
      next = "The score is lower because occupancy and airspace are quieter. A listen is still how you get a record the first time something broadcasts.";
    }

    var residual = [];
    residual.push("Remote ID and RF energy only. Aircraft that are not broadcasting do not appear as cooperative Remote ID contacts.");
    residual.push("Quiet on the radios is not a clearance that the air is empty.");
    if (input.air !== "tfr") residual.push("No TFR was indicated. That does not reduce the chance of a hobby flight; it only means ATC has not boxed the window.");
    if (input.under === "yes") residual.push("People under the likely orbit remain the dominant consequence even after you have a listen.");
    residual.push("This file is an assessment from the facts you entered. It is not an OSHA inspection and not a live listen of the site until monitoring is on.");

    var findings = factors
      .filter(function (f) { return f.pts >= 8; })
      .sort(function (a, b) { return b.pts - a.pts; })
      .map(function (f) { return f.name + " (+" + f.pts + "): " + f.why; });

    return {
      place: input.place,
      score: score,
      band: band,
      factors: factors,
      findings: findings,
      residual: residual,
      plan: plan,
      sku: sku,
      next: next,
      type: input.type,
      people: input.people,
      air: input.air,
      input: input
    };
  }

  w.DSSRisk = { assess: assess, LABELS: LABELS };
})(window);
