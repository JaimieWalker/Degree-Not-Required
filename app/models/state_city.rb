# I know City States sounds better but this joins the State and City Table
class StateCity < ApplicationRecord
	belongs_to :state
	belongs_to :city
end
