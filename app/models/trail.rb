class Trail
  def self.all
    Dir.entries(Rails.root.join('public/trails')).map do |file|
      next if file =~ /^\./

      file.gsub(".gpx", "")
    end.flatten.select(&:present?)
  end
end
