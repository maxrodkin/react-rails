Rails.application.routes.draw do
  root to: 'site#index'

    namespace :api do
      namespace :v1 do
        resources :items, only: [:index, :create, :destroy, :update]
      end
      namespace :v2 do
        resources :items, only: [:index, :update]
      end
    end
	mount ActionCable.server, at: '/cable'
  end
