class HikesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    timename = params.permit![:hike][:data].first[:time]
    Hike.create!(name: timename, data: params[:hike][:data])
    head :ok
  end

  def index
    hikes = Hike.all.map { |mt| ActiveModelSerializers::SerializableResource.new(mt) }
    render json: { hikes: hikes }
  end

end
