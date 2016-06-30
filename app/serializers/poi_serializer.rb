class PoiSerializer < ActiveModel::Serializer
  attribute :id
  attribute :poi_type
  attribute :latlng
  attribute :name
  attribute :description
  attribute :icon_class
end
