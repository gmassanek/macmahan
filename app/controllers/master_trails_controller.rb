class MasterTrailsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def save
    params.permit![:_json].each do |mt_data|
      next unless mt_data[:data]

      if mt_data[:id]
        MasterTrail.find(mt_data[:id]).update_attributes!(mt_data.except(:id))
      else
        MasterTrail.create!(mt_data.except(:id))
      end
    end
    head :ok
  end

  def index
    trails = MasterTrail.all.map { |mt| ActiveModelSerializers::SerializableResource.new(mt) }
    render json: { master_trails: trails }
  end

end
