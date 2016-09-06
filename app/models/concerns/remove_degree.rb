require "nokogiri"

module RemoveDegree
	ACCEPT = [/High School Diploma/i]
	REJECT = [/Degree/i]

	# Takes a nokogiri document
	def remove_from_indeed(document)
		document.css("#job_summary").text
	end
end