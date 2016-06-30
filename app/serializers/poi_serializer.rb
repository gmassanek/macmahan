class PoiSerializer < ActiveModel::Serializer
  attribute :id
  attribute :poi_type
  attribute :latlng
  attribute :name
  attribute :description
end
