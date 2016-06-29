class Hike {
  constructor(serverData) {
    this.reset();

    if (serverData) {
      serverData.data.map((hikeData) => {
        this.add(hikeData.time, {lat: hikeData.lat, lng: hikeData.lng});
      });
    }
  }

  reset() {
    this.latlngs = {};
    this.beginTime = null;
    this.endTime = null;
    this.polyline = L.polyline(this.latlng(), {
      color: '#1affff',
      weight: 2,
      interactive: false
    });
  }

  latlng() {
    return Object.keys(this.latlngs).map((key) => {
      return this.latlngs[key];
    });
  }

  saveData() {
    return {
      data: Object.keys(this.latlngs).map((key) => {
        return {
          lat: this.latlngs[key].lat,
          lng: this.latlngs[key].lng,
          time: key
        };
      })
    }
  }

  add(time, latlng) {
    if (!this.beginTime) {
      this.beginTime = time;
    }
    this.endTime = time;

    this.latlngs[time] = latlng;
    this.polyline.setLatLngs(this.latlng());
  }

  distance(map) {
    var total = 0;
    var a, b;
    this.latlng().map((latlng) => {
      a = b;
      b = latlng;
      if (a && b) {
        total += map.distance(a, b);
      }
    });
    return (total / 1609.34).toFixed(2);
  }

  time() {
    if(this.beginTime && this.endTime) {
      return (this.endTime - this.beginTime) / 6000;
    }
  }

};

module.exports = Hike;
