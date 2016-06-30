class Poi < ActiveRecord::Base
  def self.icon_classes
    @_icon_classes ||= {
      'house' => 'fa fa-home',
      'dock' => 'fa fa-anchor',
      'post_office' => 'fa fa-envelope',
      'view' => 'fa fa-eye',
      'tennis_courts' => 'map-icon map-icon-tennis',
      'field' => 'map-icon map-icon-map-pin'
    }
  end

  def icon_class
    self.class.icon_classes[self.poi_type]
  end
end
