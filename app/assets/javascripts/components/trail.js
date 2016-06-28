class Trail {
  constructor(serverData = []) {
    this.serverData = serverData;
    this.latlngs = {};
    this.polyline = L.polyline(serverData, {
      color: 'red',
      weight: 5,
      interactive: false
    });
  }

  latlng() {
    return Object.keys(this.latlngs).map((key) => {
      return this.latlngs[key];
    });
  }

  saveData() {
    return Object.keys(this.latlngs).map((key) => {
      return {
        lat: this.latlngs[key].lat,
        lng: this.latlngs[key].lng
      };
    });
  }

  add(id, latlng) {
    this.latlngs[id] = latlng;
    this.polyline.setLatLngs(this.latlng());
  }

  set(id, latlng) {
    this.latlngs[id] = latlng;
    this.polyline.setLatLngs(this.latlng());
  }

  remove(id, latlng) {
    delete this.latlngs[id];
    this.polyline.setLatLngs(this.latlng());
  }

};

module.exports = Trail;
