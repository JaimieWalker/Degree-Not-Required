class City < ApplicationRecord
  belongs_to :state
  has_many :cities_companies
  has_many :companies, through: :cities_companies
  has_many :jobs, through: :companies

  def self.create_city(json)
  	return find_or_create_by(name: json["city"])
  end
end
