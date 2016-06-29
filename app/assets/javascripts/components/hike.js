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

  add(id, latlng) {
    this.latlngs[id] = latlng;
    this.polyline.setLatLngs(this.latlng());
  }

};

module.exports = Hike;
