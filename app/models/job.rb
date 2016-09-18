class Job < ApplicationRecord
  belongs_to :company
  has_many :query_jobs
  has_many :queries, through: :query_jobs

  def self.create_job(job)
  	job_object = find_or_create_by(job_key: job["jobkey"]) do |j|
  		j.jobtitle = job["jobtitle"]
  		j.formattedLocation = job["formattedLocation"]
  		j.source = job["source"]
  		j.date = job["date"]
  		j.snippet = job["snippet"]
  		j.url = job["url"]
  		j.onmousedown = job["onmousedown"]
  		j.latitude = job["latitude"]
  		j.longitude = job["longitude"]
  		j.sponsored = job["sponsored"]
  		j.expired = job["expired"]
  		j.indeedApply = job["indeedApply"]
  		
  		binding.pry
  	end
  end
end
