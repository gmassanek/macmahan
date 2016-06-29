class Hike {
  constructor(serverData) {
    this.latlngs = {};
    this.polyline = L.polyline(this.latlng(), {
      color: '#ffd633',
      weight: 2,
      interactive: false
    });

    if (serverData) {
      serverData.data.map((hikeData) => {
        this.add(hikeData.time, {lat: hikeData.lat, lng: hikeData.lng});
      });
    }
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
