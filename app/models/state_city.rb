# I know City States sounds better but this joins the State and City Table
class StateCity < ApplicationRecord
	belongs_to :state
	belongs_to :city

	def self.create_state_city_association(state,city)
		return find_or_create_by(state_id: state.id, city_id: city.id)
	end
end
