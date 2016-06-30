Rails.application.routes.draw do
  root to: 'trails#index'
  resources :trails
  resources :master_trails do
    collection do
      post :save
    end
  end
  resources :pois, only: [:create, :index]
end
