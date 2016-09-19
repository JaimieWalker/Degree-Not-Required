class CityCompany < ApplicationRecord
	belongs_to :city
	belongs_to :company
	
	def self.create_city_company_association(city,company)
		return find_or_create_by(city_id: city.id, company_id: company.id)
	end
end
