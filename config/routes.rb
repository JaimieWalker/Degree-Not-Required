Rails.application.routes.draw do
  match "/*path" => "home#index", via: :all
  root to: "home#index"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
