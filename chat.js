(function () {
  "use strict";
  if (window.__DSS_CHAT__) return;
  window.__DSS_CHAT__ = 1;
  var KB = window.DSS_KB || { products: [], limits: [], contact: "index.html#request" };
  var CFG = window.DSS_CHAT || { api: "" };
  function chatApi() {
    return (CFG && CFG.api) || "";
  }
  var hist = [];

  function bySku(sku) {
    var i, p;
    for (i = 0; i < (KB.products || []).length; i++) {
      p = KB.products[i];
      if (p.sku === sku) return p;
    }
    return null;
  }

  function link(p) {
    if (!p) return "";
    return '<a href="' + p.pay + '">' + p.name + " — " + p.price + "</a>";
  }

  function pack(sku, extra) {
    var p = bySku(sku);
    var s = p ? link(p) + ". " + p.blurb : "";
    if (extra) s += " " + extra;
    return s;
  }

  function localAnswer(q) {
    var t = String(q || "").toLowerCase();
    if (/wedding|bride|groom|engagement photo|portrait|real.?estate listing|birthday party|grad party|prom |music video|influencer|cinematic|family photos|headshot/.test(t)) {
      return "No. We do not shoot wedding photos, portraits, or marketing stills. Dark Sky is airspace monitoring, observation files, and emergency overhead — not a photographer. If the question is unauthorized drones over a named venue, that is <a href=\"pay.html?sku=event_package\">Single-Event Airspace Awareness — $2,495</a>. If you wanted a photographer, this is the wrong company.";
    }
    if (/911|hurt|injured|dying|someone is down|life.?threat/.test(t)) {
      return "If people are in danger, call 911 first. Dark Sky Systems LLC is not emergency dispatch and not a licensed security company. After the scene is owned by command, we can fly color and thermal when they say so, or listen on the box. Start at <a href=\"disaster.html\">Disaster &amp; Emergency</a>.";
    }
    if (/jam|spoof|neutraliz|take over|takeover|shoot.?down|kill the drone|intercept/.test(t)) {
      return "Detection is receive-only. Fusion Sensor identifies what is transmitting; it does not jam, spoof, intercept, or take over aircraft. CyberReaper is not a public product. If you need a record of what is in the air, start with <a href=\"pay.html?sku=basic_m\">Monitoring · Basic — $250 / month</a> or <a href=\"pay.html?sku=soft\">Fusion Sensor — $2,000</a>.";
    }
    if (/cyberreaper|reaper|tx unlock/.test(t)) {
      return "CyberReaper is a restricted capability. It is not sold on this site, not on Stripe, and it is not thermal. Qualified entities only — briefing, TX unlock. For public work we sell listen-only detection and flown observation. Use <a href=\"index.html#request\">Talk to us</a> and mark CyberReaper TX (qualified).";
    }
    if (/dark sky llc\b/.test(t)) {
      return "The legal name is Dark Sky Systems LLC, d/b/a Dark Sky. Never Dark Sky LLC.";
    }
    if (/24\/7|person watching|security guard|soc\b/.test(t)) {
      return "Monitoring is software listening on a named site — a live map and alerts when an unauthorized aircraft is transmitting. It is not a person watching a screen 24/7, and we are not a licensed security company. " + pack("basic_m");
    }
    if (/empty sky|rid.?off|dark aircraft|what can.?t you see|limit/.test(t)) {
      return "Sensors are cooperative Remote ID and radio energy on 2.4 / 5.8 GHz, plus ADS-B for crewed traffic when monitoring is on. Aircraft that are not broadcasting do not appear as cooperative Remote ID contacts. Silence on the radios does not mean the air is empty of drones.";
    }
    if (/\bevent security|vip movement|rally|high-profile event|gates are open/.test(t) && !/disaster|wreck|hurricane|wildfire/.test(t)) {
      return "Events / High-Profile Security is for organizers, security details, and private clients — rallies, VIP movements, large outdoor gatherings. Unauthorized transmitting aircraft are flagged during the named window. Not disaster response and not photography. Page: <a href=\"events.html\">Events</a>. Package: " + pack("event_package");
    }
    if (/disaster|search|missing person|wreck|fire ground|first.?in|thermal mapping|hurricane|wildfire|flood/.test(t)) {
      return "Air support for emergency and disaster scenes. For fire, EMS, and law enforcement responding to hurricanes, floods, wildfires, major wrecks, and other large incidents. <a href=\"disaster.html?v=2\">Disaster &amp; Emergency</a>. Rapid Coverage · $2,495.";
    }
    if (/\b79\b|risk report|score (the |this )?site|assessment report/.test(t)) {
      return pack("risk_report", "Score the place first (free preview), then pay. Same browser to open the file.");
    }
    if (/\b149\b|eap pack|emergency action plan/.test(t) && !/disaster/.test(t)) {
      return pack("eap_pack", "Professional templates your company completes. Not an inspection and not a PE stamp.");
    }
    if (/template|observation file/.test(t)) {
      return pack("obs_templates") + " Sample: <a href=\"sample.html\">sample.html</a>.";
    }
    if (/training|remote id in plain/.test(t)) {
      return pack("training_pack");
    }
    if (/4,?500|radios|radio stack|kit the radios/.test(t)) {
      return pack("radio", "$2,000 is software only — you supply the radios.");
    }
    if (/2,?000|fusion sensor|detect drones|software/.test(t) && !/monitor/.test(t)) {
      return pack("soft", "If you need the radios shipped: " + link(bySku("radio")) + ".");
    }
    if (/18,?000|campus/.test(t)) {
      return pack("campus");
    }
    if (/2,?500|construction|progress flight/.test(t) && !/year/.test(t)) {
      return pack("build");
    }
    if (/8,?500|venue|season/.test(t)) {
      return pack("venue");
    }
    if (/6,?495|three dates|3 dates|multi-event/.test(t) && !/5/.test(t)) {
      return pack("events_3", "Five dates: " + link(bySku("events_5")) + ".");
    }
    if (/9,?995|five dates|5 dates/.test(t)) {
      return pack("events_5");
    }
    if (/2,?495|single-event|vip movement|named window|stadium date|unauthorized drone over/.test(t)) {
      return pack("event_package");
    }
    if (/pro\b|750|several sites|multi-site/.test(t) && /monitor/.test(t)) {
      return pack("pro_m");
    }
    if (/monitor|listening|alerts|live map|250/.test(t)) {
      return pack("basic_m", "Need several sites or a two-year archive: " + link(bySku("pro_m")) + ". Monitoring is not the same as owning Fusion Sensor ($2,000 / $4,500) and not the same as a flown job.");
    }
    if (/price|how much|cost|pricing/.test(t)) {
      return "Digital: Risk Report $79 · Templates $49 · Training $99 · EAP Pack $149. Monitoring: Basic $250/month (or $2,500/year) · Pro $750/month (or $7,500/year). Detect: Fusion Sensor $2,000 · with radios $4,500. Flown packages: Single-Event $2,495 · Multi-Event 3 / $6,495 · 5 / $9,995 · Construction $2,500/month · Venue season $8,500 · Campus $18,000/year. Checkout is Stripe on this site.";
    }
    if (/recommend|what should i buy|which package|need help choos/.test(t)) {
      return "Tell me the place and the window. A named weekend or VIP date is usually <a href=\"pay.html?sku=event_package\">Single-Event — $2,495</a>. Year-round campus is <a href=\"pay.html?sku=campus\">Campus &amp; Facility — $18,000/year</a>. An open job is <a href=\"pay.html?sku=build\">Construction Progress — $2,500/month</a>. If you only need a file this afternoon, start with the <a href=\"risk.html\">$79 risk report</a>. If people are in danger, call 911 first.";
    }
    if (/contact|talk to|human|someone from/.test(t)) {
      return "Use <a href=\"index.html#request\">Talk to us</a>. Name, callback, place, and dates. If people are in danger, call 911 first.";
    }
    return "I can help with monitoring, Fusion Sensor, flown packages, disaster coverage, and the digital files. I will not invent a capability we do not sell. Ask about a named place and a window, or open <a href=\"index.html#request\">Talk to us</a>.";
  }

  function el(html) {
    var d = document.createElement("div");
    d.innerHTML = html;
    return d.firstElementChild;
  }

  function addMsg(role, html) {
    var log = document.getElementById("dssChatLog");
    var m = document.createElement("div");
    m.className = "dss-chat-msg " + (role === "me" ? "me" : "bot");
    m.innerHTML = html;
    log.appendChild(m);
    log.scrollTop = log.scrollHeight;
  }

  function send(text) {
    var q = String(text || "").replace(/^\s+|\s+$/g, "");
    if (!q) return;
    addMsg("me", q.replace(/[&<>]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]; }));
    hist.push({ role: "user", content: q });
    var api = chatApi();
    function fmt(text) {
      var s = String(text || "");
      s = s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
      s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+|[\w./#-]+)\)/g, '<a href="$2">$1</a>');
      s = s.replace(/\n/g, "<br>");
      return s;
    }
    function done(html) {
      addMsg("bot", html);
      hist.push({ role: "assistant", content: String(html).replace(/<[^>]+>/g, "") });
    }
    if (!api) {
      done(localAnswer(q));
      return;
    }
    fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: hist.slice(-12).map(function (m) { return { role: m.role, content: m.content }; }) })
    }).then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (x) {
        if (x.ok && x.j && x.j.reply) done(fmt(x.j.reply));
        else done(localAnswer(q));
      })
      .catch(function () { done(localAnswer(q)); });
  }

  function mount() {
    var btn = el('<button type="button" class="dss-chat-btn" id="dssChatBtn">Ask Dark Sky</button>');
    var panel = el(
      '<div class="dss-chat-panel" id="dssChatPanel" hidden role="dialog" aria-label="Product assistant">' +
        '<div class="dss-chat-head"><strong>Product desk</strong><button type="button" class="dss-chat-x" id="dssChatX" aria-label="Close">×</button></div>' +
        '<div class="dss-chat-log" id="dssChatLog"></div>' +
        '<div class="dss-chat-chips" id="dssChatChips"></div>' +
        '<form class="dss-chat-form" id="dssChatForm"><input id="dssChatIn" maxlength="500" autocomplete="off" placeholder="Ask about a package" /><button type="submit">Send</button></form>' +
      "</div>"
    );
    document.body.appendChild(btn);
    document.body.appendChild(panel);
    addMsg("bot", "Ask about monitoring, Fusion Sensor, flown jobs, disaster coverage, or a price. If people are in danger, call 911 first.");
    var chips = [
      ["$79 report", "What is the $79 risk report?"],
      ["Monitoring", "What does Monitoring Basic include?"],
      ["One event", "I have a stadium date this weekend."],
      ["Detect", "Difference between $2,000 software and $4,500 with radios?"],
      ["Emergency", "Can you cover a search or a wreck?"]
    ];
    var box = document.getElementById("dssChatChips");
    chips.forEach(function (c) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = c[0];
      b.addEventListener("click", function () { send(c[1]); });
      box.appendChild(b);
    });
    btn.addEventListener("click", function () {
      panel.hidden = !panel.hidden;
      if (!panel.hidden) document.getElementById("dssChatIn").focus();
    });
    document.getElementById("dssChatX").addEventListener("click", function () { panel.hidden = true; });
    document.getElementById("dssChatForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var inp = document.getElementById("dssChatIn");
      var v = inp.value;
      inp.value = "";
      send(v);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
