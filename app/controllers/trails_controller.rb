class TrailsController < ApplicationController
  def show

  end

  def index
    respond_to do |format|
      format.html
      format.json { render json: Trail.all }
    end
  end

end
