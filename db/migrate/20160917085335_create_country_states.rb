class CreateCountryStates < ActiveRecord::Migration[5.0]
  def change
    create_table :country_states do |t|
      t.country :references
      t.state :references

      t.timestamps
    end
  end
end
