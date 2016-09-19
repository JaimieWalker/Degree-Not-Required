class CreateCompanyJobs < ActiveRecord::Migration[5.0]
  def change
    create_table :company_jobs do |t|
      t.references :company
      t.references :job
      t.timestamps
    end
  end
end
