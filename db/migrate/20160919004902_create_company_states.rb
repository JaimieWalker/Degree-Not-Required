class CreateCompanyStates < ActiveRecord::Migration[5.0]
  def change
    create_table :company_states do |t|
    	t.references :company
    	t.references :state
      t.timestamps
    end
  end
end
