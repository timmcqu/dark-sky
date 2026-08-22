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
      lede: "Pro monitoring, four flown visits with stills and thermal, one observation file.",
      price: "$18,000 / year",
      amount: "18000",
      chase: "",
      stripe: "",
      gets: ["Pro monitoring", "Four flown visits", "One observation file"]
    },
    build: {
      title: "Construction Progress",
      lede: "Weekly or bi-weekly stills while the job is open. Thermal as needed.",
      price: "$2,500 / month",
      amount: "2500",
      chase: "",
      stripe: "",
      gets: ["Weekly or bi-weekly stills", "Thermal as needed", "Air map on request"]
    },
    venue: {
      title: "Venue & Event Season",
      lede: "Named dates: pre-survey, coverage days, air map, post file.",
      price: "$8,500 / season",
      amount: "8500",
      chase: "",
      stripe: "",
      gets: ["Pre-survey", "Coverage days", "Air map and post file"]
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
      lede: "Give first-in companies and your operations team the site information the Emergency Action Plan needs: reporting, ways out, assembly, medical, the path apparatus uses. Built to sit with 29 CFR 1910.38 and 1926.35.",
      price: "$149",
      amount: "149",
      chase: "",
      stripe: "",
      gets: [
        "Cover sheet: site ID, plan keeper, how emergencies are reported (1910.38(c)(1))",
        "Exit routes, gates, and assembly / accounting locations (1910.38(c)(2)–(4) · 1926.35)",
        "Rescue, medical, ambulance in, patient out, first-in path (1910.38(c)(5))",
        "Excavation, confined space, and fall observations where they apply",
        "How-to so operations keep the file with the written EAP",
        "PDF plus an editable HTML copy — download on the thank-you page"
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
      title: "Single-Event Airspace Awareness",
      lede: "Know what is in the air before the gates open, while the event is running, and after it closes. You leave with a written record.",
      price: "$2,195",
      amount: "2195",
      chase: "",
      stripe: "",
      gets: [
        "Pre-event risk survey for the named place and dates",
        "Live Fusion Sensor coverage on the event day(s): authorized aircraft marked as authorized, other transmitting aircraft flagged",
        "Post-event air map you can keep",
        "Written observation file for ops and first-in",
        "Setup email after payment so we lock the dates"
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
  if (price) price.textContent = sku.price;
  var isPack = key === "ra" || key === "cards" || key === "eventpack";
  var eyebrow = document.getElementById("sku-eyebrow");
  var fine = document.getElementById("sku-fine");
  if (eyebrow) {
    eyebrow.textContent = key === "event_package"
      ? "Event coverage · Checkout"
      : (isPack ? "Digital packs · Checkout" : (key === "soft" || key === "radio" ? "Detect Drones · Checkout" : "Plans · Checkout"));
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
    else if (payOnStripe) lead.textContent = "Name and email if you want a setup note. Pay with Stripe next. Deposit lands in Dark Sky Systems LLC.";
    else lead.textContent = "Name and email. After the deposit posts, we send next steps.";
  }
  var trust = document.getElementById("payTrust");
  if (trust) {
    if (key === "risk_report" || key === "airspace_report") {
      trust.textContent = "Use the same browser you scored or named the place in. After Stripe, the report opens. Print or Save as PDF. No card data is stored on darksky.systems.";
    } else if (key === "obs_templates" || key === "training_pack" || key === "eap_pack") {
      trust.textContent = "After Stripe, the thank-you page has a Download button. Click it. That is the whole delivery. No card data is stored on darksky.systems.";
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
