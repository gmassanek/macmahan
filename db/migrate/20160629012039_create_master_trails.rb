class CreateMasterTrails < ActiveRecord::Migration
  def change
    create_table :master_trails do |t|
      t.string :name
      t.json :data

      t.timestamps
    end
  end
end
