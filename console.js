(function () {
  var CENTER = [39.98, -82.99];
  var AIRPORTS = [
    { id: "KCMH", lat: 39.998, lng: -82.892 },
    { id: "KOSU", lat: 40.080, lng: -83.073 },
    { id: "KLCK", lat: 39.814, lng: -82.928 },
    { id: "KTZR", lat: 39.901, lng: -83.137 },
    { id: "KMRT", lat: 40.225, lng: -83.352 },
    { id: "KLHQ", lat: 39.756, lng: -82.657 }
  ];
  var TRACKS = [
    { id: "N441CM", layer: "adsb", kind: "ADS-B 1090", heading: 42, alt: "FL120", lat: 40.04, lng: -82.95 },
    { id: "N882PA", layer: "adsb", kind: "ADS-B 1090", heading: 268, alt: "FL080", lat: 39.93, lng: -82.88 },
    { id: "R7", layer: "rf", kind: "RF · analog FPV energy", freq: "5.8 GHz · 2.4 GHz hop", snr: "energy on glass", lat: 39.99, lng: -83.02, heading: 15 },
    { id: "R3", layer: "rf", kind: "RF · OcuSync-class", freq: "2.4 / 5.8 GHz dual-band", snr: "hop set in the log", lat: 40.01, lng: -82.97, heading: 200 }
  ];

  var layers = { adsb: true, rf: true, apt: true, rid: true };
  var selected = null;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var spec = document.getElementById("spec");
  var list = document.getElementById("track-list");
  var map = L.map("map", {
    center: CENTER,
    zoom: 11,
    zoomControl: false,
    attributionControl: false,
    minZoom: 9,
    maxZoom: 14
  });
  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "CARTO · OSM",
    subdomains: "abcd",
    maxZoom: 19
  }).addTo(map);
  L.control.attribution({ prefix: false, position: "bottomleft" }).addTo(map);

  var rings = L.layerGroup();
  [8000, 16000, 24000, 32000].forEach(function (m) {
    L.circle(CENTER, {
      radius: m,
      color: "#e24b4b",
      weight: 1,
      opacity: 0.35,
      fill: false
    }).addTo(rings);
  });
  rings.addTo(map);

  var aptGroup = L.layerGroup();
  AIRPORTS.forEach(function (ap) {
    L.marker([ap.lat, ap.lng], {
      interactive: false,
      icon: L.divIcon({
        className: "icon-apt",
        html: ap.id,
        iconSize: [48, 16],
        iconAnchor: [24, 8]
      })
    }).addTo(aptGroup);
  });
  aptGroup.addTo(map);

  function planeSvg(rot) {
    return '<svg width="36" height="36" viewBox="-24 -24 48 48" style="transform:rotate(' + rot + 'deg)"><path fill="#cfc8ba" d="M0-20 C2.8-18 3.1-8 2.8 6 L2.2 18 0 15 -2.2 18 -2.8 6 C-3.1-8-2.8-18 0-20Z"/><path fill="#cfc8ba" d="M2.6-1 L24 9 22 12 2.4 6Z"/><path fill="#cfc8ba" d="M-2.6-1 L-24 9 -22 12 -2.4 6Z"/><path fill="#cfc8ba" d="M2 11 L9 17 1.8 14.5Z"/><path fill="#cfc8ba" d="M-2 11 L-9 17 -1.8 14.5Z"/></svg>';
  }
  function droneSvg() {
    return '<svg width="34" height="34" viewBox="-22 -22 44 44"><g stroke="#e24b4b" fill="#e24b4b" stroke-width="3" stroke-linecap="round"><line x1="-15" y1="-15" x2="15" y2="15"/><line x1="15" y1="-15" x2="-15" y2="15"/><circle cx="-15" cy="-15" r="4.2"/><circle cx="15" cy="-15" r="4.2"/><circle cx="-15" cy="15" r="4.2"/><circle cx="15" cy="15" r="4.2"/><rect x="-6.2" y="-4.8" width="12.4" height="9.6" rx="2"/></g></svg>';
  }

  TRACKS.forEach(function (tr) {
    var html = tr.layer === "adsb"
      ? planeSvg(tr.heading) + "<span>" + tr.id + "</span>"
      : droneSvg() + "<span>" + tr.id + "</span>";
    tr.marker = L.marker([tr.lat, tr.lng], {
      icon: L.divIcon({
        className: tr.layer === "adsb" ? "icon-plane" : "icon-drone",
        html: html,
        iconSize: [48, 48],
        iconAnchor: [24, 24]
      })
    }).on("click", function () { openTrack(tr.id); });
    tr.marker.addTo(map);
  });

  function dest(lat, lng, heading, meters) {
    var R = 6371000;
    var brng = (heading * Math.PI) / 180;
    var p1 = (lat * Math.PI) / 180;
    var l1 = (lng * Math.PI) / 180;
    var p2 = Math.asin(Math.sin(p1) * Math.cos(meters / R) + Math.cos(p1) * Math.sin(meters / R) * Math.cos(brng));
    var l2 = l1 + Math.atan2(Math.sin(brng) * Math.sin(meters / R) * Math.cos(p1), Math.cos(meters / R) - Math.sin(p1) * Math.sin(p2));
    return [p2 * 180 / Math.PI, ((l2 * 180 / Math.PI + 540) % 360) - 180];
  }

  function refreshIcon(tr) {
    var html = tr.layer === "adsb"
      ? planeSvg(tr.heading) + "<span>" + tr.id + "</span>"
      : droneSvg() + "<span>" + tr.id + "</span>";
    tr.marker.setIcon(L.divIcon({
      className: tr.layer === "adsb" ? "icon-plane" : "icon-drone",
      html: html,
      iconSize: [48, 48],
      iconAnchor: [24, 24]
    }));
  }

  function visible(tr) { return !!layers[tr.layer]; }

  function syncLayers() {
    TRACKS.forEach(function (tr) {
      if (visible(tr)) {
        if (!map.hasLayer(tr.marker)) tr.marker.addTo(map);
      } else if (map.hasLayer(tr.marker)) map.removeLayer(tr.marker);
    });
    if (layers.apt) {
      if (!map.hasLayer(aptGroup)) aptGroup.addTo(map);
    } else if (map.hasLayer(aptGroup)) map.removeLayer(aptGroup);
    renderList();
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
    var air = TRACKS.filter(function (t) { return t.layer === "adsb" && visible(t); }).length;
    var rf = TRACKS.filter(function (t) { return t.layer === "rf" && visible(t); }).length;
    var airEl = document.getElementById("chip-air");
    var rfEl = document.getElementById("chip-rf");
    if (airEl) airEl.textContent = "Aircraft · " + air + " live";
    if (rfEl) rfEl.textContent = rf ? "Analog FPV · energy" : "Analog FPV";
  }

  function openTrack(id) {
    var tr = TRACKS.filter(function (t) { return t.id === id; })[0];
    if (!tr) return;
    selected = id;
    document.getElementById("detail-k").textContent = tr.layer === "rf" ? "RF contact" : "ADS-B";
    document.getElementById("detail-id").textContent = tr.id;
    var rows = [["Layer", tr.kind], ["Place", "Named window"]];
    if (tr.heading != null && tr.layer === "adsb") rows.push(["Heading", String(Math.round(tr.heading)).padStart(3, "0")]);
    if (tr.alt) rows.push(["Alt / FL", tr.alt]);
    if (tr.freq) rows.push(["RF", tr.freq]);
    if (tr.snr) rows.push(["Picture", tr.snr]);
    document.getElementById("detail-dl").innerHTML = rows.map(function (r) {
      return "<dt>" + r[0] + "</dt><dd>" + r[1] + "</dd>";
    }).join("");
    map.panTo([tr.lat, tr.lng], { animate: true, duration: 0.4 });
    renderList();
  }

  function clearDetail() {
    selected = null;
    document.getElementById("detail-k").textContent = "Track";
    document.getElementById("detail-id").textContent = "Click a contact";
    document.getElementById("detail-dl").innerHTML = "<dt>Hint</dt><dd>White airliners are ADS-B. Red drones are radio energy. Airport codes are the overlay. This is a demo replay.</dd>";
    renderList();
  }

  document.querySelectorAll(".layers button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var key = btn.getAttribute("data-layer");
      layers[key] = !layers[key];
      btn.classList.toggle("on", layers[key]);
      if (selected) {
        var cur = TRACKS.filter(function (t) { return t.id === selected; })[0];
        if (cur && !visible(cur)) clearDetail();
      }
      syncLayers();
    });
  });
  document.getElementById("detail-close").addEventListener("click", clearDetail);

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
      row.push(Math.max(0, 1 - Math.abs(x - peak) * 14) * 0.85 + n);
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

  var last = performance.now();
  function tick(now) {
    var dt = Math.min(48, now - last);
    last = now;
    if (!reduce) {
      TRACKS.forEach(function (tr) {
        if (!visible(tr)) return;
        var speed = tr.layer === "adsb" ? 18 : 4;
        var next = dest(tr.lat, tr.lng, tr.heading, speed * (dt / 1000));
        tr.lat = next[0];
        tr.lng = next[1];
        if (map.distance(CENTER, [tr.lat, tr.lng]) > 38000) tr.heading = (tr.heading + 155) % 360;
        tr.marker.setLatLng([tr.lat, tr.lng]);
        if (tr.layer === "adsb") refreshIcon(tr);
      });
    }
    drawSpec(now);
    requestAnimationFrame(tick);
  }

  renderList();
  setTimeout(function () { map.invalidateSize(); }, 80);
  requestAnimationFrame(tick);
})();
