class Query < ApplicationRecord
	has_many :job_queries
	has_many :jobs, through: :job_queries


	def self.create_query(params)
		 	query = find_or_create_by(keyword: params["formData"]["query"])
		 transaction do 
		 	params["jobs"].each do |json| 
		 		# O(n)
		 		country = Country.create_country(json)
		 		state = State.create_state(json,country)
		 		city = City.create_city(json)
		 		company = Company.create_company(json)
		 		job = Job.create_job(json,company)
		 		city.companies << company
		 		state.companies << company
		 		country.states << state 
		 		state.cities << city 	
		 		company.jobs << job
		 		country.companies << company
		 		query.jobs << job
		 	end
		 end
	end
end


