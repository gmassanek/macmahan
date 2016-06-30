class RemoveHikes < ActiveRecord::Migration
  def up
    drop_table :hikes
  end

  def down
    create_table :hikes do |t|
      t.string :name
      t.json :data

      t.timestamps
    end
  end
end
