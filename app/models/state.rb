class State < ApplicationRecord
  belongs_to :country
  has_many :cities
  has_many :company_states
  has_many :companies, through: :company_states
  has_many :jobs, through: :companies

  def self.create_state(json,country)
  		return find_or_create_by(name: json["state"],country_id: country.id)
  end
end
