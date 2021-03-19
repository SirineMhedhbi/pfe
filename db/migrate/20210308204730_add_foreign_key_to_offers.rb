class AddForeignKeyToOffers < ActiveRecord::Migration[6.1]
  def change
    add_column :offers, :user_id, :integer  
    add_foreign_key :offers, :users, column: :user_id
  end
end
