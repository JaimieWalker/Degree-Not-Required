require "#{Rails.root}/lib/assets/indeed.rb"
class ResultsController < ApplicationController
	
	def index
		indeed = Indeed.new(Rails.application.secrets.INDEED_PUBLISHER_KEY)

	end
end
