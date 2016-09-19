class CreateCountryStates < ActiveRecord::Migration[5.0]
  def change
    create_table :country_states do |t|
    	t.references :country
    	t.references :state
      t.timestamps
    end
  end
end
