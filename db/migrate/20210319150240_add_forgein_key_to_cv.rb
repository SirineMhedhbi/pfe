class AddForgeinKeyToCv < ActiveRecord::Migration[6.1]
  def change
    add_column :infos, :cv_id, :integer  
    add_foreign_key :infos, :cvs, column: :cv_id
  end
end
