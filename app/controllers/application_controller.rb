class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  after_action :set_csrf_cookie_for_ng

  def index
  	render "layouts/application.html.erb"
  end

  def seekers
    render :json => Rails.application.config.current_job_seekers
  end

  def increment_seeker
    Rails.application.config.current_job_seekers+=1
    head :no_content
  end

  def decrement_seeker
    # if(Rails.application.config.current_job_seekers < 0)
    #   Rails.application.config.current_job_seekers = 0  
    # else
      Rails.application.config.current_job_seekers -= 1
    # end
    head :no_content
  end


  protected
# Checks csrf token
  def verified_request?
    super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
  end

  private
  
  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end
end
