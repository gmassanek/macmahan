class MasterTrail
  def self.all
    json = File.read(Rails.root.join('public/master_trails/main.json'))
    JSON.parse(json)
  end

  def self.save(json)
    File.open(Rails.root.join('public/master_trails/main.json'), "w") do |f|
      f.write(json)
    end
  end
end
