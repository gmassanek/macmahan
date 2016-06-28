class MasterTrailsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    MasterTrail.save(params['_json'].to_json)
    head :ok
  end

  def index
    render json: MasterTrail.all
  end

end
