class CreateJoinTableCompanyJob < ActiveRecord::Migration[5.0]
  def change
    create_join_table :companies, :jobs do |t|
      t.index [:company_id, :job_id]
      t.index [:job_id, :company_id]
    end
  end
end
