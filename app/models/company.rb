class Company < ApplicationRecord
  has_many :company_countries
  has_many :countries, through: :company_countries
  has_many :company_states
  has_many :states, through: :company_states
  has_many :cities_companies
  has_many :cities, through: :cities_companies
  has_many :jobs
# Company is actually a json file with company information in it 
  def self.create_company(json)
	 	return find_or_create_by(name: json["company"])do |c|
	  		c.location = json["formattedLocation"]
	  		c.latitude = json["latitude"]
	  		c.longitude = json["longitude"]
	  	end
  end
end
