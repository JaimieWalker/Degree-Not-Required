Rails.application.routes.draw do
  namespace :api, constraints: { format: 'json' } do 
  	# get "api/results"
    resources :jobs
  end

  match "*path" => "application#index", via: :all
  root "application#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
