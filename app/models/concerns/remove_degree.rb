module RemoveDegree
	ACCEPT = [/High School Diploma/i,
		/GED certification/i,
		/High school or equivalent/i
	]
	REJECT = [/\bbachelor'?s\b/i,
		/bachelor'?s/i,
		/Master's Degree/i,
		/\bbachelor'?s\s*degree\b/i,
		/Required education:\W*? Associate/i,
		/Required education:\W*? Bachelor’s/i,
		/Required education:\W*? Bachelor/i,
		/Required education:\W*? Associate's/i,
		/degree/i,
		/graduating/i,
		/graduates/i]
	MAYBE = [/Bachelor’s degree preferred/i,
		/Degree .* preferably/i,
		/equivalent experience/i,
		/relevant life experience/i]

	
	def remove_degrees_from_indeed(json)
		return json["results"].select.each_with_index do |result,index|
			job_page = Nokogiri::HTML(open(result["url"]))
			job_summary = job_page.css("#job_summary").text
			if(no_degree_required_indeed?(job_summary))
				result["job_summary"] = job_summary
			end
		end

	end

	# Takes a string
	# This is true if you don't need a degree for the job
	def no_degree_required_indeed?(job_summary)
		ACCEPT.each do |pattern|
			return true if(job_summary =~ pattern)
		end
		# Should integrate maybe sometime

		REJECT.each do |pattern|
			return false if (job_summary =~ pattern)
		end
		# If it gets this far return true and accept
		return true
	end
end