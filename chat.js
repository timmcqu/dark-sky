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

  function hrefOf(p) {
    var h = (p && (p.pay || p.href)) || "";
    if (!h) return "/index.html#request";
    if (h.indexOf("http") === 0 || h.charAt(0) === "/") return h;
    return "/" + h;
  }

  function link(p) {
    if (!p) return "";
    return '<a href="' + hrefOf(p) + '">' + p.name + " — " + p.price + "</a>";
  }

  function talk() {
    return '<a href="/index.html#request">Talk to us</a> — name, phone, place, dates.';
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
      return "No. We do not shoot weddings or marketing stills. If the question is unauthorized drones over a named venue, that is " + pack("event_package") + " Or start with " + link(bySku("crew")) + ".";
    }
    if (/911|hurt|injured|dying|someone is down|life.?threat/.test(t)) {
      return "If people are in danger, call 911 first. Dark Sky Systems LLC is not dispatch and not a licensed security company. After command owns the scene: " + link(bySku("crew")) + " or " + talk() + ".";
    }
    if (/jam|spoof|neutraliz|take over|takeover|shoot.?down|kill the drone|intercept|cuas|c-uas/.test(t)) {
      return "Receive-only. We do not jam, spoof, or intercept. Public products are Remote ID <strong>receivers</strong> and files. " + link(bySku("esprid")) + " or " + talk() + ".";
    }
    if (/cyberreaper|reaper|tx unlock/.test(t)) {
      return "CyberReaper is not a public product and is not on Stripe. Public work is receive-only receivers. " + talk();
    }
    if (/dark sky llc\b/.test(t)) {
      return "Legal name is Dark Sky Systems LLC, d/b/a Dark Sky. Never Dark Sky LLC.";
    }
    if (/find all drones|see every drone|detect all|dark aircraft|rid.?off|empty sky|what can.?t you see|limit|range|how far/.test(t)) {
      return "Receivers hear <strong>cooperative</strong> Remote ID (Wi-Fi + Bluetooth). Pi receivers also hear ADS-B (crewed traffic). Dark or RID-off aircraft do not appear. Silence on the radios does not mean the air is empty. We do not publish a magic range for ESP32. The portable RIDER PDP is about 3 miles of broadcast reception. " + link(bySku("esprid")) + ".";
    }
    if (/hardware only|ready.?to.?run|rtr\b|do i flash|you flash/.test(t)) {
      return "Same hardware. Hardware Only: you load the receiver image. Ready-to-Run: we load it before it ships, extra business day. Guide: <a href=\"/guides/hardware-only-vs-ready-to-run.html\">Hardware Only vs Ready-to-Run</a>. Pocket: " + link(bySku("esprid")) + " Site: " + link(bySku("pirecv")) + ".";
    }
    if (/^(\s*)?(hi|hey|hello|help|what do you sell|start)\s*[.!?]*$/.test(t)) {
      return "Fire/EMS, campus, job, or event? Fastest file is " + link(bySku("crew")) + ". USB-C receiver with a screen: " + link(bySku("esprid")) + ".";
    }
    if (/fire|ems|first.?in|engine |medic |chief |rig\b|station /.test(t) && !/campus|stadium/.test(t)) {
      return "For the dash: " + pack("crew") + " All four cards: " + link(bySku("crew")) + ". If you want IDs on a screen in the CP: " + link(bySku("esprid")) + ".";
    }
    if (/job.?site|construction|gc\b|superintendent|trailer/.test(t)) {
      return pack("jobsite_log") + " Trailer radios: " + link(bySku("listen_starter")) + ". Pi kit: " + link(bySku("pistarter")) + ".";
    }
    if (/diy|maker|esp32|board only|i can flash/.test(t) && !/display|screen/.test(t)) {
      return "Hardware Only board: " + pack("rid_board") + " Color screen: " + link(bySku("esprid")) + ".";
    }
    if (/pi receiver|raspberry|ads-?b|starter kit|leave it on/.test(t)) {
      return "Pi Receiver (indoor, case, 1090): " + pack("pirecv") + " Cheaper first kit: " + link(bySku("pistarter")) + ". Line: <a href=\"/products/raspberry-pi-receivers/\">Pi Receivers</a>.";
    }
    if (/receiver|esp32|display|scanner|oled|which (kit|board|radio)/.test(t)) {
      return "Pocket screen: " + link(bySku("esprid")) + ". Bare USB-C: " + link(bySku("rid_board")) + ". Named indoor site: " + link(bySku("pirecv")) + ". Line: <a href=\"/products/esp32-detection-boards/\">ESP32 Receivers</a>.";
    }
    if (/\bevent|vip|rally|stadium|gates are open|named (date|window)/.test(t) && !/disaster|wreck|hurricane|wildfire/.test(t)) {
      return "Named window, receive-only. Package: " + pack("event_package") + " Bag a Display for the CP: " + link(bySku("esprid")) + ". Book: " + talk();
    }
    if (/disaster|search|missing person|wreck|hurricane|wildfire|flood/.test(t)) {
      return "Call 911 if people are in danger. Rapid named-window: " + pack("event_package") + " Card for the dash: " + link(bySku("crew")) + ". Page: <a href=\"/disaster.html?v=2\">Disaster &amp; Emergency</a>.";
    }
    if (/\b19\b|scene card|pocket card|over the scene/.test(t)) {
      return "That $19 card is pulled. Crew paper is " + pack("crew") + " USB-C receiver: " + link(bySku("esprid")) + ".";
    }
    if (/\b79\b|risk report|score (the |this )?site|assessment report/.test(t)) {
      return pack("risk_report", "A file this afternoon. If you want radios after that: " + link(bySku("esprid")) + ".");
    }
    if (/eap pack|emergency action plan|\b149\b/.test(t) && !/disaster/.test(t)) {
      return pack("eap_pack", "Templates you complete. Not an inspection.");
    }
    if (/template|observation file/.test(t)) {
      return pack("obs_templates") + " Sample: <a href=\"/sample.html\">sample observation file</a>.";
    }
    if (/training|remote id in plain/.test(t)) {
      return pack("training_pack");
    }
    if (/4,?500|radio stack|kit the radios/.test(t)) {
      return pack("radio", "Software-only is " + link(bySku("soft")) + ".");
    }
    if (/fusion|2,?000|laptop|live map/.test(t) && !/monitor/.test(t)) {
      return pack("soft", "Need radios shipped: " + link(bySku("radio")) + ". Already have a Receiver? Fusion is the map, not a second radio.");
    }
    if (/campus|18,?000/.test(t)) {
      return "Start with a Receiver you keep: " + link(bySku("pirecv")) + " or " + link(bySku("esprid")) + ". Year-round visits: " + pack("campus") + " A named weekend is " + link(bySku("event_package")) + ". " + talk();
    }
    if (/2,?500|construction progress/.test(t) && !/year/.test(t)) {
      return pack("build") + " Job log while you decide: " + link(bySku("jobsite_log")) + ".";
    }
    if (/8,?500|venue season/.test(t)) {
      return pack("venue");
    }
    if (/6,?495|three dates|3 dates|multi-event/.test(t) && !/5/.test(t)) {
      return pack("events_3", "Five dates: " + link(bySku("events_5")) + ".");
    }
    if (/9,?995|five dates|5 dates/.test(t)) {
      return pack("events_5");
    }
    if (/2,?495|single-event|named window/.test(t)) {
      return pack("event_package") + " " + talk();
    }
    if (/24\/7|unattended|soc\b|security guard/.test(t)) {
      return "We do not sell unattended 24/7 monitoring. A Receiver you keep, or we stand a named-date coverage. " + link(bySku("esprid")) + " · " + link(bySku("event_package")) + ". " + talk();
    }
    if (/price|how much|cost|pricing/.test(t)) {
      return "Files: scene card $19 · crew bundle $49 · risk $79 · EAP $149. Receivers: ESP32 $39–$249 · Pi $279–$729 (Hardware Only / Ready-to-Run). Fusion Sensor $2,000 · with radios $4,500. Named-date coverage $2,495. Stripe on the product page.";
    }
    if (/recommend|what should i buy|which package|need help choos/.test(t)) {
      return "Fire/EMS → " + link(bySku("crew")) + ". Pocket IDs → " + link(bySku("esprid")) + ". Site that stays on → " + link(bySku("pirecv")) + ". Named weekend → " + link(bySku("event_package")) + " then " + talk() + ".";
    }
    if (/contact|talk to|human|someone from/.test(t)) {
      return talk() + " If people are in danger, call 911 first.";
    }
    return "Tell me fire/EMS, campus, job, or event. Fastest Stripe: " + link(bySku("crew")) + ". Pocket receiver: " + link(bySku("esprid")) + ". Or " + talk() + ".";
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
        '<div class="dss-chat-head"><strong>Ask Dark Sky</strong><span class="dss-chat-live">Online</span><button type="button" class="dss-chat-x" id="dssChatX" aria-label="Close">×</button></div>' +
        '<div class="dss-chat-log" id="dssChatLog"></div>' +
        '<div class="dss-chat-chips" id="dssChatChips"></div>' +
        '<form class="dss-chat-form" id="dssChatForm"><input id="dssChatIn" maxlength="500" autocomplete="off" placeholder="Fire, campus, job, or event?" /><button type="submit">Send</button></form>' +
      "</div>"
    );
    document.body.appendChild(btn);
    document.body.appendChild(panel);
    addMsg("bot", "Ask Dark Sky. I sell receive-only Remote ID <strong>receivers</strong> and instant files. Fire/EMS, campus, job, or event? If people are in danger, call 911 first.");
    var chips = [
      ["Crew paper", "I need crew paper"],
      ["Receivers", "Which receiver should I buy?"],
      ["Ready-to-Run", "Hardware Only or Ready-to-Run?"],
      ["Named date", "I have a stadium date this weekend."],
      ["All drones?", "Does it find all drones?"]
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
