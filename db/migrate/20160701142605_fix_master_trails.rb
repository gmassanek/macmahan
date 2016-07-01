class FixMasterTrails < ActiveRecord::Migration
  def change
    MasterTrail.find_each do |mt|
      mt.update(data: mt.data.uniq)
    end
  end
end
