class AddForeignkeySkill < ActiveRecord::Migration[6.1]
  def change
    add_column :skills, :cv_id, :integer  
    add_foreign_key :skills, :cvs, column: :cv_id
  end
end
