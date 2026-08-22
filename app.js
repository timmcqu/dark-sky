(function () {
  /* FormSubmit issued hash for the activated Outlook inbox. Subject splits client vs PILOT. */
  var RELAY = "https://formsubmit.co/ajax/9e30fb114bdd52baca9ba3fc044fe19b";

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
    lines.push("VIP: no names required.");
    return lines.join("\n");
  }

  var form = document.getElementById("ask");
  var btn = document.getElementById("btnCuas");
  var note = document.getElementById("copied");

  function setStatus(text, copied) {
    if (note) {
      note.hidden = false;
      note.textContent = text;
    }
    if (btn && copied && btn.className.indexOf("is-copied") === -1) {
      btn.className = trimText(btn.className + " is-copied");
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

  function checkedValues(name) {
    var out = [];
    var boxes = document.querySelectorAll('input[name="' + name + '"]:checked');
    for (var i = 0; i < boxes.length; i += 1) out.push(boxes[i].value);
    return out;
  }

  function radioValue(name) {
    var el = document.querySelector('input[name="' + name + '"]:checked');
    return el ? trimText(el.value) : "";
  }

  function composePilot() {
    var lines = ["Dark Sky Systems — PILOT APPLICATION"];
    lines.push("Name: " + val("pName"));
    lines.push("Callback: " + val("pPhone"));
    lines.push("Email: " + val("pEmail"));
    lines.push("City: " + val("pCity"));
    lines.push("Part 107: " + (radioValue("p107") || "(none)"));
    if (val("pCert")) lines.push("Certificate: " + val("pCert"));
    if (val("pCertDate")) lines.push("Cert date: " + val("pCertDate"));
    var extras = checkedValues("pNight").concat(checkedValues("pWaiver"));
    if (extras.length) lines.push("Ratings: " + extras.join("; "));
    if (val("pHours")) lines.push("PIC hours (stated): " + val("pHours"));
    if (val("pAir")) lines.push("Aircraft: " + val("pAir"));
    if (val("pIns")) lines.push("Insurance: " + val("pIns"));
    var bg = checkedValues("pBg");
    lines.push("Background: " + (bg.length ? bg.join("; ") : "(none marked)"));
    var seats = checkedValues("pSeat");
    lines.push("Chair: " + (seats.length ? seats.join("; ") : "(none marked)"));
    if (val("pWhen")) lines.push("When: " + val("pWhen"));
    if (val("pNote")) lines.push("Note: " + val("pNote"));
    lines.push("Ack: receive-only observation, not security, not a hire.");
    return lines.join("\n");
  }

  function sendPayload(payload) {
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

  function sendBrief(text) {
    return sendPayload({
      _subject: "Dark Sky Systems — request",
      _template: "box",
      _captcha: "false",
      name: val("fromName"),
      phone: val("fromPhone"),
      organization: val("org") || "(none)",
      place: val("venue"),
      when: val("window"),
      message: text
    });
  }

  function sendPilot(text) {
    return sendPayload({
      _subject: "Dark Sky Systems — PILOT",
      _template: "box",
      _captcha: "false",
      kind: "PILOT",
      name: val("pName"),
      phone: val("pPhone"),
      email: val("pEmail"),
      city: val("pCity"),
      part107: radioValue("p107"),
      certificate: val("pCert") || "(none)",
      background: checkedValues("pBg").join("; ") || "(none)",
      chair: checkedValues("pSeat").join("; ") || "(none)",
      message: text
    });
  }

  function wireForm(formEl, buttonEl, statusEl, composeFn, sendFn) {
    if (!formEl) return;
    formEl.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (typeof formEl.reportValidity === "function" && !formEl.reportValidity()) return;
      var hp = formEl.querySelector('input[name="botcheck"]');
      if (hp && hp.checked) return;
      var text = composeFn();
      copyText(text);
      if (buttonEl) buttonEl.disabled = true;
      if (statusEl) {
        statusEl.hidden = false;
        statusEl.textContent = "Sending…";
      }
      sendFn(text)
        .then(function (result) {
          var msg = result.data && result.data.message ? String(result.data.message) : "";
          var line;
          if (/activat/i.test(msg)) {
            line = "Check Outlook (and junk) for a one-time confirm. After you click it, this form is live.";
          } else if (result.ok) {
            line = "Sent. We have it.";
          } else {
            line = "Copy saved on this device. Send did not go through — try again.";
          }
          if (statusEl) statusEl.textContent = line;
        })
        .catch(function () {
          if (statusEl) {
            statusEl.hidden = false;
            statusEl.textContent = "Copy saved on this device. Send did not go through — try again.";
          }
        })
        .then(function () {
          if (buttonEl) buttonEl.disabled = false;
        });
    });
  }

  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (typeof form.reportValidity === "function" && !form.reportValidity()) return;
      var hp = form.querySelector('input[name="botcheck"]');
      if (hp && hp.checked) return;
      var text = composeBrief();
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
  }

  wireForm(
    document.getElementById("pilot"),
    document.getElementById("btnPilot"),
    document.getElementById("pilotStatus"),
    composePilot,
    sendPilot
  );

  var loops = document.querySelectorAll(".hero-loop, .ground-loop, .svc-loop");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  for (var i = 0; i < loops.length; i += 1) {
    var loop = loops[i];
    if (reduce) {
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
