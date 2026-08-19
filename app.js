(function () {
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

  function composeBrief() {
    var org = trimText(document.getElementById("org") && document.getElementById("org").value);
    var venue = trimText(document.getElementById("venue") && document.getElementById("venue").value);
    var windowEl = document.getElementById("window");
    var win = trimText(windowEl && windowEl.value);
    var note = trimText(document.getElementById("note") && document.getElementById("note").value);
    var needs = [];
    var boxes = document.querySelectorAll('input[name="need"]:checked');
    for (var i = 0; i < boxes.length; i += 1) needs.push(boxes[i].value);

    var lines = ["Dark Sky Systems — request a sit."];
    if (org) lines.push("Organization: " + org);
    lines.push("Venue: " + (venue || "(name the venue)"));
    lines.push("Window: " + (win || "(name the window)"));
    lines.push("Need: " + (needs.length ? needs.join("; ") : "Overhead operations"));
    if (note) lines.push("Note: " + note);
    lines.push("Passive detection only. Discrete VIP — omit principal names.");
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

  function showCopied() {
    if (note) {
      note.hidden = false;
      note.textContent = "Copied.";
    }
    if (btn && btn.className.indexOf("is-copied") === -1) {
      btn.className = trimText(btn.className + " is-copied");
    }
    if (briefEl && briefEl.className.indexOf("is-live") === -1) {
      briefEl.className = trimText(briefEl.className + " is-live");
    }
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(showCopied).catch(function () {
        if (fallbackCopy(text)) showCopied();
        else if (note) {
          note.hidden = false;
          note.textContent = "Copy blocked in this browser.";
        }
      });
      return;
    }
    if (fallbackCopy(text)) showCopied();
  }

  if (form) {
    form.addEventListener("input", syncBrief);
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (typeof form.reportValidity === "function" && !form.reportValidity()) return;
      copyText(syncBrief());
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
