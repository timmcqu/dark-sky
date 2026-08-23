(function () {
  "use strict";
  var cfg = window.DSS_CHECKOUT || {};
  var api = cfg.api ? String(cfg.api).replace(/\/$/, "") : "";
  if (!api) return;
  var allowed = window.DSS_CHECKOUT_SKUS || ["scene", "job", "school", "incident", "crew"];

  function start(sku, email) {
    return fetch(api + "/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sku: sku, email: email || undefined }),
    }).then(function (r) {
      return r.json().then(function (j) {
        if (!r.ok || !j || !j.url) throw new Error((j && j.error) || "checkout");
        location.href = j.url;
      });
    });
  }

  document.addEventListener("click", function (ev) {
    var a = ev.target && ev.target.closest && ev.target.closest("[data-checkout-sku]");
    if (!a) return;
    var sku = a.getAttribute("data-checkout-sku");
    if (!sku || allowed.indexOf(sku) < 0) return;
    ev.preventDefault();
    a.setAttribute("aria-busy", "true");
    start(sku).catch(function () {
      if (a.href && a.href.indexOf("buy.stripe.com") !== -1) location.href = a.href;
    });
  });
})();
