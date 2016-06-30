
class Poi {
  constructor(serverData) {
    this.reset();

    if (serverData) {
      this.latlng = serverData.latlng;
      this.icon = L.divIcon({className: `fa fa-${serverData.poi_type} poi-marker`});
    }

    this.marker = L.marker(this.latlng, {
        icon: this.icon,
    });
  }

  reset() {
    this.latlng = {};
  }

};

module.exports = Poi;
