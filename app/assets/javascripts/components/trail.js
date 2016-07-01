class Trail {
  constructor(serverData = {}) {
    this.serverData = serverData;
    this.id = serverData.id;
    this.latlngs = {};

    this.polyline = L.polyline(this.serverData.data || [], {
      color: '#ffd633',
      weight: 2,
      interactive: true,
      clickable: true
    });

    this.polyline.on('click', (e) => {
      console.log(e);
      console.log(this.id);
    })
  }

  latlng() {
    return Object.keys(this.latlngs).map((key) => {
      return this.latlngs[key];
    });
  }

  saveData() {
    return {
      id: this.id,
      data: Object.keys(this.latlngs).map((key) => {
        return {
          lat: this.latlngs[key].lat,
          lng: this.latlngs[key].lng
        };
      })
    }
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
