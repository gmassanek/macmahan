class PoisController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    if params[:poi][:data]
      timename = params.permit![:poi][:data].first[:time]
      Poi.create!(name: timename, data: params[:poi][:data])
    end
    head :ok
  end

  def index
    pois = Poi.all
    render json: { pois: pois }
  end

end
