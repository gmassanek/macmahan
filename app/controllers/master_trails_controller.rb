class MasterTrailsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def save
    params.permit![:_json].each do |mt_data|
      if mt_data[:id]
        if mt_data[:data]
          MasterTrail.find(mt_data[:id]).update_attributes!(mt_data.except(:id))
        else
          MasterTrail.find(mt_data[:id]).destroy
        end
      elsif mt_data[:data]
        MasterTrail.create!(mt_data.except(:id))
      end
    end
    head :ok
  end

  def index
    trails = MasterTrail.all.map { |x| ActiveModelSerializers::SerializableResource.new(x) }
    render json: { master_trails: trails }
  end

  def show
    trail = ActiveModelSerializers::SerializableResource.new(MasterTrail.find(params[:id]))
    render json: { master_trail: trail }
  end

end
