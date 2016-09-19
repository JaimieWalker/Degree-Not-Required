class CountryState < ApplicationRecord
	belongs_to :country
	belongs_to :state

	def self.create_country_state_association(country,state)
		return find_or_create_by(country_id: country.id, state_id: state.id)
	end
end
