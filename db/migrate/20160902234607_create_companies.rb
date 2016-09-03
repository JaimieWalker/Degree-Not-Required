class CreateCompanies < ActiveRecord::Migration[5.0]
  def change
    create_table :companies do |t|
      t.string :name
      t.references :state, foreign_key: true
      t.references :city, foreign_key: true
      t.references :country, foreign_key: true

      t.timestamps
    end
  end
end
