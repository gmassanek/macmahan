class CreatePois < ActiveRecord::Migration
  def change
    create_table :pois do |t|
      t.string :poi_type
      t.string :name
      t.json :latlng
      t.text :description

      t.timestamps
    end
  end
end
