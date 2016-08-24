Rails.application.routes.draw do
  match "/*path" => redirect("/?goto=%{path}"), via: :all
  root to: "home#index"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
