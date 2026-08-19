(function () {
  function trimText(s) {
    var start = 0;
    var end = s.length;
    while (start < end && /\s/.test(s.charAt(start))) start += 1;
    while (end > start && /\s/.test(s.charAt(end - 1))) end -= 1;
    return s.slice(start, end);
  }

  function briefFrom(id) {
    var el = document.getElementById(id);
    var raw = el ? (el.textContent || "") : "";
    return trimText(raw).replace(/\n[ \t]+/g, "\n");
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

  function bindCopy(btnId, briefId, noteId) {
    var btn = document.getElementById(btnId);
    var note = document.getElementById(noteId);
    var brief = briefFrom(briefId);
    if (!btn) return;

    var briefEl = document.getElementById(briefId);

    function showCopied() {
      if (note) {
        note.hidden = false;
        note.textContent = "Copied.";
      }
      if (btn.className.indexOf("is-copied") === -1) btn.className = trimText(btn.className + " is-copied");
      if (briefEl && briefEl.className.indexOf("is-live") === -1) briefEl.className = trimText(briefEl.className + " is-live");
    }

    function onClick(ev) {
      ev.preventDefault();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(brief).then(showCopied).catch(function () {
          if (fallbackCopy(brief)) showCopied();
          else if (note) {
            note.hidden = false;
            note.textContent = "Copy blocked in this browser. Brief is on the clipboard path only — paste failed.";
          }
        });
        return;
      }
      if (fallbackCopy(brief)) showCopied();
    }

    btn.addEventListener("click", onClick);
  }

  bindCopy("btnEap", "eap-brief", "copied");
  bindCopy("btnPart", "part-brief", "copiedPart");
})();
