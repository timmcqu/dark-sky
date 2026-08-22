(function () {
  "use strict";
  var RELAY = "https://formsubmit.co/ajax/9e30fb114bdd52baca9ba3fc044fe19b";
  var SKUS = {
    soft: {
      title: "Fusion Sensor",
      lede: "Console and license. You already have listen radios. One named window, up to 72 hours.",
      price: "$2,000",
      amount: "2000",
      chase: "https://payments.chase.com?invid=KV92XF7K6T0X",
      gets: [
        "Fusion Sensor console on your laptop",
        "Class heads: Avata, Autel, Mini, and the rest of the packs",
        "You supply ESP32-S3 RID, ADS-B 1090, SDR on 2.4 / 5.8"
      ]
    },
    radio: {
      title: "Fusion Sensor + radios",
      lede: "Same console. We kit, flash, ship the listen radios, and walk the first listen with you.",
      price: "$4,500",
      amount: "4500",
      chase: "https://payments.chase.com?invid=KV93YPSCQNF5",
      gets: [
        "Fusion Sensor console",
        "ESP32-S3 RID, ADS-B 1090, SDR 2.4 / 5.8, antennas, USB",
        "First-listen setup with you"
      ]
    }
  };

  var params = new URLSearchParams(location.search);
  var key = params.get("sku") === "radio" ? "radio" : "soft";
  var sku = SKUS[key];

  var title = document.getElementById("sku-title");
  var lede = document.getElementById("sku-lede");
  var price = document.getElementById("sku-price");
  var gets = document.getElementById("sku-gets");
  var btn = document.getElementById("btnPay");
  var status = document.getElementById("orderStatus");
  var form = document.getElementById("order");

  if (title) title.textContent = sku.title;
  if (lede) lede.textContent = sku.lede;
  if (price) price.textContent = sku.price;
  if (btn) btn.textContent = "Continue to pay " + sku.price;
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
        "Next: Chase payment link"
      ];
      var wrap = document.getElementById("payWrap");
      var payNow = document.getElementById("payNow");
      if (payNow) {
        payNow.href = sku.chase;
        payNow.textContent = "Pay " + sku.price + " on Chase";
      }
      if (wrap) wrap.hidden = false;
      if (status) {
        status.hidden = false;
        status.textContent = "Details saved. Pay on Chase next. We do not store your card.";
      }
      sendNotice(lines.join("\n"));
    });
  }
})();
