class AddForgeinKeyToWork < ActiveRecord::Migration[6.1]
  def change
    add_column :works, :cv_id, :integer  
    add_foreign_key :works, :cvs, column: :cv_id
  end
end
