Rails.application.routes.draw do
  namespace :api do 
  	# get "api/results"
    resources :jobs, defaults: {format: :json}
  end

  match "*path" => "application#index", via: :all
  root "application#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
