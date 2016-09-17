class CreateCompanyJobs < ActiveRecord::Migration[5.0]
  def change
    create_table :company_jobs do |t|
      t.company :references
      t.job :references

      t.timestamps
    end
  end
end
