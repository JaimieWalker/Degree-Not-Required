class CreateCityCompanies < ActiveRecord::Migration[5.0]
  def change
    create_table :city_companies do |t|
      t.references :city, foreign_key: true
      t.references :company, foreign_key: true
      t.timestamps
    end
  end
end
