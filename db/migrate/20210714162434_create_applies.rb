class CreateApplies < ActiveRecord::Migration[6.1]
  def change
    create_table :applies do |t|
      t.integer :status

      t.timestamps
    end
    add_column :applies, :offer_id, :integer
    add_foreign_key :applies, :offers, column: :offer_id
    add_column :applies, :user_id, :integer
    add_foreign_key :applies, :users, column: :user_id
  end
end
