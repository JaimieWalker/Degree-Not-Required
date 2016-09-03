class CreateJobs < ActiveRecord::Migration[5.0]
  def change
    create_table :jobs do |t|
      t.string :name
      t.string :job_key
      t.references :company, foreign_key: true
      t.string :job_title
      t.float :longitude
      t.float :latitude

      t.timestamps
    end
  end
end
