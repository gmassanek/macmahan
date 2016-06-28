Rails.application.routes.draw do
  root to: 'trails#index'
  resources :trails
  resources :master_trails
end
