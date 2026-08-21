(function () {
  var AIRPORTS = [
    { id: "KAUS", name: "Austin-Bergstrom", r: 0.62, a: 3.4 },
    { id: "KGTU", name: "Georgetown", r: 0.38, a: -0.2 },
    { id: "KHYI", name: "San Marcos", r: 0.7, a: 2.7 },
    { id: "KILE", name: "Killeen", r: 0.72, a: -0.55 },
    { id: "KTPL", name: "Temple", r: 0.78, a: -0.85 },
    { id: "KGRK", name: "Robert Gray", r: 0.68, a: -0.7 },
    { id: "KSEQ", name: "Randolph", r: 0.82, a: 2.2 },
    { id: "KBAZ", name: "New Braunfels", r: 0.74, a: 2.45 }
  ];

  var TRACKS = [
    { id: "N9411T", layer: "adsb", kind: "ADS-B 1090", heading: "030", alt: "10", r: 0.28, a: -0.35, color: "#d8d2c4" },
    { id: "A67BA2", layer: "adsb", kind: "ADS-B 1090", heading: "058", alt: "18", r: 0.42, a: 0.85, color: "#d8d2c4" },
    { id: "A7", layer: "rf", kind: "RF · analog FPV energy", freq: "5.8 GHz · 2.4 GHz hop", snr: "energy on glass", r: 0.08, a: 0.4, color: "#e24b4b" },
    { id: "A4", layer: "rf", kind: "RF · OcuSync-class", freq: "2.4 / 5.8 GHz dual-band", snr: "hop set in the log", r: 0.18, a: 1.1, color: "#e24b4b" }
  ];

  var layers = { adsb: true, rf: true, apt: true, rid: true };
  var selected = null;
  var t0 = performance.now();
  var radar = document.getElementById("radar");
  var spec = document.getElementById("spec");
  var list = document.getElementById("track-list");
  var detail = document.getElementById("detail");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function visible(tr) {
    return !!layers[tr.layer];
  }

  function polar(cx, cy, rMax, r, a, spin) {
    var ang = a + spin;
    return { x: cx + Math.sin(ang) * r * rMax, y: cy - Math.cos(ang) * r * rMax };
  }

  function drawRadar(now) {
    var w = radar.width = radar.clientWidth * 2;
    var h = radar.height = radar.clientHeight * 2;
    var ctx = radar.getContext("2d");
    var cx = w * 0.5;
    var cy = h * 0.52;
    var rMax = Math.min(w, h) * 0.42;
    var spin = reduce ? 0 : ((now - t0) / 18000);

    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(196,163,90,0.28)";
    ctx.lineWidth = 2;
    for (var i = 1; i <= 4; i++) {
      ctx.beginPath();
      ctx.ellipse(cx, cy, rMax * (i / 4) * 1.15, rMax * (i / 4), 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(cx, cy - rMax * 1.05);
    ctx.lineTo(cx, cy + rMax * 1.05);
    ctx.moveTo(cx - rMax * 1.2, cy);
    ctx.lineTo(cx + rMax * 1.2, cy);
    ctx.stroke();
    ctx.fillStyle = "#c4a35a";
    ctx.font = "20px Outfit, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("N", cx, cy - rMax * 1.08);

    if (layers.apt) {
      ctx.fillStyle = "#9e9586";
      ctx.font = "16px Outfit, sans-serif";
      AIRPORTS.forEach(function (ap) {
        var p = polar(cx, cy, rMax, ap.r, ap.a, 0);
        ctx.fillText(ap.id, p.x, p.y);
      });
    }

    TRACKS.forEach(function (tr) {
      if (!visible(tr)) return;
      var drift = tr.layer === "adsb" && !reduce ? spin * 0.15 : 0;
      var p = polar(cx, cy, rMax, tr.r, tr.a + drift, 0);
      tr._x = p.x;
      tr._y = p.y;
      ctx.save();
      ctx.translate(p.x, p.y);
      if (tr.layer === "adsb") {
        ctx.rotate((parseInt(tr.heading, 10) || 0) * Math.PI / 180);
        ctx.fillStyle = tr.color;
        ctx.beginPath();
        ctx.moveTo(0, -11);
        ctx.lineTo(7, 10);
        ctx.lineTo(0, 6);
        ctx.lineTo(-7, 10);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.strokeStyle = tr.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-10, 0);
        ctx.lineTo(10, 0);
        ctx.moveTo(0, -10);
        ctx.lineTo(0, 10);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, 14, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
      ctx.fillStyle = selected === tr.id ? "#c4a35a" : tr.color;
      ctx.font = "18px Outfit, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(tr.id, p.x + 14, p.y - 8);
    });

    if (layers.rid) {
      ctx.fillStyle = "#3dcf8a";
      ctx.font = "15px Outfit, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("RID · listening", 24, h - 28);
    }
  }

  var specHist = [];
  function drawSpec(now) {
    var w = spec.width = spec.clientWidth * 2;
    var h = spec.height = spec.clientHeight * 2;
    var ctx = spec.getContext("2d");
    var peak = 0.62 + Math.sin(now / 700) * 0.04;
    var row = [];
    var i;
    for (i = 0; i < 160; i++) {
      var x = i / 160;
      var n = Math.abs(Math.sin(x * 18 + now / 900)) * 0.08;
      var v = Math.max(0, 1 - Math.abs(x - peak) * 14) * 0.85 + n;
      row.push(v);
    }
    if (!reduce) {
      specHist.unshift(row);
      if (specHist.length > 28) specHist.pop();
    } else if (!specHist.length) specHist = [row];

    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, w, h);
    var wf = h * 0.55;
    specHist.forEach(function (r, yi) {
      for (i = 0; i < r.length; i++) {
        var g = Math.floor(20 + r[i] * 180);
        ctx.fillStyle = "rgb(" + g + "," + Math.floor(g * 0.12) + "," + Math.floor(g * 0.12) + ")";
        ctx.fillRect((i / r.length) * w, wf + yi * ((h - wf) / 28), w / r.length + 1, (h - wf) / 28 + 1);
      }
    });
    ctx.beginPath();
    ctx.strokeStyle = "#ece6d8";
    ctx.lineWidth = 2;
    for (i = 0; i < row.length; i++) {
      var px = (i / (row.length - 1)) * w;
      var py = wf - row[i] * (wf - 8);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }

  function renderList() {
    list.innerHTML = "";
    TRACKS.forEach(function (tr) {
      if (!visible(tr)) return;
      var li = document.createElement("li");
      var b = document.createElement("button");
      b.type = "button";
      if (selected === tr.id) b.className = "on";
      b.innerHTML = tr.id + '<span class="sub">' + tr.kind + "</span>";
      b.addEventListener("click", function () { openTrack(tr.id); });
      li.appendChild(b);
      list.appendChild(li);
    });
  }

  function openTrack(id) {
    var tr = TRACKS.filter(function (t) { return t.id === id; })[0];
    if (!tr) return;
    selected = id;
    document.getElementById("detail-k").textContent = tr.layer === "rf" ? "RF contact" : "ADS-B";
    document.getElementById("detail-id").textContent = tr.id;
    var rows = [
      ["Layer", tr.kind],
      ["Place", "Named window"]
    ];
    if (tr.heading) rows.push(["Heading", tr.heading]);
    if (tr.alt) rows.push(["Alt / FL", tr.alt]);
    if (tr.freq) rows.push(["RF", tr.freq]);
    if (tr.snr) rows.push(["Picture", tr.snr]);
    var dl = document.getElementById("detail-dl");
    dl.innerHTML = rows.map(function (r) {
      return "<dt>" + r[0] + "</dt><dd>" + r[1] + "</dd>";
    }).join("");
    detail.hidden = false;
    renderList();
  }

  function hit(ev) {
    var rect = radar.getBoundingClientRect();
    var sx = (ev.clientX - rect.left) * (radar.width / rect.width);
    var sy = (ev.clientY - rect.top) * (radar.height / rect.height);
    var best = null;
    var bestD = 36 * (radar.width / rect.width);
    TRACKS.forEach(function (tr) {
      if (!visible(tr) || tr._x == null) return;
      var d = Math.hypot(tr._x - sx, tr._y - sy);
      if (d < bestD) { bestD = d; best = tr; }
    });
    if (best) openTrack(best.id);
  }

  document.querySelectorAll(".layers button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var key = btn.getAttribute("data-layer");
      layers[key] = !layers[key];
      btn.classList.toggle("on", layers[key]);
      if (selected) {
        var cur = TRACKS.filter(function (t) { return t.id === selected; })[0];
        if (cur && !visible(cur)) {
          selected = null;
          clearDetail();
        }
      }
      renderList();
    });
  });

  function clearDetail() {
    document.getElementById("detail-k").textContent = "Track";
    document.getElementById("detail-id").textContent = "Click a contact";
    document.getElementById("detail-dl").innerHTML = "<dt>Hint</dt><dd>ADS-B airframes, RF energy, airports, RID listen. Demo replay of a named window.</dd>";
  }

  document.getElementById("detail-close").addEventListener("click", function () {
    selected = null;
    clearDetail();
    renderList();
  });

  radar.addEventListener("click", hit);

  function frame(now) {
    drawRadar(now);
    drawSpec(now);
    if (!reduce) requestAnimationFrame(frame);
  }

  renderList();
  requestAnimationFrame(frame);
})();
