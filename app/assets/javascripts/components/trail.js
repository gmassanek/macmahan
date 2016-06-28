class Trail {
  constructor() {
    this.latlngs = {};
  }

  latlng() {
    return Object.keys(this.latlngs).map((key) => {
      return this.latlngs[key];
    });
  }

  add(id, latlng) {
    this.latlngs[id] = latlng;
  }

  set(id, latlng) {
    this.latlngs[id] = latlng;
  }

  remove(id, latlng) {
    delete this.latlngs[id];
  }

};

module.exports = Trail;
