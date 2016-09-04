class CountryState < ApplicationRecord
	belongs_to :country
	belongs_to :state
end
