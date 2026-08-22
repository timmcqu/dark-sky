(function () {
  "use strict";
  var RELAY = "https://formsubmit.co/ajax/9e30fb114bdd52baca9ba3fc044fe19b";
  var SKUS = {
    ra: {
      title: "Site survey pack",
      lede: "Digital observation templates for a named property. Not an OSHA inspection. Not a PE stamp. Emailed after the deposit posts.",
      price: "$500",
      amount: "500",
      chase: "",
      gets: [
        "DS-RA observation file template",
        "OSHA / first-in annex map for operations use",
        "People, egress, excavation, confined space, medical rows",
        "Emailed after deposit. Editable copy."
      ]
    },
    cards: {
      title: "Field cards pack",
      lede: "Digital abort and emergency observation cards. Pocket size. Emailed after the deposit posts.",
      price: "$250",
      amount: "250",
      chase: "",
      gets: [
        "Flyaway, crash, battery fire, medical, loss of link",
        "Scene / life safety / abort / handoff language",
        "Emailed after deposit. Printable."
      ]
    },
    eventpack: {
      title: "Event window pack",
      lede: "Digital paper for a named venue and window. Emailed after the deposit posts.",
      price: "$750",
      amount: "750",
      chase: "",
      gets: [
        "Pre-window risk matrix",
        "In-window DRA",
        "Post-window review",
        "Abort card and sample event language",
        "Emailed after deposit. Editable copy."
      ]
    },
    soft: {
      title: "Fusion Sensor",
      lede: "Fusion Sensor on your laptop. You already have the radios. One site, up to three days.",
      price: "$2,000",
      amount: "2000",
      chase: "",
      gets: [
        "Fusion Sensor on your laptop",
        "One site, up to three days",
        "Fingerprints: Avata, Autel, Mini, and the rest",
        "You bring the laptop and the radios"
      ]
    },
    radio: {
      title: "Fusion Sensor + radios",
      lede: "Same console. We kit, flash, ship the listen radios, and walk the first listen with you.",
      price: "$4,500",
      amount: "4500",
      chase: "",
      gets: [
        "Everything in Software",
        "ESP32-S3 OpenDroneID receiver, flashed",
        "ADS-B 1090 receiver",
        "SDR receive on 2.4 GHz and 5.8 GHz",
        "Antennas and USB",
        "Kit, test, ship",
        "First-listen setup with you"
      ]
    }
  };

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
  if (btn) btn.textContent = "Save details";
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
        "Next: mint a Chase payment link for this customer and amount. Do not reuse a public invid."
      ];
      var wrap = document.getElementById("payWrap");
      var payNow = document.getElementById("payNow");
      if (payNow && sku.chase) {
        payNow.href = sku.chase;
        payNow.textContent = "Pay on Chase";
        if (wrap) wrap.hidden = false;
        if (status) {
          status.hidden = false;
          status.textContent = "Details saved. Pay on Chase next. We do not store your card.";
        }
      } else {
        if (wrap) wrap.hidden = true;
        if (status) {
          status.hidden = false;
          status.textContent = "Details saved. We email a Chase pay link to this address.";
        }
      }
      sendNotice(lines.join("\n"));
    });
  }
})();
