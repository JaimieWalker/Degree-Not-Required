Rails.application.routes.draw do
  namespace :api, constraints: { format: 'json' } do 
    resources :jobs, only: [:index, :create]
    post "jobs/next_page", to: "jobs#next_page"

  end

    get  "/job_seekers", to: "application#seekers"
    post "/decrement_seeker", to: "application#decrement_seeker"
    post "/increment_seeker", to: "application#increment_seeker"


  match "*path" => "application#index", via: :all
  root "application#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
