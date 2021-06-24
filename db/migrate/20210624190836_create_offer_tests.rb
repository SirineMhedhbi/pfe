class CreateOfferTests < ActiveRecord::Migration[6.1]
  def change
    create_table :offer_tests do |t|
      t.timestamps
    end
    add_column :offer_tests, :offer_id, :integer  
    add_foreign_key :offer_tests, :offers, column: :offer_id
  end
end
