/* Dark Sky Systems — unauthorized-broadcast risk engine.
   Scores what Fusion Sensor can hear (RID + RF energy). Silence on the radios does not mean the air is empty.
   Combinatorial analysis, not one sentence per dropdown. */
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
    ongoing: "Ongoing / year-round",
    controlled: "Controlled access, closed envelope",
    road: "Line of sight from a public road",
    roof: "Open roof or incomplete envelope",
    both: "Public road view and open envelope"
  };

  function add(factors, name, pts, why) {
    factors.push({ name: name, pts: pts, why: why });
  }

  function topNames(factors, n) {
    return factors.slice().sort(function (a, b) { return b.pts - a.pts; })
      .slice(0, n).map(function (f) { return f.name; });
  }

  function airNoun(air) {
    if (air === "tfr") return "a TFR or stadium TFR window";
    if (air === "airport") return "airspace near a towered airport";
    return "open / uncontrolled airspace";
  }

  function peopleNoun(people) {
    if (people === "dense") return "dense occupancy (gates, seats, or a standing crowd)";
    if (people === "public") return "the public on the property";
    return "staff-only occupancy";
  }

  function recommend(input, score) {
    var eventLike = input.span !== "ongoing" && (input.type === "venue" || input.people === "dense" || input.draw === "advertised" || input.draw === "vip");
    var rec = {};
    if (eventLike) {
      rec.band = score >= 70 ? "High for this named event" : "Elevated for this named event";
      rec.plan = "Single-Event Airspace Awareness — $2,495";
      rec.sku = "event_package";
      rec.title = "Single-Event Airspace Awareness";
      rec.price = "$2,495";
      rec.oneLiner = "Cover the named dates: pre-survey, live Fusion Sensor on the day, post-event map and observation file.";
    } else if (score >= 72 && input.type === "campus") {
      rec.band = "High — year-round site";
      rec.plan = "Campus & Facility Assurance — $18,000 / year";
      rec.sku = "campus";
      rec.title = "Campus & Facility Assurance";
      rec.price = "$18,000 / year";
      rec.oneLiner = "Year-round Pro monitoring, four flown visits, one observation file the emergency plan can keep.";
    } else if (score >= 60 && input.type === "build") {
      rec.band = "Elevated — open job";
      rec.plan = "Construction Progress — $2,500 / month";
      rec.sku = "build";
      rec.title = "Construction Progress";
      rec.price = "$2,500 / month";
      rec.oneLiner = "Weekly or bi-weekly progress flights while the job is open; thermal as needed.";
    } else if (score >= 58 && input.span === "ongoing") {
      rec.band = "Elevated — long occupancy";
      rec.plan = "Monitoring · Pro — $750 / month";
      rec.sku = "pro_m";
      rec.title = "Monitoring · Pro";
      rec.price = "$750 / month";
      rec.oneLiner = "Multiple sites or a demanding year-round occupancy on one map, two-year archive.";
    } else if (score >= 40) {
      rec.band = "Moderate to elevated";
      rec.plan = "Monitoring · Basic — $250 / month";
      rec.sku = "basic_m";
      rec.title = "Monitoring · Basic";
      rec.price = "$250 / month";
      rec.oneLiner = "One named site, live map, unauthorized-aircraft alerts, ninety days of records.";
    } else {
      rec.band = "Lower relative score — still document it";
      rec.plan = "Monitoring · Basic — $250 / month";
      rec.sku = "basic_m";
      rec.title = "Monitoring · Basic";
      rec.price = "$250 / month";
      rec.oneLiner = "Quieter occupancy and airspace. A live log is still how you stop arguing the first time something broadcasts.";
    }
    return rec;
  }

  function interpret(score, band, input) {
    var scale = score >= 72 ? "This is a high relative score for an unauthorized-broadcast assessment."
      : score >= 58 ? "This is an elevated score. The site is not a quiet background problem."
      : score >= 40 ? "This is a moderate-to-elevated score. A named aircraft over this place is already a record problem."
      : "This is a lower relative score. It is not a clearance. It means occupancy and airspace are quieter than peer sites in this model.";
    var sensor = "The score measures consequence and opportunity for cooperative Remote ID and radio energy on 2.4 / 5.8 GHz. It does not claim the air is empty of dark or RID-off aircraft.";
    var window = input.span === "ongoing"
      ? "The window is year-round. A one-day listen does not create the record this occupancy needs."
      : input.span === "days"
        ? "The window is one to three days. Treat it as a named event with a start, a live period, and a close-out."
        : "The window is hours. Pre-brief, watch the map, close the file the same day.";
    return scale + " Band: " + band + ". " + window + " " + sensor;
  }

  function article(word) {
    if (/^one\b/i.test(word)) return "a ";
    return /^[aeiou]/i.test(word) ? "an " : "a ";
  }

  function execSummary(input, score, rec, drivers) {
    var typeL = LABELS[input.type].toLowerCase();
    var spanL = LABELS[input.span].toLowerCase();
    var s = input.place + " is " + article(typeL) + typeL
      + " with " + peopleNoun(input.people)
      + ", in " + airNoun(input.air)
      + ", over " + article(spanL) + spanL + " window. ";
    s += "Unauthorized-broadcast risk scores " + score + " of 100 (" + rec.band + "). ";
    s += "The score is driven by " + drivers.join(", ") + ". ";
    if (input.prior === "yes") s += "Prior drone incidents are already on the record, so the next contact is a repeat, not a first. ";
    if (input.draw === "vip") s += "A VIP or executive movement is on the ground; an unknown aircraft is no longer a curiosity. ";
    if (input.draw === "advertised") s += "The gathering is publicized; overhead cameras are invited whether operations asked for them or not. ";
    s += "Recommended response: " + rec.title + " (" + rec.price + "). " + rec.oneLiner;
    return s;
  }

  function buildFindings(input, score) {
    var p = input.place;
    var out = [];

    /* Ground consequence — people × type × under */
    if (input.people === "dense" && input.under === "yes") {
      out.push({
        title: "People under the orbit are the dominant consequence",
        body: p + " puts a dense occupancy under likely flight paths. If an aircraft comes down or a pack vents, the problem is the queue, the seats, or the assembly — not the airframe. 14 CFR 107.39 constrains a legal PIC. It does not constrain a hobby or hostile flyer. First-in will ask who was under the orbit and whether a lithium pack is in the crowd."
      });
    } else if (input.people === "dense") {
      out.push({
        title: "Dense occupancy raises the cost of a downed aircraft",
        body: p + " concentrates people at gates, seats, or standing room. A small UAS over that density is a crowd-management problem before it is an aviation problem. Size-up should name the assembly point, the pinch at the gates, and who owns the 911 sentence if a pack fire starts in the open."
      });
    } else if (input.people === "public" && input.type === "campus") {
      out.push({
        title: "Uninvolved people are on a predictable campus pattern",
        body: p + " has the public on the property on a schedule security already understands: class change, athletics, visitors, rooftops. An unknown aircraft over that pattern is a security question, not a rumor. The record has to show who was transmitting and who was authorized."
      });
    } else if (input.people === "public") {
      out.push({
        title: "The public is on the property",
        body: p + " is not a closed workplace. Uninvolved people do not brief, do not wear PPE, and do not know the abort. A transmitting aircraft over them is already a liability file. Keep the log with the emergency action plan, not in a text thread."
      });
    } else if (input.type === "plant") {
      out.push({
        title: "Staff-only does not lower industrial consequence",
        body: p + " is industrial or process. Fewer people does not mean a downed aircraft is cheap. Chemicals, rotating equipment, and first-in access dominate. 29 CFR 1910.38 still wants a written emergency action plan. This assessment does not write that plan; it tells you the air is part of the size-up."
      });
    } else {
      out.push({
        title: "Workplace occupancy still needs a record",
        body: p + " is staff-only. That lowers uninvolved-person count. It does not remove the employer’s emergency action plan, and it does not make a transmitting aircraft imaginary. The first time someone asks what was overhead, a log beats a recollection."
      });
    }

    /* Launch opportunity — access × draw × type */
    if (input.access === "both" || (input.access === "road" && input.access === "roof")) {
      out.push({
        title: "Launch is easy from the public side and the envelope is open",
        body: "A flyer on a public road or lot can see the box, and the building is not closed. That is a short setup: park, launch, orbit. Most nuisance flights start that way. Controlled-access policy on the property does not stop a shoulder launch with line of sight."
      });
    } else if (input.access === "both") {
      out.push({
        title: "Public line of sight and an open envelope",
        body: p + " can be seen from a public road, and the roof or envelope is open. That combination is how curiosity flights and media cameras actually start — not from inside the fence."
      });
    } else if (input.access === "road" && input.draw !== "none") {
      out.push({
        title: "A public view plus a reason to point a camera",
        body: p + " is visible from a public road, and something on the ground draws a camera (" + LABELS[input.draw].toLowerCase() + "). You do not need a sophisticated operator. You need a parking space and a reason. Monitoring is how you prove who showed up."
      });
    } else if (input.access === "roof") {
      out.push({
        title: "An open roof is both a target and a crash surface",
        body: "An unfinished or open roof at " + p + " is a picture people want and a hard surface if the aircraft comes down. Construction and plant roofs also hide people from a grade count. Put the roof in the observation file: hatches, walkways, who is up there."
      });
    } else if (input.access === "road") {
      out.push({
        title: "Line of sight from a public road is the usual launch",
        body: "Most unauthorized flights over a named site start from a lot or a shoulder with a view of " + p + ". You will not catch that with a gate log. You catch the broadcast — Remote ID and radio energy — if you are listening."
      });
    } else if (input.draw === "advertised" || input.draw === "vip") {
      out.push({
        title: "The ground is advertising itself to overhead cameras",
        body: input.draw === "vip"
          ? "A VIP or executive movement at " + p + " raises the cost of an unknown aircraft. Protective details will ask who was in the air. A live map and a close-out file are the answer."
          : "Publicizing the gathering at " + p + " is an invitation. Hobby and media flights follow advertised crowds. Assume someone will launch unless you are watching."
      });
    }

    /* Airspace law / ops — air × type × night */
    if (input.air === "tfr" && input.type === "venue") {
      out.push({
        title: "A stadium or event TFR is already a legal box",
        body: "Temporary flight restrictions on event days mean ATC and the FAA have already marked " + p + " as sensitive. The operational question is who is still transmitting inside that box. Fusion Sensor does not enforce the TFR. It gives operations a log of cooperative Remote ID and radio energy so the argument is evidence, not a video on someone’s phone."
      });
    } else if (input.air === "tfr") {
      out.push({
        title: "A TFR is in play — still listen",
        body: "A TFR over or near " + p + " tells legal flyers to stay out. It does not turn radios off. Hobby, lost-link, and non-cooperative traffic still happen at the edge of a box. Continuous monitoring is how you see who is broadcasting anyway."
      });
    } else if (input.air === "airport") {
      out.push({
        title: "Crewed traffic is close enough to share the picture",
        body: p + " sits near a towered airport. ADS-B 1090 for airliners, GA, and military belongs on the same map as drone contacts. Night operations make visual acquisition worse; radio and ADS-B become the primary picture. A rumor that “something was near the approach” is not a file."
      });
    } else if (input.night === "yes") {
      out.push({
        title: "Low light shifts the problem onto the radios",
        body: "Night or low-light operations at " + p + " reduce visual acquisition. Security and first-in will not see a small UAS against a dark roof. Remote ID and 2.4 / 5.8 GHz energy are how you know something is transmitting. That is not optional at night."
      });
    } else {
      out.push({
        title: "Open airspace is not a backstop",
        body: "No TFR was indicated for " + p + ". That does not mean fewer drones. It means ATC has not boxed the window for you. Hobby flights, lost-link, and RID-off aircraft remain possible. Open airspace is a reason to listen, not a reason to wait."
      });
    }

    /* History */
    if (input.prior === "yes") {
      out.push({
        title: "Prior incidents make the next contact a repeat",
        body: "History is the strongest predictor at " + p + ". If a drone has already been a problem here, the next broadcast is not a hypothetical. Stand the log up before the next window. Counsel and operations will ask what changed. A dated export is the only clean answer."
      });
    }

    /* Duration × type */
    if (input.span === "ongoing" && input.type === "campus") {
      out.push({
        title: "Year-round campus occupancy is a monitoring problem, not a one-day sit",
        body: p + " does not go quiet after a Saturday. Predictable crowds, media days, and rooftops continue. A one-day session creates a souvenir. Year-round monitoring creates the archive security actually uses."
      });
    } else if (input.span === "ongoing" && input.type === "plant") {
      out.push({
        title: "The plant is occupied whether or not an event is on the calendar",
        body: "Ongoing industrial occupancy at " + p + " means the air question does not expire. First-in still needs the layout. A live map between shifts is how you know a transmitting aircraft was not a one-off rumor at shift change."
      });
    } else if (input.span === "ongoing" && input.type === "build") {
      out.push({
        title: "An open job lasts longer than a weekend",
        body: "Construction at " + p + " stays open: decks, incomplete envelope, new sight lines every week. Weekly stills document the ground. The air still needs a listener if the curiosity flights keep coming between photo days."
      });
    } else if (input.type === "build") {
      out.push({
        title: "Open construction invites curiosity flights and job-site crashes",
        body: "Incomplete envelopes and open decks at " + p + " are photogenic and unprotected. A downed aircraft is a 1926 problem: people, holes, access. Progress stills and an observation file belong with the construction EAP. This assessment is not an OSHA inspection."
      });
    } else if (input.span === "days" || input.type === "venue") {
      out.push({
        title: "A named window needs a start, a live period, and a close-out",
        body: p + " is being treated as a dated event. Score it before gates, watch the map while people are in the seats, and close with a file operations can keep. That is a single-event package, not a monthly subscription — unless the site then stays occupied."
      });
    }

    /* First-in / EAP */
    if (input.type === "plant" || input.type === "build") {
      out.push({
        title: "First-in companies need the layout before they arrive",
        body: "If something comes down or a pack vents at " + p + ", first-in will ask: people, ways out, the hole, confined space, medical access, the path apparatus uses. Write that while the site is calm. Keep it with the emergency action plan. Dark Sky observation files are operations use — not a PE stamp and not the employer’s written plan."
      });
    } else if (input.people === "dense") {
      out.push({
        title: "Gates and assembly belong in the written file",
        body: "Dense occupancy at " + p + " means egress and assembly are already a 1910.38 / 1926.35 problem. Add the air: last heading, last band, who was told. The observation file is what first-in can hold."
      });
    }

    /* Deduplicate by title, cap at 6, keep order */
    var seen = {};
    var uniq = [];
    out.forEach(function (f) {
      if (seen[f.title]) return;
      seen[f.title] = 1;
      uniq.push(f);
    });
    if (uniq.length > 6) uniq = uniq.slice(0, 6);
    return uniq;
  }

  function rationale(input, rec, score, drivers) {
    var r = rec.title + " is the fit for " + input.place + " because ";
    if (rec.sku === "event_package") {
      r += "the window is a named event (or behaves like one: dense occupancy, advertised gathering, or VIP movement) rather than year-round occupancy. Score " + score + "/100. Pre-survey, live coverage on the day(s), and a close-out file match that window.";
    } else if (rec.sku === "campus") {
      r += "this is a year-round campus-class site at high relative score (" + score + "/100). Security needs the map between events, and the emergency plan needs a dated observation file. Four flown visits cover the ground; Pro monitoring covers the air.";
    } else if (rec.sku === "build") {
      r += "this is an open job. The ground changes weekly. Progress stills (and thermal when the deck or the hole needs heat) document that change. Score " + score + "/100. Add continuous monitoring if unauthorized broadcasts keep appearing between photo days.";
    } else if (rec.sku === "pro_m") {
      r += "occupancy is ongoing and the score is elevated (" + score + "/100). One site on a 90-day Basic log will not be enough for a campus system, a multi-job GC, or a plant that never goes quiet.";
    } else if (score < 40) {
      r += "the relative score is lower (" + score + "/100): quieter occupancy and airspace. Basic monitoring is still the way to hold a record the first time something transmits. The score is not a clearance.";
    } else {
      r += "the site is a single named place at moderate-to-elevated score (" + score + "/100). One live map, unauthorized-aircraft alerts, and a 90-day archive match that profile. Drivers: " + drivers.join(", ") + ".";
    }
    r += " Fusion Sensor is receive-only. It identifies what is transmitting; it does not jam, spoof, or intercept.";
    return r;
  }

  function steps(input, rec) {
    var s = [];
    s.push("Keep this assessment with the site emergency action plan. Date it. Name who holds it.");
    if (rec.sku === "event_package") {
      s.push("Lock the dates for " + input.place + ". Brief PIC and operations on the TFR/NOTAM picture if one applies. Stand Fusion Sensor before gates, not after the first phone video.");
      s.push("Close the window with an air map and a written observation file. That is the record for the venue and for first-in.");
    } else if (rec.sku === "campus") {
      s.push("Stand year-round monitoring at " + input.place + ". Load the authorized-aircraft list before you go live.");
      s.push("Schedule four flown visits (stills and thermal) and keep one observation file current for the emergency action plan.");
    } else if (rec.sku === "build") {
      s.push("Start weekly or bi-weekly progress flights while the job is open. Photograph people, ways out, the hole, and medical access — not just the pretty deck.");
      s.push("If unauthorized broadcasts appear between photo days, add Fusion Sensor on the named site rather than arguing from stills.");
    } else {
      s.push("Stand Fusion Sensor on the named site. Authorized aircraft marked as authorized. Other transmitting aircraft flagged. Export the log.");
    }
    if (input.prior === "yes") s.push("Treat the next contact as a repeat. Do not auto-clear. Write time, band, and who you told.");
    if (input.air === "tfr") s.push("Print the TFR/NOTAM window and keep it with the operations file. A TFR is not a listener.");
    if (input.under === "yes" || input.people === "dense") s.push("Name who is under likely flight paths in the observation file: gates, seats, roof, assembly.");
    if (input.night === "yes") s.push("Do not rely on eyeballs after dark. Keep ADS-B and the 2.4 / 5.8 GHz radios on.");
    s.push("Remember the sensor limit: cooperative Remote ID and radio energy only. Quiet radios are not a clearance that the air is empty of drones.");
    return s;
  }

  function residual(input) {
    var r = [];
    r.push("Sensors in this model are cooperative Remote ID and radio energy on 2.4 / 5.8 GHz, plus ADS-B for crewed traffic when monitoring is on.");
    r.push("Aircraft that are not broadcasting do not appear as cooperative Remote ID contacts. Silence on the radios does not mean the air is empty of drones.");
    if (input.air !== "tfr") r.push("No TFR was indicated. That does not reduce hobby traffic; it only means ATC has not boxed the window.");
    else r.push("A TFR was indicated. It constrains legal flyers. It does not turn radios off.");
    if (input.under === "yes") r.push("People under the likely orbit remain the dominant consequence after monitoring is on.");
    r.push("This file is an assessment from the facts you entered. It is not an OSHA inspection, not a PE stamp, not live monitoring of the site, and not a licensed security service. Dark Sky Systems LLC.");
    return r;
  }

  function assess(input) {
    var factors = [];

    if (input.people === "dense") add(factors, "People density", 28, "A dense crowd or gate queue is the consequence if an aircraft comes down or a pack vents in the open.");
    else if (input.people === "public") add(factors, "Public on the ground", 18, "Uninvolved people are on the property. 14 CFR 107.39 limits a legal PIC; a rogue aircraft does not care.");
    else add(factors, "Staff-only occupancy", 8, "Fewer uninvolved people, still a workplace. The employer still owes an emergency action plan.");

    if (input.type === "venue") add(factors, "Venue / assembly", 16, "Stadiums, festivals, and large outdoor assemblies attract cameras and hobby flights.");
    else if (input.type === "plant") add(factors, "Industrial / plant", 14, "Consequence is higher: process, chemicals, or critical kit. First-in needs the layout before they arrive.");
    else if (input.type === "build") add(factors, "Open construction", 12, "Open decks and incomplete envelopes invite curiosity flights and make a downed aircraft a job-site problem.");
    else if (input.type === "campus") add(factors, "Campus / facility", 10, "Predictable crowds, rooftops, and media days. Security owns the question of who is in the air.");
    else add(factors, "Site type", 4, "A named place still needs a record if something broadcasts over it.");

    if (input.air === "tfr") add(factors, "TFR / stadium TFR", 26, "Temporary flight restrictions already mark the window as sensitive. Monitoring shows who is still transmitting inside it.");
    else if (input.air === "airport") add(factors, "Near a towered airport", 16, "Crewed traffic is close. ADS-B on the same display as drone contacts is the difference between a rumor and a record.");
    else add(factors, "Open airspace", 6, "No TFR does not mean no drones. It means you have not been handed a NOTAM as a backstop.");

    if (input.prior === "yes") add(factors, "Prior drone incidents", 18, "History is the strongest predictor. A monitoring log is how you stop arguing about whether it happened again.");

    if (input.draw === "advertised") add(factors, "Publicized event", 12, "Advertising a gathering is an invitation for overhead cameras.");
    else if (input.draw === "vip") add(factors, "VIP / executive movement", 10, "A named person on the ground raises the cost of an unknown aircraft.");

    if (input.access === "both") add(factors, "Public line of sight and open envelope", 14, "A flyer on the public road can see the box, and the building is not closed. That is an easy launch.");
    else if (input.access === "roof") add(factors, "Open roof or incomplete envelope", 10, "An unfinished or open roof is a target and a crash surface.");
    else if (input.access === "road") add(factors, "Line of sight from a public road", 8, "Most nuisance flights start from a parking lot or a shoulder with a view.");
    else add(factors, "Controlled ground access", 2, "Harder launch, not zero. Radio energy does not need a parking lot.");

    if (input.span === "ongoing") add(factors, "Ongoing occupancy", 12, "Year-round occupancy means a one-day session is not the product. Continuous monitoring is.");
    else if (input.span === "days") add(factors, "Multi-day period", 8, "A weekend or a three-day job is a named event. Single-event coverage fits.");
    else add(factors, "Hours-long window", 4, "A short window still needs a pre-brief and a close-out file.");

    if (input.night === "yes") add(factors, "Night or low-light ops", 6, "Visual acquisition is worse. Radio contacts matter more.");

    if (input.under === "yes") add(factors, "People under likely flight paths", 10, "If the likely orbit is over uninvolved people, residual risk stays high even with monitoring in place.");

    var score = 0;
    factors.forEach(function (f) { score += f.pts; });
    if (score > 100) score = 100;

    var rec = recommend(input, score);
    var drivers = topNames(factors, 3);
    var findings = buildFindings(input, score);
    var next = rec.oneLiner;

    return {
      place: input.place,
      score: score,
      band: rec.band,
      factors: factors,
      findings: findings,
      findingLines: findings.map(function (f) { return f.title + ": " + f.body; }),
      residual: residual(input),
      plan: rec.plan,
      sku: rec.sku,
      next: next,
      exec: execSummary(input, score, rec, drivers),
      interpretation: interpret(score, rec.band, input),
      rationale: rationale(input, rec, score, drivers),
      steps: steps(input, rec),
      rec: rec,
      drivers: drivers,
      type: input.type,
      people: input.people,
      air: input.air,
      input: input
    };
  }

  var WMO = {
    0: "Clear", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
    45: "Fog", 48: "Icy fog",
    51: "Light drizzle", 53: "Drizzle", 55: "Dense drizzle",
    56: "Freezing drizzle", 57: "Freezing drizzle",
    61: "Light rain", 63: "Rain", 65: "Heavy rain",
    66: "Freezing rain", 67: "Freezing rain",
    71: "Light snow", 73: "Snow", 75: "Heavy snow", 77: "Snow grains",
    80: "Rain showers", 81: "Rain showers", 82: "Heavy rain showers",
    85: "Snow showers", 86: "Heavy snow showers",
    95: "Thunderstorm", 96: "Thunderstorm with hail", 99: "Severe thunderstorm with hail"
  };

  function wmoText(code) {
    return WMO[code] || ("Code " + code);
  }

  function compass(deg) {
    var dirs = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    if (deg == null || isNaN(deg)) return "—";
    return dirs[Math.round(((Number(deg) % 360) + 360) % 360 / 22.5) % 16];
  }

  function mToMiles(m) {
    if (m == null || isNaN(m)) return null;
    return Math.round((Number(m) / 1609.34) * 10) / 10;
  }

  function timedFetch(url, ms, headers) {
    var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    var t = setTimeout(function () { if (ctrl) ctrl.abort(); }, ms || 6000);
    var opts = { headers: headers || { Accept: "application/json" } };
    if (ctrl) opts.signal = ctrl.signal;
    return fetch(url, opts).then(function (res) {
      clearTimeout(t);
      if (!res.ok) throw new Error("http " + res.status);
      return res.json();
    }).catch(function () {
      clearTimeout(t);
      return null;
    });
  }

  function pickGeo(results) {
    if (!results || !results.length) return null;
    var us = results.filter(function (r) { return r.country_code === "US"; });
    return (us[0] || results[0]);
  }

  function parseHours(fc) {
    var hours = [];
    if (!fc || !fc.hourly || !fc.hourly.time) return hours;
    var now = Date.now();
    var t = fc.hourly.time;
    for (var i = 0; i < t.length && hours.length < 24; i++) {
      var ts = Date.parse(t[i]);
      if (isNaN(ts) || ts < now - 30 * 60 * 1000) continue;
      hours.push({
        time: t[i],
        tempF: fc.hourly.temperature_2m[i],
        windMph: fc.hourly.wind_speed_10m[i],
        gustMph: fc.hourly.wind_gusts_10m[i],
        precipIn: fc.hourly.precipitation[i],
        precipProb: fc.hourly.precipitation_probability[i],
        visMiles: mToMiles(fc.hourly.visibility[i]),
        code: fc.hourly.weather_code[i],
        text: wmoText(fc.hourly.weather_code[i])
      });
    }
    return hours;
  }

  function weatherOps(wx) {
    var c = wx.current || {};
    var hours = wx.hours || [];
    var maxWind = c.windMph || 0;
    var maxGust = c.windGust || 0;
    var minVis = c.visMiles == null ? 10 : c.visMiles;
    var maxPrecipProb = 0;
    var thunder = /thunder/i.test(c.text || "");
    var precipNow = (c.precipIn && c.precipIn > 0.01) || /rain|snow|drizzle|shower|thunder|fog/i.test(c.text || "");
    hours.slice(0, 24).forEach(function (h) {
      if (h.windMph > maxWind) maxWind = h.windMph;
      if (h.gustMph > maxGust) maxGust = h.gustMph;
      if (h.visMiles != null && h.visMiles < minVis) minVis = h.visMiles;
      if (h.precipProb > maxPrecipProb) maxPrecipProb = h.precipProb;
      if (/thunder/i.test(h.text || "")) thunder = true;
    });
    var alerts = wx.alerts || [];
    var severeAlert = alerts.some(function (a) {
      return /thunder|tornado|high wind|blizzard|hurricane|flood|ice storm|winter storm|dust/i.test(a.event || "");
    });
    var fly = "go";
    if (thunder || severeAlert || maxGust >= 30 || maxWind >= 25 || minVis < 1) fly = "hold";
    else if (maxGust >= 22 || maxWind >= 18 || minVis < 3 || precipNow || maxPrecipProb >= 60 || alerts.length) fly = "caution";
    return {
      fly: fly,
      maxWind: Math.round(maxWind),
      maxGust: Math.round(maxGust),
      minVis: minVis,
      thunder: thunder,
      precipNow: precipNow,
      maxPrecipProb: maxPrecipProb,
      alerts: alerts.length > 0,
      severeAlert: severeAlert
    };
  }

  function applyWeather(report, wx) {
    if (!report) return report;
    if (!report._base) {
      report._base = {
        findings: (report.findings || []).slice(),
        steps: (report.steps || []).slice(),
        exec: report.exec,
        rationale: report.rationale,
        residual: (report.residual || []).slice()
      };
    } else {
      report.findings = report._base.findings.slice();
      report.steps = report._base.steps.slice();
      report.exec = report._base.exec;
      report.rationale = report._base.rationale;
      report.residual = report._base.residual.slice();
    }
    if (!wx || !wx.ok) {
      report.weather = { ok: false };
      report.weatherApplied = false;
      report.residual.push("Weather was not available at generation time. The occupancy and airspace score still stands.");
      return report;
    }
    report.weatherApplied = true;
    report.weather = wx;
    var ops = weatherOps(wx);
    wx.ops = ops;
    var geo = wx.geo && wx.geo.label ? wx.geo.label : report.place;
    var c = wx.current;
    var nowLine = c
      ? (Math.round(c.tempF) + "°F, wind " + c.windDir + " " + Math.round(c.windMph) + " mph gusting " + Math.round(c.windGust) + ", visibility " + (c.visMiles != null ? c.visMiles + " mi" : "—") + ", " + c.text + (c.precipIn > 0.01 ? (", " + c.precipIn + " in precip") : "") + ".")
      : "";
    report.exec = (report.exec || "") + " Weather at " + geo + " as of this pull: " + nowLine
      + (ops.fly === "hold"
        ? " Weather is a hold for flown work; it is not a reason to stop listening."
        : ops.fly === "caution"
          ? " Weather is a caution for flown work. Fusion Sensor does not wait on a ceiling."
          : " Weather is not the driver of the occupancy/airspace score at this hour.");

    var wxFindings = [];
    if (ops.thunder || ops.severeAlert) {
      var alertBit = (wx.alerts && wx.alerts[0]) ? (" Active alert: " + wx.alerts[0].event + ".") : "";
      wxFindings.push({
        title: "Weather is a hold for flown work",
        body: "Thunderstorms or a severe weather alert are in the window at " + geo + "." + alertBit
          + " Do not launch company flights into that. Keep Fusion Sensor on. Radio and Remote ID do not need a visual horizon. A pack in rain or a wet deck is a first-in problem if someone else is already up."
      });
    } else if (wx.alerts && wx.alerts.length) {
      wxFindings.push({
        title: "An official weather alert is in effect",
        body: "NWS has " + wx.alerts[0].event + " at " + geo + ". That is a crew, battery, and duration constraint — not a reason the air is empty. Lithium packs run hotter. Flown visits get a shorter, cooler window. Keep listening."
      });
    } else if (ops.maxGust >= 22 || ops.maxWind >= 18) {
      wxFindings.push({
        title: "Wind limits a small UAS. It does not limit a listener",
        body: "Near-term wind at " + geo + " reaches about " + ops.maxWind + " mph with gusts near " + ops.maxGust
          + " mph. That is the usual abort for a light airframe (flyaway, unstable hover, no useful still). Unauthorized flyers still launch in it. Fusion Sensor still hears Remote ID and 2.4 / 5.8 GHz. Do not treat wind as an empty sky."
      });
    } else if (ops.minVis < 3 || /fog/i.test((c && c.text) || "")) {
      wxFindings.push({
        title: "Low visibility takes the eyes off the problem",
        body: "Visibility at " + geo + " is about " + ops.minVis + " miles (" + ((c && c.text) || "reduced") + "). Security will not acquire a small UAS against a roof or a crowd. Radio contacts and Remote ID become the site picture. Night plus this weather is worse."
      });
    } else if (ops.precipNow || ops.maxPrecipProb >= 60) {
      wxFindings.push({
        title: "Precipitation is a flight call, not a listen call",
        body: "Rain or a high precip chance is in the next day at " + geo + " (peak probability about " + Math.round(ops.maxPrecipProb)
          + "%). Wet decks, holes, and lithium packs matter if an aircraft comes down. Progress flights and observation stills wait. The map does not."
      });
    } else {
      wxFindings.push({
        title: "Weather is not the driver at this hour",
        body: "Current conditions at " + geo + " (" + nowLine + ") do not by themselves abort a small UAS or a listen. Occupancy, airspace, and launch access still set the score. Recheck wind and radar before any flown visit."
      });
    }
    report.findings = (wxFindings.concat(report.findings || [])).slice(0, 7);
    report.findingLines = report.findings.map(function (f) { return f.title + ": " + f.body; });

    if (ops.fly === "hold") {
      report.steps = (report.steps || []).slice();
      report.steps.splice(1, 0, "Hold company flights until the storm or alert window closes. Leave Fusion Sensor running.");
    } else if (ops.fly === "caution") {
      report.steps = (report.steps || []).slice();
      report.steps.splice(1, 0, "Treat flown visits as weather-dependent (wind, vis, precip). Monitoring on the named site does not wait on a ceiling.");
    }
    if (wx.alerts && wx.alerts[0]) {
      report.steps = (report.steps || []).slice();
      report.steps.splice(1, 0, "Honor the active alert: " + wx.alerts[0].event + ". It is a ground-truth constraint, not a score adjustment.");
    }

    if (ops.fly !== "go" && report.rationale) {
      report.rationale += " Weather at pull time does not change the occupancy/airspace score. It does change flown work: " + (ops.fly === "hold" ? "hold launches;" : "caution on launches;") + " keep the listener on.";
    }
    return report;
  }

  function locFromPhoton(geo) {
    var feat = geo && geo.features && geo.features[0];
    if (!feat || !feat.geometry || !feat.geometry.coordinates) return null;
    var p = feat.properties || {};
    return {
      lat: feat.geometry.coordinates[1],
      lon: feat.geometry.coordinates[0],
      countrycode: String(p.countrycode || p.country || "").toUpperCase(),
      label: [p.name, p.city || p.state, p.countrycode || p.country].filter(Boolean).join(", ")
    };
  }

  function locFromMeteo(geo) {
    var hit = pickGeo(geo && geo.results);
    if (!hit) return null;
    return {
      lat: hit.latitude,
      lon: hit.longitude,
      countrycode: String(hit.country_code || "").toUpperCase(),
      label: [hit.name, hit.admin1, hit.country_code].filter(Boolean).join(", ")
    };
  }

  function geocodePlace(q) {
    var photon = "https://photon.komoot.io/api/?q=" + encodeURIComponent(q) + "&limit=3";
    return timedFetch(photon, 5000).then(function (geo) {
      var loc = locFromPhoton(geo);
      if (loc) return loc;
      return timedFetch("https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(q) + "&count=5&language=en&format=json", 4000)
        .then(locFromMeteo);
    });
  }

  function forecastAt(loc) {
    if (!loc) return Promise.resolve(null);
    var lat = loc.lat;
    var lon = loc.lon;
    var fcUrl = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon
      + "&current=temperature_2m,precipitation,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m,visibility"
      + "&hourly=temperature_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m,wind_gusts_10m,visibility"
      + "&forecast_days=2&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch";
    var nwsUrl = "https://api.weather.gov/alerts/active?point=" + lat + "," + lon;
    var fcP = timedFetch(fcUrl, 6000);
    var alP = loc.countrycode === "US" || loc.countrycode === "UNITED STATES"
      ? timedFetch(nwsUrl, 5000, { Accept: "application/geo+json" })
      : Promise.resolve(null);
    return Promise.all([fcP, alP]).then(function (pair) {
      var fc = pair[0];
      if (!fc || !fc.current) return null;
      var cur = fc.current;
      var alerts = [];
      if (pair[1] && pair[1].features) {
        pair[1].features.slice(0, 4).forEach(function (f) {
          var p = f.properties || {};
          alerts.push({
            event: p.event || "Alert",
            severity: p.severity || "",
            headline: p.headline || p.description || ""
          });
        });
      }
      return {
        ok: true,
        fetchedAt: new Date().toISOString(),
        geo: {
          name: loc.label,
          lat: lat,
          lon: lon,
          label: loc.label
        },
        current: {
          time: cur.time,
          tempF: cur.temperature_2m,
          windMph: cur.wind_speed_10m,
          windGust: cur.wind_gusts_10m,
          windDeg: cur.wind_direction_10m,
          windDir: compass(cur.wind_direction_10m),
          visMiles: mToMiles(cur.visibility),
          precipIn: cur.precipitation,
          cloud: cur.cloud_cover,
          code: cur.weather_code,
          text: wmoText(cur.weather_code)
        },
        hours: parseHours(fc),
        alerts: alerts
      };
    });
  }

  function fetchWeather(place) {
    var q = String(place || "").trim();
    if (!q) return Promise.resolve(null);
    return geocodePlace(q).then(forecastAt);
  }

  w.DSSRisk = { assess: assess, LABELS: LABELS, fetchWeather: fetchWeather, applyWeather: applyWeather };
})(window);
