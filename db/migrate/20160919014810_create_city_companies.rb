class CreateCityCompanies < ActiveRecord::Migration[5.0]
  def change
    create_table :city_companies do |t|
    	t.references :city
    	t.references :company
      t.timestamps
    end
  end
end
