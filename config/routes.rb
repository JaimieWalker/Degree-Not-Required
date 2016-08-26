Rails.application.routes.draw do
  scope "api" do
    resources :results
  end



  match "/*path" => "application#index", via: :all
  root to: "application#index"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
