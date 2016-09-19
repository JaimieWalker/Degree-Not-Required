class Country < ApplicationRecord
	has_many :states
	has_many :cities, through: :states
	has_many :company_countries
	has_many :companies, through: :company_countries
	has_many :jobs, through: :companies
	def self.create_country(json)
		return find_or_create_by(name: json["country"])
	end
end
