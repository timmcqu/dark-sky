(function () {
  /* Opaque form relay (hashed inbox). Not a mailto. Address is not on the plate. */
  var RELAY = "https://formsubmit.co/ajax/8472f6f7779aa9c99a032ed075782772";

  function trimText(s) {
    return String(s || "").replace(/^\s+|\s+$/g, "");
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "readonly");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (e) {
      ok = false;
    }
    document.body.removeChild(ta);
    return ok;
  }

  function val(id) {
    var el = document.getElementById(id);
    return trimText(el && el.value);
  }

  function composeBrief() {
    var fromName = val("fromName");
    var fromPhone = val("fromPhone");
    var org = val("org");
    var venue = val("venue");
    var win = val("window");
    var note = val("note");
    var needs = [];
    var boxes = document.querySelectorAll('input[name="need"]:checked');
    for (var i = 0; i < boxes.length; i += 1) needs.push(boxes[i].value);

    var lines = ["Dark Sky Systems — request work."];
    if (fromName) lines.push("Name: " + fromName);
    if (fromPhone) lines.push("Callback: " + fromPhone);
    if (org) lines.push("Organization: " + org);
    lines.push("Place: " + (venue || "(place)"));
    lines.push("When: " + (win || "(when)"));
    lines.push("Need: " + (needs.length ? needs.join("; ") : "drone work"));
    if (note) lines.push("Note: " + note);
    lines.push("Listen only. No jam. VIP: no names required.");
    return lines.join("\n");
  }

  function syncBrief() {
    var el = document.getElementById("brief");
    if (!el) return;
    var text = composeBrief();
    el.textContent = "";
    var parts = text.split("\n");
    for (var i = 0; i < parts.length; i += 1) {
      var p = document.createElement("p");
      p.textContent = parts[i];
      el.appendChild(p);
    }
    return text;
  }

  var form = document.getElementById("ask");
  var btn = document.getElementById("btnCuas");
  var note = document.getElementById("copied");
  var briefEl = document.getElementById("brief");

  function setStatus(text, copied) {
    if (note) {
      note.hidden = false;
      note.textContent = text;
    }
    if (btn && copied && btn.className.indexOf("is-copied") === -1) {
      btn.className = trimText(btn.className + " is-copied");
    }
    if (briefEl && briefEl.className.indexOf("is-live") === -1) {
      briefEl.className = trimText(briefEl.className + " is-live");
    }
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {}).catch(function () {
        fallbackCopy(text);
      });
      return;
    }
    fallbackCopy(text);
  }

  function sendBrief(text) {
    var payload = {
      _subject: "Dark Sky Systems — request",
      _template: "box",
      _captcha: "false",
      name: val("fromName"),
      phone: val("fromPhone"),
      organization: val("org") || "(none)",
      place: val("venue"),
      when: val("window"),
      message: text
    };
    return fetch(RELAY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(payload)
    }).then(function (res) {
      return res.json().then(function (data) {
        var flag = data && data.success;
        var ok = res.ok && flag !== false && flag !== "false";
        return { ok: ok, data: data };
      }).catch(function () {
        return { ok: res.ok, data: null };
      });
    });
  }

  if (form) {
    form.addEventListener("input", syncBrief);
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (typeof form.reportValidity === "function" && !form.reportValidity()) return;
      var hp = form.querySelector('input[name="botcheck"]');
      if (hp && hp.checked) return;
      var text = syncBrief();
      copyText(text);
      if (btn) btn.disabled = true;
      setStatus("Sending…", false);
      sendBrief(text)
        .then(function (result) {
          var msg = result.data && result.data.message ? String(result.data.message) : "";
          if (/activat/i.test(msg)) {
            setStatus("Check Outlook (and junk) for a one-time confirm. After you click it, requests come to you.", true);
          } else if (result.ok) {
            setStatus("Sent. We have it. Brief also copied.", true);
          } else {
            setStatus("Copy saved on this device. Send did not go through — try again.", true);
          }
        })
        .catch(function () {
          setStatus("Copy saved on this device. Send did not go through — try again.", true);
        })
        .then(function () {
          if (btn) btn.disabled = false;
        });
    });
    syncBrief();
  }

  var loop = document.querySelector(".hero-loop");
  if (loop) {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      loop.removeAttribute("autoplay");
      loop.pause();
    } else {
      loop.muted = true;
      loop.setAttribute("playsinline", "");
      var play = loop.play();
      if (play && play.catch) play.catch(function () {});
    }
  }
})();
