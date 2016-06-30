class Poi < ActiveRecord::Base
  def self.icon_classes
    @_icon_classes ||= {
      'house' => 'fa fa-home',
      'dock' => 'fa fa-anchor',
      'post_office' => 'envelope',
      'view' => 'eye',
      'tennis_courts' => 'map-icon map-icon-tennis'
    }
  end

  def icon_class
    self.class.icon_classes[self.poi_type]
  end
end
