class Trail
  def self.all
    Dir.entries(Rails.root.join('public/trails')).map do |file|
      next if file =~ /^\./

      {
        file: file.gsub(".gpx", ""),
        lineStyle: {
          color: colors[file[/.*\.(.*).gpx/,1]] || 'red',
          opacity: '100%',
          weight: 2,
        }
      }
    end.compact
  end

  def self.colors
    @colors ||= {
      'gdm' => 'orange',
      'ajm' => 'blue',
      'gam' => 'yellow',
    }
  end
end
