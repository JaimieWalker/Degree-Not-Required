class Query < ApplicationRecord
	has_many :job_queries
	has_many :jobs, through: :job_queries


	def self.create_query(params)
		 	query = find_or_create_by(keyword: params["formData"]["query"])
		 transaction do 
		 	params["jobs"].each do |json|
		 		# O(n^2) need to refactor
		 		country = Country.create_country(json)
		 		state = State.create_state(json,country)
		 		city = City.create_city(json)
		 		company = Company.create_company(json)
		 		job = Job.create_job(json)
		 		state.companies << company
		 		country.states << state 
		 		state.cities << city 		
		 		company.jobs << job
		 		country.companies << company
		 		query.jobs
		 		binding.pry
		 		# jq = JobQuery.create_job_query_association(query,job)
		 		# cs = CountryState.create_country_state_association(country,state)
		 		# cc = CityCompany.create_city_company_association(city,company)
		 		# sc = StateCity.create_state_city_association(state,city)
		 		# cj = CompanyJob.create_company_job_association(company,job)
		 	end
		 end
	end
end


