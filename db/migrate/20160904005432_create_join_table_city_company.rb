class CreateJoinTableCityCompany < ActiveRecord::Migration[5.0]
  def change
    create_join_table :cities, :companies do |t|
      t.index [:city_id, :company_id]
      t.index [:company_id, :city_id]
    end
  end
end
