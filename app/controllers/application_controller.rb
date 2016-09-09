class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  
  def index
  	render "layouts/application.html.erb"
  end

    

end
