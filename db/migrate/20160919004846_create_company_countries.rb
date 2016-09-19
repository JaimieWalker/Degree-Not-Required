class CreateCompanyCountries < ActiveRecord::Migration[5.0]
  def change
    create_table :company_countries do |t|
    	t.references :company
    	t.references :country
      t.timestamps
    end
  end
end
